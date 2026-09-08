import * as three from 'three';
import { useEffect, useMemo, useRef } from "react"
import { useControls } from 'leva';
import { col } from 'framer-motion/client';

export default function Lights({ rows = 30, columes = 20, buildingMatrixes })
{
    const configs = useControls('buildingLights', {
        color: { r: 193, g: 179, b: 116 },
        brightness: { value: 1.18, min: 0.5, max: 5 },
        heightThreshould: { value: 0, min: 0, max: 50 },
        lineThicknesMult: { value: 1, min: 0, max: 1 }
    });

    const { matrixs, count } = useMemo(() => {
        const nextMatrixs = [];
        let nextCount = 0;

    const tempMatrix = new three.Matrix4();
    const tempVector = new three.Vector3();
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columes; j++)
        {
            const building = buildingMatrixes[i * columes + j];
            tempVector.setFromMatrixScale(building);
            const height = tempVector.y;
            if (height < configs.heightThreshould)
            { continue; }

            tempVector.setFromMatrixPosition(building);
            const side = tempVector.x > 0 ? 'right' : 'left';
            // if (side == 'right')
            // { continue; }

            switch (Math.ceil(Math.random() * 2))
            {
                case 1: {
                    // vertical stripes
                    
                    function create(parent) 
                    {
                        const stripsCount = 4;//Math.ceil(height * 0.1);
                        const offset = 1 / (1 + stripsCount)
                        for (let i = 0; i < stripsCount; i++)
                        {
                            const matrix = new three.Matrix4();
                            //tempMatrix.makeTranslation(0, 0, -1.01);
                            //matrix.premultiply(tempMatrix);
                            matrix.makeScale(0.5 / stripsCount * configs.lineThicknesMult, 1, 1);
                            matrix.setPosition((i + 1) * offset - 0.5, 0 - 2 / height, 0.51);

                            // tempMatrix.makeScale(0.1, 1, 1);
                            // matrix.multiply(tempMatrix);

                            matrix.premultiply(parent);
                            nextMatrixs.push(matrix);
                            nextCount += 1;
                        }
                    }

                    create(building);
                    tempMatrix.makeRotationY(Math.PI * (side == 'right' ? -0.5 : 0.5));
                    create(tempMatrix.premultiply(building));
                    break;
                }

                case 2: {

                    function create(parent) 
                    {
                        const stripsCount = height;
                        for (let i = 0; i < stripsCount; i++)
                        {
                            const matrix = new three.Matrix4();

                            const length = Math.round(Math.pow(Math.random(), 3) * 5);
                            matrix.makeScale(length * 0.2, 0.5 / height * configs.lineThicknesMult, 1);

                            // tempVector.setFromMatrixPosition(building);
                            // tempVector.z += 2.51;
                            // tempVector.y = height - i - 1;
                            // tempVector.x += length * 0.5 - 2.5 + Math.round(Math.random() * (5 - length));
                            // matrix.setPosition(tempVector);
                            matrix.setPosition((5 - length) * 0.1 - Math.round(Math.random() * (5 - length)) * 0.2, (height - i - 1) / height - 0.5, 0.51);

                            matrix.premultiply(parent);
                            nextMatrixs.push(matrix);
                            nextCount += 1;
                        }
                    }

                    create(building);
                    tempMatrix.makeRotationY(Math.PI * (side == 'right' ? -0.5 : 0.5));
                    create(tempMatrix.premultiply(building));
                }
            }
        }
        }

        return { matrixs: nextMatrixs, count: nextCount };
    }, [rows, columes, buildingMatrixes, configs.heightThreshould, configs.lineThicknesMult]);

    const mesh = useRef();
    useEffect(() => {
        for (let i = 0; i < count; i++)
        {
            mesh.current.setMatrixAt(i, matrixs[i]);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.computeBoundingBox();
        mesh.current.computeBoundingSphere();
    });

    const color = new three.Color(configs.color.r, configs.color.g, configs.color.b);
    color.multiplyScalar(configs.brightness);
    console.log(color);

    return <>
        <instancedMesh position-y={-20} ref={mesh} args={[null, null, count]}>
            <planeGeometry />
            <meshBasicMaterial>
                <color args={[color.r / 255, color.g / 255, color.b / 255]} attach='color' />
            </meshBasicMaterial>
        </instancedMesh>
    </>
}