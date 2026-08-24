import * as three from "three";

import Assets from "../assets";
import Label from "./label";
import Zoom from "../zoom";
import Utility from "../utility";
import Camera from "../camera";
import Lights from "../lights";
import Debug from "../debug";

import waterIncludesShader from '../../shaders/water/includes.glsl'
import waterVertexShader from '../../shaders/water/vertex.glsl';
import atmosphereVertexShader from '../../shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from '../../shaders/atmosphere/fragment.glsl';

export default class Earth
{
    static EARTH_RADIUS = 64;
    static MODEL_SCALE = 62;
    static farEarthColor = new three.Color(0x67E735);
    static nearEarthColor =  new three.Color(0x4ba927);
    #earth = null;
    #earthMaterial = null;
    #waterUniforms = null;
    #title = null;
    #clouds = null;
    #atmosphereUniforms = null;

    constructor(scene)
    {
        const earth = Assets.GetAsset('earth').scene;
        scene.add(earth); // adds the land and water
        earth.scale.multiplyScalar(Earth.MODEL_SCALE); // approximately 64 unit radius
        
        const water = earth.children[0]; // water
        const landSuface = earth.children[1].children[0]; // flat land, this should clip out the water
        const landBellow = earth.children[1].children[1]; // land under water
        landSuface.receiveShadow = true;
        landBellow.receiveShadow = true;

        const surfaceMaterial = landSuface.material;
        const bellowMaterial = landBellow.material;
        surfaceMaterial.roughness = 1; 
        surfaceMaterial.metalness = 0;
        bellowMaterial.copy(surfaceMaterial);
        
        
        water.geometry.dispose();
        water.geometry = new three.IcosahedronGeometry(1, 6);
        const newMaterial = new three.MeshStandardMaterial();
        newMaterial.copy(water.material);
        water.material.dispose();
        water.material = newMaterial;
        water.receiveShadow = true;

        water.material.roughness = 0.2; // water material reads from stencil buffer and stops drawing if surface exites
        water.material.metalness = .3;
        water.material.flatShading = true;

        const waterCustomUniforms = {
            uTime: { value: 0.0 }
        };
        water.material.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = waterCustomUniforms.uTime;
            shader.vertexShader = shader.vertexShader.replace('#include <common>', waterIncludesShader);
            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', waterVertexShader);
            this.#waterUniforms = shader.uniforms;
        }; // add custom shader to water material

        /*Earth.SeperateLandMaterials(surfaceMaterial, bellowMaterial);

        surfaceMaterial.renderOrder = 1;
        //bellowMaterial.renderOrder = 2;


        water.material.stencilWrite = true;
        water.material.stencilRef = 1;
        water.material.stencilFunc = three.NotEqualStencilFunc;
        water.position.set(0, 0, 0);

        water.renderOrder = 2;*/

