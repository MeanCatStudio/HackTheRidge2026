import { useMemo } from 'react';
import { Vector3 } from 'three';
import DetailInstances from './DetailInstances';

export default function CityDetails({ buildings }) {
  const parts = useMemo(() => {
    const result = [], position = new Vector3(), scale = new Vector3();
    const add = (x,y,z,w,h,d,color) => result.push({position:[x,y,z],size:[w,h,d],color});
    buildings.forEach((matrix,index) => {
      position.setFromMatrixPosition(matrix); scale.setFromMatrixScale(matrix);
      const {x,z} = position;
      const top = position.y + scale.y/2 - 19.99;
      add(x,top+.12,z,5.18,.24,5.18,'#c9b999');
      for(const side of [-1,1]) {
        add(x+side*2.4,top+.35,z,.16,.48,4.8,'#bba989');
        add(x,top+.35,z+side*2.4,4.8,.48,.16,'#bba989');
      }
      if(index%3===0) {
        add(x+.5,top+.5,z,1.2,.75,1.7,'#7e8a7a');
        add(x+.5,top+.9,z,1.3,.08,1.8,'#44544a');
      } else {
        add(x,top+.3,z,3.1,.12,2.5,'#3d6060');
        add(x,top+.38,z,.05,.03,2.5,'#a5b5a9');
        add(x,top+.38,z,3.1,.03,.05,'#a5b5a9');
      }
      if(index%7===0) add(x-1,top+1.6,z,.07,2.9,.07,'#8e9b89');
      if(z>-65) {
        add(x,-19.7,z,5.35,.6,5.35,'#b8ab92');
        add(x,-18.6,z+2.56,3.8,1.5,.12,'#38574d');
        add(x,-17.65,z+2.9,4,.18,.8,index%2 ? '#b37049' : '#688773');
      }
    });
    for(let i=0;i<24;i++) for(const side of [-1,1]) {
      const z=-i*7;
      add(side*2.3,-17,z,.1,6,.1,'#526452');
      add(side*2.08,-14.05,z,.55,.1,.18,'#526452');
    }
    for(const side of [-1,1]) {
      add(side*2.1,-19.86,-84,1.35,.22,180,'#b3a58b');
      add(side*1.38,-19.78,-84,.12,.32,180,'#e1cba3');
    }
    for(let i=0;i<36;i++) add(0,-19.975,-i*5,.09,.025,1.5,'#eadbb8');
    for(let i=0;i<6;i++) add(-1.15+i*.46,-19.97,-13,.24,.03,2,'#f2e5c9');
    return result;
  },[buildings]);
  return <DetailInstances parts={parts} />;
}
