"use client";

import { useEffect, useRef, useState } from "react";

type VantaDotsFactory = (options: Record<string, unknown>) => { destroy?: () => void };

export default function AboutDotsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [useStaticDots, setUseStaticDots] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMode = () => {
      setUseStaticDots(mediaQuery.matches || window.innerWidth < 1024);
    };

    updateMode();

    mediaQuery.addEventListener("change", updateMode);
    window.addEventListener("resize", updateMode, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
      window.removeEventListener("resize", updateMode);
    };
  }, []);

  useEffect(() => {
    if (useStaticDots) {
      return;
    }

    let effect: { destroy?: () => void } | undefined;
    let mounted = true;

    async function init() {
      const [threeModule, dotsModule] = await Promise.all([
        import("three"),
        import("vanta/dist/vanta.dots.min"),
      ]);

      if (!mounted || !containerRef.current) {
        return;
      }

      const createDots = (dotsModule.default ?? dotsModule) as VantaDotsFactory;
      const THREE = threeModule;

      effect = createDots({
        el: containerRef.current,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0xdfd7d7,
        color: 0x000000,
        color2: 0x7db6ad,
        size: 2.6,
        spacing: 28,
        showLines: false,
      });
    }

    void init();

    return () => {
      mounted = false;
      effect?.destroy?.();
    };
  }, [useStaticDots]);

  if (useStaticDots) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(30,49,89,0.18) 1.5px, transparent 0), radial-gradient(circle at 13px 13px, rgba(125,182,173,0.14) 1.2px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
}