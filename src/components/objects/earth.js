import * as three from "three";

import Assets from "../assets";
import Label from "./label";
import Zoom from "../zoom";
import Utility from "../utility";
import Camera from "../camera";

export default class Earth
{
    static EARTH_RADIUS = 64;
    static MODEL_SCALE = 62;
    static farEarthColor = new three.Color(0x67E735);
    static nearEarthColor =  new three.Color(0x4ba927);
    #earth = null;
    #earthMaterial = null;
    #title = null;
    #clouds = null;

    constructor(scene)
    {
        const earth = Assets.GetAsset('earth').scene;
        scene.add(earth); // adds the land and water
        earth.scale.multiplyScalar(Earth.MODEL_SCALE); // approximately 64 unit radius
        const land = earth.children[1]; // get land only;
        const earthMaterial = land.material;
        earthMaterial.roughness = 1; 
        earthMaterial.metalness = 0;
        const water = earth.children[0];
        water.material.roughness = 0.2;
        water.material.metalness = .3;
        land.receiveShadow = true;
        water.receiveShadow = true;
        
        const title = new Label("Hack The Earth!", { size: 15, depth: 5, letterSpacing: 5, disableShadow: true });
        title.PositionTextTop(45 * Utility.deg2Rad, 90);
        //title.root.rotation.set(0, 0, 0);
        //camera.worldToLocal(title.root.position);
        //camera.attach(title.root);
        scene.add(title.root);

        const clouds = Assets.GetAsset('clouds').scene;
        scene.add(clouds);
        clouds.scale.multiplyScalar(Earth.MODEL_SCALE);
        clouds.rotateY(Math.PI * .8);
        for (let i = 0; i < clouds.children.length; i++)
        {
            clouds.children[i].castShadow = true;
        }

        Zoom.AddZoomListener((tweenObj) => {
            title.UpdateScale(tweenObj.titleScale);

            for (let i = 0; i < clouds.children.length; i++)
            {
                clouds.children[i].scale.set(tweenObj.titleScale, tweenObj.titleScale, tweenObj.titleScale);
            }
            
            land.material.color.lerpColors(Earth.farEarthColor, Earth.nearEarthColor, tweenObj.nearScale)
        });

        this.#earth = earth;
        this.#earthMaterial = earthMaterial;
        this.#title = title;
        this.#clouds = clouds;

        /*Zoom.AddZoomCondition((tweenObj) => {            
            if (tweenObj.newLayer != 2)
            { return true; }
            const cameraPOs = Continent.FindValidCameraPos(tweenObj);
            if (cameraPOs != -1)
            {
                Camera.targetCameraPos.copy(cameraPOs);
                return true;
            }
            else
            { return false; }
        });*/
    }

    Update(deltaTime)
    {
        const title = this.#title;
        const camera = Camera.camera;
        const controls = Camera.controls;

        title.root.setRotationFromMatrix(Utility.RotationMatrixFromLookVector({ x: -camera.position.x, y: camera.position.y * -.5, z: -camera.position.z}))
        title.root.position.copy(Utility.GetSphericalPosition(-controls.getAzimuthalAngle() + Math.PI * .5, -(controls.getPolarAngle() - Math.PI * .5) * .5 + Math.PI * .5, 90));

        this.#clouds.rotation.y += deltaTime * .0001;
    }
};
