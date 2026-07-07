"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CyberWordmark from "./CyberWordmark";

interface NavItem {
  href: string;
  label: string;
  index: string;
}

const navItems: NavItem[] = [
  { href: "#about", label: "About", index: "01" },
  { href: "#winners", label: "Previous Winners", index: "02" },
  { href: "#sponsors", label: "Sponsors", index: "03" },
  { href: "#register", label: "Register", index: "04" },
  { href: "#team", label: "Team", index: "05" },
  { href: "#faq", label: "FAQ", index: "06" },
];

const AnimatedNavbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("htr-theme");
    const shouldUseDark = storedTheme === "dark";
    document.documentElement.classList.toggle("htr-dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);
    setMounted(true);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    document.documentElement.classList.toggle("htr-dark", nextMode);
    window.localStorage.setItem("htr-theme", nextMode ? "dark" : "classic");
  };

  if (!mounted) {
    return <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6" aria-label="Site navigation" />;
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#1E3159]/45 to-transparent" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link
          href="#home"
          className="nav-logo-chip group flex items-center"
          onClick={closeMobileMenu}
          aria-label="Go to home"
        >
          <CyberWordmark variant="nav" />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="nav-links-shell flex items-center gap-1" aria-label="Section navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-chip">
                {item.label}
              </Link>
            ))}
          </div>
          <button type="button" className="nav-theme-switch" onClick={toggleDarkMode} aria-pressed={isDarkMode}>
            {isDarkMode ? "Classic" : "Dark"}
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[#AFD5BC]/25 bg-[#1E3159]/62 shadow-lg shadow-black/20 backdrop-blur-xl lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-[#AFD5BC] transition ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#AFD5BC] transition ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#AFD5BC] transition ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-[1.25rem] border border-[#AFD5BC]/22 bg-[#1E3159]/94 p-3 shadow-2xl shadow-black/25 backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-2xl px-4 py-3 text-center text-sm font-black uppercase tracking-[0.2em] text-[#dfd7d7] transition hover:bg-[#AFD5BC]/12 hover:text-[#AFD5BC]"
              >
                {item.label}
              </Link>
            ))}
            <button type="button" className="nav-theme-switch mx-auto w-full" onClick={toggleDarkMode} aria-pressed={isDarkMode}>
              {isDarkMode ? "Classic" : "Dark"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AnimatedNavbar;
