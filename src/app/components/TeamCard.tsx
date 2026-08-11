"use client";

import React from "react";
import Image from "next/image";
import type { TeamMember } from "./TeamMember";

const TeamCard: React.FC<{ member: TeamMember; compact?: boolean }> = ({ member, compact = false }) => {
  const title = member.isRoleCard ? member.name : member.name;

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.2rem] border border-[#AFD5BC]/20 bg-[#0d1b33]/90 shadow-lg shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-[#AFD5BC]/70 hover:shadow-[0_0_25px_rgba(175,213,188,0.25)] ${
        compact ? "rounded-[1rem]" : ""
      }`}
    >
      {/* Cyber Corner Accent */}
      <div className="absolute right-2 top-2 z-20 h-1.5 w-1.5 rounded-full bg-[#AFD5BC]/40 transition group-hover:bg-[#AFD5BC] group-hover:shadow-[0_0_8px_#AFD5BC]" />

      <div className={`relative w-full overflow-hidden bg-[#1E3159] ${compact ? "aspect-[6/7]" : "aspect-[4/5]"}`}>
        {member.image.endsWith(".svg") ? (
          <img
            src={member.image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={member.image || "/team/placeholder.jpg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1280px) 20vw, 16vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            style={member.name === "Michelle Wang" ? { objectPosition: "center top" } : undefined}
          />
        )}

        {/* Scanline / Grid Overlay Effect */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-[#1E3159]/10_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 group-hover:opacity-40" />

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c182e] via-transparent to-transparent opacity-90 transition duration-300 group-hover:opacity-75" />
      </div>

      <div className={`${compact ? "min-h-[4.25rem] p-2.5" : "min-h-[6.25rem] p-4"} relative z-10 flex flex-col justify-between`}>
        <div>
          <h3 className={`${compact ? "text-[13px]" : member.isRoleCard ? "text-sm sm:text-base" : "text-base sm:text-lg"} font-black leading-tight text-[#dfd7d7]`}>
            {title}
          </h3>
          {member.role && (
            <p className={`${compact ? "mt-0.5 text-[9px]" : "text-xs sm:text-sm"} font-mono font-semibold uppercase tracking-[0.12em] text-[#AFD5BC]`}>
              {member.role}
            </p>
          )}
        </div>

        {/* Terminal Identifier Chip */}
        <div className="mt-2 flex items-center justify-between border-t border-[#AFD5BC]/10 pt-1 font-mono text-[8px] text-[#7DB6AD]/70">
          <span>ID: {member.id || "00"}</span>
          <span className="opacity-0 transition group-hover:opacity-100 text-[#AFD5BC]">// READY</span>
        </div>
      </div>
    </article>
  );
};

export default TeamCard;