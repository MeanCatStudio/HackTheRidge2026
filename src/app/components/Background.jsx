'use client';

import { Canvas } from "@react-three/fiber";

import Scene from './3d/Scene';

export default function Background()
{

    return <>
        <div id="background">
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    </>
}