import { useFrame } from '@react-three/fiber';
import Buildings from './Buildings';
import Train from './Train';
import StreetLife from './StreetLife';
export default function Scene({ reducedMotion = false, night = false }) {
  useFrame((state, delta) => {
    const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / distance));
    const targetY = reducedMotion ? 0 : -3.5 * progress;
    state.camera.position.y += (targetY - state.camera.position.y) * (1 - Math.exp(-5 * delta));
  });
  return <>
    <fog attach="fog" args={[night ? '#162936' : '#c5b998', 40, 170]} />
    <hemisphereLight args={[night ? '#93a8bd' : '#fff4d5', night ? '#233442' : '#867459', night ? 0.85 : 2.4]} />
    <directionalLight position={[25,45,15]} intensity={night ? 0.6 : 2.2} color={night ? '#aec9ec' : '#ffe0a3'} />
    <Buildings night={night} /><StreetLife night={night} />
    <Train reducedMotion={reducedMotion} night={night} />
    <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-20,-90]}>
      <planeGeometry args={[1000,1000]} />
      <meshStandardMaterial color={night ? '#293b41' : '#a69c80'} roughness={0.95} />
    </mesh>
  </>;
}
