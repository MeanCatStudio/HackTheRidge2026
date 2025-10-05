"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import RegisterCard from './cards/RegisterCard';
import { VideoText } from '../../components/magicui/video-text';
import { DraggableCardBody, DraggableCardContainer } from '../../components/ui/draggable-card';

// Carousel Component for Last Year Card
const CarouselComponent: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselImages = [
    '/last_year/history1.jpg',
    '/last_year/history2.jpg',
    '/last_year/history3.jpg',
    '/last_year/history4.jpg',
    '/last_year/history5.jpg',
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 6000); // 6 second intervals
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div className="relative bg-white/10 rounded-lg overflow-hidden h-24 md:h-28 lg:h-96 backdrop-blur-sm">
      {/* Image Display */}
      <div className="relative w-full h-full">
        <img
          src={carouselImages[currentImageIndex]}
          alt={`Healthcare hackathon photo ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          draggable={false}
        />
        
        {/* Fallback mountain landscape for missing images */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/10">
          <div className="relative w-full h-full flex items-center justify-center opacity-30">
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="w-32 h-24 bg-white/20 rounded-t-full"></div>
            </div>
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="w-20 h-16 bg-white/30 rounded-t-full mb-6"></div>
            </div>
            <div className="absolute top-8 right-12 w-6 h-6 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors z-10 p-1.5 md:p-2 rounded-full bg-black/20 hover:bg-black/40"
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors z-10 p-1.5 md:p-2 rounded-full bg-black/20 hover:bg-black/40"
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>

      {/* Image Indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 md:space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

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

const HEADER_HEIGHT_REM = 4;

// Collision detection and position generation utilities
interface CardPosition {
  x: number;
  y: number;
  tilt: number;
}

const generateStaticPositions = (count: number): CardPosition[] => {
  // Get viewport dimensions (with fallbacks for SSR)
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // Responsive scaling based on viewport size and aspect ratio
  const aspectRatio = viewportWidth / viewportHeight;
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth < 1024;
  
  // Dynamic scaling factors based on screen size
  let widthMultiplier, heightMultiplier, minClearance;
  
  if (isMobile) {
    // Mobile: tighter positioning, more vertical space, smaller cards
    widthMultiplier = 0.35;
    heightMultiplier = 0.3;
    minClearance = 0.2;
  } else if (isTablet) {
    // Tablet: moderate positioning
    widthMultiplier = 0.55;
    heightMultiplier = 0.4;
    minClearance = 0.3;
  } else if (aspectRatio > 1.8) {
    // Wide screens (ultrawide): more horizontal spread
    widthMultiplier = 0.8;
    heightMultiplier = 0.35;
    minClearance = 0.25;
  } else {
    // Standard desktop: original-like positioning but improved
    widthMultiplier = 0.65;
    heightMultiplier = 0.42;
    minClearance = 0.28;
  }
  
  // Responsive positions with better clearance around center stats
  const staticPositions = [
    // Top arc - adjusted for better clearance
    { x: -0.38, y: -0.42, tilt: -15 },  // 2017 - top left
    { x: -0.15, y: -0.50, tilt: 8 },    // 2018 - top left-center (moved further out)
    { x: 0.15, y: -0.50, tilt: 18 },    // 2019 - top right-center (moved further out)
    { x: 0.38, y: -0.42, tilt: -6 },    // 2020 - top right
    
    // Middle sides - increased clearance from center stats
    { x: -0.55, y: -0.05, tilt: 12 },   // 2021 - middle left (moved further out and slightly up)
    { x: 0.55, y: -0.05, tilt: -20 },   // 2022 - middle right (moved further out and slightly up)
    
    // Bottom arc - better clearance
    { x: -0.38, y: 0.38, tilt: -12 },   // 2023 - bottom left
    { x: 0.38, y: 0.38, tilt: 22 },     // 2024 - bottom right
  ];
  
  // Apply responsive positioning with proper constraints
  const positions: CardPosition[] = staticPositions.slice(0, count).map(pos => {
    // Calculate base positions with responsive scaling
    let baseX = pos.x * widthMultiplier;
    let baseY = pos.y * heightMultiplier;
    
    // Ensure minimum clearance from center (where stats are)
    const distanceFromCenter = Math.sqrt(baseX * baseX + baseY * baseY);
    if (distanceFromCenter < minClearance) {
      const scale = minClearance / distanceFromCenter;
      baseX *= scale;
      baseY *= scale;
    }
    
    return {
      x: baseX,
      y: baseY,
      tilt: pos.tilt
    };
  });
  
  return positions;
};


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
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const [isClient, setIsClient] = useState(false);

  const scaleStartProgress = (index + 0.5) / numCards;
  const scaleProgress = (progress - scaleStartProgress) / (1 - scaleStartProgress);

  const baseScale = 1 - (numCards - 1 - index) * 0.03;
  const dynamicScale = Math.max(baseScale, 1 - Math.max(0, scaleProgress) * 0.05);

  // For the last card, make it stick to the top (full screen)
  const isLastCard = index === numCards - 1;
  const topPosition = isLastCard ? 0 : index * HEADER_HEIGHT_REM;

  // Track client-side hydration to ensure proper viewport detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate responsive positions that update on resize
  const updatePositions = useCallback(() => {
    // Ensure we have proper viewport dimensions before calculating positions
    if (typeof window !== 'undefined') {
      setCardPositions(generateStaticPositions(8));
    }
  }, []);

  useEffect(() => {
    // Force immediate position calculation on mount with proper viewport dimensions
    const initializePositions = () => {
      if (typeof window !== 'undefined' && isClient) {
        // Use multiple strategies to ensure viewport dimensions are accurate
        const calculatePositions = () => {
          setCardPositions(generateStaticPositions(8));
        };

        // Immediate calculation
        calculatePositions();
        
        // Backup calculation after a short delay to handle any layout shifts
        const timeoutId = setTimeout(calculatePositions, 100);
        
        // Additional calculation using requestAnimationFrame for DOM readiness
        requestAnimationFrame(() => {
          requestAnimationFrame(calculatePositions);
        });

        return () => clearTimeout(timeoutId);
      }
    };

    // Only initialize after client-side hydration is complete
    if (isClient) {
      const cleanup = initializePositions();
      
      // Add resize listener with throttling
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updatePositions, 150); // Throttle for performance
      };

      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        cleanup?.();
      };
    }
  }, [updatePositions, isClient]);

  // Initialize positions with current viewport dimensions (not SSR fallbacks)
  const fallbackPositions = useMemo(() => {
    // Only generate fallback positions on client-side with actual viewport dimensions
    if (typeof window !== 'undefined' && isClient) {
      return generateStaticPositions(8);
    }
    // Return empty array during SSR to prevent hydration mismatches
    return [];
  }, [isClient]);
  
  const activePositions = cardPositions.length > 0 ? cardPositions : fallbackPositions;

  return (
    <div
      className="h-screen sticky"
      style={{ top: `${topPosition}rem` }}
    >
      <div
        className={`relative h-full w-full ${bgColor} ${isLastCard ? 'rounded-none shadow-none' : 'rounded-t-5xl shadow-2xl shadow-black/40'} overflow-hidden`}
        style={{
          transform: `scale(${isLastCard ? 1 : dynamicScale})`,
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transformOrigin: 'top',
          ...(isLastCard ? { boxShadow: 'none', filter: 'none' } : {})
        }}
      >
        <div className={`w-full h-full ${index === 3 ? 'p-0' : isLastCard ? 'p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20' : 'p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'} flex flex-col ${isLastCard ? 'justify-center' : 'justify-start'}`}>
          {/* Special handling for first card - VideoText with description */}
          {index === 0 ? (
            <main className="relative w-full h-full px-4">
              {/* VideoText centered */}
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-7xl h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                  <VideoText
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    fontSize="6vw"
                    fontWeight="900"
                    className="w-full h-full text-center"
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    fontFamily="Arial, sans-serif"
                  >
                    Build for{'\n'}Tomorrow Today
                  </VideoText>
                </div>
              </div>
              {/* Description positioned absolutely at bottom */}
              <div className="absolute bottom-4 md:bottom-2 lg:bottom-8 left-4 right-4">
                <div className="max-w-4xl text-center mx-auto">
                  <p className={`text-lg sm:text-xl md:text-2xl ${textColor} opacity-90 leading-relaxed font-medium`}>
                    <strong>Hack the Ridge</strong> is where <strong>innovation meets community</strong>. We are an annual <strong>hackathon</strong> at Iroquois Ridge High School that hosts over <strong>150+ leaders in STEM</strong> every year to <strong>innovate and push the limit of technology</strong>.
                  </p>
                </div>
              </div>
            </main>
          ) : index === 1 ? (
            /* Special handling for history card - Stats layout with draggable year cards */
            <main className="flex-grow flex items-center justify-center w-full h-full px-4 relative overflow-hidden">
              {/* Header positioned absolutely at top */}
              <div className="absolute top-8 left-4 right-4 z-20">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase ${textColor} tracking-wider leading-tight`}>
                  {headerTitle}
                </h2>
              </div>
              
              {/* Draggable Cards Container */}
              <DraggableCardContainer className="absolute inset-0 z-10">
                {/* All 8 cards (years 2017-2024) with collision detection positioning */}
                {Array.from({ length: 8 }, (_, i) => {
                  const year = 2017 + i;
                  const position = activePositions[i];
                  
                  // Enhanced safety check - don't render if position is undefined or invalid
                  if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
                    return null;
                  }
                  
                  // Theme colors for each card
                  const themeColors = ['#e0cc75', '#7bb1a0', '#b7634c', '#b4d686', '#b7634c', '#b4d686', '#e0cc75', '#7bb1a0'];
                  const cardColor = themeColors[i];
                  
                  return (
                    <div
                      key={year}
                      className="absolute transition-all duration-500 ease-out"
                      style={{
                        left: `calc(50% + ${position.x * (typeof window !== 'undefined' ? window.innerWidth : 1200)}px)`,
                        top: `calc(50% + ${position.y * (typeof window !== 'undefined' ? window.innerHeight : 800)}px)`,
                        transform: `translate(-50%, -50%) rotate(${position.tilt}deg)`,
                      }}
                    >
                      <DraggableCardBody
                        className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-36 lg:h-40 xl:w-40 xl:h-44 min-h-0 backdrop-blur-sm border border-white/30 p-1 sm:p-1.5 md:p-1.5 lg:p-2 text-center flex flex-col overflow-hidden transition-all duration-300"
                        style={{ backgroundColor: cardColor + '20' }}
                      >
                        {/* Local history photo */}
                        <div
                          className="w-full flex-1 rounded-2xl flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: cardColor }}
                        >
                          <img
                            src={`/history photos/photo${i + 1}.jpg`}
                            alt={`${year} Hack the Ridge`}
                            className="w-full h-full object-cover rounded-2xl opacity-90"
                            draggable={false}
                          />
                        </div>
                        </DraggableCardBody>
                    </div>
                  );
                })}
              </DraggableCardContainer>
              
              {/* Stats perfectly centered in full height */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-6xl relative z-20">
                {/* Years of Innovation */}
                <div className="text-center">
                  <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-none mb-4`}>
                    10
                  </div>
                  <div className={`text-lg sm:text-xl md:text-2xl ${textColor} font-medium`}>
                    Years of Innovation
                  </div>
                </div>

                {/* Innovators */}
                <div className="text-center">
                  <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-none mb-4`}>
                    2000+
                  </div>
                  <div className={`text-lg sm:text-xl md:text-2xl ${textColor} font-medium`}>
                    Innovators
                  </div>
                </div>

                {/* Prizes */}
                <div className="text-center">
                  <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-none mb-4`}>
                    $70,000+
                  </div>
                  <div className={`text-lg sm:text-xl md:text-2xl ${textColor} font-medium`}>
                    Prizes
                  </div>
                </div>

                {/* Vertical dividers positioned between columns */}
                <div className={`hidden md:block absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-24 bg-white opacity-40`}></div>
                <div className={`hidden md:block absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-24 bg-white opacity-40`}></div>
              </div>
            </main>
          ) : (
            <>
              {/* Hide header for register card (index 3) */}
              {index !== 3 && (
                <header>
                  <h2 className={`${isLastCard ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} font-extrabold uppercase ${textColor} tracking-wider leading-tight`}>
                    {headerTitle}
                  </h2>
                </header>
              )}

              {/* Special handling for 2025 Register Card */}
              {index === 3 ? (
                <main className="flex-grow w-full h-full">
                  <RegisterCard textColor={textColor} />
                </main>
              ) : index === 2 ? (
                /* Special handling for Last Year Card - Custom minimalist design */
                <main className="flex-grow w-full h-full">
                  {getHighlightElement(index, textColor)}
                </main>
              ) : (
                (title || content || imageUrl) && (
                  <main className={`${isLastCard ? 'mt-8 sm:mt-12 lg:mt-16 xl:mt-20' : 'mt-6 sm:mt-8 lg:mt-10 xl:mt-16'} flex-grow flex ${getLayoutClass(index)} items-${isLastCard ? 'center' : 'start'} gap-6 sm:gap-8 lg:gap-12 w-full`}>
                    <div className={getContentClass(index, isLastCard)}>
                      <h3 className={`${isLastCard ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl' : getTitleClass(index)} font-bold ${textColor} ${getAnimationClass(index)} leading-tight`}>
                        {title}
                      </h3>
                      <p className={`mt-4 sm:mt-6 ${isLastCard ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : 'text-base sm:text-lg md:text-xl'} ${textColor} opacity-80 leading-relaxed`}>
                        {content}
                      </p>
                      {getHighlightElement(index, textColor)}
                    </div>
                    
                    {imageUrl && (
                      <div className={getImageClass(index, isLastCard)}>
                        <img
                          src={imageUrl}
                          alt={title || headerTitle}
                          className={`${getImageStyling(index)} w-full h-auto object-cover ${isLastCard ? 'max-h-64 sm:max-h-80 md:max-h-96' : ''}`}
                        />
                      </div>
                    )}
                  </main>
                )
              )}
            </>
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
    case 1: return 'flex-col sm:flex-row sm:justify-start'; // History - content first, stack on mobile
    case 2: return 'flex-col sm:flex-row sm:justify-end sm:flex-row-reverse'; // Last Year - image first, stack on mobile
    case 3: return 'flex-col sm:flex-row sm:justify-between'; // 2025 - balanced, stack on mobile
    default: return 'flex-col sm:flex-row sm:justify-between';
  }
};

