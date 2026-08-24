import * as three from "three";

import Zoom from "./zoom";
import Utility from "./utility";

export default class Input
{
    static #dblClickTime = .2;
    static #pixelsPerSmSwip = 10000;
    static cursor = { x: 0, y: 0 };
    static #prevCursor = { x: -1, y: -1 };
    static #prevCursorTime = 0;
    static mouseDown = false;
    static #onClickListener = [];
    static #lastClickTime = null;
    static #cursorDif = new three.Vector2();
    static #clock = new three.Clock();

    static Init()
    {
        const clock = Input.#clock;
        //window.addEventListener('dblclick',() => {Zoom.UpdateZoomLayer(1);});
        window.addEventListener('pointerdown', (event) => {
            if (Input.#lastClickTime != null && clock.getElapsedTime() - Input.#lastClickTime < Input.#dblClickTime)
            { Zoom.OnDoubleClick(); }
            Input.#lastClickTime = clock.getElapsedTime();
        });
        window.addEventListener('wheel', Zoom.OnScroll);
        window.addEventListener('pointerdown', (event) => {
            Input.#onClickListener.forEach(listener => {
                listener(event)
            });
            Input.mouseDown = true;
        });
        window.addEventListener('mousemove', Input.OnMouseMove);
        window.addEventListener('pointerup', () => { Input.mouseDown = false; });
        window.addEventListener('pointercancel', () => { Input.mouseDown = false; });
        
        if (Utility.IsMoble())
        {
            window.addEventListener('pointerup', (event) => {
                Input.#prevCursor = { x: -1, y: -1 };
            });
            window.addEventListener('pointermove', (event) => {
                Input.OnMouseMove(event);
           
                if (Input.#prevCursor.y != -1 && Input.mouseDown && Zoom.zoomLayer > 1)
                {
                    Input.#cursorDif.copy(Input.cursor);
                    Input.#cursorDif.sub(Input.#prevCursor);
                    Input.#cursorDif.x *= window.innerWidth;
                    Input.#cursorDif.y *= window.innerHeight;
                    const dist = Input.#cursorDif.length();
                    const deltaDist = dist / (Input.#clock.getElapsedTime() - Input.#prevCursorTime); // pixels per s
                    
                    if (deltaDist > Input.#pixelsPerSmSwip)
                    {
                        Zoom.UpdateZoomLayer(-1);
                    }
                }
                Input.#prevCursor = { ...Input.cursor};   
                Input.#prevCursorTime = Input.#clock.getElapsedTime();
            });
        }
    }

    static OnMouseMove(event)
    {
        Input.cursor.x = event.clientX / window.innerWidth * 2 - 1;
        Input.cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    static AddClickListener(func)
    { Input.#onClickListener.push(func); }
}