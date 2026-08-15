import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import Earth from "./objects/earth";
import Zoom from "./zoom";
import Assets from "./assets";
import Camera from "./camera";
import Utility from "./utility";
import Continent from "./objects/continent";

export default class World
{
    //static instance = null;
    static scene = null;
    //static camera = null;
    static earth = null;
    //static controls = null;
    static #directionalLight = null;
    static #lightPosFormCamea = null;
    static #renderer = null;

    /*constructor(renderer)
    {
        if (World.instance)
        { return World.instance; }
        World.instance = this;
    }*/

    static Init(renderer)
    {
        const scene = new three.Scene();
        //const raycaster = new three.Raycaster();

        const directionalLight = new three.DirectionalLight(0xffffff, 3);
        World.#lightPosFormCamea = new three.Vector3(-100, 100, 100);
        scene.add(directionalLight);
        scene.add(new three.DirectionalLightHelper(directionalLight, 10));
        directionalLight.position.set(0, 150, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        //scene.add(new three.CameraHelper(directionalLight.shadow.camera));
        
        const ambiantLight = new three.AmbientLight(0xffffff, 1.5);
        scene.add(ambiantLight);

        const axes = new three.AxesHelper(1000, 1000);
        scene.add(axes);

        //camera.position.set(120, 50, 120);
        //controls.update();

        World.scene = scene;
        //World.camera = camera;
        //World.controls = controls;
        World.#directionalLight = directionalLight;
        World.#renderer = renderer;
    }

    static CreateScene()
    {
        //const camera = new Camera(World.scene, World.#renderer);
        Camera.Init(World.scene, World.#renderer);

        World.earth = new Earth(World.scene);
        
        // these configs would go into a json file in the future
        const desktopLabelConfigs = [
            { text: "2,000+", long: 98 * Utility.deg2Rad, lati: 42.5 * Utility.deg2Rad },
            { text: "10", long: 110 * Utility.deg2Rad, lati: 42.5 * Utility.deg2Rad },
            { text: "$70,000+", long: 83 * Utility.deg2Rad, lati: 42.5 * Utility.deg2Rad },
        ];
        const mobleLabelConfigs = [
            { text: "2,000+", long: 98 * Utility.deg2Rad, lati: 44 * Utility.deg2Rad },
            { text: "10", long: 98 * Utility.deg2Rad, lati: 49 * Utility.deg2Rad },
            { text: "$70,000+", long: 98 * Utility.deg2Rad, lati: 39 * Utility.deg2Rad },
        ];
        const aboutUs = new Continent({ 
            modelFile: Assets.assets.aboutUs, 
            texture: Assets.assets.aboutUsTexture, 
            headerConfig: { text: 'About Us' }, 
            centerLong: 98 * Utility.deg2Rad,
            centerLait: 45 * Utility.deg2Rad,
            labelConfigs: Utility.IsMoble() ? mobleLabelConfigs : desktopLabelConfigs
        });
        Zoom.AddZoomCondition(Continent.FindValidCameraPos);

        const skyboxTexture = Assets.assets.skybox;
        skyboxTexture.colorSpace = three.SRGBColorSpace;
        const skyboxGeo = new three.SphereGeometry(500);
        const skyboxMat = new three.MeshBasicMaterial({ color: 0x999999, map: skyboxTexture, side: three.BackSide })
        const skybox = new three.Mesh(skyboxGeo, skyboxMat);
        World.scene.add(skybox);
    }
    
    static #prevTime = 0;
    static #cameraRotationMatrix = new three.Matrix4();
    static Update(time)
    {
        const deltaTime = time - World.#prevTime;
        World.#prevTime = time;
        const camera = Camera.camera;

        Camera.Update(deltaTime);

        const directionalLight = World.#directionalLight;
        const matrix = camera.matrix.extractRotation(camera.matrix);
        directionalLight.position.copy(World.#lightPosFormCamea);
        directionalLight.position.applyMatrix4(matrix);

        World.earth.Update(deltaTime);
    
        Camera.controls.update();
        //renderer.render(World.scene, camera);
    }
}