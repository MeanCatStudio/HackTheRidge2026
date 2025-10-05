"use client";

import React, { useState } from 'react';

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
  1: 'TRAILBLAZER',
  2: 'VISIONARY',
  3: 'PIONEER',
  4: 'CATALYST',
  5: 'TORCHBEARER',
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
    name: 'RBC',
    description: 'Leading technology solutions provider empowering the next generation of developers.',
    logoUrl: 'https://www.rbc.com/dvl/v1.0/assets/images/logos/rbc-logo-shield.svg',
    websiteUrl: 'https://rbc.com',
    tier: 1,
  },
  {
    id: 2,
    name: 'Dm Industries',
    description: 'Innovation hub fostering creativity and breakthrough solutions in tech.',
    logoUrl: 'http://www.dm-ind.com/main/wp-content/uploads/2015/12/DM_logo_withlogo2.svg',
    websiteUrl: 'https://www.dm-ind.com/main/',
    tier: 1,
  },
  {
    id: 3,
    name: 'YRI Fellowship',
    logoUrl: 'https://www.yriscience.com/logo.png',
    websiteUrl: 'https://www.yriscience.com/',
    tier: 2,
  },
  {
    id: 4,
    name: 'Major League Hacking',
    logoUrl: 'https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.png',
    websiteUrl: 'https://mlh.io/',
    tier: 4,
  },
  {
    id: 5,
    name: 'Brock University',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Brock_University_Logo_2022.svg/2560px-Brock_University_Logo_2022.svg.png',
    websiteUrl: 'https://brocku.ca/',
    tier: 5,
  },
  {
    id: 6,
    name: "Queen's University",
    logoUrl: 'https://www.queensu.ca/resources/assets/logos/Queens-logo-reversed.svg',
    websiteUrl: 'https://queensu.ca/',
    tier: 5,
  },
  {
    id: 7,
    name: 'University of Waterloo',
    logoUrl: 'https://uwaterloo.ca/profiles/uw_base_profile/modules/custom/uw_wcms_ohana/dist/images/uwaterloo-logo.svg',
    websiteUrl: 'https://uwaterloo.ca/',
    tier: 5,
  },
  {
    id: 8,
    name: 'US CAN Visa',
    description: 'Cutting-edge software solutions driving innovation across industries.',
    logoUrl: 'https://static.wixstatic.com/media/3db17a_eb70ab64529f493793193ff4456fa7a1~mv2.jpg',
    websiteUrl: 'https://uscanvisa.com',
    tier: 5,
  }
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
  
  // Enhanced border styling with refined glow effects
  const getBorderStyle = () => {
    if (sponsor.tier <= 2) {
      return {
        borderColor: TIER_COLORS[sponsor.tier],
        borderWidth: '3px',
        boxShadow: isHovered
          ? `0 0 30px ${TIER_COLORS[sponsor.tier]}60, 0 0 50px ${TIER_COLORS[sponsor.tier]}30, inset 0 0 20px ${TIER_COLORS[sponsor.tier]}10`
          : `0 0 20px ${TIER_COLORS[sponsor.tier]}40, inset 0 0 15px ${TIER_COLORS[sponsor.tier]}08`
      };
    } else {
      return {
        borderColor: TIER_COLORS[sponsor.tier],
        borderWidth: '2.5px',
        boxShadow: isHovered
          ? `0 0 25px ${TIER_COLORS[sponsor.tier]}50, 0 0 40px ${TIER_COLORS[sponsor.tier]}20`
          : `0 0 15px ${TIER_COLORS[sponsor.tier]}30`
      };
    }
  };

  return (
    <div
      className={`${sizeClasses[size]} w-full rounded-2xl bg-gradient-to-br from-white/12 via-white/8 to-white/5 backdrop-blur-md hover:from-white/18 hover:via-white/14 hover:to-white/10 transition-all duration-500 ease-out hover:scale-[1.03] cursor-pointer flex items-center justify-center p-4 relative overflow-hidden flex-grow group`}
      style={getBorderStyle()}
      onClick={() => sponsor.websiteUrl && window.open(sponsor.websiteUrl, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Default content - logo with refined fade */}
      <div className={`flex items-center justify-center w-full transition-all duration-500 ease-out transform ${isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
            sponsor.name === 'RBC' ? 'w-[20%] h-[20%]' : 
            sponsor.name === 'YRI Fellowship' ? 'w-[35%] h-[35%]' : 
            'max-h-full max-w-full'
          }`}
          loading="lazy"
        />
      </div>
      
      {/* Hover overlay with refined animations */}
      <div className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-500 ease-out transform ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="px-4">
          <p className={`${textSizes[size]} font-bold text-white mb-1.5 tracking-wide transition-all duration-300`} style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
            {sponsor.name}
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-1.5" />
          <p className={`${isTopTier ? 'text-sm' : 'text-xs'} font-semibold tracking-wider`} style={{ color: TIER_COLORS[sponsor.tier], textShadow: `0 0 10px ${TIER_COLORS[sponsor.tier]}60` }}>
            {TIER_NAMES[sponsor.tier]} SPONSOR
          </p>
        </div>
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
      {/* Combined Sponsor Grid - All tiers in one layout */}
      <div className="grid grid-cols-12 gap-4 auto-rows-fr">
        {/* Tier 1 sponsors - take up more columns (1.5x width) */}
        {tier1Sponsors.map((sponsor) => (
          <div key={sponsor.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <SponsorCard sponsor={sponsor} size="large" />
          </div>
        ))}
        
        {/* Tier 2 sponsors - take up fewer columns */}
        {tier2Sponsors.map((sponsor) => (
          <div key={sponsor.id} className="col-span-8 sm:col-span-6 lg:col-span-3">
            <SponsorCard sponsor={sponsor} size="medium" />
          </div>
        ))}
        
        {/* Lower tier sponsors (3-5) - smaller cards */}
        {lowerTierSponsors.map((sponsor) => (
          <div key={sponsor.id} className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <SponsorCard sponsor={sponsor} size="small" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsGrid;