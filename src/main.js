import * as three from "three";
//import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from 'gsap';
import GUI from 'lil-gui';
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

import Label from './components/label.js';
import Utility from './components/utility.js';
import Billboard from "./components/billborad.js";
import { depth } from "three/tsl";

const scene = new three.Scene();
Utility.scene = scene;
const DEFAULT_CAMERA_FOV = 75;
const camera = new three.PerspectiveCamera(DEFAULT_CAMERA_FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.staticMoving = false;
controls.enableDamping = true;
controls.dampingFactor = .2;
const raycaster = new three.Raycaster();

const gui = new GUI({ width: 400 });
const guiObject = {};
gui.hide();

const axes = new three.AxesHelper(1000, 1000);
//scene.add(axes);

const loadingManager = new three.LoadingManager();
const textureLoader = new three.TextureLoader(loadingManager);
const dracoLoader = new DRACOLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);
const fontLoader = new FontLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
loadingManager.onError = (url) => { console.error(`Loading error: ${url}`); }

const deg2Rad = Math.PI / 180;
let mouseDown = false;
loadingManager.onLoad = () => 
{
    console.log("Starting");

    renderer.setAnimationLoop(Update);
    document.addEventListener('click', OnClick);
    window.addEventListener('mousemove', OnMouseMove);
    window.addEventListener('wheel', OnZoom);
    window.addEventListener('touchmove', OnTouchMove);
    window.addEventListener('touchend', OnTouchEnd);
    window.addEventListener('pointerdown', () => { mouseDown = true; });
    window.addEventListener('pointerup', () => { mouseDown = false; });
    window.addEventListener('pointercancel', () => { mouseDown = false; });
}

const directionalLight = new three.DirectionalLight(0xffffff, 3);
const lightPosFormCamea = new three.Vector3(-100, 100, 100);
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

const EARTH_RADIUS = 64;

const MODEL_SCALE = 62;
let earth = null;
let earthMaterial = null;
const FAR_EARTH_COLOR = new three.Color(0x67E735);
const NEAR_EARTH_COLOR = new three.Color(0x4ba927);
gltfLoader.load(`${import.meta.env.BASE_URL}assets/models/earth_2.glb`, (file) => 
{
    //console.log(file);
    scene.add(file.scene); // adds the land and water
    file.scene.scale.multiplyScalar(MODEL_SCALE); // approximately 64 unit radius
    earth = file.scene.children[1]; // get land only;
    earthMaterial = earth.material;
    earthMaterial.roughness = 1; 
    earthMaterial.metalness = 0;
    const water = file.scene.children[0];
    water.material.roughness = 0.2;
    water.material.metalness = .3;
    earth.receiveShadow = true;
    water.receiveShadow = true;

    if (aboutUs)
    { aboutUs.material = earthMaterial; }
}, (xhr) => { }, (error) => { console.log(`error ocured while loading earth: ${error}`); });

let clouds = null;
gltfLoader.load(`${import.meta.env.BASE_URL}assets/models/clouds.glb`, (file) => {
    clouds = file.scene;
    scene.add(clouds);
    clouds.scale.multiplyScalar(MODEL_SCALE);
    clouds.rotateY(Math.PI * .8);
    for (let i = 0; i < clouds.children.length; i++)
    {
        clouds.children[i].castShadow = true;
    }
});

let aboutUs = null;
let aboutUsMaterial = new three.MeshStandardMaterial();
const aboutUsCamreaPos = new three.Vector3().copy(Utility.GetSphericalPosition(98 * deg2Rad, 42 * deg2Rad, 85));
gltfLoader.load(`${import.meta.env.BASE_URL}assets/models/aboutUs_2.glb`, (file) => {
    //console.log(file);
    aboutUs = file.scene.children[0];
    scene.add(aboutUs);
    aboutUs.scale.multiplyScalar(MODEL_SCALE);
    aboutUs.receiveShadow = true;
    
    if (earthMaterial)
    { aboutUs.material = earthMaterial; }
})

textureLoader.load(`${import.meta.env.BASE_URL}assets/textures/lowresSkybox.jpg`, (texture) => {
    console.log(texture);
    texture.colorSpace = three.SRGBColorSpace;
    const skyboxGeo = new three.SphereGeometry(500);
    const skyboxMat = new three.MeshBasicMaterial({ color: 0x999999, map: texture, side: three.BackSide })
    const skybox = new three.Mesh(skyboxGeo, skyboxMat);
    scene.add(skybox);
});

