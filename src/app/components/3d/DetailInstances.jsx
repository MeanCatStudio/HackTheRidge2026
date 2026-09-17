import { useLayoutEffect, useRef } from 'react';
import { Object3D, Color } from 'three';

export default function DetailInstances({ parts, color = '#ffffff', emissive = '#000000', intensity = 0, round = false }) {
  const mesh = useRef();
  useLayoutEffect(() => {
    const object = new Object3D();
    parts.forEach((part, i) => {
      object.position.set(...part.position);
      object.scale.set(...part.size);
      object.rotation.set(...(part.rotation || [0, 0, 0]));
      object.updateMatrix();
      mesh.current.setMatrixAt(i, object.matrix);
      mesh.current.setColorAt(i, new Color(part.color || '#ffffff'));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [parts]);
  return <instancedMesh ref={mesh} args={[null, null, parts.length]}>
    {round ? <sphereGeometry args={[0.5, 12, 8]} /> : <boxGeometry />}
    <meshStandardMaterial color={color} roughness={0.78} emissive={emissive} emissiveIntensity={intensity} />
  </instancedMesh>;
}
