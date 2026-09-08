import * as three from 'three';
import { useEffect, useMemo, useRef } from "react"
import { useControls } from 'leva';

import Lights from './Lights';

export default function Buildings()
{
    const configs = useControls('buildings', {
        rows: { value: 20, min: 0, max: 50, step: 1 },
        columes: { value: 20, min: 0, max: 50, step: 1 },
        heightPow: { value: 5, min: 1, max: 20, step: 1 }
    })
    const rows = configs.rows;
    const columes = configs.columes;

    const mesh = useRef();
    const count = rows * columes;
    const matrixes = useMemo(() => {
        const nextMatrixes = [];
        const tempObj = new three.Object3D();

        for (let i = 0; i < rows; i++)
        {
            for (let j = 0; j < columes; j++)
            {
                tempObj.position.x = (j - (columes - 1) * 0.5) * 10;
                tempObj.position.z = -i * 10;
                const height = 5 + Math.pow(Math.random(), configs.heightPow) * 50;
                tempObj.scale.set(5, height, 5);
                tempObj.position.y = height * 0.5;

                tempObj.updateMatrix();
                nextMatrixes.push(tempObj.matrix.clone());
            }
        }

        return nextMatrixes;
    }, [rows, columes, configs.heightPow]);
    
    useEffect(() => {
        for (let i = 0; i < count; i++)
        {
            mesh.current.setMatrixAt(i, matrixes[i]);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.computeBoundingBox();
        mesh.current.computeBoundingSphere();
    })

    return <>      
        <instancedMesh position={[0, -19.99, 0]} args={[null, null, count]} ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial />
        </instancedMesh>
        <Lights rows={rows} columes={columes} buildingMatrixes={matrixes} />
    </>
}