const getContentClass = (index: number, isLastCard: boolean): string => {
  if (isLastCard) return 'w-full sm:w-3/5';
  
  switch (index) {
    case 0: return 'w-full text-center'; // About - full width centered
    case 1: return 'w-full sm:w-2/3'; // History - more content space, full width on mobile
    case 2: return 'w-full sm:w-1/2'; // Last Year - equal split, full width on mobile
    default: return 'w-full sm:w-1/2';
  }
};

const getImageClass = (index: number, isLastCard: boolean): string => {
  if (isLastCard) return 'w-full sm:w-2/5 flex-shrink-0 mt-6 sm:mt-0';
  
  switch (index) {
    case 0: return 'w-full mt-6 sm:mt-8'; // About - full width image below content
    case 1: return 'w-full sm:w-1/4 flex-shrink-0 mt-6 sm:mt-0'; // History - smaller image for stats focus
    case 2: return 'w-full sm:w-1/2 flex-shrink-0 mt-6 sm:mt-0'; // Last Year - larger image showcase
    default: return 'w-full sm:w-1/3 flex-shrink-0 mt-6 sm:mt-0';
  }
};

const getTitleClass = (index: number): string => {
  switch (index) {
    case 0: return 'text-3xl sm:text-4xl md:text-5xl'; // About - standard
    case 1: return 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'; // History - emphasize numbers
    case 2: return 'text-3xl sm:text-4xl md:text-5xl'; // Last Year - standard
    default: return 'text-3xl sm:text-4xl md:text-5xl';
  }
};