const aboutUsTexturePath = `${import.meta.env.BASE_URL}assets/textures/${Utility.IsMoble() ? 'AboutUs_Moble.png' : 'AboutUs.png'}`
textureLoader.load(aboutUsTexturePath, (texture) => {
    texture.colorSpace = three.SRGBColorSpace;
    texture.flipY = false;
    aboutUsMaterial.map = texture;
});

controls.minDistance = EARTH_RADIUS + 2;
controls.maxDistance = EARTH_RADIUS * 3;

const farDetailPrams = {
    count: 0,
    geometry: new three.BoxGeometry(5, 15, 5).translate(0, 7.5, 0),
    material: new three.MeshPhongMaterial( { color: 0xdddddd }) //new three.MeshMatcapMaterial({ matcap: matcapTexture }) //new three.MeshBasicMaterial({ color: 0xdddddd })
}
const farDetails = new three.Group();
scene.add(farDetails);
const pos = new three.Vector3();
for (let i = 0; i < farDetailPrams.count; i++)
{
    const mesh = new three.Mesh(farDetailPrams.geometry, farDetailPrams.material);
    farDetails.add(mesh);
    //const pos = GetEarthPosition((Math.random() - .5) * Math.PI, (Math.random() - .5) * Math.PI * 2);
    pos.copy(Utility.GetSphericalPosition(Math.random() * Math.PI * 2, (Math.random() - .5) * Math.PI, EARTH_RADIUS - 1));
    mesh.position.copy(pos);
    mesh.lookAt(pos.add(pos));
    mesh.rotateX(Math.PI * .5);
}

const nearDetailPrams = {
    count: 0,
    geometry: new three.BoxGeometry(2, 2, 2).translate(0, 1, 0),
    material: new three.MeshBasicMaterial({ color: 0xffffff })
}
const nearDetails = new three.Group();
scene.add(nearDetails);
for (let i = 0; i < nearDetailPrams.count; i++)
{
    const mesh = new three.Mesh(nearDetailPrams.geometry, nearDetailPrams.material);
    nearDetails.add(mesh);
    pos.copy(Utility.GetSphericalPosition(Math.random() * Math.PI * 2, (Math.random() - .5) * Math.PI, EARTH_RADIUS - 1));
    mesh.position.copy(pos);
    mesh.lookAt(pos.add(pos));
    mesh.rotateX(Math.PI * .5);
    mesh.scale.y = 0;
}

const desktopLabelConfigs = [
    { text: "2,000+", long: 98, lati: 42.5 },
    { text: "10", long: 110, lati: 42.5 },
    { text: "$70,000+", long: 83, lati: 42.5 },
];
const mobleLabelConfigs = [
    { text: "2,000+", long: 98, lati: 44 },
    { text: "10", long: 98, lati: 49 },
    { text: "$70,000+", long: 98, lati: 39 },
];

let title = null;
const farLabels = [];
const nearLabels = [];
let titleOffsetFromCamera = new three.Vector3();
fontLoader.load(`${import.meta.env.BASE_URL}assets/fonts/roboto.json`, (font) => { 
    function CreateFarLabel(text, long, lati, dist, parms)
    {
        const label = new Label(text, font, parms);
        scene.add(label.root);
        label.PositionText(long * deg2Rad, lati * deg2Rad, dist);
        farLabels.push(label);
        label.UpdateScale(0);
    }

    title = new Label("Hack The Earth!", font, { size: 15, depth: 5, letterSpacing: 5, disableShadow: true });
    title.PositionTextTop(45 * deg2Rad, 90);
    //title.root.rotation.set(0, 0, 0);
    //camera.worldToLocal(title.root.position);
    //camera.attach(title.root);
    scene.add(title.root);

    CreateFarLabel("About Us", 99, 45, 70, { size: 10, depth: 2 });
    console.log(farLabels);
    CreateFarLabel("Sponsors", -20, 8, 70, { size: 10, depth: 2, letterSpacing: 2 });
    CreateFarLabel("The Team", 60, -11, 70, { size: 10, depth: 2 });
    CreateFarLabel("F Q A", -85, 45, 70, { size: 10, depth: 2, letterSpacing: 2 });
    CreateFarLabel("Credits", -134, -24, 70, { size: 10, depth: 2 });
    CreateFarLabel("Settings", 45, -75, 70, { size: 10, depth: 2, letterSpacing: 4 });

    const textConfigs = Utility.IsMoble() ? mobleLabelConfigs : desktopLabelConfigs;
    function CreateNearLabel(text, long, lati, parms = {}) 
    {        
        const label = new Label(text, font, parms);
        scene.add(label.root);
        label.PositionText(long * deg2Rad, lati * deg2Rad, EARTH_RADIUS);
        nearLabels.push(label);
        label.UpdateScale(0);
    }
    CreateNearLabel(textConfigs[0].text, textConfigs[0].long, textConfigs[0].lati, { size: 2, depth: 1.5, letterSpacing: .5 });
    CreateNearLabel(textConfigs[1].text, textConfigs[1].long, textConfigs[1].lati, { size: 2, depth: 1.5, letterSpacing: .5 });
    CreateNearLabel(textConfigs[2].text, textConfigs[2].long, textConfigs[2].lati, { size: 2, depth: 1.5, letterSpacing: .5 });

});

