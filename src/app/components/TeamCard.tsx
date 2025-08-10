"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "./TeamMember";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [baseW, setBaseW] = useState(0);
  const [colGap, setColGap] = useState(20);
  const [open, setOpen] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [flipLeft, setFlipLeft] = useState(false);

  // Measure base width and grid gap
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const read = () => {
      const r = el.getBoundingClientRect();
      if (r.width) setBaseW(r.width);

      const parent = el.parentElement;
      if (parent) {
        const styles = getComputedStyle(parent);
        const gap = parseFloat(styles.columnGap || "20");
        if (!Number.isNaN(gap)) setColGap(gap);
      }
    };

    read();
    const ro = "ResizeObserver" in window ? new ResizeObserver(read) : null;
    ro?.observe(el);
    window.addEventListener("resize", read);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", read);
    };
  }, []);

  const computeFlip = () => {
    const el = rootRef.current;
    if (!el) return false;
    const grid = el.closest(".team-grid") as HTMLElement | null;
    const gridRect = grid?.getBoundingClientRect();
    const cardRect = el.getBoundingClientRect();
    const margin = 8;
    const expandedPx = baseW * 2 + colGap;
    if (!gridRect) return false;
    const wouldRight = cardRect.left + expandedPx;
    return wouldRight > gridRect.right - margin;
  };

  const openWithAnim = () => {
    setFlipLeft(computeFlip());
    setOpen(true);
    setAnimIn(false);
    // wait a frame so CSS transitions pick up
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
  };

  const closeWithAnim = () => {
    setAnimIn(false);
    setTimeout(() => setOpen(false), 480);
  };

  const toggleOpen = () => (open ? closeWithAnim() : openWithAnim());

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    } else if (e.key === "Escape" && open) {
      closeWithAnim();
    }
  };

  const expandedPx = baseW * 2 + colGap;
  const offsetX = flipLeft ? 20 : -20;

  return (
    <div
      ref={rootRef}
      className="relative cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggleOpen}
      onKeyDown={onKeyDown}
      // ensure this card stacks above neighbors when open
      style={{ zIndex: open ? 30 : 0, overflow: "visible" }}
    >
      {/* Intrinsic height for the grid cell */}
      <div className="aspect-[4/5]" aria-hidden="true" />

      {/* Expanding overlay within the same DOM (no portal) */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden bg-[#2b2b2b] border border-white/15 ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        style={{
          // Grow width to about two columns
          width: open ? expandedPx : "100%",
          // Anchor to side based on flip
          left: flipLeft ? "auto" as const : 0,
          right: flipLeft ? 0 : "auto",
          // Slide + fade
          transform: animIn ? "translateX(0) scale(1)" : `translateX(${open ? offsetX : 0}px) scale(${open ? 0.985 : 1})`,
          opacity: animIn ? 1 : open ? 0 : 1,
          transition: `width 480ms ${EASE}, transform 510ms ${EASE}, opacity 470ms ${EASE}`,
          willChange: "width, transform, opacity",
        }}
      >
        <div className="relative h-full flex">
          {/* Left: headshot locked to base width */}
          <div
            className="relative h-full shrink-0 overflow-hidden rounded-l-2xl"
            style={{
              width: baseW || "100%",
              transform: animIn ? "scale(1)" : open ? "scale(1.01)" : "scale(1)",
              transition: `transform 570ms ${EASE}`,
            }}
          >
            <Image
              src={member.image || "/team/placeholder.jpg"}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 22vw, 16vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Right: info panel uses the extra width */}
          <div
            className="flex-1 min-w-0 flex flex-col justify-end p-4 text-white"
            style={{
              transform: animIn ? "translateX(0)" : open ? `translateX(${flipLeft ? 10 : -10}px)` : "translateX(0)",
              opacity: animIn ? 1 : open ? 0 : 1,
              transition: `transform 530ms ${EASE} 120ms, opacity 530ms ${EASE} 120ms`,
            }}
          >
            <h3 className="text-lg font-semibold leading-tight truncate">{member.name}</h3>
            <p className="text-sm text-white/80 truncate">{member.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;