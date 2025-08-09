"use client";

import React from 'react';
import CardContent from './CardContent';
import MetricCard from './MetricCard';

interface AboutCardProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  isLastCard: boolean;
}

const AboutCard: React.FC<AboutCardProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  isLastCard 
}) => {
  return (
    <div className={`w-full h-full ${isLastCard ? 'p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20' : 'p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'} flex flex-col justify-center`}>
      {/* Header */}
      <header className="mb-8 text-center">
        <h2 className={`${isLastCard ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} font-extrabold uppercase ${textColor} tracking-wider leading-tight`}
          style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
          {headerTitle}
        </h2>
      </header>

      {/* Main Content Area - Centered Layout */}
      <main className="flex-grow flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
        
        {/* Title */}
        {title && (
          <h3 className={`${isLastCard ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold ${textColor} leading-tight mb-8 text-center`}
            style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
            {title}
          </h3>
        )}
        
        {/* Hero Metrics Row */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <MetricCard 
            value="24" 
            label="Hours" 
            variant="highlight"
            size="large"
            className="animate-count-up"
          />
          <MetricCard 
            value="200+" 
            label="Hackers" 
            variant="accent"
            size="large"
            className="animate-count-up"
            style={{ animationDelay: '0.2s' }}
          />
          <MetricCard 
            value="$15K" 
            label="Prizes" 
            variant="highlight"
            size="large"
            className="animate-count-up"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
        
        {/* Content Sentences */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <CardContent 
            sentences={sentences}
            textColor={textColor}
            isLastCard={isLastCard}
          />
        </div>
        
        {/* Interactive Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { title: "Build & Ship", desc: "Create real projects", emoji: "🚀" },
            { title: "Network", desc: "Meet like-minded devs", emoji: "👥" },
            { title: "Win Big", desc: "Compete for prizes", emoji: "🏆" },
            { title: "Learn", desc: "Workshops & mentoring", emoji: "⚡" },
            { title: "Free Food", desc: "Meals & snacks included", emoji: "🍕" },
            { title: "24/7 Fun", desc: "Non-stop excitement", emoji: "⭐" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="group p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <div className={`font-semibold text-sm mb-1 ${textColor}`}>{item.title}</div>
                <div className={`text-xs ${textColor} opacity-75`}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AboutCard;