camera.position.set(120, 50, 120);
controls.update();

function GoToPOI(poiPos)
{
    v3.copy(poiPos);
    v3.normalize().multiplyScalar(camera.position.length());
    console.log(v3);
    //camera.position.copy(v3);
    controls.update();
    controls.enabled = false;
    gsap.to(camera.position, { duration: .5, x: v3.x, y: v3.y, z: v3.z, onComplete: () => { controls.enabled = true; }})
}

// zoomAmount = 0;
// const ZOOM_THREASHOULD = 500;
let canZoom = true;
function OnZoom(event)
{
    UpdateZoomLayer(- Math.sign(event.deltaY));
}

//const farToNearThreshold = .3;
//let farEnalbed = true;
const ANGLE_TO_CONTENT_THRESHOLD = 20 * deg2Rad;
let zoomLayer = 0 // 0: title, 1: far(Main Page), 2: near(Content)

const CAMERA_ZOOM_DISTANCE = [175, 125, 85];
function UpdateZoomLayer(change) // +1: zoom in, -1: zoom out
{
    const newLayer = Utility.Clamp(zoomLayer + change, 0, 2);
    if (!canZoom || newLayer == zoomLayer)
    { return }

    const tweenObj = { 
        currentLayer: zoomLayer,
        zoomDistance: camera.position.length(), 
        cameraPosX: camera.position.x, // these are used for content tweening
        cameraPosY: camera.position.y,
        cameraPosZ: camera.position.z,
        titleScale: zoomLayer == 0 ? 1 : 0,
        farScale: zoomLayer == 1 ? 1 : 0,
        nearScale: zoomLayer == 2 ? 1 : 0
    };
    if (newLayer == 2)
    {
        if (aboutUsCamreaPos.angleTo(camera.position) >= ANGLE_TO_CONTENT_THRESHOLD)
        {
            return false;
        }
    }
    canZoom = false;
    controls.enabled = false;

    gsap.to(tweenObj, { 
        duration: 1, 
        ease: "sine.out",
        zoomDistance: CAMERA_ZOOM_DISTANCE[newLayer], 
        cameraPosX: aboutUsCamreaPos.x, // these are used for content tweening
        cameraPosY: aboutUsCamreaPos.y,
        cameraPosZ: aboutUsCamreaPos.z,
        titleScale: newLayer == 0 ? 1 : 0,
        farScale: newLayer == 1 ? 1 : 0,
        nearScale: newLayer == 2 ? 1 : 0,
        
        onUpdate: function() {
            if (tweenObj.currentLayer == zoomLayer)
            { return; }                
    
            if (zoomLayer != 2)
            {
                camera.position.normalize();
                camera.position.multiplyScalar(tweenObj.zoomDistance);
            }
            else
            { camera.position.set(tweenObj.cameraPosX, tweenObj.cameraPosY, tweenObj.cameraPosZ); }
            
            title.UpdateScale(tweenObj.titleScale);
            for (let i = 0; i < farLabels.length; i++)
            { farLabels[i].UpdateScale(tweenObj.farScale); }
            for (let i = 0; i < nearLabels.length; i++)
            { nearLabels[i].UpdateScale(tweenObj.nearScale); }

            for (let i = 0; i < clouds.children.length; i++)
            {
                clouds.children[i].scale.set(tweenObj.titleScale, tweenObj.titleScale, tweenObj.titleScale);
            }
            
            for (let i = 0; i < farDetailPrams.count; i++)
            {
                farDetails.children[i].scale.y = tweenObj.farScale + tweenObj.titleScale;
            }
            for (let i = 0; i < nearDetailPrams.count; i++)
            {
                nearDetails.children[i].scale.y = tweenObj.nearScale;
            }

            if (zoomLayer != 2)
            {
                aboutUs.material = earthMaterial;
            }
            earthMaterial.color.lerpColors(FAR_EARTH_COLOR, NEAR_EARTH_COLOR, tweenObj.nearScale);
    }, onComplete: function(){
        canZoom = true;
        controls.enabled = true;
        if (zoomLayer == 2)
        {
            aboutUs.material = aboutUsMaterial;
        }
    }});
        
    zoomLayer = newLayer;

    return true;
}
UpdateZoomLayer(0);

