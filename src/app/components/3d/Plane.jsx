import { useMemo, useRef } from 'react';
import { CanvasTexture } from 'three';
import { useFrame } from '@react-three/fiber';

function Part({ position, size, color, rotation = [0, 0, 0], emissive = '#000000', intensity = 0 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.42} metalness={0.12} emissive={emissive} emissiveIntensity={intensity} depthTest={false} />
    </mesh>
  );
}

export default function Plane({ reducedMotion = false, night = false }) {
  const plane = useRef();
  const propeller = useRef();
  const wingLights = useRef([]);
  const flight = useRef(88);
  const bannerTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 160;
    const context = canvas.getContext('2d');
    context.fillStyle = '#f7eedb';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#24372c';
    context.font = '900 86px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('HTR', canvas.width / 2, canvas.height / 2 + 4);
    return new CanvasTexture(canvas);
  }, []);

  useFrame((_, delta) => {
    const pulse = reducedMotion || Math.sin(performance.now() * 0.008) > 0.55;
    wingLights.current.forEach((light) => {
      if (light) light.visible = night && pulse;
    });
    if (propeller.current && !reducedMotion && !document.hidden) {
      propeller.current.rotation.x -= Math.min(delta, 0.1) * 18;
    }
    if (!plane.current || reducedMotion || document.hidden) return;
    flight.current -= Math.min(delta, 0.1) * 5.2;
    if (flight.current < -88) flight.current = 88;
    plane.current.position.x = flight.current;
  });

  return (
    <group ref={plane} position={[88, 10, -38]} rotation={[0, 0, -0.035]} renderOrder={20}>
      <Part position={[0, 0, 0]} size={[4.4, .42, .58]} color={night ? '#d8e2e5' : '#f7eedb'} />
      <Part position={[-.7, .36, 0]} size={[1.25, .42, .5]} color={night ? '#7894a5' : '#76939a'} rotation={[0, 0, -.08]} />
      <Part position={[-.05, .32, 0]} size={[1.8, .12, 3.2]} color={night ? '#9eb7c3' : '#d7b883'} rotation={[0, 0, -.035]} />
      {[-1, 1].map((side, index) => (
        <mesh key={side} ref={(light) => { wingLights.current[index] = light; }} position={[-.05, .39, side * 1.62]}>
          <sphereGeometry args={[.1, 12, 8]} />
          <meshBasicMaterial color="#ff3028" toneMapped={false} />
        </mesh>
      ))}
      <Part position={[1.55, .3, 0]} size={[.9, .1, 1.2]} color={night ? '#9eb7c3' : '#d7b883'} rotation={[0, 0, .08]} />
      <Part position={[1.62, .66, 0]} size={[.12, .7, .12]} color="#b94d3e" rotation={[0, 0, .08]} />
      <mesh position={[-2.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[.28, .72, 16]} />
        <meshStandardMaterial color="#b94d3e" roughness={.38} depthTest={false} />
      </mesh>
      <group ref={propeller} position={[-2.7, 0, 0]}>
        <Part position={[0, 0, 0]} size={[.08, 1.15, .08]} color="#b94d3e" />
        <Part position={[0, 0, 0]} size={[.08, .08, 1.15]} color="#b94d3e" />
      </group>
      {[-1, 1].map((side) => (
        <group key={side} position={[-.2, -.08, side * 1.18]} renderOrder={21}>
          <Part position={[0, .25, 0]} size={[.16, .38, .16]} color="#42534f" />
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[.3, .3, .58, 20]} />
            <meshStandardMaterial color="#42534f" metalness={.55} roughness={.32} depthTest={false} />
          </mesh>
          <mesh position={[-.34, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[.22, .04, 8, 16]} />
            <meshStandardMaterial color={night ? '#d8e2e5' : '#f7eedb'} metalness={.45} roughness={.3} depthTest={false} />
          </mesh>
          <mesh position={[-.36, 0, 0]}>
            <sphereGeometry args={[.07, 12, 8]} />
            <meshStandardMaterial color="#b94d3e" depthTest={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[5.1, -.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[.035, .035, 6.4, 8]} />
        <meshStandardMaterial color={night ? '#d8e2e5' : '#756e5f'} depthTest={false} />
      </mesh>
      <mesh position={[9.15, -.24, 0]} rotation={[0, 0, -.035]}>
        <planeGeometry args={[5.8, 1.55]} />
        <meshBasicMaterial map={bannerTexture} toneMapped={false} side={2} depthTest={false} />
      </mesh>
    </group>
  );
}
