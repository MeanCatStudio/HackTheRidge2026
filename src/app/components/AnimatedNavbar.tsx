"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "#about", label: "ABOUT" },
  { href: "#sponsors", label: "SPONSORS" },
  { href: "#register", label: "REGISTER" },
  { href: "#team", label: "TEAM" },
  { href: "#faq", label: "FAQ" },
];

const AnimatedNavbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("htr-theme");
    const shouldUseDark = storedTheme === "dark";
    document.documentElement.classList.toggle("htr-dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);

    const handleScroll = () => {
      const landingPageHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition >= landingPageHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    setMounted(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    document.documentElement.classList.toggle("htr-dark", nextMode);
    window.localStorage.setItem("htr-theme", nextMode ? "dark" : "classic");
  };

  if (!mounted) {
    return <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4" aria-label="Site navigation" />;
  }

  return (
    <>
      <motion.nav
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
        initial={{ y: 0 }}
        animate={{
          paddingTop: isScrolled ? "0.75rem" : "1rem",
          paddingBottom: isScrolled ? "0.75rem" : "1rem",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#AFD5BC]/30 bg-[#1E3159]/90 px-2.5 py-1.5 shadow-[0_12px_40px_rgba(15,24,45,0.26)] backdrop-blur-xl sm:px-4 sm:py-2 lg:px-5">
          <Link href="#home" className="flex min-w-0 items-center gap-1.5 sm:gap-3" onClick={closeMobileMenu}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 sm:h-12 sm:w-12">
              <Image
                src="/2026Logo.png"
                alt="Hack the Ridge Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain sm:h-12 sm:w-12"
                priority
              />
            </div>
            <div className="flex min-w-0 flex-col leading-none">
              <span className="max-w-[8.5rem] truncate text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#AFD5BC] sm:max-w-none sm:text-[0.68rem] sm:tracking-[0.35em]">
                Hack The Ridge
              </span>
              <span className="mt-1 hidden text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-white/70 min-[420px]:block">
                2026-2027
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item, index) => {
              const isPrimary = item.label === "REGISTER";

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${
                      isPrimary
                        ? "bg-[#AFD5BC] text-[#1E3159] shadow-[0_8px_24px_rgba(175,213,188,0.18)] hover:-translate-y-0.5 hover:bg-[#C8E4D2]"
                        : "text-white/80 hover:bg-[#AFD5BC]/15 hover:text-[#AFD5BC]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}

            <button
              type="button"
              className="rounded-full border border-[#AFD5BC]/30 bg-[#AFD5BC]/10 px-3.5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/85 transition-all duration-300 hover:bg-[#AFD5BC]/20 hover:text-[#AFD5BC]"
              onClick={toggleDarkMode}
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? "CLASSIC" : "DARK"}
            </button>
          </div>

          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#AFD5BC]/30 bg-[#AFD5BC]/10 text-white transition-colors duration-300 hover:bg-[#AFD5BC]/20 lg:hidden"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-start justify-center bg-[#0f172b]/55 px-4 pt-24 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-[28px] border border-[#AFD5BC]/30 bg-[#111b2f]/95 p-5 shadow-[0_20px_60px_rgba(15,24,45,0.35)]"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#AFD5BC]">
                  Navigate
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#AFD5BC]/30 bg-[#AFD5BC]/10 px-3 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#AFD5BC]/20"
                    onClick={toggleDarkMode}
                    aria-pressed={isDarkMode}
                  >
                    {isDarkMode ? "Classic" : "Dark"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[#AFD5BC]/30 bg-[#AFD5BC]/10 px-3 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#AFD5BC]/20"
                    onClick={closeMobileMenu}
                  >
                    Close
                  </button>
                </div>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-transparent px-4 py-3 text-left text-base font-semibold uppercase tracking-[0.24em] text-white/85 transition-all duration-300 hover:border-[#AFD5BC]/30 hover:bg-[#AFD5BC]/10 hover:text-[#AFD5BC]"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
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
