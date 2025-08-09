"use client";

import React from 'react';
import CardContent from './CardContent';
import MetricCard from './MetricCard';

interface LastYearCardProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
}

const LastYearCard: React.FC<LastYearCardProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  imageUrl 
}) => {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-start">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-wider leading-tight"
          style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
          {headerTitle}
        </h2>
      </header>

      {/* Main Content Area - Image first layout (reversed) */}
      <main className="flex-grow flex flex-col sm:flex-row-reverse gap-6 sm:gap-8 lg:gap-12 w-full items-start">
        
        {/* Image Section - Larger showcase */}
        {imageUrl && (
          <div className="w-full sm:w-1/2 flex-shrink-0 mt-6 sm:mt-0">
            <img
              src={imageUrl}
              alt={title || headerTitle}
              className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 w-full h-48 sm:h-56 md:h-64 object-cover animate-fade-in-up"
            />
          </div>
        )}
        
        {/* Content Section */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center">
          
          {/* Title */}
          {title && (
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white hover:text-orange-300 transition-colors duration-300 leading-tight mb-6"
              style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
              {title}
            </h3>
          )}
          
          {/* Achievement Showcase */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <MetricCard 
              value="48" 
              label="Projects" 
              variant="highlight"
              size="small"
              className="animate-count-up"
            />
            <MetricCard 
              value="$10K+" 
              label="Prizes" 
              variant="accent"
              size="small"
              className="animate-count-up"
              style={{ animationDelay: '0.2s' }}
            />
            <MetricCard 
              value="15" 
              label="Sponsors" 
              variant="default"
              size="small"
              className="animate-count-up"
              style={{ animationDelay: '0.4s' }}
            />
            <MetricCard 
              value="24h" 
              label="Non-stop" 
              variant="highlight"
              size="small"
              className="animate-count-up"
              style={{ animationDelay: '0.6s' }}
            />
          </div>
          
          {/* Content Sentences */}
          <div className="mb-6">
            <CardContent 
              sentences={sentences}
              textColor={textColor}
              isLastCard={false}
            />
          </div>
          
          {/* Project Categories */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h4 className="font-bold text-center mb-3 text-white">2024 Project Categories</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {['AI/ML', 'Mobile Apps', 'Web Dev', 'IoT', 'Blockchain', 'Gaming'].map((category, idx) => (
                <span 
                  key={category}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-300 text-white animate-retro-slide"
                  style={{ animationDelay: `${1 + idx * 0.1}s` }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LastYearCard;