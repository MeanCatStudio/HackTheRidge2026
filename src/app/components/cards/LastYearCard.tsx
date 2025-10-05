"use client";

import React, { useState, useEffect } from 'react';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselImages = [
    '/last_year/history1.jpg',
    '/last_year/history2.jpg',
    '/last_year/history3.jpg',
    '/last_year/history4.jpg',
    '/last_year/history5.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="w-full h-full p-6 flex flex-col justify-start">
      <header className="mb-6">
        <h2 className="text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-wider leading-tight"
          style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
          {headerTitle}
        </h2>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row gap-8 w-full">
        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96 bg-black">
            <img
              src={carouselImages[currentImageIndex]}
              alt={`Healthcare hackathon ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-1000"
              draggable={false}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-start space-y-6">
          {title && (
            <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
              {title}
            </h3>
          )}

          <div className="space-y-2">
            {sentences.map((sentence, index) => (
              <p key={index} className="text-lg text-white/90 leading-relaxed">
                {sentence}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-600 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🏥</div>
              <div className="text-3xl font-bold text-white">300+</div>
              <div className="text-sm text-white/90">Healthcare Innovators</div>
            </div>
            
            <div className="bg-purple-600 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-3xl font-bold text-white">40+</div>
              <div className="text-sm text-white/90">AI Projects Built</div>
            </div>
            
            <div className="bg-yellow-600 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-3xl font-bold text-white">$6K+</div>
              <div className="text-sm text-white/90">Prize Pool</div>
            </div>
            
            <div className="bg-teal-600 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-3xl font-bold text-white">20+</div>
              <div className="text-sm text-white/90">Industry Partners</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-slate-700 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="text-blue-400 text-lg mr-2">🔬</div>
                <span className="text-xs text-blue-400 uppercase tracking-wide">Medical Imaging</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI Diagnosis System</h4>
              <p className="text-sm text-white/80">Revolutionary diagnostic tool using computer vision</p>
            </div>
            
            <div className="bg-green-700 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="text-green-400 text-lg mr-2">💬</div>
                <span className="text-xs text-green-400 uppercase tracking-wide">Patient Care</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Patient Care Bot</h4>
              <p className="text-sm text-white/80">Smart chatbot for 24/7 patient monitoring</p>
            </div>
            
            <div className="bg-pink-700 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="text-pink-400 text-lg mr-2">⚗️</div>
                <span className="text-xs text-pink-400 uppercase tracking-wide">Research</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Drug Discovery ML</h4>
              <p className="text-sm text-white/80">Machine learning for accelerated drug research</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LastYearCard;
