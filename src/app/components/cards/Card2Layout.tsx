"use client";

import React from 'react';
import MetricCard from './MetricCard';

interface Card2LayoutProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
}

// Card 2 - History Timeline Layout (Slightly Less Space)
const Card2Layout: React.FC<Card2LayoutProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  imageUrl 
}) => {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-start relative">
      {/* Retro Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Header */}
      <header className="mb-6 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-wider leading-tight"
          style={{ 
            fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
            textShadow: '0 0 15px rgba(255,255,255,0.3)'
          }}>
          {headerTitle}
        </h2>
      </header>

      {/* Main Content - Horizontal Timeline Layout */}
      <main className="flex-grow flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 relative z-10">
        
        {/* Left Side - Content (2/3 width) */}
        <div className="w-full sm:w-2/3 space-y-6">
          {/* Title with Pulsing Effect */}
          {title && (
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-pulse"
              style={{ 
                fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
                background: 'linear-gradient(45deg, #fff, #00ffff, #fff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
              {title}
            </h3>
          )}
          
          {/* Content Sentences with Retro Styling */}
          <div className="space-y-4">
            {sentences.map((sentence, index) => (
              <div 
                key={index}
                className="relative pl-6"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: 'slideInLeft 0.7s ease-out forwards'
                }}
              >
                {/* Retro bullet points */}
                <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full" />
                <div className="absolute left-1 top-3 w-1 h-1 bg-white rounded-full" />
                
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

          {/* Timeline Visual with Metrics */}
          <div className="mt-8 space-y-6">
            {/* Timeline Line */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full" />
              
              {/* Timeline Points */}
              <div className="flex justify-between items-center relative z-10">
                <MetricCard 
                  value="2019" 
                  label="Started" 
                  variant="default"
                  size="medium"
                  className="transform hover:scale-110 transition-transform duration-300"
                />
                <MetricCard 
                  value="5" 
                  label="Years" 
                  variant="highlight"
                  size="large"
                  className="transform hover:scale-110 transition-transform duration-300 relative z-20"
                />
                <MetricCard 
                  value="2025" 
                  label="Now" 
                  variant="accent"
                  size="medium"
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Growth Stats */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard 
                value="500+" 
                label="Total Participants" 
                variant="accent"
                className="transform hover:rotate-2 transition-transform duration-300"
              />
              <MetricCard 
                value="50→200" 
                label="Growth Rate" 
                variant="highlight"
                className="transform hover:-rotate-2 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        
        {/* Right Side - Image (1/3 width) */}
        {imageUrl && (
          <div className="w-full sm:w-1/3 flex-shrink-0 relative">
            {/* Retro polaroid-style frame */}
            <div className="bg-white p-3 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={imageUrl}
                alt={title || headerTitle}
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded"
              />
              <div className="mt-2 text-center">
                <p className="text-gray-800 text-sm font-handwriting">Community Growth 📈</p>
              </div>
            </div>
            
            {/* Retro stickers */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold transform rotate-12">
              ⭐
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-xs transform -rotate-12">
              💫
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Card2Layout;