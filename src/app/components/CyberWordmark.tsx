"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type CyberWordmarkProps = {
  className?: string;
  variant?: "hero" | "nav" | "footer";
};

export default function CyberWordmark({ className = "", variant = "hero" }: CyberWordmarkProps) {
  if (variant === "hero") {
    return (
      <motion.div
        className={`htr-hero-mark relative z-10 w-full max-w-[34rem] ${className}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        aria-label="Hack The Ridge"
      >
        <div className="htr-hero-mark__topline">IR / HTR / 2026</div>
        <div className="htr-hero-mark__title">Hack</div>
        <div className="htr-hero-mark__subtitle pt-5">The Ridge</div>
        <div className="htr-hero-mark__bottomline">Build here. Ship everywhere.</div>
      </motion.div>
    );
  }

  return (
    <div className={`cyber-wordmark cyber-wordmark--${variant} ${className}`} aria-label="Hack The Ridge">
      <span className="cyber-wordmark__line" data-text="Hack">Hack</span>
      <span className="cyber-wordmark__line cyber-wordmark__line--accent" data-text="The Ridge">The Ridge</span>
    </div>
  );
}
