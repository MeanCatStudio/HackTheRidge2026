"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote {
  text: string;
  author: string;
  context?: string;
}

const torturedQuotes: Quote[] = [
  {
    text: "Alright that did not work, lets roll back",
    author: "Peter",
    context: "HTR 2025 Development"
  },
  {
    text: "Why is the QnA lying to me",
    author: "Aiden",
    context: "HTR 2025 Development"
  },
  {
    text: "Hmm yes, mobile \"compatibility\"",
    author: "Aahan",
    context: "HTR 2025 Development"
  },
  {
    text: "WHY DOESN'T ANYTHING WORK",
    author: "Peter",
    context: "HTR 2025 Development"
  },
  {
    text: "I am a little bit rust at coding",
    author: "Aahan",
    context: "HTR 2025 Development"
  },
  {
    text: "Why is the entire site so laggy? I might have rendered 10k coloured blobs",
    author: "Peter",
    context: "HTR 2025 Development"
  },
  {
    text: "I swear this works on my tests!",
    author: "Peter",
    context: "HTR 2025 Development"
  },
  {
    text: "Not on my iPhone SE!",
    author: "Aahan",
    context: "HTR 2025 Development"
  },
  {
    text: "I will fix this in 10 mins, 2 hours earlier",
    author: "Peter",
    context: "HTR 2025 Development"
  },
  {
    text: "How is this design NOT google enough peter?",
    author: "Jerry",
    context: "HTR 2025 Development"
  }
];

interface HallOfTorturedSoulsProps {
  onClose?: () => void;
}

export default function HallOfTorturedSouls({ onClose }: HallOfTorturedSoulsProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % torturedQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = torturedQuotes[currentQuoteIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={() => onClose?.()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl w-full mx-4 p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Title */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-left mb-8 font-mono"
              >
                <div className="text-green-500 text-xs mb-4">
                  <span className="text-green-400">user@hacktheridge</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$</span>
                  <span className="ml-2">cat tortured_souls.log</span>
                </div>
                <div className="border-l-2 border-red-500/50 pl-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-red-500 mb-1 tracking-wide font-mono">
                    &gt; HALL_OF_TORTURED_SOULS
                  </h1>
                  <p className="text-gray-500 text-xs font-mono">
                    {/* debugging nightmares */}
                  </p>
                </div>
              </motion.div>

              {/* Quote Display - Minimal Terminal */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/50 border border-green-500/20 p-6 md:p-8 font-mono relative"
                >
                  {/* Subtle scanline */}
                  <div className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                      background: 'repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.1) 0px, transparent 2px)'
                    }}
                  />
                  
                  <div className="relative z-10 space-y-4">
                    {/* Error header */}
                    <div className="text-xs text-gray-500">
                      [ERROR #{currentQuoteIndex + 1}]
                    </div>
                    
                    {/* Quote */}
                    <p className="text-lg md:text-2xl text-red-400 leading-relaxed">
                      &gt; {currentQuote.text}
                    </p>

                    {/* Metadata */}
                    <div className="pt-3 border-t border-green-500/10 space-y-1 text-xs">
                      <p className="text-green-500">
                        --author: <span className="text-gray-400">{currentQuote.author}</span>
                      </p>
                      {currentQuote.context && (
                        <p className="text-gray-600">
                          {/* {currentQuote.context} */}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center gap-2 mt-6 font-mono text-xs">
                {torturedQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`w-6 h-1 transition-all duration-300 ${
                      index === currentQuoteIndex
                        ? 'bg-green-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="text-center text-gray-600 text-xs mt-6 font-mono">
                <span className="text-gray-700">$</span> exit
                <span className="text-gray-700 ml-3">{/* esc to close */}</span>
              </div>
            </motion.div>
    </motion.div>
  );
}
