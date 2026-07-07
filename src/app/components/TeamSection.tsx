"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { teamMembers } from "./TeamMember";
import TeamCard from "./TeamCard";

const pastBuilders = [
  {
    name: "Aiden Pinto",
    image: "/team/aiden.JPG",
    title: "Executive Lead",
    hoverText: "Executive Lead: kept the room moving when the room had no idea where it was going.",
    tag: "calm in chaos",
    objectPosition: "center 34%",
  },
  {
    name: "Darwin Zhang",
    image: "/team/darwin.JPG",
    title: "Logistics Executive",
    hoverText: "Logistics Executive: made messy plans look almost intentional.",
    tag: "spreadsheet wizard",
    objectPosition: "center 32%",
  },
  {
    name: "Thomas Seoh",
    image: "/team/thomas.JPG",
    title: "Logistics Executive",
    hoverText: "Logistics Executive: brought calm energy to moments that were absolutely not calm.",
    tag: "calm in chaos",
    objectPosition: "center 34%",
  },
  {
    name: "Sumedh Panaskar",
    image: "/team/sumedh.JPG",
    title: "Sponsorships Executive",
    hoverText: "Sponsorships Executive: turned polite emails into prizes, support, and very relieved organizers.",
    tag: "email boss fight",
    objectPosition: "center 34%",
  },
  {
    name: "Ali Naqvi",
    image: "/team/ali.JPG",
    title: "Sponsorships Executive",
    hoverText: "Sponsorships Executive: followed up just enough times to make inbox silence nervous.",
    tag: "inbox speedrunner",
    objectPosition: "center 34%",
  },
  {
    name: "Ryan Si",
    image: "/team/ryan.JPG",
    title: "Sponsorships Executive",
    hoverText: "Sponsorships Executive: helped the prize table stop being theoretical.",
    tag: "prize hunter",
    objectPosition: "center 34%",
  },
  {
    name: "Peter Shao",
    image: "/team/peter.JPG",
    title: "Web Development Executive",
    hoverText: "Web Development Executive: fixed bugs, shipped pages, and somehow found new bugs with confidence.",
    tag: "bug negotiator",
    objectPosition: "center 34%",
  },
  {
    name: "Aahan Ghode",
    image: "/team/aahan.JPG",
    title: "Web Development Executive",
    hoverText: "Web Development Executive: believed every feature deserved a chance to be unstable first.",
    tag: "feature goblin",
    objectPosition: "center 34%",
  },
  {
    name: "Michelle Wang",
    image: "/team/michelle.JPG",
    title: "Promotions Executive",
    hoverText: "Promotions Executive: made the event look calm while the group chat definitely was not.",
    tag: "vibe compiler",
    objectPosition: "center 22%",
  },
  {
    name: "Jerry Jiang",
    image: "/team/jerry.JPG",
    title: "Promotions Executive",
    hoverText: "Promotions Executive: made announcements feel less like homework and more like something worth opening.",
    tag: "hype technician",
    objectPosition: "center 34%",
  },
];

const clownProps = [
  {
    key: "nose",
    title: "Red nose",
    copy: "Drag it onto a photo for a quick clown filter.",
  },
  {
    key: "bow",
    title: "Bow pin",
    copy: "Add this for event-committee style points.",
  },
] as const;

type ClownProp = (typeof clownProps)[number]["key"];

type PlacedProp = {
  id: string;
  kind: ClownProp;
  x: number;
  y: number;
};

type PlacedPropsByBuilder = Record<string, PlacedProp[]>;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const StickerGraphic: React.FC<{ kind: ClownProp; size?: "tray" | "photo" }> = ({ kind, size = "photo" }) => {
  const isTray = size === "tray";
  const emoji = kind === "nose" ? "🔴" : "🎀";
  const label = kind === "nose" ? "Red nose" : "Bow pin";

  return (
    <span
      aria-label={label}
      role="img"
      className={`block select-none leading-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] ${isTray ? "text-4xl" : "text-2xl sm:text-3xl"}`}
    >
      {emoji}
    </span>
  );
};

const TeamSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isClownOpen, setIsClownOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState<ClownProp | null>(null);
  const [placedProps, setPlacedProps] = useState<PlacedPropsByBuilder>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const addPropToBuilder = (builderName: string, kind: ClownProp, x: number, y: number) => {
    setPlacedProps((current) => ({
      ...current,
      [builderName]: [
        ...(current[builderName] ?? []),
        {
          id: `${builderName}-${kind}-${Date.now()}`,
          kind,
          x: clamp(x, 9, 91),
          y: clamp(y, 9, 91),
        },
      ],
    }));
  };

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>, kind: ClownProp) => {
    event.dataTransfer.setData("text/plain", kind);
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, builderName: string) => {
    event.preventDefault();
    const kind = event.dataTransfer.getData("text/plain") as ClownProp;
    if (!clownProps.some((prop) => prop.key === kind)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    addPropToBuilder(builderName, kind, x, y);
  };

  const handlePhotoClick = (event: React.MouseEvent<HTMLDivElement>, builderName: string) => {
    if (!selectedProp) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    addPropToBuilder(builderName, selectedProp, x, y);
  };

  if (!mounted) {
    return <section id="team" className="relative z-10 w-full scroll-mt-28 bg-app-bg" aria-label="Team" />;
  }

  return (
    <section id="team" className="relative z-10 w-full scroll-mt-28 bg-app-bg px-5 py-24 text-[#dfd7d7] sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,420px)_1fr] lg:items-start">
          <div className="lg:pt-4">
            <div className="flex items-center justify-center gap-1 lg:justify-start" style={{ fontFamily: "Palalabas Wide, Impact, Arial Black, sans-serif" }}>
              <span className="text-4xl font-medium tracking-wide text-[#AFD5BC] sm:text-5xl md:text-6xl">THE</span>
              <Image src="/logo.svg" alt="Hack The Ridge logo mark" width={92} height={92} className="h-14 w-14 opacity-90 sm:h-20 sm:w-20 md:h-24 md:w-24" />
              <span className="text-4xl font-medium tracking-wide text-[#AFD5BC] sm:text-5xl md:text-6xl">TEAM</span>
            </div>

            <div className="mt-9 space-y-5 text-center lg:text-left" style={{ fontFamily: "Palalabas Wide, Impact, Arial Black, sans-serif" }}>
              <p className="text-3xl font-normal uppercase tracking-wide text-[#AFD5BC] sm:text-[34px] md:text-[38px]">
                Planning began early
              </p>
              <p className="text-3xl font-normal uppercase tracking-wide sm:text-[34px] md:text-[38px]">
                <span className="text-[#dfd7d7]">$6,000</span>{" "}
                <span className="text-[#AFD5BC]">was raised for prizes</span>
              </p>
              <div>
                <p className="text-3xl font-normal uppercase tracking-wide text-[#dfd7d7]/85 sm:text-[34px] md:text-[38px]">
                  One day became a
                </p>
                <p className="mt-2 text-6xl font-medium uppercase tracking-wide text-[#dfd7d7] sm:text-7xl lg:text-8xl">
                  Launchpad
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-[#AFD5BC]/18 pt-12 lg:mt-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#7DB6AD]">Previously on HTR</p>
            <h3 className="mt-4 font-sacco text-4xl font-black uppercase leading-[0.9] tracking-[0.05em] text-[#dfd7d7] sm:text-5xl lg:text-6xl">
              Former teammates. Current lore.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-[#dfd7d7]/72 sm:text-base">
              Former execs get a small shoutout here, plus a harmless photo prop station.
            </p>

            <button
              type="button"
              onClick={() => setIsClownOpen((open) => !open)}
              aria-expanded={isClownOpen}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-[#AFD5BC]/40 bg-[#AFD5BC] px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-[#1E3159] shadow-xl shadow-[#AFD5BC]/10 transition hover:-translate-y-1 hover:bg-[#dfd7d7] hover:shadow-[#AFD5BC]/25"
            >
              <span>{isClownOpen ? "Close photo props" : "Clown the previous execs"}</span>
            </button>

            <div
              className={`mx-auto grid overflow-hidden transition-all duration-500 ease-out ${
                isClownOpen ? "mt-8 max-h-[760px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-[2rem] border border-[#AFD5BC]/25 bg-[#dfd7d7]/8 p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#AFD5BC]">Photo prop tray</p>
                <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#dfd7d7]/76">
                  Drag a nose or bow onto any photo. On phones, tap a prop first, then tap the face. Stack as many as you want.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {clownProps.map((prop) => (
                    <button
                      key={prop.key}
                      type="button"
                      draggable
                      onDragStart={(event) => handleDragStart(event, prop.key)}
                      onClick={() => setSelectedProp((current) => (current === prop.key ? null : prop.key))}
                      aria-pressed={selectedProp === prop.key}
                      className={`group rounded-[1.4rem] border p-4 text-left transition hover:-translate-y-1 ${
                        selectedProp === prop.key
                          ? "border-[#AFD5BC]/80 bg-[#AFD5BC] text-[#1E3159] shadow-xl shadow-[#AFD5BC]/15"
                          : "border-[#AFD5BC]/16 bg-[#1E3159]/55 text-[#dfd7d7] hover:border-[#AFD5BC]/55"
                      }`}
                    >
                      <div className="flex min-h-16 items-center justify-center rounded-[1.1rem] border border-current/10 bg-white/10">
                        <StickerGraphic kind={prop.key} size="tray" />
                      </div>
                      <p className={`mt-4 text-sm font-black uppercase tracking-[0.15em] ${selectedProp === prop.key ? "text-[#1E3159]" : "text-[#AFD5BC]"}`}>
                        {prop.title}
                      </p>
                      <p className={`mt-2 text-xs font-semibold leading-5 ${selectedProp === prop.key ? "text-[#1E3159]/75" : "text-[#dfd7d7]/72"}`}>
                        {prop.copy}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-[1.25rem] border border-[#AFD5BC]/15 bg-[#1E3159]/45 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#dfd7d7]/70 sm:flex-row">
                  <span>{selectedProp ? "Tap a face to place the selected prop." : "Drag from the tray, or select a prop for tap-to-place."}</span>
                  <button
                    type="button"
                    onClick={() => setPlacedProps({})}
                    className="rounded-full border border-[#AFD5BC]/30 px-4 py-2 text-[#AFD5BC] transition hover:border-[#AFD5BC] hover:bg-[#AFD5BC] hover:text-[#1E3159]"
                  >
                    Clear props
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-7 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {pastBuilders.map((builder) => (
              <div key={builder.name} className="group text-center">
                <div
                  className="relative mx-auto h-48 w-48 overflow-hidden rounded-[2.4rem] bg-[#1E3159] ring-2 ring-[#AFD5BC]/25 shadow-xl shadow-black/25 transition duration-300 group-hover:-translate-y-2 group-hover:rotate-[-1deg] group-hover:ring-[#AFD5BC]/80 sm:h-52 sm:w-52 xl:h-56 xl:w-56"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, builder.name)}
                  onClick={(event) => handlePhotoClick(event, builder.name)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Place clown prop on ${builder.name}`}
                >
                  <Image
                    src={builder.image}
                    alt={builder.name}
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 1280px) 208px, 224px"
                    className="object-cover transition duration-300 group-hover:scale-110"
                    style={{ objectPosition: builder.objectPosition }}
                  />

                  {(placedProps[builder.name] ?? []).map((prop) => (
                    <div
                      key={prop.id}
                      className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${prop.x}%`, top: `${prop.y}%` }}
                    >
                      <StickerGraphic kind={prop.kind} />
                    </div>
                  ))}

                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-[#1E3159]/96 via-[#1E3159]/45 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#AFD5BC]">{builder.title}</p>
                    <p className="mt-2 text-xs font-semibold leading-4 text-[#dfd7d7]">{builder.hoverText}</p>
                    <p className="mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#AFD5BC]/80">{builder.tag}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#dfd7d7] sm:text-sm">{builder.name}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.17em] text-[#AFD5BC]/65">{builder.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
