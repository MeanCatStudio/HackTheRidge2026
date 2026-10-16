"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  tier: 1 | 2 | 3 | 4 | 5;
}

const LAST_YEAR_SPONSORS: Sponsor[] = [
  {
    id: 2,
    name: "Dm Industries",
    logoUrl: "https://www.dm-ind.com/main/wp-content/uploads/2015/12/DM_logo_withlogo2.svg",
    websiteUrl: "https://www.dm-ind.com/main/",
    tier: 2,
  },
  {
    id: 3,
    name: "YRI Fellowship",
    logoUrl: "https://www.yriscience.com/logo.png",
    websiteUrl: "https://www.yriscience.com/",
    tier: 3,
  },
  {
    id: 5,
    name: "Brock University",
    logoUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Brock_University_Logo_2022.svg/1280px-Brock_University_Logo_2022.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230630120706",
    websiteUrl: "https://brocku.ca/",
    tier: 5,
  },  
  {
    id: 6,
    name: "Queen's University",
    logoUrl: "https://www.queensu.ca/resources/assets/logos/Queens-logo-reversed.svg",
    tier: 5,
  },
  {
    id: 7,
    name: "University of Waterloo",
    logoUrl: "https://uwaterloo.ca/profiles/uw_base_profile/modules/custom/uw_wcms_ohana/dist/images/uwaterloo-logo.svg",
    websiteUrl: "https://uwaterloo.ca/",
    tier: 5,
  },
  {
    id: 8,
    name: "US CAN Visa",
    logoUrl: "/ucv.png",
    websiteUrl: "https://uscanvisa.com",
    tier: 5,
  },
  {
    id: 9,
    name: "Hatch Engineering",
    logoUrl: "/hatch.png",
    websiteUrl: "https://www.hatch.com/",
    tier: 5,
  },
  {
    id: 10,
    name: "Toronto Metropolitan University",
    logoUrl: "/tmu.png.png",
    websiteUrl: "https://www.torontomu.ca/",
    tier: 5,
  },
  {
    id: 11,
    name: "CoLab Software",
    logoUrl: "/colab.png",
    tier: 4,
  },
  {
    id: 12,
    name: "Western CPA",
    logoUrl: "/westcpa.png",
    tier: 4,
  },
  {
    id: 13,
    name: "Deloitte",
    logoUrl: "/deloitte.png",
    tier: 4,
  },
  {
    id: 14,
    name: "Zebra Robotics",
    logoUrl: "/zebra.png",
    tier: 5,
  },
  {
    id: 15,
    name: "Geotab",
    logoUrl: "/geotab.png",
    tier: 5,
  },
  {
    id: 16,
    name: "Town of Oakville CAG",
    logoUrl: "/oakville.png.png",
    tier: 2,
  },
];

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const logo = (
    <div
      className="group flex h-24 w-[180px] shrink-0 items-center justify-center px-5 sm:h-28 sm:w-[220px] lg:w-[250px]"
      title={sponsor.name}
    >
      <img
        src={sponsor.logoUrl}
        alt={`${sponsor.name} logo`}
        className={`max-h-14 max-w-full object-contain opacity-90 transition duration-300 group-hover:scale-[1.06] group-hover:opacity-100 sm:max-h-16 ${
          sponsor.name === "YRI Fellowship" ? "max-w-[54%]" : ""
        }`}
        loading="lazy"
        draggable={false}
      />
    </div>
  );

  if (!sponsor.websiteUrl) return logo;

  return (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${sponsor.name}`}
      className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-htr-green/80 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      {logo}
    </a>
  );
}

function SponsorRow() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12 lg:gap-16 lg:pr-16">
      {LAST_YEAR_SPONSORS.map((sponsor) => (
        <SponsorLogo key={sponsor.id} sponsor={sponsor} />
      ))}
    </div>
  );
}

export default function SponsorsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/35 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/35 to-transparent sm:w-20" />

      <motion.div
        className="flex w-max items-center"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                x: {
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
      >
        <SponsorRow />
        <SponsorRow />
      </motion.div>
    </div>
  );
}
