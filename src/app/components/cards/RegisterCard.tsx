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
            className="relative z-20 w-[300px] h-[120px] sm:w-[400px] sm:h-[160px] md:w-[600px] md:h-[220px] lg:w-[800px] lg:h-[280px]"
            href="https://example.com"
          >
            {/* Date Text Overlay - Centered */}
            <span
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-none tracking-wider px-2"
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
          <div className="absolute -top-4 -left-12 sm:-top-6 sm:-left-16 md:-top-8 md:-left-20 lg:-top-12 lg:-left-32 xl:-top-16 xl:-left-40 z-30">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-none tracking-wider"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                fontWeight: 800
              }}
            >
              REGISTER
            </h1>
          </div>

          {/* NOW Text - Bottom Right, overlapping with gradient, higher z-index */}
          <div className="absolute -bottom-4 -right-8 sm:-bottom-6 sm:-right-12 md:-bottom-8 md:-right-16 lg:-bottom-12 lg:-right-20 xl:-bottom-16 xl:-right-24 z-30">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-none tracking-wider"
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
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 xl:bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 text-gray-400 px-2">
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            DEV POST
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            ADDRESS
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            DISCORD
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;