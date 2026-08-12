import * as three from "three";
import { TextGeometry } from "three/examples/jsm/Addons.js";

import Utility from "./utility";

export default class Label 
{
    #material;

    root = new three.Group();
    #text = " ";
    #lettersFlatOffsets = []

    constructor(text, font,  { size = 5, depth = 1, color = 0xffffff, letterSpacing = 1, disableShadow = false }) // creates the letters and label object
    {
        this.#text = text;
        const textOptions = 
        { 
            font: font,
            size: size,
            depth: depth,
            curveSegments: 1,
            bevelEnabled: false
        }
        this.#material = new three.MeshPhongMaterial({ color: 0xffffff });
        let currentX = 0;

        const letterCenterOffset = new three.Vector3();
        for (let i = 0; i < text.length; i++)
        {
            const letter = text[i];
            if (letter === ' ')
            {
                currentX += textOptions.size * .5;
                continue;
            }

            const letterGeometry = new TextGeometry(letter, textOptions);
            letterGeometry.computeBoundingBox();
            const boundingBox = letterGeometry.boundingBox;
            boundingBox.getCenter(letterCenterOffset);
            letterGeometry.translate(-letterCenterOffset.x, 0, 0)

            const letterMesh = new three.Mesh(letterGeometry, this.#material);
            letterMesh.position.x = currentX - boundingBox.min.x;
            this.root.add(letterMesh);
            letterMesh.castShadow = !disableShadow;
            const letterWidth = boundingBox.max.x - boundingBox.min.x;
            currentX += letterWidth + letterSpacing;            
        }

        const bounds = new three.Box3().setFromObject(this.root);
        const centerOffset = new three.Vector3();
        bounds.getCenter(centerOffset);
        for (let i = 0; i < this.root.children.length; i++)
        {
            const letter = this.root.children[i];
            letter.position.x -= centerOffset.x;            
            letter.geometry.boundingBox.getCenter(letterCenterOffset);
            letter.geometry.translate(0, -centerOffset.y, 0);
            
            this.#lettersFlatOffsets.push(letter.position.x);
        }

        const debugRootMesh = new three.Mesh(Utility.debugSphereGeometry, Utility.debugMaterialRed);
        //this.root.add(debugRootMesh);
        //this.#lettersFlatOffsets.push(debugRootMesh.position.x);
    };

    PositionText(long, lati, distance) // positions the label and letter objects
    {
        // Iner circile cal
        const compAngle = Math.PI * .5 - Math.abs(lati);
        const longCircleRadius = Math.sin(compAngle) * distance;
        //const longCircleCircumfrance = longCircleRadius * 2 * Math.PI;
        //const LenghtToAngleFactor = (1 / longCircleCircumfrance) * Math.PI * 2;
        const LenghtToAngleFactor = 1 / longCircleRadius // Trust the math that it works out

        this.root.position.copy(Utility.GetSphericalPosition(long, lati, distance));
        const zeroVec3 = new three.Vector3(0, 0, 0);
        this.root.rotation.set(0, 0, 0);
        this.root.updateMatrixWorld();

        const pos = new three.Vector3();
        for (let i = 0; i < this.root.children.length; i++)
        {
            const letter = this.root.children[i];
            const longOffset = -this.#lettersFlatOffsets[i] * LenghtToAngleFactor;
            //console.log(offsetLati * 57.295);
            pos.copy(Utility.GetSphericalPosition(long + longOffset, lati, distance));
            letter.position.copy(pos);
            this.root.worldToLocal(letter.position);   

            letter.setRotationFromMatrix(Utility.RotationMatrixFromLookVector(pos));
            letter.rotateY(Math.PI);
        }
    }

    PositionTextTop(rotation, distance) // positions letter veterical over the earth
    {
        //const circleCircumfrance = distance * 2 * Math.PI;
        //const LenghtToAngleFactor = (Math.PI * 2) / circleCircumfrance;
        const LenghtToAngleFactor = 1 / distance; // Again pls don't question how the math works

        this.root.position.set(0, distance, 0);
        const zeroVec3 = new three.Vector3(0, 0, 0);
        this.root.rotation.set(0, 0, 0);
        this.root.updateMatrixWorld();

        const pos = new three.Vector3();
        for (let i = 0; i < this.root.children.length; i++)
        {
            const letter = this.root.children[i];
            const angle = LenghtToAngleFactor * this.#lettersFlatOffsets[i];
            const x = Math.sin(angle) * distance;
            const y = Math.cos(angle) * distance;
            pos.set(x, y, 0);
            letter.position.copy(pos);
            this.root.worldToLocal(letter.position);
            
            letter.setRotationFromMatrix(Utility.RotationMatrixFromDownVector(pos.negate().normalize()));
            letter.rotateZ(-letter.rotation.z * .5); // rotation from down vector is buged, leading to z rotation being doubled of what it's intened, can't find solution
        }

        this.root.rotateY(rotation);
    }

    UpdateScale(scale) 
    {
        for (let i = 0; i < this.root.children.length; i++)
        {
            const letter = this.root.children[i];
            letter.scale.set(scale, scale, scale);
        }
        this.#material.visible = scale > 0.01;
    }
}