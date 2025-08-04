"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';

// Section: Type Definitions
// ============================================================================

/**
 * Defines the shape of the data for a single card.
 * Exported to allow consumers of this component to use the type.
 */
export interface CardData {
  id: number;
  headerTitle: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  bgColor: string;
  textColor: string;
}


// Section: Constants
// ============================================================================

const HEADER_HEIGHT_REM = 8;


// Section: Internal StickyCard Component
// ============================================================================

interface InternalStickyCardProps {
  index: number;
  progress: number;
  cardData: CardData;
  numCards: number;
}

/**
 * Renders a single card that is sticky and animates based on scroll progress.
 * This is an internal component and not meant to be used directly.
 */
const InternalStickyCard: React.FC<InternalStickyCardProps> = ({ index, progress, cardData, numCards }) => {
  const { headerTitle, title, content, imageUrl, bgColor, textColor } = cardData;

  const scaleStartProgress = (index + 0.5) / numCards;
  const scaleProgress = (progress - scaleStartProgress) / (1 - scaleStartProgress);

  const baseScale = 1 - (numCards - 1 - index) * 0.03;
  const dynamicScale = Math.max(baseScale, 1 - Math.max(0, scaleProgress) * 0.05);

  // For the last card, make it stick to the top (full screen)
  const isLastCard = index === numCards - 1;
  const topPosition = isLastCard ? 0 : index * HEADER_HEIGHT_REM;

  return (
    <div
      className="h-screen sticky"
      style={{ top: `${topPosition}rem` }}
    >
      <div
        className={`relative h-full w-full ${bgColor} ${isLastCard ? 'rounded-none' : 'rounded-t-5xl'} shadow-2xl shadow-black/40 overflow-hidden`}
        style={{
          transform: `scale(${isLastCard ? 1 : dynamicScale})`,
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transformOrigin: 'top',
        }}
      >
        <div className={`w-full h-full ${isLastCard ? 'p-12 md:p-16 lg:p-20' : 'p-8 md:p-10 lg:p-12'} flex flex-col ${isLastCard ? 'justify-center' : 'justify-start'}`}>
          <header>
            <h2 className={`${isLastCard ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-extrabold uppercase ${textColor} tracking-wider`}>
              {headerTitle}
            </h2>
          </header>

          {(title || content || imageUrl) && (
            <main className={`${isLastCard ? 'mt-16 lg:mt-20' : 'mt-10 lg:mt-16'} flex-grow flex ${getLayoutClass(index)} items-${isLastCard ? 'center' : 'start'} gap-12 w-full`}>
              <div className={getContentClass(index, isLastCard)}>
                <h3 className={`${isLastCard ? 'text-6xl md:text-7xl lg:text-8xl' : getTitleClass(index)} font-bold ${textColor} ${getAnimationClass(index)}`}>
                  {title}
                </h3>
                <p className={`mt-6 ${isLastCard ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} ${textColor} opacity-80 leading-relaxed`}>
                  {content}
                </p>
                {getHighlightElement(index, textColor)}
              </div>
              
              {imageUrl && (
                <div className={getImageClass(index, isLastCard)}>
                  <img
                    src={imageUrl}
                    alt={title || headerTitle}
                    className={`${getImageStyling(index)} w-full h-auto object-cover ${isLastCard ? 'max-h-96' : ''}`}
                  />
                </div>
              )}
            </main>
          )}
        </div>
      </div>
    </div>
  );
};

// Section: Layout Helper Functions
// ============================================================================

const getLayoutClass = (index: number): string => {
  switch (index) {
    case 0: return 'flex-col'; // About - full width stacked layout
    case 1: return 'justify-start'; // History - content first
    case 2: return 'justify-end flex-row-reverse'; // Last Year - image first
    case 3: return 'justify-between'; // 2025 - balanced
    default: return 'justify-between';
  }
};

const getContentClass = (index: number, isLastCard: boolean): string => {
  if (isLastCard) return 'w-3/5';
  
  switch (index) {
    case 0: return 'w-full text-center'; // About - full width centered
    case 1: return 'w-2/3'; // History - more content space
    case 2: return 'w-1/2'; // Last Year - equal split
    default: return 'w-1/2';
  }
};

