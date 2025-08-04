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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center transition-all duration-500 ease-out"
      initial={{ y: 0 }}
      animate={{
        paddingTop: isScrolled ? '1rem' : '2rem',
        paddingBottom: isScrolled ? '1rem' : '2rem',
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{
          backgroundColor: isScrolled ? 'rgba(46, 46, 46, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
          borderRadius: isScrolled ? '2rem' : '0rem',
          padding: isScrolled ? '0.75rem 2rem' : '0rem',
          boxShadow: isScrolled 
            ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
            : '0 0px 0px rgba(0, 0, 0, 0)',
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
          {/* Logo - only visible when scrolled */}
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
                    src="/logo.png"
                    alt="Hack the Ridge Logo"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Items */}
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
                  className="text-white font-bold tracking-wider transition-colors duration-300 hover:text-gray-300"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                  }}
                  animate={{
                    fontSize: isScrolled ? '1.125rem' : '1.5rem',
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {item.label}
                </motion.span>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default AnimatedNavbar;