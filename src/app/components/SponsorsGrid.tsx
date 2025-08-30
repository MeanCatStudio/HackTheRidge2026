"use client";

import React, { useState, useEffect } from 'react';

// Section: Type Definitions
// ============================================================================

export interface Sponsor {
  id: number;
  name: string;
  description?: string;
  logoUrl: string;
  websiteUrl?: string;
  tier: 1 | 2 | 3 | 4 | 5;
}

interface SponsorCardProps {
  sponsor: Sponsor;
  size: 'large' | 'medium' | 'small';
}

interface CarouselProps {
  sponsors: Sponsor[];
}

// Section: Constants
// ============================================================================

const TIER_COLORS = {
  1: '#FFD700', // Gold
  2: '#C0C0C0', // Silver
  3: '#CD7F32', // Bronze
  4: '#14b8a6', // Teal
  5: '#ea580c', // Orange
};

const TIER_NAMES = {
  1: 'PLATINUM',
  2: 'GOLD',
  3: 'SILVER',
  4: 'BRONZE',
  5: 'COMMUNITY',
};

const TIER_ICONS = {
  1: '/icons/tier-1-platinum.svg', // Replace with your custom icon paths
  2: '/icons/tier-2-gold.svg',
  3: '/icons/tier-3-silver.svg',
  4: '/icons/tier-4-bronze.svg',
  5: '/icons/tier-5-community.svg',
};

// ============================================================================
// SPONSOR DATA CONFIGURATION
// ============================================================================
//
// TO ADD NEW SPONSORS:
// 1. Add sponsor objects to the SAMPLE_SPONSORS array below
// 2. Each sponsor must include: id, name, logoUrl, tier
// 3. Optional fields: description, websiteUrl
//
// TIER SYSTEM:
// - Tier 1 (PLATINUM): Premium sponsors with 1.5x width cards and carousel descriptions
// - Tier 2 (GOLD): High-tier sponsors with standard width cards and carousel descriptions
// - Tier 3 (SILVER): Mid-tier sponsors in lower grid with bronze borders
// - Tier 4 (BRONZE): Standard sponsors in lower grid with teal borders
// - Tier 5 (COMMUNITY): Community sponsors in lower grid with orange borders
//
// CAROUSEL REQUIREMENTS:
// - Only Tier 1 & 2 sponsors with 'description' field will appear in carousel
// - Description should be 1-2 sentences describing the sponsor's contribution
//
// LOGO REQUIREMENTS:
// - Recommended size: 200x100px for Tier 1-2, 150x75px for Tier 3-5
// - Format: SVG, PNG, or JPG with transparent background preferred
// - Place logo files in /public/sponsors/ directory
//
// CUSTOM TIER ICONS:
// - Update TIER_ICONS paths below to use your custom tier badge icons
// - Icons should be SVG format, white/transparent for proper styling
// - Place icon files in /public/icons/ directory
//
const SAMPLE_SPONSORS: Sponsor[] = [
  {
    id: 1,
    name: 'TechCorp',
    description: 'Leading technology solutions provider empowering the next generation of developers.',
    logoUrl: 'https://via.placeholder.com/200x100/FFD700/000000?text=TechCorp',
    websiteUrl: 'https://techcorp.com',
    tier: 1,
  },
  {
    id: 2,
    name: 'InnovateLab',
    description: 'Innovation hub fostering creativity and breakthrough solutions in tech.',
    logoUrl: 'https://via.placeholder.com/200x100/C0C0C0/000000?text=InnovateLab',
    websiteUrl: 'https://innovatelab.com',
    tier: 2,
  },
  {
    id: 3,
    name: 'DevTools Inc',
    logoUrl: 'https://via.placeholder.com/150x75/CD7F32/FFFFFF?text=DevTools',
    tier: 3,
  },
  {
    id: 4,
    name: 'CodeBase',
    logoUrl: 'https://via.placeholder.com/150x75/14b8a6/FFFFFF?text=CodeBase',
    tier: 4,
  },
  {
    id: 5,
    name: 'StartupHub',
    logoUrl: 'https://via.placeholder.com/120x60/ea580c/FFFFFF?text=StartupHub',
    tier: 5,
  },
  {
    id: 6,
    name: 'CloudTech',
    logoUrl: 'https://via.placeholder.com/120x60/ea580c/FFFFFF?text=CloudTech',
    tier: 5,
  },
];

