import * as three from "three";
import gsap from "gsap";

import Utility from "./utility";

export default class Zoom
{
    static zoomLayer = 0;
    static #canZoom = true;
    static #startListeners = [];
    static #zoomListeners = [];
    static #endListeners = [];
    static #zoomConditions = [];
    
    static AddZoomListener(func)
    {
        Zoom.#zoomListeners.push(func);
    }

    static AddZoomStartListener(func)
    {
        Zoom.#startListeners.push(func);
    }

    static AddZoomEndListener(func)
    {
        Zoom.#endListeners.push(func);
    }

    static AddZoomCondition(func)
    {
        Zoom.#zoomConditions.push(func);
    }

    static UpdateZoomLayer(change) // +1: zoom in, -1: zoom out
    {
        const newLayer = Utility.Clamp(Zoom.zoomLayer + change, 0, 2);
        if (!Zoom.#canZoom || newLayer == Zoom.zoomLayer)
        { return }

        const tweenObj = { 
            currentLayer: Zoom.zoomLayer,
            newLayer: newLayer,
            titleScale: Zoom.zoomLayer == 0 ? 1 : 0,
            farScale: Zoom.zoomLayer == 1 ? 1 : 0,
            nearScale: Zoom.zoomLayer == 2 ? 1 : 0,
            progress: 0
        };
        
        for (let i = 0; i < Zoom.#zoomConditions.length; i++)
        {
            if (!Zoom.#zoomConditions[i](tweenObj))
            { return; }
        }

        Zoom.#canZoom = false;

        Zoom.#startListeners.forEach((listener) => { listener(tweenObj); })
        gsap.to(tweenObj, { 
            duration: 1, 
            ease: "sine.out",
            titleScale: newLayer == 0 ? 1 : 0,
            farScale: newLayer == 1 ? 1 : 0,
            nearScale: newLayer == 2 ? 1 : 0,
            progress: 1,
            
            onUpdate: function() {
                if (tweenObj.currentLayer == Zoom.zoomLayer)
                { return; }              
                
                Zoom.#zoomListeners.forEach((listener) => { listener(tweenObj); })
        
                /*if (zoomLayer != 2)
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

                if (zoomLayer != 2)
                {
                    aboutUs.material = earthMaterial;
                }
                earthMaterial.color.lerpColors(FAR_EARTH_COLOR, NEAR_EARTH_COLOR, tweenObj.nearScale);*/

        }, onComplete: function(){
            Zoom.#canZoom = true;
            Zoom.#endListeners.forEach((listener) => { listener(tweenObj); })
        }});
            
        Zoom.zoomLayer = newLayer;
    }
    
    static OnScroll(event)
    {
        Zoom.UpdateZoomLayer(- Math.sign(event.deltaY));
    }
}