const getImageClass = (index: number, isLastCard: boolean): string => {
  if (isLastCard) return 'w-2/5 flex-shrink-0';
  
  switch (index) {
    case 0: return 'w-full mt-8'; // About - full width image below content
    case 1: return 'w-1/4 flex-shrink-0'; // History - smaller image for stats focus
    case 2: return 'w-1/2 flex-shrink-0'; // Last Year - larger image showcase
    default: return 'w-1/3 flex-shrink-0';
  }
};

const getTitleClass = (index: number): string => {
  switch (index) {
    case 0: return 'text-4xl md:text-5xl'; // About - standard
    case 1: return 'text-5xl md:text-6xl lg:text-7xl'; // History - emphasize numbers
    case 2: return 'text-4xl md:text-5xl'; // Last Year - standard
    default: return 'text-4xl md:text-5xl';
  }
};

const getImageStyling = (index: number): string => {
  switch (index) {
    case 0: return 'rounded-2xl shadow-2xl mx-auto max-w-4xl h-64 object-cover'; // About - wide hero image
    case 1: return 'rounded-full shadow-2xl'; // History - circular for community feel
    case 2: return 'rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300'; // Last Year - interactive showcase
    case 3: return 'rounded-xl shadow-lg'; // 2025 - standard
    default: return 'rounded-xl shadow-lg';
  }
};

const getAnimationClass = (index: number): string => {
  switch (index) {
    case 1: return 'animate-pulse'; // History - pulsing numbers
    case 2: return 'hover:text-orange-300 transition-colors duration-300'; // Last Year - interactive
    default: return '';
  }
};

const getHighlightElement = (index: number, textColor: string): React.ReactElement | null => {
  switch (index) {
    case 0: // About - hero feature grid
      return (
        <div className="mt-8 space-y-6">
          {/* Key stats row */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">24</div>
              <div className="text-sm opacity-75">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">200+</div>
              <div className="text-sm opacity-75">Hackers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">$15K</div>
              <div className="text-sm opacity-75">Prizes</div>
            </div>
          </div>
          
          {/* Feature grid */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-semibold text-sm">Build & Ship</div>
              <div className="text-xs opacity-75 mt-1">Create real projects</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-semibold text-sm">Network</div>
              <div className="text-xs opacity-75 mt-1">Meet like-minded devs</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold text-sm">Win Big</div>
              <div className="text-xs opacity-75 mt-1">Compete for prizes</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-semibold text-sm">Learn</div>
              <div className="text-xs opacity-75 mt-1">Workshops & mentoring</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🍕</div>
              <div className="font-semibold text-sm">Free Food</div>
              <div className="text-xs opacity-75 mt-1">Meals & snacks included</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-sm">Fast-Paced</div>
              <div className="text-xs opacity-75 mt-1">Intense but fun</div>
            </div>
          </div>
        </div>
      );
    case 1: // History - animated counter
      return (
        <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="text-4xl font-bold mb-2">5 Years Strong</div>
          <div className="text-sm opacity-75">Growing community since 2019</div>
        </div>
      );
    case 2: // Last Year - achievement grid
      return (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold">$10K+</div>
            <div className="text-sm opacity-75">In Prizes</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm opacity-75">Sponsors</div>
          </div>
        </div>
      );
    case 3: // 2025 - call to action
      return (
        <div className="mt-8">
          <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 text-xl">
            Get Notified
          </button>
        </div>
      );
    default:
      return null;
  }
};


// Section: Main Exported Component
// ============================================================================

interface InteractiveScrollingCardsProps {
  cards: CardData[];
}

/**
 * A self-contained component that renders a stack of cards
 * with a scroll-driven animation effect.
 */
const InteractiveScrollingCards: React.FC<InteractiveScrollingCardsProps> = ({ cards }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const numCards = cards.length;

  const handleScroll = useCallback(() => {
    const element = ref.current;
    if (element) {
      const { top, height } = element.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      const currentProgress = -top / scrollableHeight;
      setProgress(Math.max(0, Math.min(1, currentProgress)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!cards || numCards === 0) {
    return null;
  }

  return (
    <section ref={ref} className="relative z-10" style={{ height: `${numCards * 100}vh` }}>
      {cards.map((card, index) => (
        <InternalStickyCard key={card.id} index={index} progress={progress} cardData={card} numCards={numCards} />
      ))}
    </section>
  );
};

export default InteractiveScrollingCards;