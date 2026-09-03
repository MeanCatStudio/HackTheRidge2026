"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Code2, Cpu, MapPin, Rocket, Sparkles, Trophy, Users, Wifi, Zap } from "lucide-react";
import AnimatedNavbar from "./components/AnimatedNavbar";
import CyberWordmark from "./components/CyberWordmark";
import Footer from "./components/Footer";
import GradientSection from "./components/GradientSection";
import ScrollCityScene from "./components/ScrollCityScene";
import SoundDock from "./components/SoundDock";
import TeamSection from "./components/TeamSection";

const stats = [
  { value: "150+", label: "students built last year", icon: Users },
  { value: "$6K+", label: "was raised for prizes", icon: Trophy },
  { value: "10", label: "past execs were featured", icon: Sparkles },
  { value: "1", label: "day turned into demo time", icon: Zap },
];

const tracks = [
  ["Automation + Tools", "Work smarter", Cpu, "Build useful tools that save time, solve small problems, or make everyday tasks easier."],
  ["Climate + Community", "Build for impact", Rocket, "Create apps that support schools, local communities, sustainability, accessibility, or wellbeing."],
  ["Web + Games", "Make it playable", Code2, "Design polished websites, games, visual tools, dashboards, and interactive experiences."],
] as const;

const featureCards = [
  "Start with an idea. Leave with a prototype people can actually try.",
  "Meet builders, designers, and first-time hackers in a space made for learning.",
  "Turn blank screens into games, apps, tools, and demos with friendly support nearby.",
  "Create something you can show in a portfolio, presentation, or future application.",
  "Move through the day with checkpoints, feedback, mini-wins, and team energy.",
  "Celebrate every project: polished, weird, ambitious, simple, or still evolving.",
];

const winners = [
  ["Grand Prize", "The top project can live here with the team name, build name, and final photo."],
  ["Best Beginner Build", "A space for first-time hackers who shipped something real."],
  ["Community Choice", "A crowd-favourite spot for the project people kept talking about after demos ended."],
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
];

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden text-htr-white">
      <ScrollCityScene />
      <AnimatedNavbar />
      <SoundDock />

      <section id="home" className="">
        <div className="bg-black/20 px-20 rounded-xl mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_420px]">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.7 }}>
            <CyberWordmark variant="hero" className="mr-auto" />
            <Link href="#register" className="mt-7 inline-flex items-center rounded-full bg-htr-green px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-htr-blue shadow-xl shadow-htr-green/20 transition hover:-translate-y-1 hover:bg-htr-white">
              Register Interest <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="city-panel rounded-sm p-3">
                  <Icon className="mb-3 h-4 w-4 text-htr-green" />
                  <strong className="font-sacco text-3xl text-htr-green">{value}</strong>
                  <span className="mt-2 block text-[0.6rem] font-black uppercase tracking-[0.12em] text-htr-white/65">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="city-panel rounded-sm p-4">
            <p className="city-eyebrow">01 / SKYLINE ACCESS</p>
            <h2 className="mt-2 text-2xl font-black">Hackathon dashboard</h2>
            <div className="mt-5 rounded-sm bg-htr-green p-5 text-htr-blue">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]"><CalendarDays className="h-4 w-4" /> Hackathon date</div>
              <p className="mt-3 text-2xl font-black">December 12, 2026</p>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border border-htr-green/20 bg-htr-white/10 p-4"><MapPin className="mb-3 h-4 w-4 text-htr-green" /><p className="font-black">Iroquois Ridge High School</p><p className="mt-1 text-sm text-htr-white/60">Oakville, Ontario</p></div>
              <div className="border border-htr-green/20 bg-htr-white/10 p-4"><Wifi className="mb-3 h-4 w-4 text-htr-green" /><p className="font-black">Open to curious builders</p><p className="mt-1 text-sm text-htr-white/60">All experience levels welcome</p></div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div><p className="city-eyebrow">02 / CITY BLOCKS</p><h2 className="font-sacco mt-3 text-5xl uppercase leading-[0.88] sm:text-6xl">Bring an idea. Build it here.</h2></div>
            <p className="city-copy text-lg leading-8 text-htr-white/78">Hack The Ridge is built for curious students, first-time hackers, experienced coders, designers, and friends who want to make something exciting together. No perfect idea required: just energy, teamwork, and the courage to start.</p>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tracks.map(([title, eyebrow, Icon, body]) => <article key={title} className="city-panel rounded-sm p-6"><Icon className="h-8 w-8 text-htr-green" /><p className="mt-7 city-eyebrow">{eyebrow}</p><h3 className="mt-2 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-htr-white/72">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="winners" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl"><div className="grid gap-8 lg:grid-cols-2 lg:items-end"><div><p className="city-eyebrow">03 / WINNER WALL</p><h2 className="font-sacco mt-3 text-5xl uppercase leading-[0.88] sm:text-6xl">Last year&apos;s winner wall.</h2></div><div><p className="city-copy text-lg leading-8 text-htr-white/76">A place for previous winners, prize categories, project photos, and the story behind each build.</p><Link href="/2025" className="mt-5 inline-flex rounded-full bg-htr-green px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-htr-blue">Open 2025 Website</Link></div></div><div className="mt-10 grid gap-4 md:grid-cols-3">{winners.map(([title, body]) => <article key={title} className="city-panel rounded-sm p-6"><Trophy className="h-8 w-8 text-htr-green" /><p className="mt-6 city-eyebrow">winner slot</p><h3 className="mt-2 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-htr-white/72">{body}</p></article>)}</div></div>
      </section>

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-2"><div><p className="city-eyebrow">04 / STREET LEVEL</p><h2 className="font-sacco mt-3 text-5xl uppercase leading-[0.88] sm:text-6xl">Your idea gets a pulse.</h2><p className="city-copy mt-5 max-w-xl text-lg leading-8 text-htr-white/76">This is where curiosity turns into code, sketches become interfaces, and teams discover that the best projects often start as one wild conversation.</p></div><div className="grid gap-3 sm:grid-cols-2">{featureCards.map((feature) => <div key={feature} className="city-panel rounded-sm p-4"><Sparkles className="mb-5 h-5 w-5 text-htr-green" /><p className="font-bold leading-7 text-htr-white/88">{feature}</p></div>)}</div></div><div className="city-panel mt-12 overflow-hidden rounded-sm p-3"><div className="marquee-track flex gap-3">{[...gallery, ...gallery].map((src, index) => <div key={`${src}-${index}`} className="relative h-44 w-72 shrink-0 overflow-hidden rounded-sm"><Image src={src} alt="Hack The Ridge previous event" fill sizes="18rem" className="object-cover" /></div>)}</div></div></div></section>

      <section id="register" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"><div className="city-panel mx-auto max-w-5xl rounded-sm p-8 text-center sm:p-12"><Rocket className="mx-auto h-10 w-10 text-htr-green" /><p className="city-eyebrow mt-5">05 / PLATFORM ENTRY</p><h2 className="font-sacco mt-3 text-5xl uppercase leading-[0.88] sm:text-6xl">Ready to join the build?</h2><p className="city-copy mx-auto mt-5 max-w-2xl text-lg leading-8 text-htr-white/74">Registration details can be connected when the official form is ready. Until then, visitors can follow updates or contact the team.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="https://www.instagram.com/hacktheridge/" target="_blank" className="rounded-full bg-htr-green px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-htr-blue">Instagram Updates</Link><Link href="#contact" className="rounded-full border border-htr-green/40 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-htr-green">Contact Team</Link></div></div></section>

      <section id="sponsors" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"><div className="city-panel mx-auto max-w-5xl rounded-sm p-8 text-center sm:p-12"><p className="city-eyebrow">06 / DEPOT PARTNERS</p><h2 className="font-sacco mt-3 text-5xl uppercase leading-[0.88] sm:text-6xl">Sponsor space opening soon.</h2><p className="city-copy mx-auto mt-5 max-w-2xl text-lg leading-8 text-htr-white/76">This space is ready for partners who want to support student builders, workshops, prizes, and local tech projects.</p><div className="mt-7 grid gap-3 sm:grid-cols-3">{["Partner logos", "Prize support", "Workshop support"].map((item) => <div key={item} className="border border-htr-green/20 bg-htr-white/10 p-4 text-sm font-black uppercase tracking-[0.14em] text-htr-green">{item}</div>)}</div></div></section>

      <TeamSection />
      <GradientSection />
      <Footer />
    </main>
  );
}
