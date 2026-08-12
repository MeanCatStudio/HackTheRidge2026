import * as three from "three";

import Utility from "./utility";

const UnitsPerPixel = 1 / 50;
const SubdevisionPerUnit = 1 / 5;
export default class Billboard
{
    mesh;// = new three.BufferGeometry();
    #image;
    #dimensions = {width: 0, height: 0}; 

    constructor(image, scale = 1)
    {
        this.#image = image;
        this.#dimensions.width = image.width * UnitsPerPixel * scale;
        this.#dimensions.height = image.height * UnitsPerPixel * scale;
        const geometry = new three.PlaneGeometry(this.#dimensions.width, this.#dimensions.height, this.#dimensions.width * SubdevisionPerUnit, this.#dimensions.height * SubdevisionPerUnit);
        const material = new three.MeshPhongMaterial({ map: image });
        this.mesh = new three.Mesh(geometry, material);

        material.vertexColors = true;
        const totalVertices = geometry.attributes.position.array.length / 3;
        console.log(totalVertices);
        for (let i = 0; i < totalVertices; i++)
        {

        }
    }
}