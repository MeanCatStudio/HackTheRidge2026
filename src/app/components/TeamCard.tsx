"use client";

import React from "react";
import Image from "next/image";
import type { TeamMember } from "./TeamMember";

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <article className="group overflow-hidden rounded-[1.35rem] border border-[#AFD5BC]/18 bg-[#dfd7d7]/8 shadow-lg shadow-black/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#AFD5BC]/55 hover:bg-[#dfd7d7]/12 hover:shadow-2xl hover:shadow-black/25">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1E3159]">
        <Image
          src={member.image || "/team/placeholder.jpg"}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1280px) 20vw, 16vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          style={member.name === "Michelle Wang" ? { objectPosition: "center top" } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3159]/75 via-transparent to-transparent opacity-85" />
      </div>

      <div className="min-h-[6.25rem] p-4">
        <h3 className="text-base font-black leading-tight text-[#dfd7d7] sm:text-lg">{member.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#AFD5BC]/82 sm:text-sm">{member.role}</p>
      </div>
    </article>
  );
};

export default TeamCard;
