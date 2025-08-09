"use client";

import React from 'react';
import CardContent from './CardContent';
import MetricCard from './MetricCard';

interface HistoryCardProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ 
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

      {/* Main Content Area - Side by side layout */}
      <main className="flex-grow flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 w-full">
        
        {/* Content Section - Takes more space */}
        <div className="w-full sm:w-2/3 flex flex-col justify-center">
          
          {/* Title with Animation */}
          {title && (
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white animate-pulse leading-tight mb-6"
              style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
              {title}
            </h3>
          )}
          
          {/* Timeline Visual */}
          <div className="relative mb-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-yellow-400 to-teal-400 rounded-full" />
            <div className="flex justify-between items-center relative z-10">
              <MetricCard 
                value="2019" 
                label="Started" 
                variant="default"
                size="small"
                className="animate-slide-in-left"
              />
              <MetricCard 
                value="5" 
                label="Years" 
                variant="highlight"
                size="medium"
                className="animate-count-up"
                style={{ animationDelay: '0.3s' }}
              />
              <MetricCard 
                value="2025" 
                label="Now" 
                variant="accent"
                size="small"
                className="animate-slide-in-left"
                style={{ animationDelay: '0.6s' }}
              />
            </div>
          </div>
          
          {/* Content Sentences */}
          <div className="mb-6">
            <CardContent 
              sentences={sentences}
              textColor={textColor}
              isLastCard={false}
            />
          </div>
          
          {/* Growth Stats */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              value="500+" 
              label="Total Participants" 
              variant="accent"
              className="animate-count-up"
              style={{ animationDelay: '0.8s' }}
            />
            <MetricCard 
              value="50→200" 
              label="Growth Rate" 
              variant="highlight"
              className="animate-count-up"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>
        
        {/* Photo Frames Section - Multiple frames with years */}
        <div className="w-full sm:w-1/3 flex-shrink-0 mt-6 sm:mt-0 flex flex-col items-center justify-center space-y-6">
          
          {/* Main Image Frame */}
          {imageUrl && (
            <div className="relative">
              <div className="bg-white p-2 rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src={imageUrl}
                  alt={title || headerTitle}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover animate-fade-in-up"
                  style={{ animationDelay: '1.2s' }}
                />
                <div className="text-center mt-2">
                  <span className="text-black text-sm font-bold">2019</span>
                </div>
              </div>
            </div>
          )}
          
          {/* 2017 Photo Frame */}
          <div className="relative">
            <div className="bg-white p-2 rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center animate-fade-in-up"
                style={{ animationDelay: '1.4s' }}>
                <span className="text-gray-600 text-xs">Photo</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-black text-sm font-bold">2017</span>
              </div>
            </div>
          </div>
          
          {/* 2016 Photo Frame */}
          <div className="relative">
            <div className="bg-white p-2 rounded-lg shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center animate-fade-in-up"
                style={{ animationDelay: '1.6s' }}>
                <span className="text-gray-600 text-xs">Photo</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-black text-sm font-bold">2016</span>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default HistoryCard;