// Section: Components
// ============================================================================

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, size }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
  // Unified heights across all sponsor card sizes (mobile and up)
  large: 'h-28 sm:h-36',
  medium: 'h-28 sm:h-36',
  small: 'h-28 sm:h-36',
  };

  const textSizes = {
    large: 'text-xl',
    medium: 'text-lg',
    small: 'text-base',
  };

  const isTopTier = sponsor.tier <= 2;
  
  // Enhanced border styling for lower tiers
  const getBorderStyle = () => {
    if (sponsor.tier <= 2) {
      return {
        borderColor: TIER_COLORS[sponsor.tier],
        borderWidth: '4px',
        boxShadow: `0 0 20px ${TIER_COLORS[sponsor.tier]}40`
      };
    } else {
      return {
        borderColor: TIER_COLORS[sponsor.tier],
        borderWidth: '3px',
        boxShadow: `0 0 15px ${TIER_COLORS[sponsor.tier]}30`
      };
    }
  };

  return (
    <div
      className={`${sizeClasses[size]} w-full rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center p-4 relative overflow-hidden flex-grow`}
      style={getBorderStyle()}
      onClick={() => sponsor.websiteUrl && window.open(sponsor.websiteUrl, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default content - logo only for all tiers */}
      <div className={`flex items-center justify-center w-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className={`max-h-full max-w-full object-contain`}
        />
      </div>
      
      {/* Hover overlay */}
      <div className={`absolute inset-0 flex items-center justify-center text-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div>
          <p className={`${textSizes[size]} font-bold text-white mb-1`}>
            {sponsor.name}
          </p>
          <p className={`${isTopTier ? 'text-sm' : 'text-xs'} text-white/80 font-semibold`}>
            {TIER_NAMES[sponsor.tier]} SPONSOR
          </p>
        </div>
      </div>
      
      {/* Tier indicator for lower tiers */}
      {!isTopTier && (
        <div 
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: TIER_COLORS[sponsor.tier] }}
        >
          {sponsor.tier}
        </div>
      )}
    </div>
  );
};

