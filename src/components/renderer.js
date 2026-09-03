import * as three from "three";
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { RenderPass } from "three/examples/jsm/Addons.js";
import { SMAAPass } from "three/examples/jsm/Addons.js";
import { GammaCorrectionShader } from "three/examples/jsm/Addons.js";
import { ShaderPass } from "three/examples/jsm/Addons.js";

export default class Renderer
{
    static renderer = new three.WebGLRenderer();
    static effects = new EffectComposer(Renderer.renderer);

    static Init(scene, camera)
    {
        const renderer = Renderer.renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = three.PCFShadowMap;
        document.body.appendChild(renderer.domElement);
        renderer.toneMapping = three.CineonToneMapping;
        renderer.outputColorSpace = three.SRGBColorSpace;

        const effects = Renderer.effects;     
        effects.setPixelRatio(renderer.getPixelRatio());
        effects.setSize(window.innerWidth, window.innerHeight);
        effects.addPass(new RenderPass(scene, camera));
        effects.addPass(new ShaderPass(GammaCorrectionShader));
        effects.addPass(new SMAAPass());

        effects.passes[2].enabled = renderer.getPixelRatio() <= 1; // disable antialising for high pixel ratio devices

        window.addEventListener('resize', Renderer.OnWindowResize);
    }

    static Render()
    { Renderer.effects.render(); }

    static OnWindowResize(event)
    {
        const renderer = Renderer.renderer;
        const effects = Renderer.effects;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        effects.setPixelRatio(renderer.getPixelRatio());
        effects.setSize(window.innerWidth, window.innerHeight);
        effects.passes[2].enabled = renderer.getPixelRatio() <= 1; // disable antialising for high pixel ratio devices
    }
}