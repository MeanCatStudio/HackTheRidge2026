import * as three from "three";

import Label from "./label";
import Earth from "./earth";
import Zoom from "../zoom";
import Utility from "../utility";
import Camera from "../camera";
import Button from "./button";
import Assets from "../assets";

export default class Continent
{
    //static activeCamreaPositions = null;
    static #cameraPosHeight = 85;
    static #cameraRotationAngleLimit = .03 * Math.PI;
    //static #CamreaPositions = [];
    static #continents = []
    #active = false;
    #cameraPos = new three.Vector3();

    constructor(scene, { headerConfig, modelFile, texture, labelConfigs, centerLong, centerLait, backButtonLong, backButtonLati })
    {
        const MODEL_SCALE = 62;
        const model = modelFile.scene.children[0];

        scene.add(model);
        model.scale.multiplyScalar(MODEL_SCALE);
        const material = new three.MeshStandardMaterial({ color: Earth.farEarthColor });

        if (model.isGroup)
        {
            const surface = model.children[0];
            const bellow = model.children[1];
            surface.receiveShadow = true;
            surface.material.dispose();
            surface.material = material;            

            bellow.material.copy(surface.material);

            //Earth.SeperateLandMaterials(surface.material, bellow.material);

            //surface.material.stencilWrite = true; // suface material writes to the stencil buffer
            //surface.material.stencilRef = 1;
            //surface.material.stencilFunc = three.AlwaysStencilFunc;
            //surface.material.stencilZPass = three.ReplaceStencilOp;
            //surface.material.stencilZFail = three.ReplaceStencilOp;
        }
        else
        {
            model.receiveShadow = true;
            model.material.dispose();
            model.material = material;
        }



        const header = Label.LabelFromConfigObj({ long: centerLong, lati: centerLait, ...Label.headerLabelConfigs, ...headerConfig });
        scene.add(header.root);
        header.UpdateScale(0);

        const nearLabels = [];
        labelConfigs.forEach(config => {
            const label = Label.LabelFromConfigObj({ ...Label.nearLabelConfigs, ...config });
            scene.add(label.root);
            label.UpdateScale(0);
            nearLabels.push(label);
        });

        const cameraPos = Utility.GetSphericalPosition(centerLong, centerLait, Continent.#cameraPosHeight)
        this.#cameraPos.copy(cameraPos);
        const debugSphere = Utility.CreateDebugSphere(scene, cameraPos, 0xffff00);
        Continent.#continents.push(this);

        //const button = new Button(scene, { long: backButtonLong, lait: backButtonLati, geometry: 'x' });
        //button.UpdateScale(0);
        //button.AddClickListener(() => { Zoom.UpdateZoomLayer(-1); })

        Zoom.AddZoomListener((tweenObj) => {
            header.UpdateScale(tweenObj.farScale);
            //button.UpdateScale(tweenObj.nearScale);
            nearLabels.forEach(label => { label.UpdateScale(tweenObj.nearScale); });
            debugSphere.scale.set(1 - tweenObj.nearScale, 1 - tweenObj.nearScale, 1 - tweenObj.nearScale);
            material.color.lerpColors(Earth.farEarthColor, Earth.nearEarthColor, tweenObj.nearScale);
            if (material.map)
            {
                material.map = null;
                material.needsUpdate = true;
            }

            if (tweenObj.newLayer != 2)
            {
                Continent.activeCamreaPositions = null;
                this.#active = false;
                Camera.controls.maxAzimuthAngle = Infinity;
                Camera.controls.minAzimuthAngle = -Infinity;
                Camera.controls.minPolarAngle = 0;
                Camera.controls.maxPolarAngle = Math.PI;
            }
        });
        Zoom.AddZoomEndListener((tweenObj) => {
            if (tweenObj.newLayer == 2)
            {
                if (this.#active)
                {
                    material.color.setHex(0xffffff);
                    material.map = texture;
                    material.needsUpdate = true;

                    Camera.controls.maxAzimuthAngle = - (centerLong - Math.PI * .5) + Continent.#cameraRotationAngleLimit;
                    Camera.controls.minAzimuthAngle = - (centerLong - Math.PI * .5) - Continent.#cameraRotationAngleLimit;
                    Camera.controls.minPolarAngle = Math.PI - (centerLait + Math.PI * .5) - Continent.#cameraRotationAngleLimit;
                    Camera.controls.maxPolarAngle = Math.PI - (centerLait + Math.PI * .5) + Continent.#cameraRotationAngleLimit;
                    //console.log(Math.PI - (centerLait + Math.PI * .5));
                    //Camera.controls.minPolarAngle
                }
            }
        });

    }

    static #cameraPosAngleThreshold = Math.PI * .08;
    static FindValidCameraPos(tweenObj)
    {
        if (tweenObj.newLayer != 2)
        { return true; }
        
        let nearest = null;
        let nearestAngle = 10000;
        Continent.#continents.forEach(continent => {
            const angle = Camera.camera.position.angleTo(continent.#cameraPos);
            if (nearestAngle > angle)
            {
                nearestAngle = angle;
                nearest = continent;
            }
        });
        //console.log(nearestAngle);

        if (nearestAngle < Continent.#cameraPosAngleThreshold)
        {
            Camera.targetCameraPos.copy(nearest.#cameraPos);
            //Continent.activeCamreaPositions = nearest.#cameraPos;
            nearest.#active = true;
            return true;
        }
        else
        { return false; }
    }
}