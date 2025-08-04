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

// Sample sponsor data - replace with real data
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
    large: 'w-48 h-32', // Larger box for top tier sponsors
    medium: 'w-40 h-24', // Standardized size for all lower tiers
    small: 'w-40 h-24',  // Same as medium for consistency
  };

  const textSizes = {
    large: 'text-lg',
    medium: 'text-base',
    small: 'text-base', // Same as medium for consistency
  };

  const isTopTier = sponsor.tier <= 2;

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl border-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center p-4 relative overflow-hidden`}
      style={{ borderColor: TIER_COLORS[sponsor.tier] }}
      onClick={() => sponsor.websiteUrl && window.open(sponsor.websiteUrl, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default content - logo only for all tiers */}
      <div className={`flex items-center justify-center w-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className={`object-contain ${isTopTier ? 'w-32 h-20' : 'w-24 h-16'}`} // Larger logo for top tier
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
    </div>
  );
};

const SponsorCarousel: React.FC<CarouselProps> = ({ sponsors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sponsors.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  if (sponsors.length === 0) return null;

  const currentSponsor = sponsors[currentIndex];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
      <div className="flex items-center gap-8">
        <div className="flex-shrink-0">
          <img
            src={currentSponsor.logoUrl}
            alt={currentSponsor.name}
            className="w-48 h-24 object-contain rounded-xl"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Sacco, Impact, Arial Black, sans-serif' }}>
            {currentSponsor.name}
          </h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {currentSponsor.description}
          </p>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {sponsors.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const SponsorGrid: React.FC<{ sponsors: Sponsor[]; isTopTier: boolean }> = ({ sponsors, isTopTier }) => {
  if (sponsors.length === 0) return null;

  return (
    <div className="mb-16">
      {isTopTier ? (
        // Top tier: Reduced gap for tighter spacing
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} size="large" />
          ))}
        </div>
      ) : (
        // Lower tiers: Much smaller gaps for compact layout
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} size="medium" />
          ))}
        </div>
      )}
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

  // Combine top 2 tiers and bottom 3 tiers
  const topTierSponsorsGrid = [
    ...(sponsorsByTier[1] || []),
    ...(sponsorsByTier[2] || [])
  ];
  
  const bottomTierSponsorsGrid = [
    ...(sponsorsByTier[3] || []),
    ...(sponsorsByTier[4] || []),
    ...(sponsorsByTier[5] || [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Top Tier Sponsors (Platinum & Gold) */}
      <SponsorGrid sponsors={topTierSponsorsGrid} isTopTier={true} />
      
      {/* Carousel for top tier sponsors with descriptions */}
      {topTierSponsors.length > 0 && (
        <div className="mb-16">
          <SponsorCarousel sponsors={topTierSponsors} />
        </div>
      )}
      
      {/* Lower Tier Sponsors (Silver, Bronze, Community) */}
      <SponsorGrid sponsors={bottomTierSponsorsGrid} isTopTier={false} />
    </div>
  );
};

export default SponsorsGrid;