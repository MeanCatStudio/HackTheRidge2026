'use client';

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Leva, useControls } from "leva";

import Scene from './3d/Scene';

export default function Background()
{
    const bloom = useControls('bloom', {
        intensity: { value: 0.35, min: 0, max: 3 },
        threshold: { value: 0, min: 0, max: 1 }
    });

    return <>
        <Leva collapsed />
        <div id="background">
            <Canvas gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
                <Scene />
                <EffectComposer>
                    <Bloom luminanceThreshold={bloom.threshold} intensity={bloom.intensity} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </div>
    </>
}