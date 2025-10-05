"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import RegisterCard from './cards/RegisterCard';
import { VideoText } from '../../components/magicui/video-text';
import { DraggableCardBody, DraggableCardContainer } from '../../components/ui/draggable-card';

// Simple reusable CountUp component with IntersectionObserver trigger
const CountUp: React.FC<{
  end: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
  enable?: boolean; // allow conditional start
  decimals?: number;
}> = ({ end, duration = 1500, prefix = "", suffix = "", className = "", enable = true, decimals = 0 }) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && enable && !started) {
          setStarted(true);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [enable, started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const startVal = 0;
    const change = end - startVal;
    let rafId = 0;
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = startVal + change * eased;
      setValue(current);
      if (t < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, duration, end]);

  const formatted = useMemo(() => {
    const n = Number.isFinite(value) ? value : 0;
    const rounded = decimals > 0 ? Number(n.toFixed(decimals)) : Math.round(n);
    const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: decimals });
    return `${prefix}${fmt.format(rounded)}${suffix}`;
  }, [value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${end}${suffix}`}>
      {formatted}
    </span>
  );
};

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
    <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96 backdrop-blur-md border border-white/20 shadow-2xl">
      {/* Image Display with Sliding Animation */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {carouselImages.map((imgSrc, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <img
                src={imgSrc}
                alt={`Hackathon photo ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows - Minimalist */}
      <button 
        onClick={goToPrevious}
        className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-200 z-10 p-1.5 md:p-2 rounded-md bg-black/20 hover:bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-5 md:h-5">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-200 z-10 p-1.5 md:p-2 rounded-md bg-black/20 hover:bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Next image"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-5 md:h-5">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Image Indicators - Cleaner */}
      <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75 w-1'
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
  // History: show fewer photos on mobile for less cramped layout
  const HISTORY_CARD_COUNT = isMobile ? 5 : 8;
  
  // Dynamic scaling factors based on screen size
  let widthMultiplier, heightMultiplier, minClearance;
  
  if (isMobile) {
    // Mobile: spread frames out from center for better visibility
    widthMultiplier = 0.42;
    heightMultiplier = 0.38;
    minClearance = 0.14;
  } else if (isTablet) {
    // Tablet: reduce spread slightly
    widthMultiplier = 0.48;
    heightMultiplier = 0.35;
    minClearance = 0.24;
  } else if (aspectRatio > 1.8) {
    // Wide screens (ultrawide): reduce horizontal spread to avoid large gaps
    widthMultiplier = 0.65;
    heightMultiplier = 0.30;
    minClearance = 0.22;
  } else {
    // Standard desktop: slightly tighter than before
    widthMultiplier = 0.52;
    heightMultiplier = 0.36;
    minClearance = 0.22;
  }
  
  // Responsive positions: use a balanced 5-point layout on mobile, otherwise 8-point layout
  const staticPositions = count === 5
    ? [
        // Five evenly distributed points around an oval for a complete ring
        { x: 0.0,  y: -0.50, tilt: 0 },     // top center
        { x: -0.42, y: -0.10, tilt: -12 },  // upper-left
        { x: 0.42,  y: -0.10, tilt: 12 },   // upper-right
        { x: -0.28, y: 0.42,  tilt: 10 },   // lower-left
        { x: 0.28,  y: 0.42,  tilt: -10 },  // lower-right
      ]
    : [
        // Eight-point layout (original, tuned)
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
  const [isMobile, setIsMobile] = useState(false);

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

  // Track mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Generate responsive positions that update on resize
  const updatePositions = useCallback(() => {
    // Ensure we have proper viewport dimensions before calculating positions
    if (typeof window !== 'undefined') {
      setCardPositions(generateStaticPositions(isMobile ? 5 : 8));
    }
  }, [isMobile]);

  useEffect(() => {
    // Force immediate position calculation on mount with proper viewport dimensions
    const initializePositions = () => {
      if (typeof window !== 'undefined' && isClient) {
        // Use multiple strategies to ensure viewport dimensions are accurate
        const calculatePositions = () => {
          setCardPositions(generateStaticPositions(isMobile ? 5 : 8));
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
      return generateStaticPositions(isMobile ? 5 : 8);
    }
    // Return empty array during SSR to prevent hydration mismatches
    return [];
  }, [isClient, isMobile]);
  
  const activePositions = cardPositions.length > 0 ? cardPositions : fallbackPositions;

  return (
    <div
      className="h-screen sticky overflow-x-hidden"
      style={{ top: `${topPosition}rem` }}
    >
      <div
        id={index === 3 ? 'register' : undefined}
        className={`relative h-full w-full ${bgColor} ${isLastCard ? 'rounded-none shadow-none' : 'rounded-t-5xl shadow-2xl shadow-black/40'} ${index === 0 ? 'overflow-visible' : 'overflow-hidden'}`}
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
            <>
              <header>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase ${textColor} tracking-wider leading-tight`}>
                  {headerTitle}
                </h2>
              </header>
              <main className="relative w-full h-full px-2 sm:px-4 md:px-6">
                {/* VideoText centered */}
                <div className="flex items-center justify-center h-full -mt-12 sm:mt-0">
                <div className="w-full h-64 sm:h-72 md:h-[22rem] lg:h-[26rem] xl:h-[30rem] px-2 overflow-visible">
                  {isMobile ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <h1
                        className="text-white font-extrabold text-6xl leading-tight text-center px-2 underline decoration-4 underline-offset-8"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: '0.02em'
                        }}
                      >
                        Build for Tomorrow,
                        <br />
                        Today.
                      </h1>
                    </div>
                  ) : (
                    <VideoText
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      fontSize={'clamp(1.2rem, 5.5vw, 6.4rem)'}
                      fontWeight="900"
                      className="w-full h-full overflow-visible"
                      autoPlay
                      muted
                      loop
                      preload="auto"
                      fontFamily="Arial, sans-serif"
                      maskScale={1.05}
                    >
                      {'Build for Tomorrow, Today.'}
                    </VideoText>
                  )}
                </div>
              </div>
              {/* Description positioned absolutely at bottom */}
              <div className="absolute bottom-40 sm:bottom-16 md:bottom-20 lg:bottom-24 left-4 right-4 pb-2">
                <div className="max-w-4xl text-center mx-auto px-2">
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl ${textColor} opacity-90 leading-relaxed font-medium`}>
                    <strong>Hack the Ridge</strong> is where <strong>innovation meets community</strong>. We are an annual <strong>hackathon</strong> at Iroquois Ridge High School that hosts over <strong>150+ leaders in STEM</strong> every year to <strong>innovate and push the limit of technology</strong>.
                  </p>
                </div>
              </div>
            </main>
            </>
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
                {Array.from({ length: isMobile ? 5 : 8 }, (_, i) => {
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
                      className="absolute"
                      style={{
                        left: `calc(50% + ${position.x * (typeof window !== 'undefined' ? window.innerWidth : 1200)}px)`,
                        top: `calc(50% + ${position.y * (typeof window !== 'undefined' ? window.innerHeight : 800)}px)`,
                        transform: `translate(-50%, -50%)`,
                      }}
                    >
                      <DraggableCardBody
                        className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-36 lg:h-40 xl:w-40 xl:h-44 min-h-0 backdrop-blur-sm border border-white/30 p-1 sm:p-1.5 md:p-1.5 lg:p-2 text-center flex flex-col overflow-hidden"
                        style={{ 
                          backgroundColor: cardColor + '20',
                          rotate: `${position.tilt}deg`,
                        }}
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
                  <CountUp
                    end={10}
                    duration={1400}
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-none mb-4 inline-block`}
                  />
                  <div className={`text-lg sm:text-xl md:text-2xl ${textColor} font-medium`}>
                    Years of Innovation
                  </div>
                </div>

                {/* Innovators */}
                <div className="text-center">
                  <CountUp
                    end={2000}
                    suffix="+"
                    duration={1600}
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-none mb-4 inline-block`}
                  />
                  <div className={`text-lg sm:text-xl md:text-2xl ${textColor} font-medium`}>
                    Innovators
                  </div>
                </div>

                {/* Prizes */}
                <div className="text-center">
                  <CountUp
                    end={70000}
                    prefix="$"
                    suffix="+"
                    duration={1800}
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-none mb-4 inline-block`}
                  />
                  <div className={`text-lg sm:text-xl md:text-2xl ${textColor} font-medium`}>
                    Prizes
                  </div>
                </div>
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
    case 2: // Last Year - Refined Stats & Highlights (Mobile Optimized)
     return (
       <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-8 lg:gap-12 w-full h-full items-start justify-center px-3 sm:px-4 md:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-16 lg:pt-20 pb-4">
         {/* Mobile: Carousel First, Desktop: Content First */}
         
         {/* Carousel - Shows first on mobile, second on desktop */}
         <div className="w-full md:w-2/5 lg:w-2/5 relative flex items-start justify-center order-1 md:order-2">
           <div className="w-full max-w-lg">
             <CarouselComponent />
           </div>
         </div>

         {/* Content - Shows second on mobile, first on desktop */}
         <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col justify-start space-y-6 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl order-2 md:order-1">
           
           {/* Stats Grid with CountUp - 2x2 on mobile, 1x4 on desktop */}
           <div className="grid grid-cols-2 md:grid-cols-4 place-items-center auto-rows-fr gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-6 lg:gap-x-8 lg:gap-y-8">
             <div className="flex h-full flex-col items-center justify-center gap-1.5 sm:gap-2">
               <CountUp
                 end={45}
                 duration={1600}
                 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-none"
               />
               <div className="text-white/70 text-xs sm:text-sm md:text-sm font-medium uppercase tracking-wide text-center">Projects</div>
             </div>
             <div className="flex h-full flex-col items-center justify-center gap-1.5 sm:gap-2">
               <CountUp
                 end={300}
                 suffix="+"
                 duration={1700}
                 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-none"
               />
               <div className="text-white/70 text-xs sm:text-sm md:text-sm font-medium uppercase tracking-wide text-center">Participants</div>
             </div>
             <div className="flex h-full flex-col items-center justify-center gap-1.5 sm:gap-2">
               <CountUp
                 end={12}
                 duration={1500}
                 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-none"
               />
               <div className="text-white/70 text-xs sm:text-sm md:text-sm font-medium uppercase tracking-wide text-center">Partners</div>
             </div>
             <div className="flex h-full flex-col items-center justify-center gap-1.5 sm:gap-2">
               <CountUp
                 end={6000}
                 prefix="$"
                 duration={1800}
                 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-none"
               />
               <div className="text-white/70 text-xs sm:text-sm md:text-sm font-medium uppercase tracking-wide text-center">Prizes</div>
             </div>
           </div>

           {/* Tech Stack Section */}
           <div className="space-y-3 sm:space-y-4">
             <h3 className="text-base sm:text-lg md:text-xl font-bold text-white/90 mb-3 sm:mb-4">Workshops</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
               <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/8 transition-colors duration-300">
                 <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2 sm:mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="flex-shrink-0 sm:w-6 sm:h-6">
                     <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                   </svg>
                   <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Intro to Python Workshop (led by IRHS CS)</span>
                 </div>
                 <div className="text-xs sm:text-sm text-white/60">Participants learned Python basics: functions, loops, and conditionals effectively.
</div>
               </div>
               <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/8 transition-colors duration-300">
                 <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2 sm:mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="flex-shrink-0 sm:w-6 sm:h-6">
                     <polyline points="16 18 22 12 16 6" />
                     <polyline points="8 6 2 12 8 18" />
                   </svg>
                   <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Web Development Workshop</span>
                 </div>
                 <div className="text-xs sm:text-sm text-white/60">Students built interactive websites using HTML, CSS, and JavaScript.
</div>
               </div>
               <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/8 transition-colors duration-300">
                 <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2 sm:mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="flex-shrink-0 sm:w-6 sm:h-6">
                     <rect x="2" y="3" width="20" height="14" rx="2" />
                     <line x1="8" y1="21" x2="16" y2="21" />
                     <line x1="12" y1="17" x2="12" y2="21" />
                   </svg>
                   <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Frontend Workshop</span>
                 </div>
                 <div className="text-xs sm:text-sm text-white/60">Hackers created dynamic web applications using the React.js framework.
</div>
               </div>
               <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/8 transition-colors duration-300">
                 <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2 sm:mb-3">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="flex-shrink-0 sm:w-6 sm:h-6">
                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                     <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                     <line x1="12" y1="22.08" x2="12" y2="12" />
                   </svg>
                   <span className="text-white font-semibold text-sm sm:text-base md:text-lg">AI/ML Workshop</span>
                 </div>
                 <div className="text-xs sm:text-sm text-white/60">Developers integrated OpenAI and Gemini APIs into their projects.
</div>
               </div>
             </div>
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
  const [isMobile, setIsMobile] = useState(false);
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
