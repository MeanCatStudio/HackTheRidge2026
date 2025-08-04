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

  const topPosition = index * HEADER_HEIGHT_REM;

  return (
    <div
      className="h-screen sticky"
      style={{ top: `${topPosition}rem` }}
    >
      <div
        className={`relative h-full w-full ${bgColor} rounded-t-5xl shadow-2xl shadow-black/40 overflow-hidden`}
        style={{
          transform: `scale(${dynamicScale})`,
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transformOrigin: 'top',
        }}
      >
        <div className="w-full h-full p-8 md:p-10 lg:p-12 flex flex-col justify-start">
          <header>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase ${textColor} tracking-wider`}>
              {headerTitle}
            </h2>
          </header>

          {(title || content || imageUrl) && (
            <main className="mt-10 lg:mt-16 flex-grow flex justify-between items-start gap-12 w-full">
              <div className="w-1/2">
                <h3 className={`text-4xl md:text-5xl font-bold ${textColor}`}>
                  {title}
                </h3>
                <p className={`mt-4 text-lg md:text-xl ${textColor} opacity-80`}>
                  {content}
                </p>
              </div>
              
              {imageUrl && (
                <div className="w-1/3 flex-shrink-0">
                  <img 
                    src={imageUrl} 
                    alt={title || headerTitle}
                    className="rounded-xl shadow-lg w-full h-auto object-cover"
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