let cameraRotationMatrix = new three.Matrix4();
let prevTime = 0;
let frame = 0;
function Update(time) // time in miliseconds
{  
    console.log(`Frame`);
    frame += 1;
    
    const deltaTime = time - prevTime;
    prevTime = time;

    cameraRotationMatrix = camera.matrix.extractRotation(cameraRotationMatrix);
    directionalLight.position.copy(lightPosFormCamea)
    directionalLight.position.applyMatrix4(cameraRotationMatrix);

    //const dist = camera.position.length();
    //const zoomFactor = (dist - controls.minDistance) / (controls.maxDistance - controls.minDistance);
    
    if (zoomLayer == 2)
    {
        controls.minPolarAngle = 46 * deg2Rad; // polar angle limits start at north poles
        controls.maxPolarAngle = 50 * deg2Rad;
        controls.minAzimuthAngle = -15 * deg2Rad; // Azimuth angles limites starts at the +z axis
        controls.maxAzimuthAngle = -5 * deg2Rad;
        if (!mouseDown)
        {
            camera.position.lerp(aboutUsCamreaPos, deltaTime * .001);
        }
    }
    else 
    { 
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI;
        controls.minAzimuthAngle = -Infinity;
        controls.maxAzimuthAngle = Infinity;
    }
    if (zoomLayer == 0)
    {
        title.root.setRotationFromMatrix(Utility.RotationMatrixFromLookVector({ x: -camera.position.x, y: camera.position.y * -.5, z: -camera.position.z}))
        title.root.position.copy(Utility.GetSphericalPosition(-controls.getAzimuthalAngle() + Math.PI * .5, -(controls.getPolarAngle() - Math.PI * .5) * .5 + Math.PI * .5, 90));
    }

    controls.update();
    renderer.render(scene, camera);
}

const cursor = { x: 0, y: 0 };
function OnMouseMove(event)
{
    cursor.x = event.clientX / window.innerWidth * 2 - 1;
    cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function OnClick(event)
{
    raycaster.setFromCamera(cursor, camera);    
}

function OnWindowResize(event)
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', OnWindowResize);

const figures = {
    fingureX_1: 0,
    fingureY_1: 0,
    fingureX_2: 0,
    fingureY_2: 0
};
function OnTouchMove(event)
{
    const touches = event.touches;
    if (touches.length > 1)
    {
        if (figures.fingureX_1 != -1)
        {
            const prevDist = Math.sqrt(Math.pow(Math.abs(figures.fingureX_1 - figures.fingureX_2), 2) + Math.pow(Math.abs(figures.fingureY_1 - figures.fingureY_2), 2));
            const curentDist = Math.sqrt(Math.pow(Math.abs(touches[0].clientX - touches[1].clientX), 2) + Math.pow(Math.abs(touches[0].clientY - touches[1].clientY), 2));

            if (Math.abs(prevDist - curentDist) > 1)
            {
                UpdateZoomLayer(-Math.sign(prevDist - curentDist))
            }
        }

        figures.fingureX_1 = touches[0].clientX;
        figures.fingureY_1 = touches[0].clientY;
        figures.fingureX_2 = touches[1].clientX;
        figures.fingureY_2 = touches[1].clientY;
    }
}

function OnTouchEnd(event)
{
    figures.fingureX_1 = -1;
    figures.fingureY_1 = -1;
    figures.fingureX_2 = -1;
    figures.fingureY_2 = -1;
}