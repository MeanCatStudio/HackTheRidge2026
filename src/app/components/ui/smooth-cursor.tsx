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
    />
  </svg>
);

const defaultSpringConfig: SpringConfig = {
  damping: 40,
  stiffness: 600,
  mass: 0.1,
  restDelta: 0.00001,
};

// Separate config for rotation - more damped to reduce jitter
const rotationSpringConfig: SpringConfig = {
  damping: 50,
  stiffness: 80,
  mass: 0.1,
  restDelta: 0.00001,
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = defaultSpringConfig,
}: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotation = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springRotation = useSpring(rotation, rotationSpringConfig);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastRotationUpdate = 0;
    let currentRotation = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Always update position for smooth movement
      mouseX.set(clientX);
      mouseY.set(clientY);
      
      // Calculate movement distance
      const deltaX = clientX - lastX;
      const deltaY = clientY - lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only update rotation if there's significant movement and enough time has passed
      const now = Date.now();
      const MOVEMENT_THRESHOLD = 8; // Minimum pixels to trigger rotation update
      const ROTATION_THROTTLE = 50; // Minimum ms between rotation updates
      
      if (distance > MOVEMENT_THRESHOLD && now - lastRotationUpdate > ROTATION_THROTTLE) {
        const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        // Smooth rotation transition - prevent large jumps
        let angleDiff = newAngle - currentRotation;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        
        // Only update if the angle change is significant enough
        if (Math.abs(angleDiff) > 15) {
          currentRotation = newAngle;
          rotation.set(currentRotation);
          lastRotationUpdate = now;
        }
      }
      
      lastX = clientX;
      lastY = clientY;
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
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, rotation]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        rotate: springRotation,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {cursor}
    </motion.div>
  );
}