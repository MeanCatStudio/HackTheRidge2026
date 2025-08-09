"use client";

import React from 'react';
import MetricCard from './MetricCard';

interface Card3LayoutProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
}

// Card 3 - Last Year Showcase Layout (Even Less Space)
const Card3Layout: React.FC<Card3LayoutProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  imageUrl 
}) => {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-start relative">
      {/* Retro Hexagon Pattern Background */}
      <div className="absolute inset-0 opacity-8">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
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

      {/* Main Content - Image First Layout */}
      <main className="flex-grow flex flex-col sm:flex-row sm:flex-row-reverse gap-6 sm:gap-8 relative z-10">
        
        {/* Left Side - Image Showcase (1/2 width) */}
        {imageUrl && (
          <div className="w-full sm:w-1/2 relative">
            {/* Retro TV/Monitor Frame */}
            <div className="relative bg-gray-800 p-4 rounded-2xl shadow-2xl">
              {/* TV Screen Bezel */}
              <div className="bg-black p-2 rounded-xl">
                <img
                  src={imageUrl}
                  alt={title || headerTitle}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Retro TV Controls */}
              <div className="absolute bottom-2 right-2 flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              </div>
              
              {/* Retro antenna */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-6 bg-gray-600 rounded-full" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full rotate-45" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full -rotate-45" />
              </div>
            </div>
          </div>
        )}
        
        {/* Right Side - Content (1/2 width) */}
        <div className="w-full sm:w-1/2 space-y-4">
          {/* Title with Interactive Hover */}
          {title && (
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight hover:text-orange-300 transition-colors duration-300"
              style={{ 
                fontFamily: 'Sacco, Impact, Arial Black, sans-serif'
              }}>
              {title}
            </h3>
          )}
          
          {/* Content Sentences */}
          <div className="space-y-3">
            {sentences.map((sentence, index) => (
              <div 
                key={index}
                className="relative"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: 'retroSlide 0.8s ease-out forwards'
                }}
              >
                <p className={`
                  text-base sm:text-lg md:text-xl text-white leading-relaxed
                  ${index === 0 ? 'font-semibold' : ''}
                  ${index === 1 ? 'opacity-90' : ''}
                  ${index === 2 ? 'opacity-80' : ''}
                `}>
                  {sentence}
                </p>
              </div>
            ))}
          </div>

          {/* Achievement Showcase - Compact Grid */}
          <div className="mt-6 space-y-4">
            {/* Top Row - Main Stats */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard 
                value="48" 
                label="Projects" 
                variant="highlight"
                size="small"
                className="transform hover:scale-105 transition-transform duration-300"
              />
              <MetricCard 
                value="$10K+" 
                label="Prizes" 
                variant="accent"
                size="small"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Bottom Row - Additional Stats */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard 
                value="15" 
                label="Sponsors" 
                variant="default"
                size="small"
                className="transform hover:scale-105 transition-transform duration-300"
              />
              <MetricCard 
                value="24h" 
                label="Non-stop" 
                variant="highlight"
                size="small"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Project Categories - Retro Pills */}
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
              <h4 className="font-bold text-center mb-2 text-sm text-white">2024 Categories</h4>
              <div className="flex flex-wrap justify-center gap-1">
                {['AI/ML', 'Mobile', 'Web', 'IoT', 'Blockchain', 'Gaming'].map((category) => (
                  <span 
                    key={category}
                    className="px-2 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-xs font-medium hover:from-purple-500/50 hover:to-pink-500/50 transition-all duration-300 border border-white/20"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Card3Layout;