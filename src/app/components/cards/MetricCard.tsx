"use client";

import React from 'react';

interface MetricCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'highlight' | 'accent';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  value, 
  label, 
  icon, 
  variant = 'default',
  size = 'medium',
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-white/10 border-white/20',
    highlight: 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/40',
    accent: 'bg-gradient-to-br from-teal-400/20 to-cyan-500/20 border-teal-400/40'
  };

  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const textSizes = {
    small: { value: 'text-lg', label: 'text-xs' },
    medium: { value: 'text-2xl', label: 'text-sm' },
    large: { value: 'text-4xl', label: 'text-base' }
  };

  return (
    <div className={`
      ${variantClasses[variant]} 
      ${sizeClasses[size]} 
      ${className}
      rounded-xl border backdrop-blur-sm 
      transition-all duration-300 hover:scale-105 hover:bg-white/20
      flex flex-col items-center text-center
    `}>
      {icon && (
        <div className="mb-2 text-white/80">
          {icon}
        </div>
      )}
      <div className={`${textSizes[size].value} font-bold text-white mb-1`}>
        {value}
      </div>
      <div className={`${textSizes[size].label} text-white/75 font-medium`}>
        {label}
      </div>
    </div>
  );
};

export default MetricCard;