const getImageStyling = (index: number): string => {
  switch (index) {
    case 0: return 'rounded-2xl shadow-2xl mx-auto max-w-4xl h-48 sm:h-56 md:h-64 object-cover'; // About - wide hero image
    case 1: return 'rounded-full shadow-2xl'; // History - circular for community feel
    case 2: return 'rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300'; // Last Year - interactive showcase
    case 3: return 'rounded-xl'; // 2025 - no shadow
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
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
    case 2: // Last Year - Minimalist Healthcare Design
     return (
       <div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-12 w-full h-full items-start justify-start pt-1 md:pt-2 lg:pt-12 px-2 md:px-3 lg:px-8">
         {/* Left Side - Content */}
         <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col justify-start space-y-1.5 md:space-y-2.5 lg:space-y-10 max-w-4xl overflow-hidden">
           
           {/* Header with Medical Icon */}
           <div className="flex items-center space-x-1.5 md:space-x-2 lg:space-x-3 mb-1 md:mb-1.5 lg:mb-6">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white md:w-5 lg:w-7 md:h-5 lg:h-7">
               <path d="M12 22v-20M12 2l-3 1.5c-1.5.5-2.5 2-2.5 3.5v1c0 1 .5 2 1.5 2.5L12 12l4-1.5c1-.5 1.5-1.5 1.5-2.5v-1c0-1.5-1-3-2.5-3.5L12 2zM12 12l-4 1.5c-1 .5-1.5 1.5-1.5 2.5v1c0 1.5 1 3 2.5 3.5L12 22l3-1.5c1.5-.5 2.5-2 2.5-3.5v-1c0-1-.5-2-1.5-2.5L12 12z"/>
               <path d="M2 2l5 3M22 2l-5 3M2 5c2 0 4-1 5-2M22 5c-2 0-4-1-5-2" fill="currentColor"/>
             </svg>
             <span className="text-xs md:text-xs lg:text-base text-white/70 font-medium">htr_2024</span>
           </div>

           {/* Stats Grid - responsive columns with dividers */}
           <div className="relative grid grid-cols-2 md:grid-cols-4 bg-white/5 rounded-lg p-1 md:p-2 lg:p-8 backdrop-blur-sm">
             {/* Responsive dividers */}
             {/* Mobile: only vertical center line for 2x2 grid */}
             <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white md:hidden transform -translate-x-1/2"></div>
             <div className="absolute left-0 right-0 top-1/2 h-px bg-white md:hidden transform -translate-y-1/2"></div>
             
             {/* Desktop: vertical lines for 4 columns */}
             <div className="hidden md:block absolute left-1/4 top-4 bottom-4 w-px bg-white"></div>
             <div className="hidden md:block absolute left-2/4 top-4 bottom-4 w-px bg-white"></div>
             <div className="hidden md:block absolute left-3/4 top-4 bottom-4 w-px bg-white"></div>
             
             <div className="text-center px-0.5 md:px-2 lg:px-6 py-0.5 md:py-0">
               <div className="text-white/60 mb-0.5 md:mb-2 lg:mb-4">
                 <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="mx-auto md:w-4 lg:w-8 md:h-4 lg:h-8">
                   <path d="M2 6c0-1.1.9-2 2-2h5l2 2h9c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6z"/>
                 </svg>
               </div>
               <div className="text-white/80 text-xs md:text-xs lg:text-base font-medium">38 projects</div>
             </div>
             
             <div className="text-center px-0.5 md:px-2 lg:px-6 py-0.5 md:py-0">
               <div className="text-white/60 mb-0.5 md:mb-2 lg:mb-4">
                 <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="mx-auto md:w-4 lg:w-8 md:h-4 lg:h-8">
                   <circle cx="6" cy="6" r="4"/>
                   <circle cx="12" cy="6" r="4"/>
                   <circle cx="18" cy="6" r="4"/>
                   <path d="M2 20c0-3.3 1.8-6 4-6s4 2.7 4 6M8 20c0-3.3 1.8-6 4-6s4 2.7 4 6M14 20c0-3.3 1.8-6 4-6s4 2.7 4 6"/>
                 </svg>
               </div>
               <div className="text-white/80 text-xs md:text-xs lg:text-base font-medium">330 registrants</div>
             </div>
             
             <div className="text-center px-0.5 md:px-2 lg:px-6 py-0.5 md:py-0">
               <div className="text-white/60 mb-0.5 md:mb-2 lg:mb-4">
                 <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="mx-auto md:w-4 lg:w-8 md:h-4 lg:h-8">
                   <rect x="2" y="2" width="4" height="18"/>
                   <rect x="8" y="8" width="14" height="12"/>
                   <path d="M8 8L14 2v6z"/>
                   <path d="M16 2v6l6-6v6z"/>
                   <rect x="10" y="12" width="2" height="2"/>
                   <rect x="14" y="12" width="2" height="2"/>
                   <rect x="18" y="12" width="2" height="2"/>
                 </svg>
               </div>
               <div className="text-white/80 text-xs md:text-xs lg:text-base font-medium">25 industry partners</div>
             </div>
             
             <div className="text-center px-0.5 md:px-2 lg:px-6 py-0.5 md:py-0">
               <div className="text-white/60 mb-0.5 md:mb-2 lg:mb-4">
                 <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="mx-auto md:w-4 lg:w-8 md:h-4 lg:h-8">
                   <path d="M12 2l2.5 5.5L20 8.5l-4 4 1 6-5-2.5L7 18l1-6-4-4 5.5-1L12 2z"/>
                   <circle cx="12" cy="9" r="3" fill="white"/>
                   <path d="M8 15l-1 6 5-2.5L17 21l-1-6" fill="currentColor"/>
                 </svg>
               </div>
               <div className="text-white/80 text-xs md:text-xs lg:text-base font-medium">$6000 in prizes</div>
             </div>
           </div>

           {/* Tech Stack Section - responsive 2x2 Grid */}
           <div className="relative grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 lg:gap-8">
             {/* Grid lines - responsive */}
             <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-white/40 transform -translate-y-1/2"></div>
             <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/40 transform -translate-x-1/2"></div>
             {/* Python */}
             <div className="space-y-0.5 md:space-y-1 lg:space-y-4">
               <div className="flex items-center space-x-1.5 md:space-x-2 lg:space-x-3">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 md:w-4 lg:w-5 md:h-4 lg:h-5">
                   <path d="M12 2C8.5 2 6 4.5 6 8v4h12V8c0-3.5-2.5-6-6-6z"/>
                   <path d="M6 12v4c0 3.5 2.5 6 6 6s6-2.5 6-6v-4H6z"/>
                   <circle cx="9" cy="6" r="1.5" fill="white"/>
                   <circle cx="15" cy="18" r="1.5" fill="white"/>
                   <path d="M8 10h8v4H8z" fill="white"/>
                 </svg>
                 <span className="text-white/80 text-xs md:text-xs lg:text-base font-medium">
                   <span className="xl:hidden">Python Workshop</span>
                   <span className="hidden xl:inline">Intro to Python Workshop (led by IRHS CS)</span>
                 </span>
               </div>
               <div className="mt-0.5 md:mt-0.5 lg:mt-3">
                 <p className="text-white/70 text-xs md:text-xs lg:text-sm leading-tight lg:leading-relaxed">
                   <span className="xl:hidden">Learn programming basics: functions, loops, and conditionals.</span>
                   <span className="hidden xl:inline">Hackers wrote their first lines of code and learned essential programming concepts like functions, loops, conditionals, and comparisons in this Intro to Python Workshop led by IRHS CS.</span>
                 </p>
               </div>
             </div>

             {/* Code/Development */}
             <div className="space-y-0.5 md:space-y-1 lg:space-y-4">
               <div className="flex items-center space-x-1.5 md:space-x-2 lg:space-x-3">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 md:w-4 lg:w-5 md:h-4 lg:h-5">
                   <path d="M8 6L2 12l6 6v-3l-3-3 3-3V6zM16 6v3l3 3-3 3v3l6-6-6-6zM13 4l-2 16h2l2-16h-2z"/>
                 </svg>
                 <span className="text-white/80 text-xs md:text-xs lg:text-base font-medium">
                   <span className="xl:hidden">Web Development</span>
                   <span className="hidden xl:inline">Web Development Workshop</span>
                 </span>
               </div>
               <div className="mt-0.5 md:mt-0.5 lg:mt-3">
                 <p className="text-white/70 text-xs md:text-xs lg:text-sm leading-tight lg:leading-relaxed">
                   <span className="xl:hidden">Build interactive websites with HTML, CSS, and JavaScript.</span>
                   <span className="hidden xl:inline">Hackers learned to build and launch interactive websites using HTML, CSS, and JavaScript while engaging in discussions with peers, gaining hands-on skills to prepare for web development at Hack the Ridge.</span>
                 </p>
               </div>
             </div>

             {/* Web/Frontend */}
             <div className="space-y-0.5 md:space-y-1 lg:space-y-4">
               <div className="flex items-center space-x-1.5 md:space-x-2 lg:space-x-3">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 md:w-4 lg:w-5 md:h-4 lg:h-5">
                   <rect x="2" y="4" width="20" height="16" rx="2"/>
                   <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 8l-2 8" stroke="white" strokeWidth="1.5" fill="none"/>
                 </svg>
                 <span className="text-white/80 text-xs md:text-xs lg:text-base font-medium">
                   <span className="xl:hidden">React Workshop</span>
                   <span className="hidden xl:inline">Frontend Workshop</span>
                 </span>
               </div>
               <div className="mt-0.5 md:mt-0.5 lg:mt-3">
                 <p className="text-white/70 text-xs md:text-xs lg:text-sm leading-tight lg:leading-relaxed">
                   <span className="xl:hidden">Build dynamic web apps using React.js framework.</span>
                   <span className="hidden xl:inline">Participants explored how to build dynamic, visually appealing web applications using React.js, an industry-standard framework, and finished by brainstorming and creating parts of their own app ideas.</span>
                 </p>
               </div>
             </div>

             {/* AI/ML */}
             <div className="space-y-0.5 md:space-y-1 lg:space-y-4">
               <div className="flex items-center space-x-1.5 md:space-x-2 lg:space-x-3">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 md:w-4 lg:w-5 md:h-4 lg:h-5">
                   <rect x="4" y="4" width="16" height="16" rx="3"/>
                   <path d="M8 2v4M16 2v4M8 18v4M16 18v4M2 8h4M18 8h4M2 16h4M18 16h4" fill="currentColor"/>
                   <text x="12" y="14" textAnchor="middle" fontSize="6" fill="white">AI</text>
                   <path d="M20 4l2-2M20 6l2 2M18 2l2 2M22 2l-2 2" stroke="currentColor" strokeWidth="1"/>
                 </svg>
                 <span className="text-white/80 text-xs md:text-xs lg:text-base font-medium">
                   <span className="xl:hidden">AI/ML Workshop</span>
                   <span className="hidden xl:inline">ML Workshop</span>
                 </span>
               </div>
               <div className="mt-0.5 md:mt-0.5 lg:mt-3">
                 <p className="text-white/70 text-xs md:text-xs lg:text-sm leading-tight lg:leading-relaxed">
                   <span className="xl:hidden">Use OpenAI and Gemini APIs for AI-powered projects.</span>
                   <span className="hidden xl:inline">Hackers eager to build with Generative AI learned how to use tools like the OpenAI and Gemini APIs in their projects while gaining insight into how Large Language Models (LLMs) work behind the scenes.</span>
                 </p>
               </div>
             </div>
           </div>
         </div>

         {/* Right Side - Functional Image Carousel */}
         <div className="w-full md:w-2/5 lg:w-2/5 relative flex items-start justify-center pt-1 md:pt-0 lg:pt-4">
           <div className="w-full max-w-lg">
             <CarouselComponent />
           </div>
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

  // Calculate responsive height - more scroll space on mobile only
  const getScrollHeight = () => {
    if (typeof window !== 'undefined') {
      // Mobile: 130vh per card, Laptop/Desktop: 100vh per card
      if (window.innerWidth < 768) {
        return `${numCards * 130}vh`;
      }
    }
    return `${numCards * 100}vh`;
  };

  return (
    <section ref={ref} className="relative z-10" style={{ height: getScrollHeight() }}>
      {cards.map((card, index) => (
        <InternalStickyCard key={card.id} index={index} progress={progress} cardData={card} numCards={numCards} />
      ))}
    </section>
  );
};

export default InteractiveScrollingCards;