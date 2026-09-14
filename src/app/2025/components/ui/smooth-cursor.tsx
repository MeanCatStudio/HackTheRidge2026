"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

interface SmoothCursorProps {
  cursor?: React.ReactElement;
  springConfig?: SpringConfig;
}

const DefaultCursorSVG = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none"
  >
    <path
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      fill="#a7c0b8"
      stroke="#a7c0b8"
      strokeWidth="1"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const defaultSpringConfig: SpringConfig = {
  damping: 35,
  stiffness: 500,
  mass: 0.15,
  restDelta: 0.001,
};

// Separate config for rotation - smoother and more responsive
const rotationSpringConfig: SpringConfig = {
  damping: 30,
  stiffness: 200,
  mass: 0.2,
  restDelta: 0.001,
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = defaultSpringConfig,
}: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let isInitialized = false;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Initialize position on first move
      if (!isInitialized) {
        lastX = clientX;
        lastY = clientY;
        mouseX.set(clientX);
        mouseY.set(clientY);
        isInitialized = true;
        return;
      }
      
      // Use RAF for smoother updates
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        // Always update position for smooth movement
        mouseX.set(clientX);
        mouseY.set(clientY);
        
        lastX = clientX;
        lastY = clientY;
      });
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "0px",
        translateY: "0px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {cursor}
    </motion.div>
  );
}