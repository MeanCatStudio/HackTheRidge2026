"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * SponsorsTitle component that creates a horizontal layout with
 * a layered rounded rectangle title design and thank you message.
 */
const SponsorsTitle: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex justify-center items-center mt-8 sm:mt-12 py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-16 max-w-7xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Left side - Stylized Title */}
        <div className={`relative flex-shrink-0 order-2 lg:order-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Back layer - Orange */}
          <div
            className="absolute inset-0 rounded-3xl border-4 transform translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3 w-[220px] h-[72px] sm:w-[280px] sm:h-[90px] md:w-[360px] md:h-[110px] transition-all duration-700"
            style={{
              borderColor: '#ea580c',
              boxShadow: '0 0 20px rgba(234, 88, 12, 0.3)'
            }}
          />
          
          {/* Middle layer - Teal/Mint */}
          <div
            className="absolute inset-0 rounded-3xl border-4 transform translate-x-1 sm:translate-x-1.5 translate-y-1 sm:translate-y-1.5 w-[220px] h-[72px] sm:w-[280px] sm:h-[90px] md:w-[360px] md:h-[110px] transition-all duration-700 delay-100"
            style={{
              borderColor: '#14b8a6',
              boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
            }}
          />
          
          {/* Front layer - Main container with text */}
          <div
            className="relative rounded-3xl border-4 flex items-center justify-center w-[220px] h-[72px] sm:w-[280px] sm:h-[90px] md:w-[360px] md:h-[110px] transition-all duration-700 delay-200 hover:scale-105"
            style={{
              borderColor: '#6b7280',
              backgroundColor: '#2e2e2e',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)'
            }}
          >
            <h1
              className="text-white font-bold text-2xl sm:text-3xl md:text-5xl tracking-wider text-center px-2"
              style={{
                fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
                letterSpacing: '0.08em'
              }}
            >
              EVENT SPONSORS
            </h1>
          </div>
        </div>

        {/* Right side - Thank you message */}
        <div className={`flex-1 text-white text-center lg:text-left order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{
              fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
              letterSpacing: '0.04em'
            }}
          >
            THANK YOU
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90 max-w-2xl mx-auto lg:mx-0">
            Hack the Ridge wouldn't be possible without the incredible support of our sponsors.
            Your partnership empowers the next generation of innovators and creators.
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-4">
            <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full shadow-lg shadow-orange-500/40"></div>
            <span className="text-base sm:text-lg font-semibold tracking-wide opacity-75">
              BUILDING THE FUTURE TOGETHER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsTitle;