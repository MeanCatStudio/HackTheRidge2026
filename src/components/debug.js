import GUI from 'lil-gui';

export default class Debug
{    
    static #gui = new GUI({ width: 400 });

    static GetFoulder(name)
    { 
        return Debug.#gui.addFolder(name).close(); 
    }

    static Toggle()
    { 
        if (Debug.#gui._hidden)
        { Debug.#gui.show(); }
        else
        { Debug.#gui.hide(); }
    }
}