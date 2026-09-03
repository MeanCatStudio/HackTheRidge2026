import * as three from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { HDRLoader } from "three/examples/jsm/Addons.js";

// Eagerly pull every .glsl under src/shaders/ as a processed string (vite-plugin-glsl
// still runs here, so #include directives are resolved). Keys look like
// '../shaders/water/vertex.glsl'. The glob arg must be a static literal, so we grab
// everything once and filter by folder at runtime in the 'shader' case below.
const SHADER_SOURCES = import.meta.glob('../shaders/**/*.glsl', {
    eager: true,
    import: 'default',
});

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
       
        const loadingBar = document.querySelector('.loading-bar');
        this.#loadingManager.onLoad = () => {
            onLoadedCallback();
            const teewnObj = { progress: 1 };
            gsap.to(teewnObj, { delay: 0.5, duration: 1, progress: 0, onUpdate: () => {
                loadingBar.style.transform = `scaleX(${teewnObj.progress})`;
            }});
        };
        this.#loadingManager.onProgress = (itemURL, loaded, total) => {
            const progress = loaded / total;
            loadingBar.style.transform = `scaleX(${progress})`;
        };
        //console.log('new assets');
    }  

    static Load({ name = '', type = '', path = '' }) // { name: item, type: stuff, path: ./item/stuff }
    {
        console.assert(Assets.#assets[name] == null, 'Duplicate names exsites in Assets!');
        switch(type)
        {
            case 'texture': {
                Assets.#textureLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    file.colorSpace = three.SRGBColorSpace;
                    file.flipY = false;
                    Assets.#assets[name] = file;
                });
                break;
            }
            case 'dataTexture':{
                Assets.#textureLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    file.colorSpace = three.NoColorSpace;
                    Assets.#assets[name] = file;
                });
                break;
            }
            case 'model': {
                Assets.#gltfLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    Assets.#assets[name] = file;
                });
                break;
            }
            case 'font': {
                Assets.#fontLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    Assets.#assets[name] = file;
                });
                break;
            }
            case 'enviroment': {
                Assets.#hdrLoader.load(`${import.meta.env.BASE_URL}${path}`, (file) => {
                    file.mapping = three.EquirectangularRefractionMapping;
                    Assets.#assets[name] = file;
                });
                break;
            }
            case 'shader': {
                // path points at a folder, e.g. 'shaders/water', 'src/shaders/water'
                // or '../shaders/water' — normalize to the segment after 'shaders/'.
                const folder = path.replace(/^.*shaders\//, '').replace(/\/+$/, '');
                const bundle = {};
                for (const [key, source] of Object.entries(SHADER_SOURCES))
                {
                    const rel = key.replace('../shaders/', '');
                    const dir = rel.slice(0, rel.lastIndexOf('/'));
                    if (dir !== folder) continue;
                    const stem = rel.slice(rel.lastIndexOf('/') + 1).replace(/\.glsl$/, '');
                    bundle[stem] = source;
                }
                console.assert(Object.keys(bundle).length > 0, `No .glsl files found for shader path: ${path}`);
                Assets.#assets[name] = bundle;
                break;
            }
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


