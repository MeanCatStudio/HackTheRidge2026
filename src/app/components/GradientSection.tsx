"use client";

import React from 'react';
import { motion } from 'framer-motion';
import InteractiveFAQ from './InteractiveFAQ';

const GradientSection: React.FC = () => {
  return (
    <motion.section
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Main gradient background matching the image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(180deg,
            #2e2e2e 0%,
            #3a4a47 25%,
            #51746f 75%,
            #51746f 100%
          )`
        }}
      />
      
      {/* Optional subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
      
      {/* FAQ Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <InteractiveFAQ />
      </div>
      
      {/* Decorative elements to enhance the gradient */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-tl from-white/3 to-transparent rounded-full blur-3xl" />
    </motion.section>
  );
};

export default GradientSection;