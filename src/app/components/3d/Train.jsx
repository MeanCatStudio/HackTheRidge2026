import { useMemo, useRef } from 'react';
import { CanvasTexture } from 'three';
import DetailInstances from './DetailInstances';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
function Part({ position, size, color, radius = 0, glow = 0 }) {
  const material = <meshStandardMaterial color={color} roughness={0.38} metalness={0.18} emissive={color} emissiveIntensity={glow} />;
  return radius ? <RoundedBox position={position} args={size} radius={radius} smoothness={3}>{material}</RoundedBox> :
    <mesh position={position}><boxGeometry args={size} />{material}</mesh>;
}
export default function Train({ reducedMotion = false, night = false }) {
  const train = useRef();
  const destination = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 96;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#183c33'; ctx.fillRect(0, 0, 512, 96);
    ctx.fillStyle = '#ffe4a8'; ctx.font = 'bold 48px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('HTR 2026', 256, 50);
    return new CanvasTexture(canvas);
  }, []);
  const trackDetails = useMemo(() => {
    const parts = [];
    for(let i=0;i<200;i++) parts.push({position:[i*1.2-120,-1.18,0],size:[.18,.1,2.65],color:'#665f52'});
    for(const side of [-1,1]) {
      parts.push({position:[0,-.45,side*1.8],size:[240,.08,.08],color:'#b7b29b'});
      parts.push({position:[0,-.85,side*1.8],size:[240,.06,.06],color:'#b7b29b'});
      for(let i=0;i<61;i++) parts.push({position:[i*4-120,-.8,side*1.8],size:[.06,.95,.06],color:'#8d937d'});
    }
    return parts;
  }, []);
  const travel = useRef(0);
  useFrame((_, delta) => {
    if (!train.current || reducedMotion || document.hidden) return;
    travel.current += Math.min(delta, 0.1) * 3.2;
    train.current.position.x = ((travel.current + 106) % 240) - 120;
  });
  return <group position={[0,-5.2,-26]}>
    <DetailInstances parts={trackDetails} />
    <Part position={[0,-1.45,0]} size={[240,0.5,3.6]} color="#867b67" />
    {[-1.1,1.1].map(z=><Part key={z} position={[0,-1.08,z]} size={[240,0.14,0.15]} color="#bdb9a7" />)}
    {Array.from({length:25},(_,i)=><Part key={i} position={[(i-12)*10,-10.5,0]} size={[0.75,17.6,1.4]} color="#887e6e" />)}
    <group ref={train} position={[-14,0,0]}>
      {[0,1,2,3].map(car=><group key={car} position={[-car*7,0,0]}>
        <Part position={[0,0.28,0]} size={[6.5,2.05,2.5]} radius={0.48} color="#f2e7cb" />
        <Part position={[0,-0.32,0]} size={[6.3,0.55,2.52]} radius={0.15} color="#b15c36" />
        <Part position={[0,1.27,0]} size={[5.5,0.23,1.9]} radius={0.1} color="#8e9e85" />
        <Part position={[-.5,1.46,0]} size={[1.6,.22,1.15]} radius={.08} color="#697d71" />
        <Part position={[1.3,1.44,0]} size={[.85,.18,.85]} radius={.06} color="#697d71" />
        <Part position={[0,-0.78,0]} size={[5.3,0.25,1.8]} color="#32413e" />
        {[-1,1].map(side=><group key={side}>
          <Part position={[0,0.64,side*1.255]} size={[5.45,0.85,0.05]} radius={0.024} color="#284944" />
          {[-2,-0.9,0.9,2].map(x=><Part key={x} position={[x,0.65,side*1.29]} size={[0.78,0.61,0.035]} color={night ? '#ffc777' : '#bad3c6'} glow={night ? 1.1 : 0.15} />)}
          <Part position={[0,0.12,side*1.3]} size={[0.65,1.3,0.04]} color="#e5d9ba" />
          <Part position={[0,0.53,side*1.33]} size={[0.38,0.48,0.03]} color="#325b53" />
          <Part position={[0,.05,side*1.335]} size={[.018,1.2,.012]} color="#8a927f" />
          <Part position={[0,-.56,side*1.31]} size={[.72,.08,.16]} color="#586b5b" />
          <mesh position={[1.75,1.12,side*1.255]} rotation={[0,side===1 ? 0 : Math.PI,0]}>
            <planeGeometry args={[1.8,.3]} /><meshBasicMaterial map={destination} toneMapped={false} />
          </mesh>
          {[-2,2].map(x=><mesh key={`hub${x}`} position={[x,-.84,side*1.17]} rotation={[Math.PI/2,0,0]}>
            <cylinderGeometry args={[.12,.12,.03,16]} /><meshStandardMaterial color="#acb4a4" metalness={.75} roughness={.3} />
          </mesh>)}
          {[-2,2].map(x=><mesh key={x} position={[x,-0.84,side*1.02]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.28,0.28,0.25,20]} /><meshStandardMaterial color="#293530" metalness={0.6} roughness={0.45} /></mesh>)}
        </group>)}
        {car<3 && <Part position={[-3.5,0,0]} size={[0.5,1.4,1.85]} radius={0.1} color="#4c5b51" />}
        {car===3 && [-.8,.8].map(z=><Part key={`tail${z}`} position={[-3.25,-.12,z]} size={[.09,.16,.2]} radius={.03} color="#ce583c" glow={night ? 1 : .2} />)}
        {car===0 && <>
          <mesh position={[3.06,.22,0]} scale={[.7,.99,1.21]}><sphereGeometry args={[1,24,16]} /><meshStandardMaterial color="#f2e7cb" metalness={.18} roughness={.38} /></mesh>
          <Part position={[3.59,0.61,0]} size={[0.08,0.65,1.35]} radius={0.035} color="#244641" />
          <Part position={[3.7,-.29,0]} size={[.1,.16,1.05]} radius={.04} color="#b15c36" />
          {[-0.8,0.8].map(z=><Part key={z} position={[3.55,-0.12,z]} size={[0.09,0.22,0.32]} radius={0.04} color="#ffe3a0" glow={night ? 2 : 0.7} />)}
        </>}
      </group>)}
    </group>
  </group>;
}
