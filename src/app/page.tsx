"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Code2,
  Cpu,
  MapPin,
  ExternalLink,
  Rocket,
  Trophy,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";
import GradientSection from "./components/GradientSection";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import CyberWordmark from "./components/CyberWordmark";
import AboutDotsBackground from "./components/AboutDotsBackground";
import Background from './components/Background';
import SponsorsGrid from "./components/SponsorsGrid";
import HistoryPuzzleSection from "./components/HistoryPuzzleSection";
import { openMapsForDevice } from "@/lib/maps";

const stats = [
  { value: "150+", label: "students built last year", icon: Users },
  { value: "$6K+", label: "was raised for prizes", icon: Trophy },
  { value: "1", label: "day turned into demo time", icon: Zap },
];

const tracks = [
  {
    title: "Automation + Tools",
    eyebrow: "Work smarter",
    icon: Cpu,
    body: "Build useful tools that save time, solve small problems, or make everyday tasks easier.",
  },
  {
    title: "Climate + Community",
    eyebrow: "Build for impact",
    icon: Rocket,
    body: "Create apps that support schools, local communities, sustainability, accessibility, or wellbeing.",
  },
  {
    title: "Web + Games",
    eyebrow: "Make it playable",
    icon: Code2,
    body: "Design polished websites, games, visual tools, dashboards, and interactive experiences.",
  },
];

const featureCards = [
  "Start with an idea. Leave with a prototype people can actually try.",
  "Meet builders, designers, and first time hackers in a space made for learning.",
  "Turn blank screens into games, apps, tools, and demos with friendly support nearby.",
  "Create something you can show in a portfolio, presentation, or future application.",
  "Move through the day with checkpoints, feedback, mini wins, and team energy.",
  "Celebrate every project, polished, weird, ambitious, simple, or still evolving.",
];


const winnerCards = [
  {
    title: "First Place",
    image: "/winners/1.JPG",
    icon: Trophy,
  },
  {
    title: "Second Place",
    image: "/winners/2.JPG",
    icon: Sparkles,
  },
  {
    title: "Third Place",
    image: "/winners/3.JPG",
    icon: Rocket,
  },
  {
    title: "Best Solo",
    image: "/winners/solo.JPG",
    icon: Zap,
  },
  {
    title: "Best Women's Team",
    image: "/winners/Best_Womens.JPG",
    icon: Users,
  },
];

