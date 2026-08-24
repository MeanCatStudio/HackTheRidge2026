import * as three from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { HDRLoader } from "three/examples/jsm/Addons.js";

export default class Assets
{
    static #assets = {};
    static #loadingManager = three.LoadingManager;
    static #textureLoader = three.TextureLoader;
    static #gltfLoader = GLTFLoader;
    static #fontLoader = FontLoader;
    static #hdrLoader = HDRLoader;

    static Init(onLoadedCallback)
    {
        this.#loadingManager = new three.LoadingManager();
        this.#textureLoader = new three.TextureLoader(this.#loadingManager);
        const dracoLoader = new DRACOLoader(this.#loadingManager);
        this.#gltfLoader = new GLTFLoader(this.#loadingManager);
        this.#fontLoader = new FontLoader(this.#loadingManager);
        this.#gltfLoader.setDRACOLoader(dracoLoader);
        this.#hdrLoader = new HDRLoader(this.#loadingManager);
        this.#loadingManager.onError = (url) => { console.error(`Loading error: ${url}`); }
        this.#loadingManager.onLoad = onLoadedCallback;
        //console.log('new assets');
    }  

    static Load({ name = '', type = '', path = '' }) // { name: item, type: stuff, path: ./item/stuff }
    {
        console.assert(Assets.#assets[name] == null, 'Duplicate names exsites in Assets!');
        switch(type)
        {
            case 'texture': 
                Assets.#textureLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    file.colorSpace = three.SRGBColorSpace;
                    file.flipY = false;
                    Assets.#assets[name] = file;
                });
                break;
            case 'dataTexture':
                Assets.#textureLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    file.colorSpace = three.NoColorSpace;
                    Assets.#assets[name] = file;
                });
                break;
            case 'model':
                Assets.#gltfLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    Assets.#assets[name] = file;
                });
                break;
            case 'font':
                Assets.#fontLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    Assets.#assets[name] = file;
                });
                break;
            case 'enviroment':
                Assets.#hdrLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    file.mapping = three.EquirectangularRefractionMapping;
                    Assets.#assets[name] = file;
                });
                break;
            default:
                throw new Error("Invalid type for loading!");
        }
    }
    
    static LoadList(list = [])
    {
        list.forEach(item => {
            Assets.Load(item);
        });
    }

    static GetAsset(name = '')
    {
        const asset = Assets.#assets[name];
        console.assert(asset, `Unable to find requested asset! Name: ${name}`);
        return asset;
    }
};


