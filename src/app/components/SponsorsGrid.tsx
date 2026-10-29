"use client";

import React from "react";

export interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: 1 | 2 | 3 | 4 | 5;
}

const CURRENT_YEAR_SPONSORS: Sponsor[] = [
  {
    id: 1,
    name: "Emkal",
    logoUrl: "https://www.dillonr.ca/user/pages/images/emkal.png",
    websiteUrl: "https://www.emkal.ca/",
    tier: 1,
  },
  {
    id: 2,
    name: "Brock University",
    logoUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Brock_University_Logo_2022.svg/1280px-Brock_University_Logo_2022.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230630120706",
    websiteUrl: "https://brocku.ca/",
    tier: 5,
  },
  {
    id: 3,
    name: "Art of Problem Solving",
    logoUrl: "https://artofproblemsolving.com/assets/images/logos/aops-online.svg",
    websiteUrl: "https://artofproblemsolving.com/",
    tier: 5,
  },
];

const FEATURED_SPONSOR = CURRENT_YEAR_SPONSORS.find(
  (sponsor) => sponsor.tier === 1,
);
const SUPPORTING_SPONSORS = CURRENT_YEAR_SPONSORS.filter(
  (sponsor) => sponsor.tier !== 1,
);

function SponsorCard({
  sponsor,
  featured = false,
}: {
  sponsor: Sponsor;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex min-w-0 flex-col border p-3 sm:p-4 ${
        featured
          ? "col-span-full border-2 sm:col-span-2 sm:grid sm:grid-cols-2 sm:items-stretch"
          : ""
      }`}
      style={{
        borderColor: featured ? "var(--city-accent)" : "var(--city-rule)",
        backgroundColor: "var(--city-paper)",
      }}
    >
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${sponsor.name}`}
        className={`group flex min-h-32 items-center justify-center p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--city-accent)] sm:min-h-36 sm:p-6 ${
          featured ? "bg-[#263b37]" : "bg-[#f7eedb]"
        }`}
      >
        <img
          src={sponsor.logoUrl}
          alt={`${sponsor.name} logo`}
          className={`w-full object-contain transition-transform duration-200 group-hover:scale-[1.04] ${
            featured
              ? "max-h-36 sm:max-h-48"
              : "max-h-16 sm:max-h-20"
          }`}
          loading="lazy"
          draggable={false}
        />
      </a>
      <div
        className={`flex flex-col justify-center ${
          featured ? "px-2 py-5 sm:px-5 sm:py-6" : "px-2 pb-1 pt-4"
        }`}
      >
        <h3
          className={`font-semibold ${
            featured
              ? "font-sacco text-3xl sm:text-4xl"
              : "text-sm sm:text-base"
          }`}
        >
          {sponsor.name}
        </h3>
        {featured && (
          <p className="mt-2 text-sm leading-6">
            Thank you for supporting Hack the Ridge 2026.
          </p>
        )}
      </div>
    </article>
  );
}

export default function SponsorsGrid() {
  if (!FEATURED_SPONSOR) {
    throw new Error("The featured 2026 sponsor is missing.");
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <SponsorCard sponsor={FEATURED_SPONSOR} featured />
      {SUPPORTING_SPONSORS.map((sponsor) => (
        <SponsorCard key={sponsor.id} sponsor={sponsor} />
      ))}
    </div>
  );
}
