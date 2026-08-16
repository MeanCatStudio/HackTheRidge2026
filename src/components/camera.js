import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { instance } from "three/tsl";

import Zoom from "./zoom";
import Input from "./input";
import Utility from "./utility";

export default class Camera
{
    static instance = null;
    static camera = null; //three.PerspectiveCamera();
    static controls = null; //new OrbitControls();
    static targetCameraPos = new three.Vector3(); // Probaly refactor this
    static #prevCameraPos = new three.Vector3();
    static #raycaster = null;
    static #raycastListeners = [];
    static #currentHoveredListener = null;
    static #baseRotationSpeed = Utility.IsMoble() ? .5 : 1;
    static #tweenPos = new three.Vector3();
    static #prevTweenPos = new three.Vector3();

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
        controls.rotateSpeed = Camera.#baseRotationSpeed;

        camera.position.set(120, 50, 120);
        controls.update();    
        
        const raycaster = new three.Raycaster();
        Input.AddClickListener((event) => {
            if (Camera.#currentHoveredListener)
            { Camera.#currentHoveredListener.click(); }
        });
        
        const CAMERA_ZOOM_DISTANCE = [175, 125, 85];
        Zoom.AddZoomListener((tweenObj) => {
            if (tweenObj.newLayer == 2)
            { 
                Camera.#tweenPos.lerpVectors(camera.position, Camera.targetCameraPos, tweenObj.progress * 1.05);
                Camera.#prevTweenPos.lerpVectors(camera.position, Camera.targetCameraPos, tweenObj.prevProgress);

                camera.position.add(Camera.#tweenPos).sub(Camera.#prevTweenPos);

                //const currentDist = Camera.targetCameraPos.clone().sub(camera.position).length;
                //const totalDist = currentDist / (1 - tweenObj.progress);
                //const 
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
            //controls.enabled = false;
            Camera.#prevCameraPos.copy(camera.position);
            controls.rotateSpeed = Camera.#baseRotationSpeed * (tweenObj.newLayer == 2 ? .5 : 1);
        });
        Zoom.AddZoomEndListener((tweenObj) => {
            controls.enabled = true;
        })
    
        Camera.camera = camera;        
        Camera.controls = controls;
        Camera.#raycaster = raycaster;
    }

    static AddRaycastListener(obj, hoverCallback, clickCallback)
    {
        Camera.#raycastListeners.push({ obj: obj, hover: hoverCallback, click: clickCallback });
    }

    static Update(deltatime)
    {
        const camera = Camera.camera;
        if (Zoom.zoomLayer == 2 && !Input.mouseDown)
        {
            camera.position.lerp(Camera.targetCameraPos, 0.001 * deltatime);
        }

        const raycaster = Camera.#raycaster;
        Camera.#currentHoveredListener = null;
        raycaster.setFromCamera(Input.cursor, camera);
        Camera.#raycastListeners.forEach(listener => {
            const intersects = raycaster.intersectObject(listener.obj, false);
            if (intersects.length > 0)
            {
                if (Camera.#currentHoveredListener)
                {
                    const dist = Camera.#currentHoveredListener.obj.position.distanceToSquared(camera);
                    if (intersects[0].distance < dist)
                    { Camera.#currentHoveredListener = listener; }
                }
                else
                { 
                    Camera.#currentHoveredListener = listener; 
                }
            }
        });
        if (Camera.#currentHoveredListener)
        { 
            Camera.#currentHoveredListener.hover();             
        }
    }
}