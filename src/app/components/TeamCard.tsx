"use client";

import React from "react";
import Image from "next/image";
import type { TeamMember } from "./TeamMember";

const TeamCard: React.FC<{ member: TeamMember; compact?: boolean }> = ({ member, compact = false }) => {
  const title = member.isRoleCard ? member.name : member.name;

  return (
    <article
      className={`group relative overflow-hidden border-b border-[#AFD5BC]/25 transition duration-300 hover:-translate-y-1.5 ${
        compact ? "pb-3" : "pb-5"
      }`}
    >

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

        
        <div className="pointer-events-none absolute inset-0 bg-[linear-[#1E3159]/10_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 group-hover:opacity-40" />

        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c182e] via-transparent to-transparent opacity-90 transition duration-300 group-hover:opacity-75" />
      </div>

      <div className={`${compact ? "min-h-[4.25rem] p-2.5" : "min-h-[6.25rem] p-4"} relative z-10 flex flex-col justify-between`}>
        <div>
          <h3 className={`${compact ? "text-lg" : member.isRoleCard ? "text-sm sm:text-base" : "text-base sm:text-lg"} font-black leading-tight text-[#dfd7d7]`}>
            {title}
          </h3>
          {member.role && (
            <p className={`${compact ? "mt-2 text-sm" : "text-xs sm:text-sm"} font-medium text-[#AFD5BC]`}>
              {member.role}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
