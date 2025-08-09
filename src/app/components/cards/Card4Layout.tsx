"use client";

import React from 'react';
import MetricCard from './MetricCard';

interface Card4LayoutProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
}

// Card 4 - 2025 Call to Action Layout (Least Space)
const Card4Layout: React.FC<Card4LayoutProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  imageUrl 
}) => {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between relative">
      {/* Retro Wave Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 11px
            )
          `
        }} />
      </div>

      {/* Header */}
      <header className="mb-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-wider leading-tight"
          style={{ 
            fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
            textShadow: '0 0 15px rgba(255,255,255,0.3)'
          }}>
          {headerTitle}
        </h2>
      </header>

      {/* Main Content - Balanced Layout */}
      <main className="flex-grow flex flex-col sm:flex-row gap-6 sm:gap-8 relative z-10">
        
        {/* Left Side - Content */}
        <div className="w-full sm:w-1/2 space-y-4">
          {/* Title */}
          {title && (
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ 
                fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
                background: 'linear-gradient(45deg, #fff, #ff6b6b, #4ecdc4, #fff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease-in-out infinite'
              }}>
              {title}
            </h3>
          )}
          
          {/* Content Sentences - Compact */}
          <div className="space-y-3">
            {sentences.map((sentence, index) => (
              <p 
                key={index}
                className={`
                  text-sm sm:text-base md:text-lg text-white leading-relaxed
                  ${index === 0 ? 'font-semibold' : ''}
                  ${index === 1 ? 'opacity-90' : ''}
                  ${index === 2 ? 'opacity-80' : ''}
                `}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {sentence}
              </p>
            ))}
          </div>

          {/* Countdown Display */}
          <div className="mt-6">
            <div className="inline-flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2025</div>
                <div className="text-xs text-white/75">Year</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">TBD</div>
                <div className="text-xs text-white/75">Date</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white animate-pulse">???</div>
                <div className="text-xs text-white/75">Days Left</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Image & CTA */}
        <div className="w-full sm:w-1/2 space-y-4">
          {/* Image with Retro Frame */}
          {imageUrl && (
            <div className="relative">
              {/* Retro computer monitor style */}
              <div className="bg-gray-200 p-3 rounded-lg shadow-xl">
                <div className="bg-black p-1 rounded">
                  <img
                    src={imageUrl}
                    alt={title || headerTitle}
                    className="w-full h-32 sm:h-40 object-cover rounded"
                  />
                </div>
                {/* Monitor stand */}
                <div className="w-16 h-3 bg-gray-300 mx-auto mt-2 rounded-b" />
                <div className="w-8 h-2 bg-gray-400 mx-auto rounded-b" />
              </div>
              
              {/* Retro "NEW" sticker */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded transform rotate-12 shadow-lg">
                NEW!
              </div>
            </div>
          )}
          
          {/* Call to Action Section */}
          <div className="text-center space-y-3">
            <button className="group w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-lg transform hover:scale-105 shadow-lg">
              <span className="flex items-center justify-center gap-2">
                Get Notified
                <span className="text-xl group-hover:animate-bounce">⚡</span>
              </span>
            </button>
            <p className="text-xs text-white/75">Be the first to know when registration opens!</p>
            
            {/* Social proof mini-metrics */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="bg-white/10 rounded-lg p-2 text-center border border-white/20">
                <div className="text-sm font-bold text-white">500+</div>
                <div className="text-xs text-white/75">Interested</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center border border-white/20">
                <div className="text-sm font-bold text-white">15+</div>
                <div className="text-xs text-white/75">Sponsors</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center border border-white/20">
                <div className="text-sm font-bold text-white">$20K+</div>
                <div className="text-xs text-white/75">Prizes</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Card4Layout;