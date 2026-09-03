import * as three from "three";

//import Label from './components/objects/label.js';
import config from "./config.js";
import Assets from "./components/assets.js";
import World from "./components/world.js";
import Camera from "./components/camera.js";
import Input from "./components/input.js";
import Debug from "./components/debug.js";
import Renderer from "./components/renderer.js";

/*const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = three.PCFShadowMap;
document.body.appendChild(renderer.domElement);
renderer.toneMapping = three.CineonToneMapping;*/

//const world = new World(renderer);
Debug.Init();
Renderer.Init(World.scene, Camera.camera);
const renderer = Renderer.renderer;
World.Init(renderer);
Debug.Toggle();
Assets.Init(CreateScenePostLoad);
Assets.LoadList(config.assets);
let loaded = false;

function CreateScenePostLoad()
{
    console.log('Load');
    //console.log(World);
    World.CreateScene();
    Camera.HideLoadingOverlay();
    Input.Init();
    //Start();
    loaded = true;
    console.log("Starting");
}

renderer.setAnimationLoop((time) => {
    Debug.UpdateStart();
    if (loaded)
    { World.Update(time); }
    //renderer.render(World.scene, Camera.camera);
    Renderer.Render();
    Debug.UpdateEnd();
});

function OnKeydown(event)
{
    if (event.key == '`' || event.key == '~')
    { Debug.Toggle(); }
}
window.addEventListener('keydown', OnKeydown)