        const atmosphereGUI = Debug.GetFoulder("atmosphere_material");
        const atmosphereConfig = {
            dayColor: 0x88bbff,
            nightColor: 0x061a41
        };
        const atmosphere = new three.Mesh(
            new three.IcosahedronGeometry(1.15, 3),
            new three.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                uniforms: {
                    uLightPosition: new three.Uniform(new three.Vector3()),
                    uDayColor: new three.Uniform(new three.Color(atmosphereConfig.dayColor)),
                    uNightColor: new three.Uniform(new three.Color(atmosphereConfig.nightColor))
                },
                side: three.BackSide,
                transparent: true
            })
        );
        atmosphereGUI.addColor(atmosphereConfig, 'dayColor').onChange(() => {
            atmosphere.material.uniforms.uDayColor.value.setHex(atmosphereConfig.dayColor);
        });
        atmosphereGUI.addColor(atmosphereConfig, 'nightColor').onChange(() => {
            atmosphere.material.uniforms.uNightColor.value.setHex(atmosphereConfig.nightColor);
        });

        earth.add(atmosphere);
        this.#atmosphereUniforms = atmosphere.material.uniforms;

        const nearProps = this.#CreateProps(scene).children;
        
        const title = new Label("Hack The Earth!", { size: 15, depth: 5, letterSpacing: 5, disableShadow: true });
        title.PositionTextTop(45 * Utility.deg2Rad, 90);
        scene.add(title.root);

        const clouds = Assets.GetAsset('clouds').scene;
        scene.add(clouds);
        clouds.scale.multiplyScalar(Earth.MODEL_SCALE);
        clouds.rotateY(Math.PI * .8);
        for (let i = 0; i < clouds.children.length; i++)
        {
            clouds.children[i].castShadow = true;
        }

        Zoom.AddZoomListener((tweenObj) => {
            title.UpdateScale(tweenObj.titleScale);

            for (let i = 0; i < clouds.children.length; i++)
            {
                clouds.children[i].scale.set(tweenObj.titleScale, tweenObj.titleScale, tweenObj.titleScale);
            }

            const propScale = 1 - tweenObj.nearScale;
            nearProps.forEach(prop => {
                prop.scale.set(propScale, propScale, propScale);
            });
            
            surfaceMaterial.color.lerpColors(Earth.farEarthColor, Earth.nearEarthColor, tweenObj.nearScale)
        });

        this.#earth = earth;
        this.#earthMaterial = surfaceMaterial;
        this.#waterUniforms = waterCustomUniforms;
        this.#title = title;
        this.#clouds = clouds;
    }

    static SeperateLandMaterials(surface, bellow) // assignes materials land inorder to write or no write to stencil and clip out water
    {        
        //bellow.copy(surface);

        surface.stencilWrite = true; // suface material writes to the stencil buffer
        surface.stencilRef = 1;
        surface.stencilFunc = three.AlwaysStencilFunc;
        surface.stencilZPass = three.ReplaceStencilOp;
        surface.stencilZFail = three.ReplaceStencilOp;
        surface.side = three.FrontSide;

        bellow.colorWrite = true;
        //bellow.stencilWrite = false;
        //bellow.stencilRef = 1;
        //bellow.stencilFunc = three.AlwaysStencilFunc;
        //bellow.stencilZPass = three.ZeroStencilOp;
        //bellow.stencilFail = three.ZeroStencilOp;
        //bellow.stencilZFail = three.ZeroStencilOp;
    }

    #CreateProps(scene)
    {
        const trees = Assets.GetAsset('trees').scene.children;
        const treeScale = 70;
        
        trees.forEach(tree => {
            tree.traverse((obj) => {
                if (obj.isMesh)
                { obj.geometry.scale(treeScale, treeScale, treeScale); }                
            });
            const shadowRef = new three.Mesh(
                new three.ConeGeometry(3, 10, 4).translate(0, 6, 0), 
                new three.MeshBasicMaterial({ 
                    transparent: true,
                    opacity: 0.0
            }));
            shadowRef.castShadow = true;
            tree.add(shadowRef);
        });
        
        const treeDistribution = Assets.GetAsset('treeDistribution');

        const points = Utility.GeneratePoissonDiskPoints(0.04, 2, 1);
        const treesGroup = new three.Group();
        scene.add(treesGroup);
        points.forEach(point => {
            const u =  point.x / 2;
            const v = point.y;
            const [density] = Utility.SampleTextureUV(treeDistribution, u, v); // grayscale map, r channel = tree density
            if (Math.random() * 255 > density) return; // skip trees in low-density regions

            const position = Utility.GetSphericalPosition(-point.x * Math.PI + Math.PI, (point.y - 0.5) * Math.PI, Earth.EARTH_RADIUS + 0.5); // due mismatched texture and spherical coords positions, remapping of u/x is requred

            const tree = trees[Math.ceil(Math.random() * 4)].clone();
            //const tree = new three.Mesh(new three.BoxGeometry(1, 10, 1), new three.MeshBasicMaterial());
            treesGroup.add(tree);
            tree.position.copy(position);
            tree.setRotationFromMatrix(Utility.RotationMatrixFromDownVector({x: -position.x, y: -position.y, z: -position.z}));
            const scale = Math.random() * 0.5 + 0.5;
            tree.traverse((obj) => {
                if (obj.isMesh)
                { obj.scale.set(scale, scale, scale); }                
            });
        });

        return treesGroup;
    }

    Update(deltaTime)
    {
        const title = this.#title;
        const camera = Camera.camera;
        const controls = Camera.controls;

        this.#waterUniforms.uTime.value += deltaTime * 0.001;
        this.#atmosphereUniforms.uLightPosition.value.copy(Lights.directionalLight.position);

        title.root.setRotationFromMatrix(Utility.RotationMatrixFromLookVector({ x: -camera.position.x, y: camera.position.y * -.5, z: -camera.position.z}))
        //title.root.position.copy(Utility.GetSphericalPosition(-controls.getAzimuthalAngle() + Math.PI * .5, -(controls.getPolarAngle() - Math.PI * .5) * .5 + Math.PI * .5, 90));
        Utility.PositionObjWithCamera({ 
            controls: controls, 
            obj: title.root, 
            laitRemap: (angle) => {
            return angle * 0.5 + Math.PI * 0.5;
        } });

        this.#clouds.rotation.y += deltaTime * .0001;
    }
};
