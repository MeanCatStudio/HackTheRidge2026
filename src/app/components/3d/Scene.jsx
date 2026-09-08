import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from 'leva';

import Buildings from './Buildings';

export default function Scene()
{
    //const cube = useRef();

    useFrame((state, delta) => {
        //cube.current.rotation.y += delta * 0.2;
        //cube.current.rotation.x += delta * 0.15;

        const targetY = -window.scrollY / window.innerHeight * 2.5;
        state.camera.position.y += (targetY - state.camera.position.y) * Math.min(1, delta * 10);

        const fadeProgress = Math.max(0, Math.min(1, (window.scrollY / window.innerHeight - 5.8) / 1.1));
        state.gl.domElement.style.opacity = String(1 - fadeProgress);
    });

    const lighting = useControls('lighting', { 
        intensity: { value: 0.02, min: 0, max: 0.5 } 
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

        <Buildings />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, -121]}>
            <planeGeometry args={[250, 250]} />
            <MeshReflectorMaterial
                blur={[120, 45]}
                resolution={512}
                mixBlur={0.6}
                mixStrength={1.2}
                roughness={0.55}
                mirror={0.28}
                depthScale={0.5}
                minDepthThreshold={0.35}
                maxDepthThreshold={1}
                color="#292d31"
                metalness={0.3}
            />
        </mesh>

        {/* <mesh position={[0, -25, -496]} >
            <boxGeometry args={[1000, 10, 1000]} />
            <meshLambertMaterial color={0xbbbbbb} />
        </mesh> */}
    </>
}