"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCityTheme } from "./CityTheme";
import { INTEREST_FORM_URL } from "@/lib/links";

const sections = [
  ["#about", "About HTR"], ["#experience", "A Day at HTR"],
  ["#winners", "2025 Hall of Fame"], ["#history", "History"],
  ["#register", "Interested?"], ["#sponsors", "Sponsors"],
  ["#team", "Team"], ["#faq", "FAQ"],
];

export default function AnimatedNavbar() {
  const { theme, toggleTheme } = useCityTheme();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="city-header" ref={header}>
      <div className="city-header-bar">
        <Link href="#home" className="city-brand" onClick={() => setOpen(false)}>
          <Image src="/2026Logo.png" alt="" width={52} height={52} priority />
          <span>Hack The Ridge</span>
        </Link>
        <nav className="city-header-actions" aria-label="Main navigation">
          <button className="city-theme-toggle" type="button" aria-label="Night mode" aria-pressed={theme === "night"} onClick={toggleTheme}><span className="city-theme-orb" aria-hidden="true" />{theme === "night" ? "Night" : "Day"}</button>
          <a href={INTEREST_FORM_URL} target="_blank" rel="noopener noreferrer" className="city-register" onClick={() => setOpen(false)}>Interested?</a>
          <button ref={toggle} type="button" aria-expanded={open} aria-controls="city-navigation" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Explore"}<span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </nav>
      </div>
      {open && (
        <nav id="city-navigation" className="city-navigation" aria-label="Page sections">
          {sections.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
      )}
    </header>
  );
}
