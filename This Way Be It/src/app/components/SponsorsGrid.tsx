"use client";

import React, { useState } from 'react';




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





const TIER_COLORS = {
  1: '#AFD5BC', 
  2: '#dfd7d7', 
  3: '#7DB6AD', 
  4: '#AFD5BC', 
  5: '#7DB6AD', 
};

const TIER_NAMES = {
  1: 'TRAILBLAZER',
  2: 'VISIONARY',
  3: 'PIONEER',
  4: 'CATALYST',
  5: 'TORCHBEARER',
};

const TIER_ICONS = {
  1: '/icons/tier-1-platinum.svg', 
  2: '/icons/tier-2-gold.svg',
  3: '/icons/tier-3-silver.svg',
  4: '/icons/tier-4-bronze.svg',
  5: '/icons/tier-5-community.svg',
};































const SAMPLE_SPONSORS: Sponsor[] = [

  {
    id: 2,
    name: 'Dm Industries',
    description: 'Innovation hub fostering creativity and breakthrough solutions in tech.',
    logoUrl: 'http://www.dm-ind.com/main/wp-content/uploads/2015/12/DM_logo_withlogo2.svg',
    websiteUrl: 'https://www.dm-ind.com/main/',
    tier: 2,
  },
  {
    id: 3,
    name: 'YRI Fellowship',
    logoUrl: 'https://www.yriscience.com/logo.png',
    websiteUrl: 'https://www.yriscience.com/',
    tier: 3,
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
    logoUrl: '/ucv.png',
    websiteUrl: 'https://uscanvisa.com',
    tier: 5,
  },
  {
    id: 9,
    name: 'Hatch Engineering',
    logoUrl: '/hatch.png',
    websiteUrl: 'https://www.hatch.com/',
    tier: 5,
  },
  {
    id: 10,
    name: 'Toronto Metropolitan University',
    logoUrl: '/tmu.png.png',
    websiteUrl: 'https://www.torontomu.ca/',
    tier: 5,
  },
  {
    id: 11,
    name: 'CoLab Software',
    logoUrl: '/colab.png',
    tier: 4,
  },
  {
    id: 12,
    name: 'Western CPA',
    logoUrl: '/westcpa.png',
    tier: 4,
  },
  {
    id: 13,
    name: 'Deloitte',
    logoUrl: '/deloitte.png',
    tier: 4,
  },
  {
    id: 14,
    name: 'Zebra Robotics',
    logoUrl: '/zebra.png',
    tier: 5,
  },
  {
    id: 15,
    name: 'Geotab',
    logoUrl: '/geotab.png',
    tier: 5,
  },
  {
    id: 16,
    name: 'Town of Oakville - CAG',
    logoUrl: '/oakville.png.png',
    tier: 2,
  }
];




const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, size }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    
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
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className={`flex items-center justify-center w-full transition-all duration-500 ease-out transform ${isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${sponsor.name === 'US CAN Visa' ? 'p-1' : ''
        }`}>
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${sponsor.name === 'YRI Fellowship' ? 'w-[35%] h-[35%]' :
            sponsor.name === 'US CAN Visa' ? 'w-[65%] h-[65%] sm:w-[75%] sm:h-[75%] md:max-w-full md:max-h-full' :
              'max-h-full max-w-full'
            }`}
          loading="lazy"
        />
      </div>

      <div className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-500 ease-out transform ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="px-4">
          <p className={`${textSizes[size]} font-bold text-[#dfd7d7] mb-1.5 tracking-wide transition-all duration-300`} style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
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






const SponsorsGrid: React.FC = () => {
  
  const sponsorsByTier = SAMPLE_SPONSORS.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<number, Sponsor[]>);

  
  const tier1Sponsors = sponsorsByTier[1] || [];
  const tier2Sponsors = sponsorsByTier[2] || [];

  const lowerTierSponsors = [
    ...(sponsorsByTier[3] || []),
    ...(sponsorsByTier[4] || []),
    ...(sponsorsByTier[5] || [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-12 gap-4 auto-rows-fr">
        {tier1Sponsors.map((sponsor) => (
          <div key={sponsor.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <SponsorCard sponsor={sponsor} size="large" />
          </div>
        ))}

        {tier2Sponsors.map((sponsor) => (
          <div key={sponsor.id} className="col-span-8 sm:col-span-6 lg:col-span-3">
            <SponsorCard sponsor={sponsor} size="medium" />
          </div>
        ))}

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
