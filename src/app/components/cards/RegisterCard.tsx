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
        
        {/* Mobile Version - Desktop Layout with Static Gradient (sm and below) */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center space-y-4">
            {/* REGISTER NOW Text - Above Button */}
            <div className="text-center">
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-none tracking-wider"
                style={{
                  fontFamily: 'Sacco, Arial, sans-serif',
                  fontWeight: 800
                }}
              >
                REGISTER NOW
              </h1>
            </div>

            {/* Central Static Gradient Container */}
            <div className="relative flex items-center justify-center">
              {/* Static Gradient Button */}
              <a
                href="https://example.com"
                className="relative z-20 w-80 h-32 sm:w-96 sm:h-36 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a8e6a3 0%, #88d8a3 25%, #ffd89b 50%, #ffb347 75%, #ff8c69 100%)',
                  borderRadius: '60px'
                }}
              >
                {/* Date Text Overlay - Centered */}
                <span
                  className="text-lg sm:text-2xl font-bold text-white leading-none tracking-wider"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 800,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  2025 12 06
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Version - Complex Design (md and above) */}
        <div className="hidden md:block">
          {/* Central Gradient Blob Container */}
          <div className="relative flex items-center justify-center">
            {/* Dynamic Gradient Blob with color-changing balls */}
            <DynamicGradientBlob
              width="800px"
              height="280px"
              className="relative z-20"
              href="https://dash.hacktheridge.ca/dashboard"
            >
              {/* Date Text Overlay - Centered */}
              <span
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-wider"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  fontWeight: 800,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                2025 / 12 / 06
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
      </div>

      {/* Social Links - Positioned at bottom for both mobile and desktop */}
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
    </div>
  );
};

export default RegisterCard;