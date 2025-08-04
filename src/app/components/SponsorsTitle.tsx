"use client";

import React from 'react';

/**
 * SponsorsTitle component that creates a horizontal layout with
 * a layered rounded rectangle title design and thank you message.
 */
const SponsorsTitle: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-16 px-8">
      <div className="flex items-center gap-16 max-w-7xl w-full">
        {/* Left side - Stylized Title */}
        <div className="relative flex-shrink-0">
          {/* Back layer - Orange */}
          <div
            className="absolute inset-0 rounded-3xl border-4 transform translate-x-3 translate-y-3"
            style={{
              borderColor: '#ea580c',
              width: '380px',
              height: '120px',
            }}
          />
          
          {/* Middle layer - Teal/Mint */}
          <div
            className="absolute inset-0 rounded-3xl border-4 transform translate-x-1.5 translate-y-1.5"
            style={{
              borderColor: '#14b8a6',
              width: '380px',
              height: '120px',
            }}
          />
          
          {/* Front layer - Main container with text */}
          <div
            className="relative rounded-3xl border-4 flex items-center justify-center"
            style={{
              borderColor: '#6b7280',
              backgroundColor: '#2e2e2e',
              width: '380px',
              height: '120px',
            }}
          >
            <h1
              className="text-white font-bold text-3xl md:text-4xl tracking-wider text-center"
              style={{
                fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
                letterSpacing: '0.1em'
              }}
            >
              EVENT SPONSORS
            </h1>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-50"></div>

        {/* Right side - Thank you message */}
        <div className="flex-1 text-white">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
              letterSpacing: '0.05em'
            }}
          >
            THANK YOU
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-2xl">
            Hack the Ridge wouldn't be possible without the incredible support of our sponsors.
            Your partnership empowers the next generation of innovators and creators.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full"></div>
            <span className="text-lg font-semibold tracking-wide opacity-75">
              BUILDING THE FUTURE TOGETHER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsTitle;