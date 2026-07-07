"use client";

import React, { useState } from "react";
import Link from "next/link";
import CyberWordmark from "./CyberWordmark";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.35rem] border border-[#AFD5BC]/25 bg-[#1E3159]/92 px-4 py-3 shadow-[0_18px_55px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:px-5">
        <Link href="#home" className="group flex items-center" onClick={closeMobileMenu} aria-label="Go to home">
          <CyberWordmark variant="nav" />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-chip">
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#AFD5BC]/25 bg-[#dfd7d7]/8 lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-[#AFD5BC] ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#AFD5BC] ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#AFD5BC] ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </span>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-[1.25rem] border border-[#AFD5BC]/25 bg-[#1E3159]/96 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-2xl px-4 py-3 text-center text-sm font-black uppercase tracking-[0.2em] text-[#dfd7d7] hover:bg-[#AFD5BC]/12 hover:text-[#AFD5BC]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default AnimatedNavbar;
