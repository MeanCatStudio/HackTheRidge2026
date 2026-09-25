import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Buildings from './Buildings';
import Train from './Train';
import Plane from './Plane';
import StreetLife from './StreetLife';
export default function Scene({ reducedMotion = false, lowPower = false, night = false }) {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = scrollHeight > 0
        ? document.documentElement.scrollTop / scrollHeight
        : 0;
      scrollProgress.current = Math.max(0, Math.min(1, rawProgress));
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useFrame((state, delta) => {
    const progress = Math.sqrt(scrollProgress.current); // using sqrt to accelerate y motion at title page, and slow down at the bottem
    const targetY = reducedMotion ? 0 : -19 * progress; // camera goes from 0 to -19 y
    state.camera.position.y += (targetY - state.camera.position.y) * (1 - Math.exp(-5 * delta));
  });
  return <>
    <fog attach="fog" args={[night ? '#162936' : '#c5b998', 40, 170]} />
    <hemisphereLight args={[night ? '#93a8bd' : '#fff4d5', night ? '#233442' : '#867459', night ? 0.85 : 2.4]} />
    <directionalLight position={[25,45,15]} intensity={night ? 0.6 : 2.2} color={night ? '#aec9ec' : '#ffe0a3'} />
    <Buildings lowPower={lowPower} night={night} /><StreetLife night={night} />
    <Train reducedMotion={reducedMotion} night={night} />
    <Plane reducedMotion={reducedMotion} night={night} />
    <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-20,-90]}>
      <planeGeometry args={[1000,1000]} />
      <meshStandardMaterial color={night ? '#293b41' : '#a69c80'} roughness={0.95} />
    </mesh>
  </>;
}
