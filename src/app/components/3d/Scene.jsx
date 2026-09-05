import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import Buildings from './Buildings';

export default function Scene()
{
    //const cube = useRef();

    useFrame((state, delta) => {
        //cube.current.rotation.y += delta * 0.2;
        //cube.current.rotation.x += delta * 0.15;

        state.camera.position.y = -window.scrollY / window.innerHeight * 2.5;
    });
    const sunPos = [10, 6, -10];

    return <>
        <Environment preset='city' resolution={32} />

        <mesh position={[sunPos[0]*50, sunPos[1]*50, sunPos[2]*50]}>
            <icosahedronGeometry args={[30, 2]} />
            <meshBasicMaterial />
        </mesh>

        {/* <mesh position={[5, -18, 0]}>
            <boxGeometry args={[5, 30, 5]} />
            <meshStandardMaterial />
        </mesh>
        <mesh position={[-7, -17, -10]}>
            <boxGeometry args={[5, 30, 5]} />
            <meshStandardMaterial />
        </mesh> */}

        <Buildings />

        <mesh position={[0, -25, -496]} >
            <boxGeometry args={[1000, 10, 1000]} />
            <meshStandardMaterial />
        </mesh>
    </>
}