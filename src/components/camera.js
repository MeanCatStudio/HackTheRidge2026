import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { instance } from "three/tsl";

import Zoom from "./zoom";
import Input from "./input";

export default class Camera
{
    static instance = null;
    static camera = null; //three.PerspectiveCamera();
    static controls = null; //new OrbitControls();
    static targetCameraPos = new three.Vector3(); // Probaly refactor this
    static #prevCameraPos = new three.Vector3();

    static Init(scene, renderer)
    {
        if (Camera.instance)
        { return Camera.instance; }
        Camera.instance = this;

        const DEFAULT_CAMERA_FOV = 75;
        const camera = new three.PerspectiveCamera(DEFAULT_CAMERA_FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.staticMoving = false;
        controls.enableDamping = true;
        controls.dampingFactor = .3;

        camera.position.set(120, 50, 120);
        controls.update();       
        
        const CAMERA_ZOOM_DISTANCE = [175, 125, 85];
        Zoom.AddZoomListener((tweenObj) => {
            if (tweenObj.newLayer == 2)
            { 
                camera.position.lerpVectors(Camera.#prevCameraPos, Camera.targetCameraPos, tweenObj.progress);
            }
            else
            {
                const from = CAMERA_ZOOM_DISTANCE[tweenObj.currentLayer];
                const to = CAMERA_ZOOM_DISTANCE[tweenObj.newLayer];
                const between = (1 - tweenObj.progress) * from + tweenObj.progress * to;
                
                camera.position.normalize();
                camera.position.multiplyScalar(between);
            }
        });
        Zoom.AddZoomStartListener((tweenObj) => {
            controls.enabled = false;
            Camera.#prevCameraPos.copy(camera.position);
            controls.rotateSpeed = tweenObj.newLayer == 2 ? .5 : 1;
        });
        Zoom.AddZoomEndListener((tweenObj) => {
            controls.enabled = true;
        })
    
        Camera.camera = camera;        
        Camera.controls = controls;
    }

    static Update(deltatime)
    {
        if (Zoom.zoomLayer == 2 && !Input.mouseDown)
        {
            Camera.camera.position.lerp(Camera.targetCameraPos, 0.001 * deltatime);
        }
    }
}