import * as three from "three";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

import Utility from "../utility";
import Camera from "../camera";

export default class Button // Unused for now
{
    static #buttonMaterial = new three.MeshStandardMaterial({ color: 0xffffff });
    static #geometries = {};
    #onClick = [];
    #mesh = null;

    static Init()
    {
        const xGeometry = BufferGeometryUtils.mergeGeometries([new three.BoxGeometry(.5, 2, 3), new three.BoxGeometry(3, 2, .5)], false);
        xGeometry.rotateY(Math.PI * .25);
        Button.#geometries['x'] = xGeometry;
    }

    constructor(scene, { long = 0, lait: lati = 0, geometry = '', dist = 64 })
    {
        const mesh = new three.Mesh(Button.#geometries[geometry], Button.#buttonMaterial)
        scene.add(mesh);
        mesh.position.copy(Utility.GetSphericalPosition(long, lati, dist));
        mesh.setRotationFromMatrix(Utility.RotationMatrixFromLookVector(mesh.position));
        mesh.rotateX(Math.PI * -.5);

        Camera.AddRaycastListener(mesh, () => {}, () => {
            this.#onClick.forEach(listener => {
                listener();
            });
        })

        this.#mesh = mesh;
    }

    UpdateScale(scale)
    {
        this.#mesh.scale.set(1, scale, 1);
    }

    AddClickListener(func)
    {
        this.#onClick.push(func);
    }
}