import * as three from 'three';
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useControls } from 'leva';

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

    //const noise = useLoader(three.TextureLoader, '/texture/noise.png');

    const lighting = useControls('lighting', { 
        intensity: { value: 0.01, min: 0, max: 0.5 } 
    });

    return <>
        <Environment preset='city' resolution={32} environmentIntensity={lighting.intensity} />
        {/* <ContactShadows 
            position={[0, -19.99, 0]} 
            opacity={0.5} 
            scale={500} 
            blur={0.2} 
            far={100} 
            resolution={256 * 8}
        /> */}

        <mesh position={[sunPos[0]*50, sunPos[1]*50, sunPos[2]*50]}>
            <icosahedronGeometry args={[30, 2]} />
            <meshBasicMaterial />
        </mesh>

        <Buildings />

        {/* <mesh position={[0, -25, -496]} >
            <boxGeometry args={[1000, 10, 1000]} />
            <meshLambertMaterial color={0xbbbbbb} />
        </mesh> */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, -121]}>
            <planeGeometry args={[250, 250]} />
            <MeshReflectorMaterial 
                //blur={[300, 100]}
                //roughness={0.5}
                //mixBlur={2}      
                //mixStrength={2.5}
                //resolution={512}
                //color='red' 
            />
        </mesh>

        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -19.99, -121]}>
            <planeGeometry args={[250, 250]} />
            <meshLambertMaterial alphaMap={noise} transparent opacity={0} />
        </mesh> */}

        <mesh position={[0, -70, 4]}>
            <planeGeometry args={[250, 100]} />
            <meshLambertMaterial />
        </mesh>
    </>
}