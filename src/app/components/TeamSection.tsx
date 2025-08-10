"use client";

import React from "react";
import Image from "next/image";
import { teamMembers } from "./TeamMember";
import TeamCard from "./TeamCard";
import WeeksCounter from "./WeeksCounter";
import InlineCurrencyCounter from "./InlineCurrencyCounter";

const PLANNING_START_ISO = "2025-01-01";
const MONEY_RAISED = 3000000;

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="w-full bg-app-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(300px,480px)_2px_1fr]">
          {/* left info panel */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-wide text-[#B8B8B8]">THE</span>
              <Image src="/wolf.svg" alt="wolf" width={36} height={36} className="opacity-90" />
              <span className="text-3xl sm:text-4xl font-extrabold tracking-wide text-[#A5A5A5]">TEAM</span>
            </div>

            <div className="mt-7 text-2xl sm:text-[28px] font-extrabold tracking-wide text-[#9A9A9A]">
              <WeeksCounter startDateISO={PLANNING_START_ISO} className="text-[#6BC59A]" /> WEEKS OF PLANNING
            </div>

            <div className="mt-4 text-2xl sm:text-[28px] font-extrabold tracking-wide">
              <span className="text-[#6BC59A]">
                <InlineCurrencyCounter value={MONEY_RAISED} />
              </span>{" "}
              <span className="text-[#C8C8C8]">RAISED</span>
            </div>

            <div className="mt-7">
              <div className="text-white/85 text-2xl sm:text-[28px] font-extrabold tracking-wide">FOR ONE DAY OF</div>
              <div className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide" style={{ color: "#D7A86E" }}>
                INNOVATION
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="hidden lg:block bg-white/70 rounded-full" />

          {/* right grid */}
          <div>
            <div className="team-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-5 sm:gap-6">
              {teamMembers.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;