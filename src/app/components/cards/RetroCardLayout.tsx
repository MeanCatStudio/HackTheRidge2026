"use client";

import React from 'react';

interface RetroCardLayoutProps {
  children: React.ReactNode;
  bgColor: string;
  textColor: string;
  isLastCard?: boolean;
  cardIndex: number;
}

const RetroCardLayout: React.FC<RetroCardLayoutProps> = ({ 
  children, 
  bgColor, 
  textColor, 
  isLastCard = false,
  cardIndex 
}) => {
  const getRetroPattern = (index: number) => {
    const patterns = [
      'bg-gradient-to-br from-white/5 to-transparent',
      'bg-gradient-to-tl from-white/5 to-transparent', 
      'bg-gradient-to-tr from-white/5 to-transparent',
      'bg-gradient-to-bl from-white/5 to-transparent'
    ];
    return patterns[index % patterns.length];
  };

  const getRetroDecorations = (index: number) => {
    switch (index % 4) {
      case 0:
        return (
          <>
            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rotate-45" />
          </>
        );
      case 1:
        return (
          <>
            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white/20 rotate-45" />
            <div className="absolute bottom-4 right-4 w-20 h-4 bg-white/10 rounded-full" />
          </>
        );
      case 2:
        return (
          <>
            <div className="absolute top-1/2 right-4 w-4 h-20 bg-white/10 rounded-full transform -translate-y-1/2" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full" />
          </>
        );
      case 3:
        return (
          <>
            <div className="absolute top-4 left-1/2 w-20 h-4 bg-white/10 rounded-full transform -translate-x-1/2" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white/20 rotate-45" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`
      relative h-full w-full ${bgColor} 
      ${isLastCard ? 'rounded-none' : 'rounded-t-5xl'} 
      shadow-2xl shadow-black/40 overflow-hidden
    `}>
      {/* Retro background pattern */}
      <div className={`absolute inset-0 ${getRetroPattern(cardIndex)}`} />
      
      {/* Retro decorative elements */}
      {getRetroDecorations(cardIndex)}
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default RetroCardLayout;