"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#about', label: 'ABOUT' },
  { href: '#sponsors', label: 'SPONSORS' },
  { href: '#register', label: 'REGISTER' },
  { href: '#team', label: 'TEAM' },
  { href: '#faq', label: 'FAQ' },
];

const AnimatedNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger compact mode the moment we reach the first scrolling card
      // Landing page is 100vh, so trigger at exactly 100vh (when scrolling cards start)
      const landingPageHeight = window.innerHeight; // Full viewport height
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition >= landingPageHeight);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center transition-all duration-500 ease-out px-2 sm:px-4"
        initial={{ y: 0 }}
        animate={{
          paddingTop: isScrolled ? '1rem' : '2rem',
          paddingBottom: isScrolled ? '1rem' : '2rem',
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Mobile Layout */}
        <motion.div
          className="flex lg:hidden items-center justify-between w-full max-w-[600px] mx-auto gap-4 border border-[#7DB6AD]/40"
          animate={{
            backgroundColor: isScrolled ? 'rgba(30, 49, 89, 0.96)' : 'rgba(30, 49, 89, 0.9)',
            backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
            borderRadius: '9999px',
            padding: isScrolled ? '0.45rem 0.8rem' : '0.6rem 0.8rem',
            boxShadow: isScrolled 
              ? '0 14px 34px rgba(15, 24, 45, 0.28)' 
              : '0 10px 28px rgba(15, 24, 45, 0.2)',
          }}
          transition={{ 
            duration: 0.5, 
            ease: 'easeOut',
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 },
            boxShadow: { duration: 0.4 },
          }}
        >
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Link href="#home" className="flex items-center touch-target">
              <Image
                src="/logo.png"
                alt="Hack the Ridge Logo"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 hover:scale-110 transition-transform duration-300 object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Mobile Hamburger Menu Button */}
          <motion.button
            className="flex flex-col justify-center items-center w-10 h-10 sm:w-11 sm:h-11 space-y-1.5 touch-target"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
            tabIndex={0}
          >
            <motion.span
              className="w-6 h-0.5 sm:w-7 bg-[#1E3159] origin-center"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.span
              className="w-6 h-0.5 sm:w-7 bg-[#1E3159]"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.span
              className="w-6 h-0.5 sm:w-7 bg-[#1E3159] origin-center"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.button>
        </motion.div>

        {/* Desktop Layout - Centered */}
        <motion.div
          className="hidden lg:flex items-center justify-center border border-[#7DB6AD]/40"
          animate={{
            backgroundColor: isScrolled ? 'rgba(30, 49, 89, 0.96)' : 'rgba(30, 49, 89, 0.9)',
            backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
            borderRadius: '9999px',
            padding: isScrolled ? '0.45rem 0.8rem' : '0.45rem 0.8rem',
            boxShadow: isScrolled 
              ? '0 14px 34px rgba(15, 24, 45, 0.28)' 
              : '0 10px 28px rgba(15, 24, 45, 0.2)',
          }}
          transition={{ 
            duration: 0.5, 
            ease: 'easeOut',
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 },
            boxShadow: { duration: 0.4 },
          }}
        >
          <motion.div
            className="flex items-center"
            animate={{
              gap: isScrolled ? '1.5rem' : '3rem',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Desktop Logo - only visible when scrolled */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="mr-4"
                >
                  <Link href="#home" className="flex items-center">
                    <Image
                      src="/2026Logo.png"
                      alt="Hack the Ridge Logo"
                      width={64}
                      height={64}
                      className="hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation Items */}
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: 'easeOut'
                }}
              >
                <Link
                  href={item.href}
                  className="relative group"
                >
                  <motion.span
                    className="block rounded-full px-4 py-2 font-bold tracking-wider navbar-link"
                    initial={{ backgroundColor: 'rgba(255,255,255,0)', color: '#F7F7F7' }}
                    animate={{
                      fontSize: isScrolled ? '1.25rem' : '1.5rem',
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(175, 213, 188, 0.95)',
                      color: '#1E3159',
                      scale: 1.03,
                      boxShadow: '0 8px 24px rgba(125, 182, 173, 0.18)',
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                    }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-1 left-1/2 h-0.5 bg-[#7DB6AD] origin-center"
                    initial={{ scaleX: 0, x: '-50%' }}
                    whileHover={{ scaleX: 1, x: '-50%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ width: '70%' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Menu Content */}
            <motion.div
              className="relative w-[90vw] max-w-xs bg-[#151c26] rounded-2xl shadow-2xl flex flex-col items-center py-8 px-4 animate-fade-in-up"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Mobile Navigation Items */}
              <nav className="flex flex-col items-center w-full mt-4">
                {navItems.map((item, index) => (
                  <>
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{
                        backgroundColor: 'rgba(175, 213, 188, 0.95)',
                        scale: 1.01,
                        boxShadow: '0 10px 24px rgba(125, 182, 173, 0.18)',
                      }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.35,
                        ease: 'easeOut'
                      }}
                      className="w-full rounded-full"
                    >
                      <Link
                        href={item.href}
                        className="block w-full text-center py-3 px-4 text-[#1E3159] text-lg font-semibold tracking-wide rounded-full hover:bg-[#AFD5BC] hover:text-[#1E3159] active:bg-[#7DB6AD] transition-all duration-200 mobile-nav-item touch-target"
                        style={{
                          fontFamily: 'Sacco, Impact, Arial Black, sans-serif',
                          letterSpacing: '0.04em',
                        }}
                        onClick={closeMobileMenu}
                        tabIndex={0}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                    {index < navItems.length - 1 && (
                      <div className="w-3/4 mx-auto h-px bg-white/10 my-1" />
                    )}
                  </>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedNavbar;