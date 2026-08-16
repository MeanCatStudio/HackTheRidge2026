import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import Earth from "./objects/earth";
import Zoom from "./zoom";
import Assets from "./assets";
import Camera from "./camera";
import Utility from "./utility";
import Continent from "./objects/continent";
import config from "../config";
import Button from "./objects/button";
import Input from "./input";

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
    static #tempObj = null;

    static Init(renderer)
    {
        const scene = new three.Scene();

        const directionalLight = new three.DirectionalLight(0xffffff, 3);
        World.#lightPosFormCamea = new three.Vector3(-100, 100, 100);
        scene.add(directionalLight);
        scene.add(new three.DirectionalLightHelper(directionalLight, 10));
        directionalLight.position.set(0, 150, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 75;
        directionalLight.shadow.camera.bottom = -75;
        directionalLight.shadow.camera.left = -75;
        directionalLight.shadow.camera.right = 75;
        //scene.add(new three.CameraHelper(directionalLight.shadow.camera));
        
        const ambiantLight = new three.AmbientLight(0xffffff, 1.5);
        scene.add(ambiantLight);

        const axes = new three.AxesHelper(1000, 1000);
        scene.add(axes);

        World.scene = scene;
        //World.camera = camera;
        //World.controls = controls;
        World.#directionalLight = directionalLight;
        World.#renderer = renderer;
        World.#tempObj = new three.Object3D();
    }

    static CreateScene()
    {
        //const camera = new Camera(World.scene, World.#renderer);
        Camera.Init(World.scene, World.#renderer);
        World.#tempObj.position.copy(Camera.camera.position);
        World.#tempObj.lookAt(0, 0, 0);

        World.earth = new Earth(World.scene);

        Button.Init();
        config.continents.forEach(item => {
            World.#CreateContinent(item);
        });
        Zoom.AddZoomCondition(Continent.FindValidCameraPos);

        const skyboxTexture = Assets.GetAsset('skybox');
        skyboxTexture.colorSpace = three.SRGBColorSpace;
        const skyboxGeo = new three.SphereGeometry(500);
        const skyboxMat = new three.MeshBasicMaterial({ color: 0x999999, map: skyboxTexture, side: three.BackSide })
        const skybox = new three.Mesh(skyboxGeo, skyboxMat);
        World.scene.add(skybox);
    }

    static #CreateContinent(config = {})
    {
        const continent = new Continent(World.scene, {
            modelFile: Assets.GetAsset(config.modelFile),
            texture: Assets.GetAsset(config.texture),
            headerConfig: config.headerConfig,
            centerLong: config.centerLong,
            centerLait: config.centerLait,
            backButtonLong: config.backButtonLong,
            backButtonLati: config.backButtonLati,
            labelConfigs: Utility.IsMoble() ? config.mobileLabelConfigs : config.desktopLabelConfigs
        });
    }
    
    static #prevTime = 0;
    static #cameraRotationMatrix = new three.Matrix4();
    static Update(time)
    {
        const deltaTime = time - World.#prevTime;
        World.#prevTime = time;

        Camera.Update(deltaTime);

        const camera = Camera.camera;
        const directionalLight = World.#directionalLight;
        const matrix = camera.matrix.extractRotation(camera.matrix);
        directionalLight.position.copy(World.#lightPosFormCamea);
        directionalLight.position.applyMatrix4(matrix);

        World.earth.Update(deltaTime);
    
        Camera.controls.update();
        //renderer.render(World.scene, camera);
    }
}