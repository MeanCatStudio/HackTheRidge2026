import * as three from "three";

export default class Utility
{
    static scene;

    // debug consts
    static debugSphereGeometry = new three.SphereGeometry(1, 4, 4);
    static debugMaterialRed =  new three.MeshBasicMaterial({ color : 0xff0000, wireframe: true });
    static debugMaterialGreen =  new three.MeshBasicMaterial({ color : 0x00ff00, wireframe: true });
    static debugMaterialBlue =  new three.MeshBasicMaterial({ color : 0x0000ff, wireframe: true });

    static right = new three.Vector3(1, 0, 0);
    static up = new three.Vector3(0, 1, 0);
    static backwards = new three.Vector3(0, 0, 1);

    static GetSphericalPosition(long, lati, distance) // angles in rands
    {
        const x = distance * Math.cos(long) * Math.cos(lati);
        const y = distance * Math.sin(lati);
        const z = distance * Math.sin(long) * Math.cos(lati);
        return { x: x, y: y, z: z };
    }

    static #matrix = new three.Matrix4();
    static #matrixRight = new three.Vector3();
    static #matrixUp = new three.Vector3();
    static #forwards = new three.Vector3();
    static #matrixBack = new three.Vector3();
    static RotationMatrixFromLookVector(forwards)
    {
        this.#forwards.copy(forwards);
        this.#forwards.normalize();
        this.#matrixRight.copy(this.#forwards);
        this.#matrixRight.cross(this.up); // right vector
        this.#matrixRight.normalize();
        this.#matrixUp.copy(this.#matrixRight);
        this.#matrixUp.cross(this.#forwards); // up vector
        this.#matrixBack.copy(this.#forwards.negate());

        this.#matrix.set(
            this.#matrixRight.x, this.#matrixUp.x, this.#matrixBack.x, 0,
            this.#matrixRight.y, this.#matrixUp.y, this.#matrixBack.y, 0,
            this.#matrixRight.z, this.#matrixUp.z, this.#matrixBack.z, 0,
            0, 0, 0, 1
        );

        return this.#matrix;
    }

    static RotationMatrixFromDownVector(down)
    {
        down.normalize();
        this.#matrixUp.copy(down);
        this.#matrixUp.negate();
        this.#matrixBack.copy(this.#matrixUp);
        this.#matrixBack.cross(this.right);
        this.#matrixBack.normalize();
        this.#matrixRight.copy(this.#matrixBack);
        this.#matrixRight.cross(this.#matrixUp);        

        /*const arrowLen = 5;
        const rightArrow = new three.ArrowHelper(this.#matrixRight, pos, arrowLen, 0xff0000);
        this.scene.add(rightArrow);
        const upArrow = new three.ArrowHelper(this.#matrixUp, pos, arrowLen, 0x00ff00);
        this.scene.add(upArrow);
        const backArrow = new three.ArrowHelper(this.#matrixBack, pos, arrowLen, 0x0000ff);
        this.scene.add(backArrow);*/

        this.#matrix.set(
            this.#matrixRight.x, this.#matrixUp.x, this.#matrixBack.x, 0,
            this.#matrixRight.y, this.#matrixUp.y, this.#matrixBack.y, 0,
            this.#matrixRight.z, this.#matrixUp.z, this.#matrixBack.z, 0,
            0, 0, 0, 1
        );

        return this.#matrix;
    }

    static Clamp(num, min, max) { return Math.min(Math.max(num, min), max); }

    static IsMoble() { return window.innerHeight / window.innerWidth > 1; }
}