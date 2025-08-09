"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import RegisterCard from './cards/RegisterCard';
import { VideoText } from '../../components/magicui/video-text';
import { DraggableCardBody, DraggableCardContainer } from '../../components/ui/draggable-card';

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
    // Mobile: tighter positioning, more vertical space
    widthMultiplier = 0.4;
    heightMultiplier = 0.35;
    minClearance = 0.25;
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
    
    // Convert to pixel positions with safety margins
    const maxX = (viewportWidth * 0.45) - 100; // Leave 100px margin from edges
    const maxY = (viewportHeight * 0.4) - 80;  // Leave 80px margin from top/bottom
    
    return {
      x: Math.max(-maxX, Math.min(maxX, baseX * viewportWidth)),
      y: Math.max(-maxY, Math.min(maxY, baseY * viewportHeight)),
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
            <main className="flex-grow flex flex-col w-full h-full px-4">
              {/* VideoText centered in available space */}
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-7xl h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                  <VideoText
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    fontSize="12vw"
                    fontWeight="900"
                    className="w-full h-full"
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    fontFamily="Arial, sans-serif"
                  >
                    SLOGAN HERE
                  </VideoText>
                </div>
              </div>
              {/* Description at bottom */}
              <div className="max-w-4xl text-center mx-auto pb-8">
                <p className={`text-lg sm:text-xl md:text-2xl ${textColor} opacity-90 leading-relaxed font-medium`}>
                  <strong>Hack the Ridge</strong> is where <strong>innovation meets community</strong>. We are an annual <strong>hackathon</strong> at Iroquois Ridge High School that hosts over <strong>150+ leaders in STEM</strong> every year to <strong>innovate and push the limit of technology</strong>.
                </p>
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
                        left: `calc(50% + ${position.x}px)`,
                        top: `calc(50% + ${position.y}px)`,
                        transform: `translate(-50%, -50%) rotate(${position.tilt}deg)`,
                      }}
                    >
                      <DraggableCardBody
                        className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-36 lg:h-40 xl:w-40 xl:h-44 min-h-0 backdrop-blur-sm border border-white/30 p-1 sm:p-1.5 md:p-1.5 lg:p-2 text-center flex flex-col overflow-hidden transition-all duration-300"
                        style={{ backgroundColor: cardColor + '20' }}
                      >
                        {/* Consistent placeholder image */}
                        <div
                          className="w-full flex-1 rounded-2xl flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: cardColor }}
                        >
                          <img
                            src={`https://picsum.photos/id/${10 + i}/240/160`}
                            alt={`${year}`}
                            className="w-full h-full object-cover rounded-2xl opacity-90"
                          />
                        </div>
                        
                        {/* Year only */}
                        <div className="text-2xl font-bold text-white leading-none py-1">
                          {year}
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
    case 2: // Last Year - Healthcare Innovation Impact Visualization
     return (
       <div className="mt-8 space-y-8">
         {/* Main Impact Stats - Enhanced with animations */}
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
           {[
             { value: '300+', label: 'Healthcare Innovators', icon: '👩‍⚕️', gradient: 'from-blue-400 to-cyan-400' },
             { value: '40+', label: 'AI Projects Built', icon: '🤖', gradient: 'from-purple-400 to-pink-400' },
             { value: '$6K+', label: 'Prize Pool', icon: '💰', gradient: 'from-yellow-400 to-orange-400' },
             { value: '20+', label: 'Industry Partners', icon: '🏢', gradient: 'from-green-400 to-emerald-400' }
           ].map((stat, idx) => (
             <div key={idx}
               className="group text-center p-5 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl backdrop-blur-md border border-white/20 transform transition-all duration-700 hover:scale-110 hover:bg-white/15 hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20"
               style={{
                 animation: `slideInUp 0.8s ease-out forwards ${idx * 0.15}s`,
                 opacity: 0,
                 transform: 'translateY(30px)'
               }}
             >
               <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-125">{stat.icon}</div>
               <div className={`text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105`}>
                 {stat.value}
               </div>
               <div className="text-sm sm:text-base font-medium opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                 {stat.label}
               </div>
             </div>
           ))}
         </div>

         {/* Healthcare Innovation Showcase */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
           {[
             {
               title: 'AI Diagnosis System',
               description: 'Revolutionary diagnostic tool using computer vision',
               category: 'Medical Imaging',
               icon: '🔬',
               color: 'from-blue-500/20 to-cyan-500/20',
               border: 'border-blue-400/30'
             },
             {
               title: 'Patient Care Bot',
               description: 'Smart chatbot for 24/7 patient monitoring',
               category: 'Patient Care',
               icon: '🏥',
               color: 'from-green-500/20 to-emerald-500/20',
               border: 'border-green-400/30'
             },
             {
               title: 'Drug Discovery ML',
               description: 'Machine learning for accelerated drug research',
               category: 'Research',
               icon: '💊',
               color: 'from-purple-500/20 to-violet-500/20',
               border: 'border-purple-400/30'
             }
           ].map((project, idx) => (
             <div key={idx}
               className={`group p-6 bg-gradient-to-br ${project.color} rounded-xl backdrop-blur-sm border ${project.border} transform transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/40 hover:shadow-xl`}
               style={{
                 animation: `fadeInUp 0.6s ease-out forwards ${0.8 + idx * 0.1}s`,
                 opacity: 0
               }}
             >
               <div className="flex items-start justify-between mb-4">
                 <div className="text-2xl transition-transform duration-300 group-hover:scale-110">{project.icon}</div>
                 <span className="text-xs px-2 py-1 rounded-full bg-white/20 font-medium opacity-80">
                   {project.category}
                 </span>
               </div>
               <h4 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-white">
                 {project.title}
               </h4>
               <p className="text-sm opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                 {project.description}
               </p>
             </div>
           ))}
         </div>

         {/* Healthcare AI Achievement Banner */}
         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20 p-8 text-center">
           {/* Animated background particles */}
           <div className="absolute inset-0 opacity-20">
             {Array.from({ length: 20 }, (_, i) => (
               <div
                 key={i}
                 className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 3}s`,
                   animationDuration: `${2 + Math.random() * 2}s`
                 }}
               />
             ))}
           </div>
           
           <div className="relative z-10">
             <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/30 mb-4">
               <span className="text-2xl mr-2">🏆</span>
               <span className="font-bold text-lg">Most Impactful Year</span>
             </div>
             
             <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
               Revolutionizing Healthcare Through Innovation
             </h3>
             
             <p className="text-lg opacity-90 max-w-3xl mx-auto">
               From AI-powered diagnostics to breakthrough patient care solutions, 2024 marked a pivotal moment where
               <span className="font-semibold text-blue-300"> technology met compassion</span> to create lasting healthcare impact.
             </p>
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

  return (
    <section ref={ref} className="relative z-10" style={{ height: `${numCards * 100}vh` }}>
      {cards.map((card, index) => (
        <InternalStickyCard key={card.id} index={index} progress={progress} cardData={card} numCards={numCards} />
      ))}
    </section>
  );
};

export default InteractiveScrollingCards;