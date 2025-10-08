"use client";

import React from "react";
import Image from "next/image";
import { teamMembers } from "./TeamMember";
import TeamCard from "./TeamCard";
import WeeksCounter from "./WeeksCounter";
import InlineCurrencyCounter from "./InlineCurrencyCounter";

const PLANNING_START_ISO = "2025-01-01";
const MONEY_RAISED = 6000;

const TeamSection: React.FC = () => {
  const [openCardId, setOpenCardId] = React.useState<number | null>(null);
  const [gridColumns, setGridColumns] = React.useState(3);

  const handleCardOpen = (cardId: number) => {
    setOpenCardId(cardId);
  };

  const handleCardClose = () => {
    setOpenCardId(null);
  };

  // Handle responsive grid columns
  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        // xl breakpoint - 5 columns
        setGridColumns(5);
      } else if (width >= 768) {
        // md breakpoint - 4 columns
        setGridColumns(4);
      } else {
        // mobile - 3 columns
        setGridColumns(3);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
  }, []);

  return (
    <section id="team" className="w-full bg-app-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(300px,480px)_2px_1fr] lg:items-center">
          {/* left info panel - sticky wrapper */}
          <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 h-fit">
            <div className="flex flex-col items-center lg:items-start" style={{ fontFamily: "Palalabas Wide, Impact, Arial Black, sans-serif" }}>
              <div className="flex items-center justify-center lg:justify-start gap-1">
                <span className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-[#A5A5A5]">THE</span>
                <Image src="/logo.svg" alt="logo" width={96} height={96} className="opacity-90 -mx-0.5 sm:-mx-1 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                <span className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-[#A5A5A5]">TEAM</span>
              </div>

              <div className="mt-7 text-center lg:text-left text-3xl sm:text-[34px] md:text-[38px] font-normal tracking-wide text-[#A5A5A5]">
                <WeeksCounter startDateISO={PLANNING_START_ISO} className="text-white" /> WEEKS OF PLANNING
              </div>

              <div className="mt-4 text-center lg:text-left text-3xl sm:text-[34px] md:text-[38px] font-normal tracking-wide">
                <span className="text-white">
                  <InlineCurrencyCounter value={MONEY_RAISED} />
                </span>{" "}
                <span className="text-[#A5A5A5]">RAISED</span>
              </div>

              <div className="mt-7">
                <div className="text-center lg:text-left text-white/85 text-3xl sm:text-[34px] md:text-[38px] font-normal tracking-wide">FOR ONE DAY OF</div>
                <div className="mt-3 text-center lg:text-left text-6xl sm:text-7xl lg:text-8xl font-medium tracking-wide text-white">
                  INNOVATION
                </div>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="hidden lg:block bg-white/70 rounded-full" />
          {/* right grid */}
          <div>
      <div className="team-grid grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 grid-flow-row-dense gap-4 sm:gap-5">
              {teamMembers.map((m, index) => {
                // Calculate column index based on responsive grid
        // Mobile: 3 columns, Tablet: 4 columns, Desktop: 5 columns
                const totalColumns = gridColumns;
                const columnIndex = index % totalColumns;
                
                return (
                  <TeamCard 
                    key={m.id} 
                    member={m} 
                    isOpen={openCardId === m.id}
                    onOpen={handleCardOpen}
                    onClose={handleCardClose}
                    columnIndex={columnIndex}
                    totalColumns={totalColumns}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;