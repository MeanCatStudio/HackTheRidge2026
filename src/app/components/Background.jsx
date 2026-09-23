'use client';

import { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Leva, useControls } from "leva";

import Scene from './3d/Scene';
import { useCityTheme } from './CityTheme';

const skyStars = [
    { left: '8%', top: '18%', delay: '-1.2s' },
    { left: '17%', top: '36%', delay: '-3.8s' },
    { left: '29%', top: '12%', delay: '-5.1s' },
    { left: '41%', top: '27%', delay: '-2.6s' },
    { left: '54%', top: '16%', delay: '-4.4s' },
    { left: '67%', top: '34%', delay: '-1.9s' },
    { left: '78%', top: '14%', delay: '-6.2s' },
    { left: '89%', top: '29%', delay: '-3.1s' },
];

export default function Background()
{
    const { theme } = useCityTheme();
    const [reducedMotion, setReducedMotion] = useState(false);
    const [lowPower, setLowPower] = useState(true);
    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(query.matches);
        update(); query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);
    useEffect(() => {
        const query = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)');
        const update = () => {
            const constrainedDevice = navigator.connection?.saveData
                || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
                || (navigator.deviceMemory && navigator.deviceMemory <= 4);
            setLowPower(query.matches || Boolean(constrainedDevice));
        };
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
            {!lowPower && (
                <Canvas dpr={[1, 1.25]} gl={{ alpha: true, antialias: true }} fallback={<div className="background-fallback" />} style={{ background: 'transparent' }}>
                    <Scene reducedMotion={reducedMotion} night={theme === "night"} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={bloom.threshold} intensity={bloom.intensity} mipmapBlur />
                    </EffectComposer>
                </Canvas>
            )}
            <div className="htr-sky-stars">
                {skyStars.map((star) => <span key={`${star.left}-${star.top}`} style={{ left: star.left, top: star.top, animationDelay: star.delay }} />)}
            </div>
        </div>
    </>;
}
