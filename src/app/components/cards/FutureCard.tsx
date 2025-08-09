"use client";

import React from 'react';
import CardContent from './CardContent';

interface FutureCardProps {
  headerTitle: string;
  title?: string;
  sentences: string[];
  textColor: string;
  imageUrl?: string;
  isLastCard: boolean;
}

const FutureCard: React.FC<FutureCardProps> = ({ 
  headerTitle, 
  title, 
  sentences, 
  textColor, 
  imageUrl,
  isLastCard 
}) => {
  return (
    <div className={`w-full h-full ${isLastCard ? 'p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20' : 'p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'} flex flex-col ${isLastCard ? 'justify-center' : 'justify-start'}`}>
      {/* Header */}
      <header className="mb-6">
        <h2 className={`${isLastCard ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} font-extrabold uppercase ${textColor} tracking-wider leading-tight`}
          style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
          {headerTitle}
        </h2>
      </header>

      {/* Main Content Area - Balanced layout */}
      <main className={`${isLastCard ? 'mt-8 sm:mt-12 lg:mt-16 xl:mt-20' : 'mt-6 sm:mt-8 lg:mt-10 xl:mt-16'} flex-grow flex flex-col sm:flex-row ${isLastCard ? 'items-center' : 'items-start'} gap-6 sm:gap-8 lg:gap-12 w-full`}>
        
        {/* Content Section */}
        <div className={isLastCard ? 'w-full sm:w-3/5' : 'w-full sm:w-1/2'}>
          
          {/* Title */}
          {title && (
            <h3 className={`${isLastCard ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold ${textColor} leading-tight mb-8`}
              style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
              {title}
            </h3>
          )}
          
          {/* Countdown Style Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm animate-pulse-glow">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2025</div>
                <div className="text-sm opacity-75 text-white">Year</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">TBD</div>
                <div className="text-sm opacity-75 text-white">Date</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">???</div>
                <div className="text-sm opacity-75 text-white">Days Left</div>
              </div>
            </div>
          </div>
          
          {/* Content Sentences */}
          <div className="mb-8">
            <CardContent 
              sentences={sentences}
              textColor={textColor}
              isLastCard={isLastCard}
            />
          </div>
          
          {/* Call to Action */}
          <div className="text-center space-y-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-xl transform hover:scale-105 shadow-lg animate-fade-in-up">
              <span className="flex items-center gap-2 justify-center">
                Get Notified
                <span className="text-2xl">⚡</span>
              </span>
            </button>
            <p className="text-sm opacity-75 text-white animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Be the first to know when registration opens!
            </p>
          </div>
        </div>
        
        {/* Image Section */}
        {imageUrl && (
          <div className={isLastCard ? 'w-full sm:w-2/5 flex-shrink-0 mt-6 sm:mt-0' : 'w-full sm:w-1/3 flex-shrink-0 mt-6 sm:mt-0'}>
            <img
              src={imageUrl}
              alt={title || headerTitle}
              className={`rounded-xl shadow-lg w-full h-auto object-cover ${isLastCard ? 'max-h-64 sm:max-h-80 md:max-h-96' : ''} animate-fade-in-up`}
              style={{ animationDelay: '0.6s' }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default FutureCard;