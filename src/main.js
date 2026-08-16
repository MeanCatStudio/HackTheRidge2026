import * as three from "three";
import GUI from 'lil-gui';

//import Label from './components/objects/label.js';
import config from "./config.js";
import Utility from './components/utility.js';
import Assets from "./components/assets.js";
import World from "./components/world.js";
//import Zoom from "./components/zoom.js";
import Camera from "./components/camera.js";
import Input from "./components/input.js";

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = three.PCFShadowMap;
document.body.appendChild(renderer.domElement);

//const world = new World(renderer);
World.Init(renderer);

const scene = World.scene;
const camera = World.camera;

const gui = new GUI({ width: 400 });
const guiObject = {};
gui.hide();
export {gui};

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
