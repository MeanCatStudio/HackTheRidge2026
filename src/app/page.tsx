"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveScrollingCards, { CardData } from "./components/InteractiveScrollingCards";
import SponsorsTitle from "./components/SponsorsTitle";
import SponsorsGrid from "./components/SponsorsGrid";
import GradientSection from "./components/GradientSection";
import TeamSection from "./components/TeamSection";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";

// Card data for the second page
const CARDS_DATA: CardData[] = [
  {
    id: 1,
    headerTitle: 'ABOUT HTR.',
    title: 'Where Innovation Meets Community',
    content: 'Hack the Ridge is where innovation meets community. We are an annual hackathon at Iroquois Ridge High School that hosts over 150+ leaders in STEM every year to innovate and push the limit of technology.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-green',
    textColor: 'text-white',
  },
  {
    id: 2,
    headerTitle: 'HISTORY',
    title: '500+ Past Participants',
    content: 'Since 2019, we\'ve grown from 50 to 200+ hackers annually, creating lasting impact.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-brown',
    textColor: 'text-white',
  },
  {
    id: 3,
    headerTitle: 'Last year...',
    title: 'Healthcare Revolution',
    content: '2024 marked our most impactful year as 300+ innovators pushed healthcare boundaries with cutting-edge AI solutions.',
    imageUrl: '',
    bgColor: 'bg-[#c39c74]',
    textColor: 'text-white',
  },
  {
    id: 4,
    headerTitle: '2025',
    title: 'Ready to Build?',
    content: 'Join us for our biggest event yet. Registration opens soon.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-app-bg',
    textColor: 'text-white',
  },
];

