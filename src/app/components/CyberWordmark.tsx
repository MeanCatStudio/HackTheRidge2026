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
        className={`hero-wordmark relative z-10 flex w-fit max-w-full flex-col items-center justify-center ${className}`}
        initial={{ opacity: 0, y: 34, scale: 0.96, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.85, type: "spring", stiffness: 110, damping: 16 }}
        aria-label="Hack The Ridge"
      >
        <motion.div
          className="pointer-events-none absolute left-[48%] top-1/2 z-0 h-[clamp(20rem,50vw,36rem)] w-[clamp(20rem,50vw,36rem)] -translate-x-1/2 -translate-y-1/2 opacity-50 sm:h-[clamp(20rem,50vw,36rem)] sm:w-[clamp(20rem,50vw,36rem)]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: [0.08, 0.42, 0.08], scale: [1, 1.03, 1] }}
          transition={{
            opacity: { duration: 9.6, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            scale: { duration: 9.6, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
          }}
          style={{
            WebkitMaskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 42%, rgba(0, 0, 0, 0.72) 60%, rgba(0, 0, 0, 0.28) 76%, transparent 100%)",
            maskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 42%, rgba(0, 0, 0, 0.72) 60%, rgba(0, 0, 0, 0.28) 76%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          <Image
            src="/LOGO_NO_WORDS.png"
            alt=""
            fill
            sizes="(max-width: 640px) 20rem, (max-width: 1280px) 50vw, 36rem"
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.span
          className="relative z-10 text-center text-[clamp(4.4rem,16vw,7.5rem)] leading-[0.56] font-black uppercase tracking-[0.1em] text-htr-white sm:text-[clamp(5.1rem,10.6vw,8.2rem)] md:text-[clamp(6.1rem,9.4vw,9rem)] lg:text-[clamp(6.8rem,8.4vw,9.7rem)] xl:text-[clamp(7.4rem,7.9vw,10.5rem)]"
          style={{ fontFamily: "var(--font-share-tech-mono)", textShadow: "0 4px 0 #AFD5BC, 0 8px 18px rgba(175, 213, 188, 0.18)" }}
          initial={{ opacity: 0, y: 24, rotate: -2, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 140, damping: 15 }}
        >
          <span
            className="hero-wordmark__text inline-block text-[1.06em] sm:text-[1.08em]"
            style={{ fontFamily: "var(--font-cedarville-cursive)" }}
          >
            H
          </span>
          <span className="hero-wordmark__text inline-block text-[0.8em] lowercase sm:text-[0.82em]">
            ACK
          </span>
        </motion.span>

        <motion.span
          className="relative z-20 -mt-4 mb-1 self-center text-center text-[clamp(2.15rem,7.4vw,3.3rem)] font-black lowercase leading-none tracking-[0.18em] drop-shadow-[0_6px_2px_rgba(0,0,0,0.3)] text-htr-shaded sm:-mt-5 sm:mb-2 sm:text-[clamp(2.4rem,4.8vw,3.6rem)] md:text-[clamp(2.7rem,4.2vw,4rem)] lg:text-[clamp(3rem,4.1vw,4.45rem)]"
          style={{ fontFamily: "var(--font-cedarville-cursive)" }}
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.65, delay: 0.25, type: "spring", stiffness: 140, damping: 14 }}
        >
          THE
        </motion.span>

        <motion.span
          className="relative z-10 -mt-1 text-center text-[clamp(4.4rem,16vw,7.5rem)] leading-[0.22] font-black uppercase tracking-[0.1em] text-htr-white sm:-mt-2 sm:text-[clamp(5.1rem,10.6vw,8.2rem)] md:text-[clamp(6.1rem,9.4vw,9rem)] lg:text-[clamp(6.8rem,8.4vw,9.7rem)] xl:text-[clamp(7.4rem,7.9vw,10.5rem)]"
          style={{ fontFamily: "var(--font-share-tech-mono)" }}
          initial={{ opacity: 0, y: 20, rotate: 1, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 140, damping: 15 }}
        >
          <span className="hero-wordmark__text inline-block text-[0.8em] uppercase sm:text-[0.82em]">
            RIDGE
          </span>
        </motion.span>
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
