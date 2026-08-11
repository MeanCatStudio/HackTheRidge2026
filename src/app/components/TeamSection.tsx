"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { teamMembers } from "./TeamMember";
import TeamCard from "./TeamCard";
import { FaAngleLeft, FaGithub, FaLinkedinIn, FaTerminal } from "react-icons/fa";

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
  const [activeCard, setActiveCard] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const visibleLogCount = 3;

  // Dynamic Terminal Logs Feed
  const [logs, setLogs] = useState<string[]>([]);
  const [typingLine, setTypingLine] = useState("");

  useEffect(() => {
    setMounted(true);

    const logMessages = [
      "> INIT_RECRUIT_SEQUENCE: [RUNNING]",
      "> System Build 2.0.26 deployed.",
      "> Checking roster integrity... [OK]",
      "> Injecting high-voltage creativity... [OK]",
      "> HTR_2026_INTERFACE_LOADED",
      "> Signal lock: 99.4% stable",
      "> Compiling team executive matrices...",
      "> Ready for user interaction.",
    ];

    let isCancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const typeNext = () => {
      if (isCancelled || lineIndex >= logMessages.length) return;

      const line = logMessages[lineIndex];

      if (charIndex <= line.length) {
        setTypingLine(line.slice(0, charIndex));
        charIndex += 1;
        timer = setTimeout(typeNext, 24);
        return;
      }

      setLogs((prev) => [...prev.slice(-2), line]);
      setTypingLine("");
      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < logMessages.length) {
        timer = setTimeout(typeNext, 620);
      }
    };

    timer = setTimeout(typeNext, 380);

    return () => {
      isCancelled = true;
      if (timer) clearTimeout(timer);
    };
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

  const getCarouselStep = (track: HTMLDivElement) => {
    const firstCard = track.querySelector<HTMLElement>("[data-carousel-card='true']");
    if (!firstCard) return 0;

    const styles = window.getComputedStyle(track);
    const gapValue = styles.columnGap || styles.gap || "12px";
    const gap = Number.parseFloat(gapValue) || 12;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const scrollCarousel = (direction: 1 | -1) => {
    const track = carouselRef.current;
    if (!track) return;

    const step = getCarouselStep(track);
    if (!step) return;
    const maxLeft = track.scrollWidth - track.clientWidth;

    if (direction === 1) {
      const next = track.scrollLeft + step >= maxLeft - 2 ? 0 : track.scrollLeft + step;
      track.scrollTo({ left: next, behavior: "smooth" });
      return;
    }

    const next = track.scrollLeft <= 2 ? maxLeft : track.scrollLeft - step;
    track.scrollTo({ left: next, behavior: "smooth" });
  };

  useEffect(() => {
    if (!mounted) return;

    const track = carouselRef.current;
    if (!track) return;

    const updateActiveCard = () => {
      const step = getCarouselStep(track);
      if (!step) return;

      const index = Math.round(track.scrollLeft / step) + 1;
      setActiveCard(clamp(index, 1, teamMembers.length));
    };

    updateActiveCard();
    track.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    return () => {
      track.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, [mounted]);

  if (!mounted) {
    return <section id="team" className="relative z-10 w-full scroll-mt-28 bg-app-bg" aria-label="Team" />;
  }

  const leadMembers = teamMembers.filter((member) => !member.isRoleCard);
  const pendingMembers = teamMembers.filter((member) => member.isRoleCard);

  const carouselMembers = [
    ...leadMembers,
    ...pendingMembers.map((member) => ({
      ...member,
      role: "Photo pending",
    })),
  ];
  const visibleLogs = typingLine && logs.length >= visibleLogCount ? logs.slice(-(visibleLogCount - 1)) : logs;

  return (
    <section id="team" className="relative z-10 w-full scroll-mt-28 bg-app-bg px-5 py-16 text-[#dfd7d7] sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-9xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:items-stretch">
          
          {/* ================= OVERCLOCKED LEFT TERMINAL PANEL ================= */}
          <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.8rem] border border-[#AFD5BC]/30 bg-[#0c182e]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6">
            
            {/* Background Code Stream Overlay */}
            <div className="pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-[9px] leading-relaxed text-[#AFD5BC]/10 opacity-40">
              <pre className="p-2">
                {`if (hacker_found) {
  recruit();
}
const team = await fetch('/api/HTR');
const data = await team.json();

useEffect(() => {
  console.log("System operational");
}, []);
// 01010100 01001000 01000101`}
              </pre>
            </div>

            {/* Top Bar: Diagnostic Controls */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#AFD5BC]/15 pb-3 font-mono text-[10px] tracking-wider text-[#AFD5BC]/80">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#AFD5BC] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#AFD5BC]"></span>
                </span>
                <span>SYS_STATUS: ACTIVE</span>
              </div>
              <span className="rounded bg-[#AFD5BC]/10 px-1.5 py-0.5 text-[#AFD5BC]">SIG_LOCK: 98%</span>
            </div>

            {/* Center Section: Main Header & Code Flow */}
            <div className="relative z-10">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#7DB6AD]">
                // NODE: EXECUTIVE_TEAM
              </p>
              
              <div className="mt-2 flex items-center gap-2" style={{ fontFamily: "Palalabas Wide, Impact, Arial Black, sans-serif" }}>
                <span className="text-4xl font-medium tracking-wide text-[#AFD5BC] sm:text-5xl">THE</span>
                <span className="text-4xl font-medium tracking-wide text-[#AFD5BC] sm:text-5xl">TEAM</span>
              </div>

              {/* Functional Code Display Box */}
              <div className="mt-5 rounded-xl border border-[#AFD5BC]/20 bg-[#112349]/70 p-3.5 font-mono text-xs shadow-inner">
                <div className="text-[#7DB6AD]/80">{`if (hacker_found) {`}</div>
                <div className="pl-4 text-[#AFD5BC]">{`recruit();`}</div>
                <div className="text-[#7DB6AD]/80">{`}`}</div>
                <div className="mt-2 text-[#dfd7d7]/60">{`console.log("Welcome to HTR!");`}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#AFD5BC]/20 bg-[#0E1F3F]/70 p-3">
                  <div className="mb-2 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFD5BC]/75">
                    <span>Engagement</span>
                    <span>100%</span>
                  </div>
                  <div className="flex h-14 items-end gap-1">
                    {[20, 44, 32, 57, 73, 62, 78, 69, 82, 74, 88, 80, 90, 78, 90, 100].map((height, idx) => (
                      <span
                        key={`engagement-bar-${idx}`}
                        className="w-1.5 rounded-sm bg-[#AFD5BC]/85 shadow-[0_0_8px_rgba(175,213,188,0.45)]"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#AFD5BC]/20 bg-[#0E1F3F]/70 p-3">
                  <div className="mb-2 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFD5BC]/75">
                    <span>Signal Drift</span>
                    <span>Stable</span>
                  </div>
                  <svg viewBox="0 0 120 56" className="h-14 w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="signalLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#7DB6AD" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#AFD5BC" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="url(#signalLine)"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,36 12,32 24,34 36,18 48,24 60,20 72,28 84,14 96,18 108,12 120,16"
                    />
                    <polyline
                      fill="none"
                      stroke="#AFD5BC"
                      strokeOpacity="0.3"
                      strokeWidth="1"
                      points="0,42 120,42"
                    />
                  </svg>
                </div>
              </div>

              {/* Developer Links as Interactive Terminal Buttons */}
              
            </div>

            {/* Bottom Section: Dynamic System Terminal Log */}
            <div className="relative z-10 mt-auto rounded-xl border border-[#AFD5BC]/20 bg-black/40 p-3 font-mono text-[10px]">
              <div className="mb-2 flex items-center justify-between border-b border-[#AFD5BC]/10 pb-1 text-[#AFD5BC]/60">
                <span className="flex items-center gap-1.5">
                  <FaTerminal className="h-2.5 w-2.5" /> SYSTEM LOG
                </span>
                <span className="animate-pulse text-[9px] text-[#AFD5BC]">LIVE</span>
              </div>
              <div className="h-[3.9rem] overflow-hidden space-y-1 text-[#dfd7d7]/80">
                {visibleLogs.map((log, idx) => (
                  <p key={idx} className="truncate">
                    {log}
                  </p>
                ))}
                {typingLine && (
                  <p className="truncate text-[#AFD5BC]">
                    {typingLine}
                    <span className="ml-0.5 inline-block h-3 w-[1px] animate-pulse bg-[#AFD5BC] align-[-2px]" />
                  </p>
                )}
              </div>
            </div>

          </div>
          {/* ================= END LEFT PANEL ================= */}

          {/* Right Carousel Container */}
          <div className="relative min-w-0 overflow-hidden rounded-[1.8rem] border border-[#AFD5BC]/25 bg-[#dfd7d7]/8 p-4 shadow-[0_18px_45px_rgba(17,35,73,0.34)] backdrop-blur-sm sm:p-5">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#AFD5BC]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full bg-[#7DB6AD]/14 blur-3xl" />

            <div className="relative z-10 flex flex-wrap items-center gap-3 px-1 sm:flex-nowrap sm:px-2">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#AFD5BC]/78">Command Deck</p>
                <p className="mt-1 min-w-0 text-xs font-black uppercase tracking-[0.18em] text-[#7DB6AD] sm:tracking-[0.24em]">Executives for HTR</p>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#AFD5BC]/82">
                
                <button
                  type="button"
                  onClick={() => scrollCarousel(-1)}
                  aria-label="Scroll carousel left"
                  className="shrink-0 rounded-full border border-[#AFD5BC]/40 bg-[#1E3159]/60 px-2.5 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#AFD5BC] shadow-md shadow-black/20 transition hover:-translate-x-0.5 hover:border-[#AFD5BC] hover:bg-[#AFD5BC] hover:text-[#1E3159]"
                >
                  <FaAngleLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(1)}
                  aria-label="Scroll carousel right"
                  className="shrink-0 rounded-full border border-[#AFD5BC]/40 bg-[#1E3159]/60 px-2.5 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#AFD5BC] shadow-md shadow-black/20 transition hover:translate-x-0.5 hover:border-[#AFD5BC] hover:bg-[#AFD5BC] hover:text-[#1E3159]"
                >
                  <FaAngleLeft className="h-5 w-5 rotate-180" />
                </button>
              </div>
            </div>
            <div className="relative mt-4 min-w-0">
              <div
                ref={carouselRef}
                className="flex w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {carouselMembers.map((member) => (
                  <div
                    key={member.id}
                    data-carousel-card="true"
                    className="snap-start shrink-0 basis-[58%] transition-transform duration-300 hover:-translate-y-1 sm:basis-[36%] lg:basis-[24%] xl:basis-[19%]"
                  >
                    <TeamCard member={member} compact />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 px-1 sm:px-2">
                <div className="flex items-center gap-1.5">
                  {carouselMembers.map((member, index) => (
                    <span
                      key={member.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index + 1 === activeCard ? "w-7 bg-[#AFD5BC]" : "w-2 bg-[#AFD5BC]/35"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Execs Section */}
        <div className="mt-10 border-t border-[#AFD5BC]/18 pt-10 lg:mt-12">
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
                isClownOpen ? "mt-8 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
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

                <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                  {pastBuilders.map((builder) => (
                    <div key={builder.name} className="group text-center">
                      <div
                        className="relative mx-auto h-32 w-32 overflow-hidden rounded-[1.7rem] bg-[#1E3159] ring-2 ring-[#AFD5BC]/25 shadow-xl shadow-black/25 transition duration-300 group-hover:-translate-y-1 group-hover:ring-[#AFD5BC]/80 sm:h-36 sm:w-36 xl:h-40 xl:w-40"
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
                          sizes="(max-width: 640px) 160px, (max-width: 1280px) 176px, 192px"
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

                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1E3159]/65 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                      </div>
                      <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#dfd7d7] sm:text-xs">{builder.name}</p>
                      <p className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-[#AFD5BC]/65">{builder.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;