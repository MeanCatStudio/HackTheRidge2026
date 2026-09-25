import * as three from 'three';
import { useEffect, useMemo, useRef } from "react"
import { useControls } from 'leva';

import Lights from './Lights';
import CityDetails from './CityDetails';

export default function Buildings({ lowPower = false, night = false })
{
    const configs = useControls('buildings', {
        rows: { value: 20, min: 0, max: 50, step: 1 },
        columes: { value: 20, min: 0, max: 50, step: 1 },
        heightPow: { value: 5, min: 1, max: 20, step: 1 }
    })
    const rows = lowPower ? Math.min(configs.rows, 14) : configs.rows;
    const columes = lowPower ? Math.min(configs.columes, 14) : configs.columes;

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
                const noise = Math.abs(Math.sin((i * 37 + j * 17 + 11) * 12.9898) * 43758.5453) % 1;
                const height = 6 + Math.pow(noise, Math.max(1, configs.heightPow / 2)) * (i < 4 ? 9 : 38);
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
            mesh.current.setColorAt(i, new three.Color(["#c5b395", "#9fae98", "#bc9f81", "#a6aaa0"][i % 4]));
        }
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.instanceColor.needsUpdate = true;
        mesh.current.computeBoundingBox();
        mesh.current.computeBoundingSphere();
    }, [count, matrixes])

    return <>      
        <instancedMesh position={[0, -19.99, 0]} args={[null, null, count]} ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color={night ? "#72899c" : "#ffffff"} />
        </instancedMesh>
        <CityDetails buildings={matrixes} />
        <Lights lowPower={lowPower} rows={rows} columes={columes} buildingMatrixes={matrixes} />
    </>
}
