"use client";

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
                  2025/12/16
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
          
          {/* Top Left - Moved closer to center vertically */}
          <div
            className="absolute top-16 sm:top-20 md:top-24 lg:top-28 xl:top-32 2xl:top-36 z-30 hidden sm:block"
            style={{
              left: 'clamp(2rem, 8vw, 12rem)',
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
              className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] xl:w-[170px] xl:h-[170px] 2xl:w-[190px] 2xl:h-[190px] bg-transparent"
            />
          </div>

          {/* Top Right - Moved closer to center vertically */}
          <div
            className="absolute top-20 sm:top-24 md:top-32 lg:top-36 xl:top-40 2xl:top-44 z-30 hidden sm:block"
            style={{
              right: 'clamp(2rem, 8vw, 12rem)',
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
              className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] bg-transparent"
            />
          </div>

          {/* Bottom Left - Moved slightly closer to the bottom-left corner */}
          <div
            className="absolute bottom-20 sm:bottom-24 md:bottom-25 lg:bottom-28 xl:bottom-32 2xl:bottom-36 z-30 hidden sm:block"
            style={{
              left: 'clamp(1rem, 6vw, 10rem)',
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
              className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] 2xl:w-[220px] 2xl:h-[220px] bg-transparent -rotate-45"
            />
          </div>

          {/* Bottom Right - Moved closer to center vertically */}
          <div
            className="absolute bottom-16 sm:bottom-24 md:bottom-32 lg:bottom-36 xl:bottom-40 2xl:bottom-44 z-30 hidden sm:block"
            style={{
              right: 'clamp(2rem, 8vw, 12rem)',
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
              className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] xl:w-[170px] xl:h-[170px] 2xl:w-[190px] 2xl:h-[190px] bg-transparent rotate-20"
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
