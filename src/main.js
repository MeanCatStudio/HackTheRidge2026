import * as three from "three";
import gsap from 'gsap';
import GUI from 'lil-gui';
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

import Label from './components/objects/label.js';
import Utility from './components/utility.js';
import Assets from "./components/assets.js";
import World from "./components/world.js";
import Zoom from "./components/zoom.js";
import Camera from "./components/camera.js";
import Input from "./components/input.js";

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//const world = new World(renderer);
World.Init(renderer);

const scene = World.scene;
const camera = World.camera;

const gui = new GUI({ width: 400 });
const guiObject = {};
gui.hide();

//const assets = new Assets();
//assets.Load({ name: 'earth', type: 'model', path: 'assets/models/earth_2.glb' });

let mouseDown = false;

const loadItems = [
    { name: 'earth', type: 'model', path: 'assets/models/earth_2.glb'},
    { name: 'clouds', type: 'model', path: 'assets/models/clouds.glb'},
    { name: 'aboutUs', type: 'model', path: 'assets/models/aboutUs_2.glb'},
    { name: 'skybox', type: 'texture', path: 'assets/textures/lowresSkybox.jpg'},
    { name: 'aboutUsTexture', type: 'texture', path: Utility.IsMoble() ? 'assets/textures/AboutUs_Moble.png' : 'assets/textures/AboutUs.png' },
    { name: 'font', type: 'font', path: 'assets/fonts/roboto.json'}
];
Assets.Init(CreateScenePostLoad);
//const assets = new Assets(CreateScenePostLoad);
for (let i = 0; i < loadItems.length; i++)
{
    Assets.Load(loadItems[i]);
}
//console.log(Assets.assets);

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
