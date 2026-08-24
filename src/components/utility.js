import * as three from "three";
import { AnaglyphEffect } from "three/examples/jsm/Addons.js";

//import World from "./world";

export default class Utility
{
    // debug consts
    static debugSphereGeometry = new three.SphereGeometry(1, 4, 4);
    //static debugMaterialRed =  new three.MeshBasicMaterial({ color : 0xff0000, wireframe: true });
    //static debugMaterialGreen =  new three.MeshBasicMaterial({ color : 0x00ff00, wireframe: true });
    //static debugMaterialBlue =  new three.MeshBasicMaterial({ color : 0x0000ff, wireframe: true });

    static CreateDebugSphere(scene, pos, color = 0xffffff)
    {
        const sphere = new three.Mesh(this.debugSphereGeometry, new three.MeshBasicMaterial({ color: color, wireframe: true }));
        scene.add(sphere);
        sphere.position.copy(pos);
        return sphere;
    }

    // math consts
    static deg2Rad = Math.PI / 180;

    static right = new three.Vector3(1, 0, 0);
    static up = new three.Vector3(0, 1, 0);
    static backwards = new three.Vector3(0, 0, 1);
    static zero = new three.Vector3(0, 0, 0);

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

    static RotationMatrixFromDownVector(down)//, scene = null, pos = null)
    {
        this.#matrixUp.copy(down);
        this.#matrixUp.normalize();
        this.#matrixUp.negate();
        this.#matrixBack.copy(this.#matrixUp);
        this.#matrixBack.cross(this.right);
        this.#matrixBack.normalize();
        this.#matrixRight.copy(this.#matrixBack);
        this.#matrixRight.cross(this.#matrixUp);      
        this.#matrixRight.normalize();  

        /*if (scene && pos)
        {
            const arrowLen = 5;
            const rightArrow = new three.ArrowHelper(this.#matrixRight, pos, arrowLen, 0xff0000);
            scene.add(rightArrow);
            const upArrow = new three.ArrowHelper(this.#matrixUp, pos, arrowLen, 0x00ff00);
            scene.add(upArrow);
            const backArrow = new three.ArrowHelper(this.#matrixBack, pos, arrowLen, 0x0000ff);
            scene.add(backArrow);
        }*/

        this.#matrixBack.negate();
        this.#matrix.makeBasis(this.#matrixRight, this.#matrixUp, this.#matrixBack);

        return this.#matrix;
    }

    static Clamp(num, min, max) { return Math.min(Math.max(num, min), max); }

    static IsMoble() { return window.innerHeight / window.innerWidth > 1; }

    static AzimuthalToLong(angle)
    {
        return -angle + Math.PI * 0.5;
    }

    static PolarToLati(angle)
    {
        return -(angle - Math.PI * 0.5)
    }

    static PositionObjWithCamera({ controls, obj, dist = 90, longRemap = (angle) => { return angle; }, laitRemap = (angle) => { return angle; } })
    {
        const long = longRemap(Utility.AzimuthalToLong(controls.getAzimuthalAngle()));
        const lati = laitRemap(Utility.PolarToLati(controls.getPolarAngle()))
        obj.position.copy(Utility.GetSphericalPosition(long, lati, dist));
    }

    // three.js textures only expose their pixels to the GPU; to read them on the CPU
    // we draw the source image into an offscreen canvas once and cache the resulting
    // ImageData per-texture (keyed by the texture object itself).
    static #textureImageDataCache = new WeakMap();

    static GetTextureImageData(texture)
    {
        if (Utility.#textureImageDataCache.has(texture)) return Utility.#textureImageDataCache.get(texture);

        const image = texture.image;
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        Utility.#textureImageDataCache.set(texture, imageData);
        return imageData;
    }

    // Reads a single texel by integer pixel coordinates (0,0 = top-left of the source image).
    // Returns [r, g, b, a] with each channel in [0, 255].
    static SampleTexturePixel(texture, x, y)
    {
        const imageData = Utility.GetTextureImageData(texture);
        const px = Utility.Clamp(Math.floor(x), 0, imageData.width - 1);
        const py = Utility.Clamp(Math.floor(y), 0, imageData.height - 1);
        const index = (py * imageData.width + px) * 4;
        return imageData.data.subarray(index, index + 4);
    }

    // Reads a single texel by UV coordinates in [0, 1], following three.js's UV convention
    // (v = 0 is the bottom of the texture) so it matches how the same texture would sample on the GPU.
    static SampleTextureUV(texture, u, v)
    {
        const imageData = Utility.GetTextureImageData(texture);
        const flippedV = texture.flipY ? 1 - v : v;
        return Utility.SampleTexturePixel(texture, u * imageData.width, flippedV * imageData.height);
    }

    // Bridson's algorithm. Returns points as { x, y } in [0, width) x [0, height).
    static GeneratePoissonDiskPoints(radius, width = 1, height = 1, k = 30)
    {
        const cellSize = radius / Math.SQRT2;
        const gridWidth = Math.ceil(width / cellSize);
        const gridHeight = Math.ceil(height / cellSize);
        const grid = new Array(gridWidth * gridHeight).fill(-1);

        const points = [];
        const active = [];

        const gridIndexOf = (x, y) =>
        {
            const gx = Utility.Clamp(Math.floor(x / cellSize), 0, gridWidth - 1);
            const gy = Utility.Clamp(Math.floor(y / cellSize), 0, gridHeight - 1);
            return gy * gridWidth + gx;
        };

        const isFarEnough = (x, y) =>
        {
            const gx = Math.floor(x / cellSize);
            const gy = Math.floor(y / cellSize);

            const minGx = Math.max(gx - 2, 0);
            const maxGx = Math.min(gx + 2, gridWidth - 1);
            const minGy = Math.max(gy - 2, 0);
            const maxGy = Math.min(gy + 2, gridHeight - 1);

            for (let ny = minGy; ny <= maxGy; ny++)
            {
                for (let nx = minGx; nx <= maxGx; nx++)
                {
                    const pointIndex = grid[ny * gridWidth + nx];
                    if (pointIndex === -1) continue;

                    const neighbor = points[pointIndex];
                    const dx = neighbor.x - x;
                    const dy = neighbor.y - y;
                    if (dx * dx + dy * dy < radius * radius) return false;
                }
            }

            return true;
        };

        const addPoint = (x, y) =>
        {
            const point = { x: x, y: y };
            points.push(point);
            active.push(point);
            grid[gridIndexOf(x, y)] = points.length - 1;
        };

        addPoint(Math.random() * width, Math.random() * height);

        while (active.length > 0)
        {
            const activeIndex = Math.floor(Math.random() * active.length);
            const origin = active[activeIndex];
            let found = false;

            for (let i = 0; i < k; i++)
            {
                const angle = Math.random() * Math.PI * 2;
                const dist = radius * (1 + Math.random());
                const x = origin.x + Math.cos(angle) * dist;
                const y = origin.y + Math.sin(angle) * dist;

                if (x < 0 || x >= width || y < 0 || y >= height) continue;
                if (!isFarEnough(x, y)) continue;

                addPoint(x, y);
                found = true;
                break;
            }

            if (!found) active.splice(activeIndex, 1);
        }

        return points;
    }
}