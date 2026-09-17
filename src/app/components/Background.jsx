'use client';

import { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Leva, useControls } from "leva";

import Scene from './3d/Scene';
import { useCityTheme } from './CityTheme';

export default function Background()
{
    const { theme } = useCityTheme();
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(query.matches);
        update(); query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        let active = true;

        fetch('/hide-controls.txt', { method: 'HEAD', cache: 'no-store' })
            .then((response) => {
                if (active) setShowControls(!response.ok);
            })
            .catch(() => {
                if (active) setShowControls(true);
            });

        return () => {
            active = false;
        };
    }, []);

    const bloom = useControls('bloom', {
        intensity: { value: 0.12, min: 0, max: 3 },
        threshold: { value: 0, min: 0, max: 1 }
    });

    return <>
        
        
        <Leva hidden={!showControls} collapsed />
        <div id="background" aria-hidden="true">
            <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
                <Scene reducedMotion={reducedMotion} night={theme === "night"} />
                <EffectComposer>
                    <Bloom luminanceThreshold={bloom.threshold} intensity={bloom.intensity} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </div>
    </>;
}
