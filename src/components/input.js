import * as three from "three";

import Zoom from "./zoom";

export default class Input
{
    static cursor = { x: 0, y: 0 };
    static mouseDown = false;

    static Init()
    {
        window.addEventListener('mousemove', Input.OnMouseMove);
        window.addEventListener('wheel', Zoom.OnScroll);
        //window.addEventListener('touchmove', OnTouchMove);
        //window.addEventListener('touchend', OnTouchEnd);
        window.addEventListener('pointerdown', () => { Input.mouseDown = true; });
        window.addEventListener('pointerup', () => { Input.mouseDown = false; });
        window.addEventListener('pointercancel', () => { Input.mouseDown = false; });
    }
    
    static OnMouseMove(event)
    {
        Input.cursor.x = event.clientX / window.innerWidth * 2 - 1;
        Input.cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
}