const gallery = [
  "/last_year/history1.jpg",
  "/last_year/history2.jpeg",
  "/last_year/history3.jpg",
  "/last_year/history4.jpg",
  "/last_year/history5.jpg",
  "/history%20photos/photo1.jpg",
  "/history%20photos/photo2.jpeg",
  "/history%20photos/photo3.jpg",
  "/history%20photos/photo4.jpg",
  "/history%20photos/photo5.jpeg",
  "/history%20photos/photo6.jpg",
  "/history%20photos/photo7.jpg",
  "/history%20photos/photo8.jpg",
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const addToCalendar = () => {
    const userAgent = navigator.userAgent || "";
    const isApple = /iPhone|iPad|iPod|Macintosh/i.test(userAgent);

    if (isApple) {
      window.location.href = "/hack-the-ridge-2026.ics";
      return;
    }

    const googleCalendarUrl = new URL("https://calendar.google.com/calendar/render");
    googleCalendarUrl.searchParams.set("action", "TEMPLATE");
    googleCalendarUrl.searchParams.set("text", "Hack The Ridge 2026");
    googleCalendarUrl.searchParams.set("dates", "20261212/20261213");
    googleCalendarUrl.searchParams.set("location", "Iroquois Ridge High School, Oakville, Ontario");
    googleCalendarUrl.searchParams.set("details", "Hack The Ridge 2026 hackathon.");
    window.open(googleCalendarUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const openMaps = () => {
    openMapsForDevice("Iroquois Ridge High School, Oakville, Ontario");
  };

  return (
    <main className="site-shell min-h-screen w-full overflow-x-hidden overflow-hidden text-htr-white">
      <AnimatedNavbar />
      <Background />

      <section id="home" className="min-h-screen flex items-center justify-center px-5 py-24 text-htr-blue sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        {/* <InteractiveBackground mode="full" /> */}

        <div className="section-glass section-glass--dark relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 bg-black/30 px-8 py-12 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,460px)] lg:gap-14 lg:px-14 lg:py-16 xl:grid-cols-[minmax(0,1.3fr)_470px] 2xl:grid-cols-[minmax(0,1.35fr)_490px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="min-w-0 text-left"
          >
            <CyberWordmark variant="hero" className="mx-auto w-full max-w-[18rem] pb-10 sm:max-w-[26rem] md:max-w-[32rem] lg:max-w-[44rem] xl:max-w-[48rem]" />

            {/* <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:mt-10 lg:justify-start">
              <Link href="#register" className="button-shine group inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-htr-green px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-htr-blue shadow-2xl shadow-htr-green/20 transition hover:-translate-y-1 hover:bg-htr-white sm:w-auto">
                Register Interest
                <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
              </Link></div> */}

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:max-w-[52rem] lg:gap-5">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 + index * 0.08 }}
                    className="tilt-card min-h-[10.5rem] rounded-[1.55rem] border border-htr-green/20 bg-black/60 p-6 text-left shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    <Icon className="mb-4 h-5 w-5 text-htr-green" />
                    <div className="font-sacco text-4xl font-black leading-none text-htr-green sm:text-5xl">{stat.value}</div>
                    <div className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-htr-white">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, scale: 0.92, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full min-w-0 max-w-[540px] lg:mx-0 lg:justify-self-end"
          >
            <div className="rounded-[1.8rem] border border-htr-white/15 bg-htr-blue/72 p-5 shadow-2xl shadow-black/30 sm:p-6 lg:p-7">
                <div className="mb-5 border-b border-htr-green/20 pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-htr-green">Event info</p>
                    <h2 className="mt-2 text-2xl font-black text-htr-white sm:text-3xl">Hack The Ridge 2026</h2>
                  </div>

                </div>

                <motion.div
                  className="grid gap-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
                  }}
                >
                  <motion.button
                    type="button"
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.98 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -5, scale: 1.012 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={addToCalendar}
                    aria-label="Add Hack The Ridge 2026 to calendar"
                    className="dashboard-date-card group/date block w-full cursor-pointer rounded-3xl bg-htr-green p-5 text-left text-htr-blue shadow-xl shadow-htr-green/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em] opacity-95">
                        <CalendarDays className="h-4 w-4" />
                        Date
                      </div>
                      <CalendarPlus className="h-5 w-5 opacity-70 transition-transform duration-300 group-hover/date:rotate-6 group-hover/date:scale-110" />
                    </div>
                    <p className="mt-3 text-2xl font-black sm:text-3xl">December 12, 2026</p>
                    <span className="dashboard-date-card__action mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em]">
                      Add to calendar
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/date:translate-x-1" />
                    </span>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-htr-blue/18">
                      <motion.div
                        className="h-full rounded-full bg-htr-blue"
                        initial={{ width: "0%" }}
                        animate={{ width: "68%" }}
                        transition={{ duration: 1.35, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.button>

                  <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    <motion.button
                      type="button"
                      variants={{
                        hidden: { opacity: 0, y: 18, scale: 0.98 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={openMaps}
                      aria-label="Open Iroquois Ridge High School in Maps"
                      className="dashboard-action group w-full rounded-3xl border border-htr-green/20 bg-htr-white/10 p-4 text-left"
                    >
                      <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-htr-green">
                        <MapPin className="h-4 w-4" />
                        Location
                      </span>
                      <span className="mt-3 block text-md font-black leading-snug text-htr-white">Iroquois Ridge HS</span>
                      <span className="mt-1 block text-sm font-medium text-htr-white/95">Oakville, Ontario</span>
                      <span className="dashboard-action__link mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-htr-green">
                        Open in Maps
                        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </motion.button>

                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 18, scale: 0.98 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.985 }}
                      href="#register"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.pushState(null, "", "#register");
                      }}
                      className="dashboard-action group rounded-3xl border border-htr-green/20 bg-htr-white/10 p-4"
                    >
                      <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-htr-green">
                        <Sparkles className="h-4 w-4" />
                        Register
                      </span>
                      <span className="mt-3 block text-md font-black leading-snug text-htr-white">Register interest</span>
                      <span className="mt-1 block text-sm font-medium text-htr-white/95">Join Hack The Ridge</span>
                      <span className="dashboard-action__link mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-htr-green">
                        Register
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden px-5 py-24 text-htr-blue sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="section-glass section-glass--light relative z-10 mx-auto max-w-7xl overflow-hidden p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-shaded">About HTR</p>
              <h2 className="font-sacco mt-4 max-w-3xl text-6xl font-black uppercase leading-[0.86] tracking-[0.035em] text-htr-blue sm:text-7xl lg:text-8xl">
                Make a thing. Show the thing.
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="text-lg font-semibold leading-8 text-htr-blue sm:text-xl">
                Hack The Ridge is a one day student hackathon at Iroquois Ridge. Come with a team, find one here, or just show up with an idea you want to try.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-black uppercase tracking-[0.18em] text-htr-shaded sm:text-sm">
                <span>First hack? Perfect.</span>
                <span>Design counts.</span>
                <span>No finished idea needed.</span>
              </div>
            </div>
          </div>

          <div className="mt-14 grid border-y border-htr-blue/12 md:grid-cols-3">
            {[
              ["Start messy", "A rough idea is enough. Pick a problem and get moving."],
              ["Build together", "Split the work, ask for help, and make the project better as a team."],
              ["Demo it", "End the day with something real enough to show, explain, and celebrate."],
            ].map(([title, body], index) => (
              <div
                key={title}
                className={`py-7 md:px-7 md:py-9 ${index > 0 ? "border-t border-htr-blue/12 md:border-l md:border-t-0" : ""}`}
              >
                <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-htr-shaded">{index === 0 ? "Start" : index === 1 ? "Build" : "Share"}</p>
                <h3 className="mt-2 text-2xl font-black text-htr-blue sm:text-3xl">{title}</h3>
                <p className="mt-3 max-w-sm text-base font-semibold leading-7 text-htr-blue/82">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-htr-shaded">What can you build?</p>
              <h3 className="mt-3 max-w-lg text-4xl font-black leading-tight text-htr-blue sm:text-5xl">Pick a direction. You are not stuck in a box.</h3>
            </div>

            <div className="divide-y divide-htr-blue/12 border-y border-htr-blue/12">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <div key={track.title} className="grid gap-5 py-7 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-7 sm:py-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-htr-blue text-htr-green shadow-lg shadow-htr-blue/12">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-htr-shaded">{track.eyebrow}</p>
                      <h4 className="mt-1 text-2xl font-black text-htr-blue sm:text-3xl">{track.title}</h4>
                      <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-htr-blue/82">{track.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        {/* <InteractiveBackground mode="lite" /> */}
        <div className="section-glass section-glass--dark relative z-10 mx-auto max-w-7xl p-8 sm:p-10 lg:p-14">
          <div>
            <motion.div
              className="max-w-3xl"
            >
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">Build experience</p>
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] sm:text-7xl lg:text-8xl">
                Your idea gets a pulse.
              </h2>
              <p className="readable-copy readable-copy--dark mt-6 max-w-xl text-lg leading-8 text-htr-white">
                This is where curiosity turns into code, sketches become interfaces, and teams discover that the best projects often start as one wild conversation.
              </p>
            </motion.div>

            <div className="metro-horizontal-wrap mt-16 sm:mt-20 lg:mt-24">
              <div className="metro-horizontal-scroll">
                <div className="metro-horizontal" role="list" aria-label="Hack The Ridge build experience">
                  <div className="metro-horizontal-line" aria-hidden="true" />

                  {featureCards.map((feature, index) => (
                    <div
                      key={feature}
                      role="listitem"
                      className={`metro-horizontal-stop ${index % 2 === 0 ? "metro-horizontal-stop--top" : "metro-horizontal-stop--bottom"}`}
                    >
                      <div className="metro-horizontal-copy">
                        <span className="metro-horizontal-number font-sacco">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="metro-horizontal-text">{feature}</p>
                      </div>

                      <div className="metro-horizontal-station" aria-hidden="true">
                        <span className="metro-horizontal-dot" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 overflow-hidden rounded-[2.2rem] border border-htr-green/20 bg-htr-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="marquee-track flex gap-3">
              {[...gallery, ...gallery].map((src, index) => (
                <div key={`${src}-${index}`} className="relative h-48 w-72 shrink-0 overflow-hidden rounded-[1.5rem] sm:h-56 sm:w-96">
                  <Image src={src} alt="Hack the Ridge previous event" fill sizes="(max-width: 768px) 18rem, 24rem" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-htr-blue/55 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HistoryPuzzleSection />

      <section id="winners" className="relative min-h-screen overflow-hidden px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="section-glass section-glass--dark relative z-10 mx-auto max-w-7xl p-8 sm:p-10 lg:p-14">
          <motion.div
            className="overflow-hidden rounded-[2.15rem] border border-htr-green/22 bg-gradient-to-br from-htr-green/14 via-white/[0.04] to-transparent p-8 sm:p-10 lg:p-12"
          >
            <div className="max-w-5xl">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">2025 Hall of Fame</p>
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.86] tracking-[0.035em] text-htr-white sm:text-7xl lg:text-8xl">
                Winner Winner, Chicken Dinner.
              </h2>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-6">
            {winnerCards.map((card, index) => {
              const Icon = card.icon;
              return (
              <motion.article
                key={card.title}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-[2rem] border border-htr-green/20 bg-black/38 shadow-2xl shadow-black/16 backdrop-blur-xl ${index < 3 ? "xl:col-span-2" : "xl:col-span-3"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={`${card.title} winners at Hack The Ridge 2025`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 34vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                </div>

                <div className="relative p-7 sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-htr-green via-htr-white to-htr-shaded" />
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-htr-green text-htr-blue shadow-lg shadow-htr-green/15 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-3xl font-black text-htr-white">{card.title}</h3>
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="register" className="relative min-h-screen scroll-mt-28 overflow-hidden px-5 py-28 text-htr-blue sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        {/* <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-htr-white/25 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-htr-green/35 blur-3xl" /> */}
        <motion.div
          className="section-glass section-glass--light relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-htr-blue/15 bg-htr-white/20 p-10 text-center shadow-2xl shadow-htr-blue/16 backdrop-blur-xl sm:p-14 lg:p-16"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-htr-blue text-htr-green shadow-xl shadow-htr-blue/15">
            <Rocket className="h-8 w-8" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-shaded">Registration</p>
          <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] text-htr-blue sm:text-7xl lg:text-8xl">
            Ready to join the build?
          </h2>
        </motion.div>
      </section>

      <section id="sponsors" className="relative z-0 overflow-hidden px-5 pb-36 pt-24 text-htr-white sm:px-8 sm:pt-28 lg:px-12 lg:pb-44 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(175,213,188,.15),transparent_34%),radial-gradient(circle_at_90%_32%,rgba(125,182,173,.14),transparent_32%)]" />
        <div className="section-glass section-glass--dark relative z-10 mx-auto max-w-7xl p-8 sm:p-10 lg:p-14">
          <motion.div
            className="relative"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">Sponsors · 2026</p>
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.87] tracking-[0.035em] text-htr-white sm:text-7xl lg:text-8xl">
                Back the build.
              </h2>
            </div>

            <div className="relative mt-16 overflow-hidden border-y border-htr-green/20 lg:mt-20">
              <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px bg-htr-green/16 lg:block" />

              <div className="grid lg:grid-cols-2">
                {[
                  { number: "01", title: "Prizes + gear", body: "Help teams leave with something worth remembering.", icon: Trophy },
                  { number: "02", title: "Food + event support", body: "Keep a full day of building moving.", icon: Zap },
                  { number: "03", title: "Workshops + mentors", body: "Put useful people and real experience in the room.", icon: Users },
                  { number: "04", title: "Community support", body: "Support student builders in Oakville and beyond.", icon: Sparkles },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`group relative min-h-[14rem] py-8 sm:py-10 lg:p-10 ${
                        index < 2 ? "border-b border-htr-green/16" : ""
                      } ${index % 2 === 0 ? "lg:pr-14" : "lg:pl-14"}`}
                    >
                      <div className="flex items-start gap-5 sm:gap-6">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-htr-green/30 bg-htr-green/10 text-htr-green backdrop-blur-md">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-5">
                            <h3 className="text-xl font-black tracking-[-0.02em] text-htr-white sm:text-2xl">{item.title}</h3>
                            <span className="font-sacco text-2xl font-black tracking-[0.08em] text-htr-green/45 sm:text-3xl">{item.number}</span>
                          </div>
                          <p className="mt-4 max-w-md text-base font-semibold leading-7 text-htr-white/80">{item.body}</p>
                        </div>
                      </div>

                      <div className="mt-8 h-px w-16 bg-htr-green/45 transition-all duration-300 group-hover:w-28" />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="mt-12 flex flex-col gap-6 rounded-[1.7rem] border border-htr-green/20 bg-black/32 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-htr-green">Want to sponsor HTR 2026?</p>
            </div>
            <Link href="#contact" className="button-shine inline-flex shrink-0 items-center justify-center rounded-full bg-htr-green px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-htr-blue transition hover:-translate-y-1">
              Contact the team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-20 border-t border-htr-green/16 pt-12">
            <div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">Thank you, 2025</p>
              </div>
            </div>

            <div className="mt-10">
              <SponsorsGrid />
            </div>
          </div>
        </div>
      </section>

      <GradientSection />
      <Footer />
    </main>
  );
}
