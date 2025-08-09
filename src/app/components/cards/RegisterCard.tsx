"use client";

import React from 'react';
import DynamicGradientBlob from '../ui/DynamicGradientBlob';

interface RegisterCardProps {
  textColor: string;
}

const RegisterCard: React.FC<RegisterCardProps> = ({ textColor }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden register-card-container shadow-none" style={{ boxShadow: 'none', filter: 'none' }}>
      {/* Main Content Container - Centered Layout */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {/* Central Gradient Blob Container */}
        <div className="relative flex items-center justify-center">
          {/* Dynamic Gradient Blob with color-changing balls */}
          <DynamicGradientBlob
            width="800px"
            height="280px"
            className="relative z-20"
            href="https://example.com"
          >
            {/* Date Text Overlay - Centered */}
            <span
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-wider"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                fontWeight: 800,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              2025 XX XX
            </span>
          </DynamicGradientBlob>

          {/* REGISTER Text - Top Left, overlapping with gradient, higher z-index */}
          <div className="absolute -top-8 -left-24 lg:-top-12 lg:-left-32 xl:-top-16 xl:-left-40 z-30">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold text-white leading-none tracking-wider"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                fontWeight: 800
              }}
            >
              REGISTER
            </h1>
          </div>

          {/* NOW Text - Bottom Right, overlapping with gradient, higher z-index */}
          <div className="absolute -bottom-8 -right-16 lg:-bottom-12 lg:-right-20 xl:-bottom-16 xl:-right-24 z-30">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold text-white leading-none tracking-wider"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                fontWeight: 800
              }}
            >
              NOW
            </h1>
          </div>
        </div>
      </div>

      {/* Social Links - Positioned closer to blob */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 lg:gap-6 text-gray-400">
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            DEV POST
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            ADDRESS
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            DISCORD
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            INSTAGRAM
          </a>
        </div>
      </div>

      {/* Cool Hover Animation Text (for development/preview) */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-white text-xs sm:text-sm opacity-50 z-20 hidden lg:block">
        Cool hover animation here
      </div>
    </div>
  );
};

export default RegisterCard;