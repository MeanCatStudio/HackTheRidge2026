import { useMemo } from 'react';
import DetailInstances from './DetailInstances';

export default function StreetLife({ night }) {
  const { crowns, street, lamps } = useMemo(() => {
    const crowns=[], street=[], lamps=[];
    const leafColors=['#b27e41','#638150','#ba744d','#8c995d'];
    for(let i=0;i<40;i++) {
      const side=i%2 ? 1 : -1, z=-Math.floor(i/2)*8.2;
      street.push({position:[side*2.1,-18.6,z],size:[.17,2.6,.17],color:'#75573a'});
      street.push({position:[side*2.1,-19.5,z],size:[.8,.55,.8],color:'#9b8768'});
      for(let l=0;l<3;l++) crowns.push({position:[side*2.1+(l-1)*.25,-16.9+l*.26,z+(l%2)*.2],size:[1.25,1.65,1.15],color:leafColors[i%4]});
      if(i%4===0) {
        street.push({position:[side*2.1,-19.1,z+3],size:[.7,.15,1.4],color:'#916342'});
        street.push({position:[side*2.4,-18.8,z+3],size:[.1,.55,1.4],color:'#916342'});
        for(const dz of [-.45,.45]) street.push({position:[side*2.1,-19.5,z+3+dz],size:[.5,.65,.1],color:'#425343'});
      }
    }
    for(let i=0;i<24;i++) for(const side of [-1,1]) lamps.push({position:[side*2.08,-14.1,-i*7],size:[.43,.08,.32],color:'#ffe2a3'});
    return {crowns,street,lamps};
  },[]);
  return <>
    <DetailInstances parts={street} />
    <DetailInstances parts={crowns} round />
    <DetailInstances parts={lamps} emissive="#ffc26f" intensity={night ? 1.8 : .12} />
  </>;
}