const SponsorCarousel: React.FC<CarouselProps> = ({ sponsors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sponsors.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  if (sponsors.length === 0) return null;

  const currentSponsor = sponsors[currentIndex];

  return (
    <div className="mb-12 overflow-hidden">
      {/* Scrolling carousel container - improved height and spacing */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/20 relative min-h-[140px] flex flex-col">
        {/* Sliding content container */}
        <div className="relative w-full flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sponsors.map((sponsor, index) => (
              <div key={sponsor.id} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center md:justify-between gap-6 py-2">
                {/* Left side - Company info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
                    {sponsor.name}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-3 shadow-sm"></div>
                  <p className="text-base text-white/90 leading-relaxed max-w-2xl line-clamp-2">
                    {sponsor.description}
                  </p>
                </div>
                
                {/* Right side - Company logo and tier badge */}
                <div className="flex-shrink-0 text-center">
                  <div className="flex items-center gap-6">
                    {/* Company logo - now first with better styling */}
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="w-28 h-14 md:w-20 md:h-10 object-contain"
                      />
                    </div>
                    
                    {/* Tier badge - now second with clean styling */}
                    <div
                      className="w-24 h-24 rounded-2xl border-4 flex flex-col items-center justify-center p-3"
                      style={{
                        borderColor: TIER_COLORS[sponsor.tier],
                        backgroundColor: `${TIER_COLORS[sponsor.tier]}20`
                      }}
                    >
                      {/* Custom tier icon */}
                      <div className="flex items-center justify-center mb-1">
                        <img
                          src={TIER_ICONS[sponsor.tier]}
                          alt={`Tier ${sponsor.tier} icon`}
                          className="w-10 h-10 object-contain filter brightness-0 invert"
                          onError={(e) => {
                            // Fallback to text if icon doesn't exist
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        {/* Fallback text (hidden by default) */}
                        <div
                          className="text-xl font-black text-white hidden"
                          style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}
                        >
                          T{sponsor.tier}
                        </div>
                      </div>
                      
                      {/* Tier name below icon */}
                      <div className="text-xs font-bold text-white text-center leading-tight">
                        {TIER_NAMES[sponsor.tier]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel indicators - centered below content */}
        <div className="flex justify-center mt-4 gap-3">
          {sponsors.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-400 scale-110 shadow-lg shadow-yellow-400/50'
                  : 'bg-transparent border-white/50 hover:border-white/80 hover:scale-105'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TopTierGrid: React.FC<{ tier1Sponsors: Sponsor[]; tier2Sponsors: Sponsor[] }> = ({ tier1Sponsors, tier2Sponsors }) => {
  if (tier1Sponsors.length === 0 && tier2Sponsors.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Custom grid where tier 1 cards are 1.5x wider than tier 2 */}
      <div className="grid grid-cols-12 gap-4 auto-rows-fr">
        {/* Tier 1 sponsors - take up more columns (1.5x width) */}
        {tier1Sponsors.map((sponsor) => (
          <div key={sponsor.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <SponsorCard sponsor={sponsor} size="large" />
          </div>
        ))}
        
        {/* Tier 2 sponsors - take up fewer columns */}
        {tier2Sponsors.map((sponsor) => (
          // On mobile make tier2 slightly narrower than tier1 (col-span-8)
          <div key={sponsor.id} className="col-span-8 sm:col-span-6 lg:col-span-3">
             <SponsorCard sponsor={sponsor} size="medium" />
           </div>
         ))}
       </div>
     </div>
   );
};

const LowerTierGrid: React.FC<{ sponsors: Sponsor[] }> = ({ sponsors }) => {
  if (sponsors.length === 0) return null;

  return (
    <div className="mb-16">
      {/* Lower tiers: Same sized cards with color-coded borders */}
  {/* Default to 2 columns on very small screens so these cards are ~half the width of TechCorp */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} size="small" />
        ))}
      </div>
    </div>
  );
};

// Section: Main Component
// ============================================================================

const SponsorsGrid: React.FC = () => {
  // Group sponsors by tier
  const sponsorsByTier = SAMPLE_SPONSORS.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<number, Sponsor[]>);

  // Get top tier sponsors with descriptions for carousel
  const topTierSponsors = [
    ...(sponsorsByTier[1] || []),
    ...(sponsorsByTier[2] || [])
  ].filter(sponsor => sponsor.description);

  // Separate tier 1 and tier 2 for different sizing
  const tier1Sponsors = sponsorsByTier[1] || [];
  const tier2Sponsors = sponsorsByTier[2] || [];
  
  const lowerTierSponsors = [
    ...(sponsorsByTier[3] || []),
    ...(sponsorsByTier[4] || []),
    ...(sponsorsByTier[5] || [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Top Tier Grid - Tier 1 (1.5x width) and Tier 2 in same grid */}
      <TopTierGrid tier1Sponsors={tier1Sponsors} tier2Sponsors={tier2Sponsors} />
      
      {/* Scrolling Carousel for top tier sponsors with descriptions */}
      {topTierSponsors.length > 0 && (
        <SponsorCarousel sponsors={topTierSponsors} />
      )}
      
      {/* Lower Tier Grid - Tiers 3, 4, 5 with color-coded borders */}
      {lowerTierSponsors.length > 0 && (
        <div className="mt-8">
          <LowerTierGrid sponsors={lowerTierSponsors} />
        </div>
      )}
    </div>
  );
};

export default SponsorsGrid;