"use client";

import React from 'react';
import MetricCard from './MetricCard';

interface EnhancedCardHighlightsProps {
  cardIndex: number;
  textColor: string;
}

// Mock icons - replace with actual icon components
const RocketIcon = () => <div className="w-6 h-6 text-2xl">🚀</div>;
const ClockIcon = () => <div className="w-6 h-6 text-2xl">⏰</div>;
const UsersIcon = () => <div className="w-6 h-6 text-2xl">👥</div>;
const TrophyIcon = () => <div className="w-6 h-6 text-2xl">🏆</div>;
const LightningIcon = () => <div className="w-6 h-6 text-2xl">⚡</div>;
const StarIcon = () => <div className="w-6 h-6 text-2xl">⭐</div>;

const EnhancedCardHighlights: React.FC<EnhancedCardHighlightsProps> = ({ cardIndex, textColor }) => {
  const getHighlightContent = (index: number) => {
    switch (index) {
      case 0: // About Card
        return (
          <div className="space-y-8">
            {/* Hero Metrics Row */}
            <div className="flex justify-center gap-4 sm:gap-6">
              <MetricCard 
                value="24" 
                label="Hours" 
                icon={<ClockIcon />}
                variant="highlight"
                size="large"
              />
              <MetricCard 
                value="200+" 
                label="Hackers" 
                icon={<UsersIcon />}
                variant="accent"
                size="large"
              />
              <MetricCard 
                value="$15K" 
                label="Prizes" 
                icon={<TrophyIcon />}
                variant="highlight"
                size="large"
              />
            </div>
            
            {/* Interactive Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {[
                { icon: <RocketIcon />, title: "Build & Ship", desc: "Create real projects" },
                { icon: <UsersIcon />, title: "Network", desc: "Meet like-minded devs" },
                { icon: <TrophyIcon />, title: "Win Big", desc: "Compete for prizes" },
                { icon: <LightningIcon />, title: "Learn", desc: "Workshops & mentoring" },
                { icon: <StarIcon />, title: "Free Food", desc: "Meals & snacks included" },
                { icon: <RocketIcon />, title: "Fast-Paced", desc: "Intense but fun" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-xs opacity-75">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1: // History Card
        return (
          <div className="space-y-6">
            {/* Timeline Visual */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-yellow-400 to-teal-400 rounded-full" />
              <div className="flex justify-between items-center relative z-10">
                <MetricCard 
                  value="2019" 
                  label="Started" 
                  variant="default"
                  size="medium"
                />
                <MetricCard 
                  value="5" 
                  label="Years" 
                  icon={<StarIcon />}
                  variant="highlight"
                  size="large"
                />
                <MetricCard 
                  value="2025" 
                  label="Now" 
                  variant="accent"
                  size="medium"
                />
              </div>
            </div>
            
            {/* Growth Stats */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard 
                value="500+" 
                label="Total Participants" 
                icon={<UsersIcon />}
                variant="accent"
              />
              <MetricCard 
                value="50→200" 
                label="Growth Rate" 
                icon={<RocketIcon />}
                variant="highlight"
              />
            </div>
          </div>
        );

      case 2: // Last Year Card
        return (
          <div className="space-y-6">
            {/* Achievement Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MetricCard 
                value="48" 
                label="Projects" 
                icon={<RocketIcon />}
                variant="highlight"
                size="small"
              />
              <MetricCard 
                value="$10K+" 
                label="Prizes" 
                icon={<TrophyIcon />}
                variant="accent"
                size="small"
              />
              <MetricCard 
                value="15" 
                label="Sponsors" 
                icon={<StarIcon />}
                variant="default"
                size="small"
              />
              <MetricCard 
                value="24h" 
                label="Non-stop" 
                icon={<ClockIcon />}
                variant="highlight"
                size="small"
              />
            </div>
            
            {/* Project Categories */}
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <h4 className="font-bold text-center mb-3">2024 Project Categories</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {['AI/ML', 'Mobile Apps', 'Web Dev', 'IoT', 'Blockchain', 'Gaming'].map((category) => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // 2025 Card
        return (
          <div className="space-y-8">
            {/* Countdown Style Display */}
            <div className="text-center">
              <div className="inline-flex items-center gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold">2025</div>
                  <div className="text-sm opacity-75">Year</div>
                </div>
                <div className="w-px h-12 bg-white/30" />
                <div className="text-center">
                  <div className="text-3xl font-bold">TBD</div>
                  <div className="text-sm opacity-75">Date</div>
                </div>
                <div className="w-px h-12 bg-white/30" />
                <div className="text-center">
                  <div className="text-3xl font-bold">???</div>
                  <div className="text-sm opacity-75">Days Left</div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center space-y-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-xl transform hover:scale-105 shadow-lg">
                <span className="flex items-center gap-2">
                  Get Notified
                  <LightningIcon />
                </span>
              </button>
              <p className="text-sm opacity-75">Be the first to know when registration opens!</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {getHighlightContent(cardIndex)}
    </div>
  );
};

export default EnhancedCardHighlights;