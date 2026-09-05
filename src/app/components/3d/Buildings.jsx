import * as three from 'three';
import { useEffect, useRef } from "react"

export default function Buildings()
{
    const mesh = useRef();
    const rows = 30;
    const columes = 20;
    const count = rows * columes;

    const tempObj = new three.Object3D();
    useEffect(() => {
        for (let i = 0; i < rows; i++)
        {
            for (let j = 0; j < columes; j++)
            {
                tempObj.position.x = (j - (columes - 1) * 0.5) * 10;
                tempObj.position.z = -i * 10;
                const height = 5 + Math.pow(Math.random(), 5) * 50;
                tempObj.scale.y = height;
                tempObj.position.y = height * 0.5;

                tempObj.updateMatrix();
                mesh.current.setMatrixAt(i * columes + j, tempObj.matrix);
            }
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    })

    return <>
        {/* {[...Array(10)].map((item, index) => {
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        })} */}        
        <instancedMesh position={[0, -20, 0]} args={[null, null, count]} ref={mesh}>
            <boxGeometry args={[5, 1, 5]} />
            <meshLambertMaterial />
        </instancedMesh>
    </>
}