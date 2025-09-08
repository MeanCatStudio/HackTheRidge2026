"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "./TeamMember";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const TeamCard: React.FC<{ 
  member: TeamMember;
  isOpen?: boolean;
  onOpen?: (cardId: number) => void;
  onClose?: () => void;
  columnIndex?: number;
  totalColumns?: number;
}> = ({ member, isOpen: externalIsOpen, onOpen, onClose, columnIndex, totalColumns }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [baseW, setBaseW] = useState(0);
  const [colGap, setColGap] = useState(20);
  const [internalOpen, setInternalOpen] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  // Use external open state if provided, otherwise use internal state
  const open = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

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

  const openWithAnim = () => {
    if (onOpen) {
      onOpen(member.id);
    } else {
      setInternalOpen(true);
    }
    setAnimIn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
  };

  const closeWithAnim = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
    setAnimIn(false);
    setTimeout(() => {
      if (onClose) {
        // External control - no need to set internal state
      } else {
        setInternalOpen(false);
      }
    }, 480);
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
  
  // Determine expansion direction based on column position
  // For 3 columns (mobile/laptop): the rightmost column (index 2) opens to the LEFT (anchored to the right)
  // For 4+ columns (desktop 2xl+): ALL columns open to the RIGHT (anchored to the left)
  const isRightmostColumn = totalColumns === 3 ? columnIndex === 2 : false; // Mobile: only rightmost, Desktop: none
  const offsetX = isRightmostColumn ? 20 : -20; // Right columns slide from right, others from left

  return (
    <div
      ref={rootRef}
      className="relative cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggleOpen}
      onKeyDown={onKeyDown}
      style={{ zIndex: open ? 30 : 0, overflow: "visible" }}
    >
      {/* Intrinsic height for the grid cell */}
      <div className="h-[160px] sm:h-[160px] md:h-[180px] lg:h-[200px] w-full" aria-hidden="true" />

      {/* Expanding overlay with conditional positioning */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden bg-[#2b2b2b] border border-white/15 ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        style={{
          width: open ? expandedPx : "100%",
          left: isRightmostColumn ? "auto" : 0,
          right: isRightmostColumn ? 0 : "auto",
          transform: animIn ? "translateX(0) scale(1)" : `translateX(${open ? (isRightmostColumn ? -offsetX : offsetX) : 0}px) scale(${open ? 0.985 : 1})`,
          opacity: animIn ? 1 : open ? 0 : 1,
          transition: `width 480ms ${EASE}, transform 510ms ${EASE}, opacity 470ms ${EASE}`,
          willChange: "width, transform, opacity",
        }}
      >
        <div className="relative h-full flex">
          {/* Left: headshot locked to base width */}
          <div
            className={`relative h-full shrink-0 overflow-hidden ${isRightmostColumn ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}
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
              transform: animIn ? "translateX(0)" : open ? "translateX(-10px)" : "translateX(0)",
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