import * as three from "three";

//import Label from './components/objects/label.js';
import config from "./config.js";
import Assets from "./components/assets.js";
import World from "./components/world.js";
import Camera from "./components/camera.js";
import Input from "./components/input.js";
import Debug from "./components/debug.js";

const renderer = new three.WebGLRenderer({ stencil: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = three.PCFShadowMap;
document.body.appendChild(renderer.domElement);
renderer.toneMapping = three.CineonToneMapping;

//const world = new World(renderer);
World.Init(renderer);
Debug.Toggle();
Assets.Init(CreateScenePostLoad);
Assets.LoadList(config.assets);

function CreateScenePostLoad()
{
    console.log('Load');
    //console.log(World);
    World.CreateScene();
    Input.Init();
    Start();
}

function Start()
{
    console.log("Starting");

    renderer.setAnimationLoop((time) => {
        World.Update(time);
        renderer.render(World.scene, Camera.camera);
    });
}

function OnWindowResize(event)
{
    Camera.camera.aspect = window.innerWidth / window.innerHeight;
    Camera.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', OnWindowResize);

function OnKeydown(event)
{
    if (event.key == '`' || event.key == '~')
    { Debug.Toggle(); }
}
window.addEventListener('keydown', OnKeydown)