export default function Home() {
  const [showOldHomepage, setShowOldHomepage] = useState(false);

  if (!showOldHomepage) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden relative" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 relative">
          {/* Top accent line */}
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-12 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
            style={{ width: '120px' }}
          />

          {/* Status label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-500/40 bg-yellow-500/5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-sm uppercase tracking-widest text-yellow-500/80 font-medium">Project Status: In Development</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-tight tracking-tight" style={{ fontFamily: 'Sacco, Arial, sans-serif' }}>
              Website Under
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Construction
              </span>
            </h1>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {['2026-27', 'Season', 'Coming Soon'].map((badge, i) => (
              <motion.div
                key={badge}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full border border-yellow-500/30 bg-black/40 text-yellow-400/90"
              >
                {badge}
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-8" />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            We're architecting the next evolution of <span className="text-yellow-400">Hack the Ridge</span>. 
            Cutting-edge design and innovation coming your way.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.a
              href="mailto:contact@hacktheridge.com"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 font-bold text-lg uppercase tracking-wide text-black rounded-lg overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Notified
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>

            <motion.button
              onClick={() => setShowOldHomepage(true)}
              whileHover={{ 
                scale: 1.05,
                borderColor: '#d4af37',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-bold text-lg uppercase tracking-wide text-yellow-400 rounded-lg border-2 border-yellow-500/40 bg-black/50 hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
            >
              View Previous
            </motion.button>
          </motion.div>

          {/* Tech specs footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-xs uppercase tracking-widest text-gray-600 space-y-1"
          >
            <div>Next Gen Platform v2.0</div>
            <div>Estimated Launch: Q1 2026-27</div>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-yellow-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-app-bg w-full min-w-full">
      {/* Animated Navbar - Fixed Position */}
      <AnimatedNavbar />
      
      {/* First Page - Landing Section */}
      <div id="home" className="min-h-screen flex flex-col w-full" style={{ backgroundColor: '#2e2e2e' }}>
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8">
          <div className="text-center relative z-10">
            {/* Main Title */}
            <motion.h1
              className="text-8xl sm:text-7xl md:text-9xl lg:text-[11rem] xl:text-[12rem] 2xl:text-[13rem] font-bold text-white leading-none px-2 sm:px-4"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                letterSpacing: '0.05em'
              }}
              animate={{
                textShadow: [
                  "0 0 0px rgba(94,234,212,0)",
                  "-4px 0 0px rgba(94,234,212,0.8), 4px 0 0px rgba(251,207,130,0.8)",
                  "3px 0 0px rgba(94,234,212,0.8), -3px 0 0px rgba(251,207,130,0.8)",
                  "-2px 0 0px rgba(94,234,212,0.6), 2px 0 0px rgba(251,207,130,0.6)",
                  "2px 0 0px rgba(94,234,212,0.4), -2px 0 0px rgba(251,207,130,0.4)",
                  "0 0 0px rgba(94,234,212,0)"
                ]
              }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                times: [0, 0.15, 0.35, 0.6, 0.8, 1]
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ x: -150, opacity: 0, scale: 0.9 }}
                animate={{ 
                  x: 0, 
                  opacity: 1, 
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2,
                  ease: [0.7, 0, 0.84, 0]
                }}
                style={{ display: 'inline-block' }}
              >
                HACK THE
              </motion.span>
              {' '}
              <motion.span
                className="inline-block"
                initial={{ x: 150, opacity: 0, scale: 0.9 }}
                animate={{ 
                  x: 0,
                  opacity: 1, 
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.7, 0, 0.84, 0]
                }}
                style={{ 
                  display: 'inline-block',
                  marginLeft: '0.5rem'
                }}
              >
                RIDGE
              </motion.span>
            </motion.h1>
            
            {/* Date and Location - Below title */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start w-full mt-2 sm:mt-1 md:mt-2 px-2 sm:px-4 gap-1 sm:gap-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {/* Date - Left aligned with HACK THE on desktop, centered on mobile */}
              <div className="text-center sm:text-left flex-shrink-0">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold font-impact" style={{ letterSpacing: '0.05em' }}>
                  2025/12/06
                </p>
              </div>
              
              {/* Location - Right aligned with RIDGE on desktop, centered on mobile */}
              <div className="text-center sm:text-right flex-shrink-0 sm:pr-2 md:pr-4 lg:pr-6 xl:pr-8">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold font-impact" style={{ letterSpacing: '0.05em' }}>
                  Iroquois Ridge High School
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Wolf Logo positioned at bottom with 1/4 cut off - maintaining aspect ratio */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[35%] sm:translate-y-1/4 z-20">
            <Image
              src="/logo.png"
              alt="Wolf Logo"
              width={400}
              height={400}
              className="w-[500px] h-[500px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] 2xl:w-[600px] 2xl:h-[600px] opacity-100 object-contain"
              priority
            />
          </div>

          {/* Animated Corner Images - Flying from bottom center to fixed corner positions */}
          
          {/* Top Left - Scaled with viewport height */}
          <div
            className="absolute z-30 hidden sm:block"
            style={{
              left: 'clamp(2rem, 8vw, 12rem)',
              top: 'clamp(2rem, 8vh, 9rem)',
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToTopLeft 1s ease-out forwards',
              animationDelay: '0.7s'
            }}
          >
            <Image
              src="/homepage/bubble.svg"
              alt="Top left decoration"
              width={100}
              height={100}
              className="bg-transparent"
              style={{
                width: 'clamp(60px, 8vw, 150px)',
                height: 'clamp(60px, 8vw, 150px)',
                maxWidth: 'min(12vh, 150px)',
                maxHeight: 'min(12vh, 150px)'
              }}
            />
          </div>

          {/* Top Right - Scaled with viewport height */}
          <div
            className="absolute z-30 hidden sm:block"
            style={{
              right: 'clamp(2rem, 8vw, 12rem)',
              top: 'clamp(3rem, 10vh, 11rem)',
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToTopRight 1s ease-out forwards',
              animationDelay: '0.75s'
            }}
          >
            <Image
              src="/homepage/cloud.svg"
              alt="Top right decoration"
              width={90}
              height={90}
              className="bg-transparent"
              style={{
                width: 'clamp(55px, 7vw, 130px)',
                height: 'clamp(55px, 7vw, 130px)',
                maxWidth: 'min(11vh, 130px)',
                maxHeight: 'min(11vh, 130px)'
              }}
            />
          </div>

          {/* Bottom Left - Scaled with viewport height */}
          <div
            className="absolute z-30 hidden sm:block"
            style={{
              left: 'clamp(1rem, 6vw, 10rem)',
              bottom: 'clamp(3rem, 10vh, 11rem)',
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToBottomLeft 1s ease-out forwards',
              animationDelay: '0.8s'
            }}
          >
            <Image
              src="/homepage/headphones.svg"
              alt="Bottom left decoration"
              width={140}
              height={140}
              className="bg-transparent -rotate-45"
              style={{
                width: 'clamp(70px, 9vw, 180px)',
                height: 'clamp(70px, 9vw, 180px)',
                maxWidth: 'min(14vh, 180px)',
                maxHeight: 'min(14vh, 180px)'
              }}
            />
          </div>

          {/* Bottom Right - Scaled with viewport height */}
          <div
            className="absolute z-30 hidden sm:block"
            style={{
              right: 'clamp(2rem, 8vw, 12rem)',
              bottom: 'clamp(2rem, 8vh, 9rem)',
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToBottomRight 1s ease-out forwards',
              animationDelay: '0.85s'
            }}
          >
            <Image
              src="/homepage/usb.svg"
              alt="Bottom right decoration"
              width={100}
              height={100}
              className="bg-transparent rotate-20"
              style={{
                width: 'clamp(60px, 8vw, 150px)',
                height: 'clamp(60px, 8vw, 150px)',
                maxWidth: 'min(12vh, 150px)',
                maxHeight: 'min(12vh, 150px)'
              }}
            />
          </div>
        </main>
      </div>

      {/* Second Page - Interactive Scrolling Cards */}
      <div id="about" className="w-full">
        <InteractiveScrollingCards cards={CARDS_DATA} />
      </div>

      {/* Third Page - Sponsors Section */}
      <div id="sponsors" className="min-h-screen w-full" style={{ backgroundColor: '#2e2e2e' }}>
        <SponsorsTitle />
        <SponsorsGrid />
      </div>

      {/* Team Section */}
      <div className="w-full">
        <TeamSection />
      </div>

      {/* Gradient Section */}
      <div id="faq" className="w-full">
        <GradientSection />
      </div>
      

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
