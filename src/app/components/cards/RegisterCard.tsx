"use client";

import React from 'react';
import DynamicGradientBlob from '../ui/DynamicGradientBlob';

interface RegisterCardProps {
  textColor: string;
}

const RegisterCard: React.FC<RegisterCardProps> = ({ textColor }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-visible register-card-container shadow-none" style={{ boxShadow: 'none', filter: 'none', overflow: 'visible' }}>
    <style>{`
        /* register/now label sizing: keep mobile moderate, beef up on desktop */
        .register-label { font-size: clamp(18px, 3.5vw, 56px); }
        @media (min-width: 1024px) {
          .register-label { font-size: 96px !important; }
          /* Laptop-only: nudge labels inward to overlap the button slightly */
          .register-label-laptop-top { transform: translate(-24%, -24%) !important; }
          .register-label-laptop-bottom { transform: translate(-35%, 16%) !important; }
        }
        /* Mobile tweaks: shorter blob, larger labels, labels closer to blob */
        @media (max-width: 640px) {
          .register-card-mobile-blob { width: 88vw !important; }
          .register-label { font-size: clamp(20px, 7vw, 64px) !important; }
          .register-label-mobile-top { transform: translate(-18%, -18%) !important; }
          .register-label-mobile-bottom { transform: translate(18%, 18%) !important; }
      /* Social links: keep horizontal on mobile */
      .register-social { flex-wrap: nowrap !important; }
      .register-sep { display: inline-block !important; margin: 0 8px; }
        }
      `}</style>
      {/* Main Content Container - Centered Layout */}
  <div className="relative z-10 w-full h-full flex items-center justify-center" style={{overflow: 'visible'}}>
        
        {/* Central Gradient Blob Container */}
  <div className="relative flex items-center justify-center w-full max-w-[120vw] sm:max-w-[95vw] lg:max-w-[900px] register-card-mobile-blob" style={{overflow: 'visible'}}>
          <DynamicGradientBlob
            width="100%"
            height="100%"
            className="relative z-20 w-full h-full lg:w-[650px] xl:w-[700px] 2xl:w-[800px] aspect-[3/1]"
            href="https://example.com"
          >
            <div className="relative w-full h-full" style={{overflow: 'visible'}}>
              {/* Date Text Overlay - Centered */}
              <span
                className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-none tracking-wider px-2"
                style={{
                  fontFamily: 'Sacco, Arial, sans-serif',
                  fontWeight: 800,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                2025 XX XX
              </span>
            </div>
          </DynamicGradientBlob>

          {/* REGISTER top-left (sibling to blob so it won't be clipped) */}
          <span
            className="absolute z-30 whitespace-nowrap font-bold text-white tracking-wider register-label register-label-mobile-top register-label-laptop-top"
            style={{
              fontFamily: 'Sacco, Arial, sans-serif',
              fontWeight: 800,
              top: 0,
              left: 0,
              transform: 'translate(-38%, -38%)',
              pointerEvents: 'none',
            }}
          >
            REGISTER
          </span>

          {/* NOW bottom-right (sibling to blob so it won't be clipped) */}
          <span
            className="absolute z-30 whitespace-nowrap font-bold text-white tracking-wider register-label register-label-mobile-bottom register-label-laptop-bottom"
            style={{
              fontFamily: 'Sacco, Arial, sans-serif',
              fontWeight: 800,
              bottom: 0,
              right: 0,
              transform: 'translate(28%, 28%)',
              pointerEvents: 'none',
            }}
          >
            NOW
          </span>
        </div>
      </div>

      {/* Social Links - Positioned closer to blob */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 xl:bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center justify-center register-social gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 text-gray-400 px-2">
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider whitespace-nowrap"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            {'DEV\u00A0POST'}
          </a>
          <span className="text-gray-500 register-sep">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            ADDRESS
          </a>
          <span className="text-gray-500 register-sep">|</span>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-wider"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            DISCORD
          </a>
          <span className="text-gray-500 register-sep">|</span>
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