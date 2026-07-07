"use client";

import React from "react";
import Image from "next/image";
import { teamMembers } from "./TeamMember";
import TeamCard from "./TeamCard";
const pastBuilders = [
  { name: "Aiden", image: "/team/aiden.JPG" },
  { name: "Thomas", image: "/team/thomas.JPG" },
  { name: "Sumedh", image: "/team/sumedh.JPG" },
  { name: "Ali", image: "/team/ali.JPG" },
  { name: "Peter", image: "/team/peter.JPG" },
  { name: "Ryan", image: "/team/ryan.JPG" },
  { name: "Aahan", image: "/team/aahan.JPG" },
  { name: "Michelle", image: "/team/michelle.JPG" },
  { name: "Jerry", image: "/team/jerry.JPG" },
];

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
                <span className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-[#AFD5BC]">THE</span>
                <Image src="/logo.svg" alt="logo" width={96} height={96} className="opacity-90 -mx-0.5 sm:-mx-1 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                <span className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-[#AFD5BC]">TEAM</span>
              </div>

              <div className="mt-7 text-center lg:text-left text-3xl sm:text-[34px] md:text-[38px] font-normal tracking-wide text-[#AFD5BC]">
                PLANNING HAD ALREADY STARTED
              </div>

              <div className="mt-4 text-center lg:text-left text-3xl sm:text-[34px] md:text-[38px] font-normal tracking-wide">
                <span className="text-[#dfd7d7]">$6,000</span>{" "}
                <span className="text-[#AFD5BC]">WAS RAISED LAST SEASON</span>
              </div>

              <div className="mt-7">
                <div className="text-center lg:text-left text-[#dfd7d7]/85 text-3xl sm:text-[34px] md:text-[38px] font-normal tracking-wide">ONE DAY BECAME A</div>
                <div className="mt-3 text-center lg:text-left text-6xl sm:text-7xl lg:text-8xl font-medium tracking-wide text-[#dfd7d7]">
                  LAUNCHPAD
                </div>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="hidden lg:block bg-[#AFD5BC]/60 rounded-full" />
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

        <div className="mt-16 border-t border-[#AFD5BC]/22 pt-12 lg:mt-20 lg:pt-14">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#7DB6AD]">Past HTR builders</p>
            <h3 className="font-sacco text-4xl font-black uppercase leading-[0.9] tracking-[0.05em] text-[#dfd7d7] sm:text-5xl">
              Respect to the names that helped build the path.
            </h3>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-9 lg:justify-start">
            {pastBuilders.map((builder) => (
              <div key={builder.name} className="group w-24 text-center sm:w-28">
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-[#1E3159] ring-2 ring-[#AFD5BC]/22 shadow-lg shadow-black/20 transition duration-300 group-hover:-translate-y-1 group-hover:ring-[#AFD5BC]/70 sm:h-24 sm:w-24">
                  <Image src={builder.image} alt={`${builder.name} past HTR builder`} fill sizes="96px" className="object-cover transition duration-300 group-hover:scale-110" />
                </div>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#dfd7d7] sm:text-sm">{builder.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;