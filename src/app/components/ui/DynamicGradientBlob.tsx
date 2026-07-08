"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface DynamicGradientBlobProps {
  width?: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

interface Blob {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

const DynamicGradientBlob: React.FC<DynamicGradientBlobProps> = ({
  width = '800px',
  height = '280px',
  className = '',
  children,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const speedMultRef = useRef<number>(1);
  const targetSpeedMultRef = useRef<number>(1);
  const prefersReducedMotionRef = useRef<boolean>(false);

  
  const containerWidth = parseInt(width);
  const containerHeight = parseInt(height);

  
  const initializeBlobs = useCallback(() => {
    const colors = [
      'radial-gradient(circle, #a8e6a3 0%, #88d8a3 40%, rgba(168, 230, 163, 0.8) 100%)',
      'radial-gradient(circle, #ffd89b 0%, #ffb347 40%, rgba(255, 216, 155, 0.8) 100%)',
      'radial-gradient(circle, #ff8c69 0%, #ff6b6b 40%, rgba(255, 140, 105, 0.8) 100%)',
      'radial-gradient(circle, #96ceb4 0%, #feca57 40%, rgba(150, 206, 180, 0.8) 100%)',
      'radial-gradient(circle, #a8e6cf 0%, #7fcdcd 40%, rgba(168, 230, 207, 0.8) 100%)',
      'radial-gradient(circle, #ffd3a5 0%, #fd9853 40%, rgba(255, 211, 165, 0.8) 100%)',
      'radial-gradient(circle, #c2e9fb 0%, #a1c4fd 40%, rgba(194, 233, 251, 0.8) 100%)',
      'radial-gradient(circle, #ffecd2 0%, #fcb69f 40%, rgba(255, 236, 210, 0.8) 100%)'
    ];

    const newBlobs: Blob[] = [];
    const blobCount = containerWidth < 640 ? 5 : 8;
    for (let i = 0; i < blobCount; i++) {
      const size = Math.random() * 160 + 120; 
      const x = Math.random() * (containerWidth - size);
      const y = Math.random() * (containerHeight - size);
      
      newBlobs.push({
        id: i,
        x,
        y,
        targetX: x,
        targetY: y,
        size,
        color: colors[i % colors.length],
        speed: Math.random() * 0.5 + 0.3, 
        angle: Math.random() * Math.PI * 2,
      });
    }
    
    setBlobs(newBlobs);
  }, [containerWidth, containerHeight]);

  
  const animate = useCallback((currentTime: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime;
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    
    const dt = Math.min(32, Math.max(0, deltaTime));

    
    const target = (isHovered && !prefersReducedMotionRef.current) ? 3 : 1;
    targetSpeedMultRef.current = target;
    speedMultRef.current += (targetSpeedMultRef.current - speedMultRef.current) * 0.08;

    setBlobs(prevBlobs => {
      return prevBlobs.map(blob => {
        let newX = blob.x;
        let newY = blob.y;
        let newTargetX = blob.targetX;
        let newTargetY = blob.targetY;
        let newAngle = blob.angle;

        
        const dx = newTargetX - newX;
        const dy = newTargetY - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
          
          newTargetX = Math.random() * (containerWidth - blob.size);
          newTargetY = Math.random() * (containerHeight - blob.size);
          newAngle = Math.random() * Math.PI * 2;
        } else {
          
          const moveSpeed = blob.speed * dt * 0.1 * speedMultRef.current;
          const safeDist = Math.max(distance, 0.0001);
          newX += (dx / safeDist) * moveSpeed;
          newY += (dy / safeDist) * moveSpeed;
        }

        return {
          ...blob,
          x: newX,
          y: newY,
          targetX: newTargetX,
          targetY: newTargetY,
          angle: newAngle
        };
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered, containerWidth, containerHeight]);

  
  useEffect(() => {
    initializeBlobs();
  }, [initializeBlobs]);

  
  useEffect(() => {
    if (blobs.length > 0) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, blobs.length]);

  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotionRef.current = media.matches;
      const onChange = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      media.addEventListener?.('change', onChange);
      return () => media.removeEventListener?.('change', onChange);
    }
  }, []);

  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const content = (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      style={{
        width,
        height,
        borderRadius: '120px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #a8e6a3 0%, #88d8a3 25%, #ffd89b 50%, #ffb347 75%, #ff8c69 100%)',
            borderRadius: '120px',
            opacity: 0.6,
          }}
        />

        <div className="absolute inset-0" style={{ borderRadius: '120px' }}>
          {blobs.map((blob) => (
            <div
              key={blob.id}
              className="absolute rounded-full"
              style={{
                width: `${blob.size}px`,
                height: `${blob.size}px`,
                background: blob.color,
                left: `${blob.x}px`,
                top: `${blob.y}px`,
                filter: isHovered ? 'blur(70px)' : 'blur(50px)',
                transform: 'scale(1)',
                opacity: isHovered ? 0.9 : 0.7,
                willChange: 'transform, left, top',
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: isHovered 
              ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)'
              : 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)',
            borderRadius: '120px',
            transition: 'background 0.3s ease-out',
          }}
        />
        
        {children && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {children}
          </div>
        )}
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

export default DynamicGradientBlob;
