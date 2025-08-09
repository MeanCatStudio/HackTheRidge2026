"use client";

import React from 'react';
import MetricCard from './MetricCard';

interface Card1LayoutProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
}

// Card 1 - Full Screen Hero Layout with Retro Aesthetic
const Card1Layout: React.FC<Card1LayoutProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  imageUrl 
}) => {
  return (
    <div className="w-full h-full p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center relative">
      {/* Retro Grid Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header with Retro Styling */}
      <header className="mb-8 text-center relative z-10">
        <div className="inline-block relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase text-white tracking-wider leading-tight"
            style={{ 
              fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
              textShadow: '0 0 20px rgba(255,255,255,0.3)'
            }}>
            {headerTitle}
          </h2>
          {/* Retro underline effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </header>

      {/* Main Content Area - Split Layout */}
      <main className="flex-grow flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
        
        {/* Left Side - Content */}
        <div className="w-full lg:w-3/5 space-y-8">
          {/* Title with Retro Glow */}
          {title && (
            <div className="text-center lg:text-left">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6"
                style={{ 
                  fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
                  background: 'linear-gradient(45deg, #fff, #ffd700, #fff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))'
                }}>
                {title}
              </h3>
            </div>
          )}
          
          {/* Content Sentences with Retro Styling */}
          <div className="space-y-6">
            {sentences.map((sentence, index) => (
              <div 
                key={index}
                className="relative"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Retro quote marks for first sentence */}
                {index === 0 && (
                  <div className="absolute -left-4 -top-2 text-6xl text-white/30 font-bold">"</div>
                )}
                
                <p className={`
                  text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed
                  ${index === 0 ? 'font-semibold pl-8' : ''}
                  ${index === 1 ? 'opacity-90 font-medium' : ''}
                  ${index === 2 ? 'opacity-80' : ''}
                `}>
                  {sentence}
                </p>
                
                {/* Retro accent line for last sentence */}
                {index === sentences.length - 1 && (
                  <div className="mt-4 w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500" />
                )}
              </div>
            ))}
          </div>

          {/* Hero Metrics Row */}
          <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 mt-8">
            <MetricCard 
              value="24" 
              label="Hours" 
              variant="highlight"
              size="large"
              className="transform hover:rotate-3 transition-transform duration-300"
            />
            <MetricCard 
              value="200+" 
              label="Hackers" 
              variant="accent"
              size="large"
              className="transform hover:-rotate-2 transition-transform duration-300"
            />
            <MetricCard 
              value="$15K" 
              label="Prizes" 
              variant="highlight"
              size="large"
              className="transform hover:rotate-1 transition-transform duration-300"
            />
          </div>
        </div>
        
        {/* Right Side - Image with Retro Frame */}
        {imageUrl && (
          <div className="w-full lg:w-2/5 relative">
            {/* Retro frame effect */}
            <div className="relative p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl border-2 border-white/30" />
              <div className="absolute -inset-2 rounded-2xl border border-white/10" />
              
              <img
                src={imageUrl}
                alt={title || headerTitle}
                className="w-full h-auto max-h-96 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Retro corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-white/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-white/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-white/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-white/50" />
            </div>
          </div>
        )}
      </main>

      {/* Retro Feature Grid */}
      <div className="mt-12 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {[
            { icon: "🚀", title: "Build & Ship", desc: "Create real projects" },
            { icon: "👥", title: "Network", desc: "Meet like-minded devs" },
            { icon: "🏆", title: "Win Big", desc: "Compete for prizes" },
            { icon: "⚡", title: "Learn", desc: "Workshops & mentoring" },
            { icon: "🍕", title: "Free Food", desc: "Meals & snacks included" },
            { icon: "🎉", title: "Fun", desc: "Intense but enjoyable" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="group p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
              style={{
                animationDelay: `${2 + idx * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="font-semibold text-sm text-white mb-1">{item.title}</div>
                <div className="text-xs text-white/75">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card1Layout;