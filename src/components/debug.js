import GUI from 'lil-gui';
import Stats from 'stats.js';

export default class Debug
{    
    static #gui = new GUI({ width: 400 });
    static #stats = new Stats();

    static Init()
    {
        Debug.#stats.showPanel(0);
        document.body.appendChild(Debug.#stats.dom);
    }

    static GetFoulder(name)
    { 
        return Debug.#gui.addFolder(name).close(); 
    }

    static Toggle()
    { 
        if (Debug.#gui._hidden)
        { 
            Debug.#gui.show(); 
            Debug.#stats.dom.style.display = 'block';
        }
        else
        { 
            Debug.#gui.hide(); 
            Debug.#stats.dom.style.display = 'none';
        }
    }

    static UpdateStart = Debug.#stats.begin;
    static UpdateEnd = Debug.#stats.end;
}