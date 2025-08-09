"use client";

import React from 'react';

interface CardContentProps {
  sentences: string[];
  textColor: string;
  isLastCard?: boolean;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ 
  sentences, 
  textColor, 
  isLastCard = false,
  className = '' 
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {sentences.map((sentence, index) => (
        <p 
          key={index}
          className={`
            ${isLastCard ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : 'text-base sm:text-lg md:text-xl'} 
            ${textColor} 
            leading-relaxed
            ${index === 0 ? 'opacity-100 font-medium' : ''}
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
  );
};

export default CardContent;