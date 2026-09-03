"use client";

import React from 'react';
import { motion } from 'framer-motion';
import InteractiveFAQ from './InteractiveFAQ';

const GradientSection: React.FC = () => {
  return (
    <motion.section
      id="faq"
      className="relative min-h-screen w-full overflow-hidden scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12">
        <InteractiveFAQ />
      </div>
    </motion.section>
  );
};

export default GradientSection;