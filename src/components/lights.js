import * as three from "three";

import Assets from "./assets";

export default class Lights
{
    static directionalLight = null;

    static Init(scene)
    {        
        const directionalLight = new three.DirectionalLight(0xffffff, 3);
        //World.#lightPosFormCamea = new three.Vector3(-100, 100, 100);
        scene.add(directionalLight);
        scene.add(new three.DirectionalLightHelper(directionalLight, 10));
        directionalLight.position.set(100, 150, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 75;
        directionalLight.shadow.camera.bottom = -75;
        directionalLight.shadow.camera.left = -75;
        directionalLight.shadow.camera.right = 75;

        scene.environment = Assets.GetAsset('enviroment');        
        scene.environmentIntensity = 0.5;

        Lights.directionalLight = directionalLight;
    }
}