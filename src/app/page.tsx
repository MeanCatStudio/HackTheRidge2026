"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Cpu,
  MapPin,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import GradientSection from "./components/GradientSection";
import TeamSection from "./components/TeamSection";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import CyberWordmark from "./components/CyberWordmark";
import SoundDock from "./components/SoundDock";
import AboutDotsBackground from "./components/AboutDotsBackground";

const stats = [
  { value: "150+", label: "students built last year", icon: Users },
  { value: "$6K+", label: "was raised for prizes", icon: Trophy },
  { value: "10", label: "past execs were featured", icon: Sparkles },
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
  "Meet builders, designers, and first-time hackers in a space made for learning.",
  "Turn blank screens into games, apps, tools, and demos with friendly support nearby.",
  "Create something you can show in a portfolio, presentation, or future application.",
  "Move through the day with checkpoints, feedback, mini-wins, and team energy.",
  "Celebrate every project — polished, weird, ambitious, simple, or still evolving.",
];


const winnerCards = [
  { title: "Grand Prize", body: "The 2025 top project can live here with the team name, build name, and final photo." },
  { title: "Best Beginner Build", body: "A space for the 2025 first-time hackers who shipped something real." },
  { title: "Community Choice", body: "A 2025 crowd-favourite spot for the project people kept talking about after demos ended." },
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
  return (
    <main className="min-h-screen w-full overflow-x-hidden overflow-hidden bg-htr-blue text-htr-white">
      <AnimatedNavbar />
      <SoundDock />

      <section id="home" className="relative isolate min-h-screen overflow-hidden px-5 pt-28 sm:px-8 lg:px-12">
        <InteractiveBackground mode="full" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_520px] 2xl:grid-cols-[minmax(0,1fr)_540px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="min-w-0 text-left"
          >
            <CyberWordmark variant="hero" className="mr-auto w-full max-w-[18rem] sm:max-w-[26rem] md:max-w-[32rem] lg:max-w-[44rem] xl:max-w-[48rem]" />

            <p className="mt-10 max-w-2xl text-base leading-8 text-htr-white/82 sm:text-lg lg:mt-12 lg:max-w-xl lg:text-xl">
              Bring an idea, find a team, learn as you go, and leave with something you actually built.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:mt-10 lg:justify-start">
              <Link href="#register" className="button-shine group inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-htr-green px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-htr-blue shadow-2xl shadow-htr-green/20 transition hover:-translate-y-1 hover:bg-htr-white sm:w-auto">
                Register Interest
                <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
              </Link></div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 + index * 0.08 }}
                    className="tilt-card rounded-[1.4rem] border border-htr-green/20 bg-htr-white/10 p-4 text-left shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    <Icon className="mb-4 h-5 w-5 text-htr-green" />
                    <div className="font-sacco text-4xl font-black leading-none text-htr-green sm:text-5xl">{stat.value}</div>
                    <div className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-htr-white/65">{stat.label}</div>
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
            <div className="absolute -inset-8 rounded-[3.5rem] bg-htr-green/20 blur-3xl" />
            <div className="glass-card relative overflow-hidden rounded-[2.35rem] border border-htr-green/35 p-4 shadow-2xl shadow-black/30 sm:p-5 lg:p-6">
              <div className="rounded-[1.8rem] border border-htr-white/15 bg-htr-blue/72 p-5 sm:p-6 lg:p-7">
                <div className="mb-5 border-b border-htr-green/20 pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-htr-green">Mission Control</p>
                    <h2 className="mt-2 text-2xl font-black text-htr-white sm:text-3xl">Hackathon dashboard</h2>
                  </div>

                </div>

                <div className="grid gap-3">
                  <div className="rounded-3xl bg-htr-green p-5 text-htr-blue shadow-xl shadow-htr-green/10">
                    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em] opacity-75">
                      <CalendarDays className="h-4 w-4" />
                      Hackathon date
                    </div>
                    <p className="mt-3 text-2xl font-black sm:text-3xl">December 12, 2026</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-htr-blue/18">
                      <motion.div
                        className="h-full rounded-full bg-htr-blue"
                        initial={{ width: "0%" }}
                        animate={{ width: "68%" }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-htr-green/20 bg-htr-white/10 p-5">
                      <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-htr-green">
                        <MapPin className="h-4 w-4" />
                        Location
                      </div>
                      <p className="mt-3 text-lg font-black leading-snug">Iroquois Ridge High School</p>
                      <p className="mt-1 text-sm text-htr-white/60">Oakville, Ontario</p>
                    </div>
                    <div className="rounded-3xl border border-htr-green/20 bg-htr-white/10 p-5">
                      <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-htr-green">
                        <Wifi className="h-4 w-4" />
                        Site mode
                      </div>
                      <p className="mt-3 text-lg font-black leading-snug">Interactive design upgraded</p>
                      <p className="mt-1 text-sm text-htr-white/60">Layout polished</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="relative min-h-screen overflow-hidden bg-htr-white px-5 py-20 text-htr-blue sm:px-8 lg:px-12 lg:py-28">
        <AboutDotsBackground />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-htr-green/60 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-htr-shaded/35 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-shaded">About HTR</p>
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] sm:text-7xl lg:text-8xl">
                Bring an idea. Build it here.
              </h2>
            </div>
            <p className="text-lg leading-8 text-htr-blue/78 lg:text-xl">
              Hack The Ridge is built for curious students, first-time hackers, experienced coders, designers, and friends who want to make something exciting together. No perfect idea required — just energy, teamwork, and the courage to start.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {tracks.map((track, index) => {
              const Icon = track.icon;
              return (
                <motion.article
                  key={track.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -10, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-htr-blue/10 bg-white p-7 shadow-xl shadow-htr-blue/8"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-htr-blue via-htr-shaded to-htr-green" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-htr-blue text-htr-green shadow-xl shadow-htr-blue/15 transition group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-htr-shaded">{track.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-black text-htr-blue">{track.title}</h3>
                  <p className="mt-4 leading-7 text-htr-blue/72">{track.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="winners" className="relative min-h-screen overflow-hidden bg-[#162746] px-5 py-20 text-htr-white sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -left-28 top-12 h-72 w-72 rounded-full bg-htr-green/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-htr-shaded/18 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(223,215,215,.06)_1px,transparent_1px),linear-gradient(rgba(223,215,215,.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-35" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
          >
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">Previous Winners</p>
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] sm:text-7xl lg:text-8xl">
                Last year's winner wall.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-8 text-htr-white/76 lg:text-xl">
                A place for previous winners, 2025 prize categories, project photos, and the story behind each build.
              </p>
              <Link href="/2025" className="inline-flex rounded-full border border-htr-green/35 bg-htr-green px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-htr-blue shadow-xl shadow-htr-green/15 transition hover:-translate-y-1 hover:bg-htr-white">
                Open 2025 Website
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {winnerCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -10, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-htr-green/22 bg-htr-white/10 p-7 shadow-2xl shadow-black/18 backdrop-blur-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-htr-green via-htr-white to-htr-shaded" />
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-htr-green text-htr-blue shadow-xl shadow-htr-green/15 transition group-hover:scale-110 group-hover:rotate-6">
                  <Trophy className="h-8 w-8" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-htr-green">winner slot</p>
                <h3 className="mt-3 text-3xl font-black text-htr-white">{card.title}</h3>
                <p className="mt-4 leading-7 text-htr-white/72">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-htr-blue px-5 py-20 text-htr-white sm:px-8 lg:px-12 lg:py-28">
        <InteractiveBackground mode="lite" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">Build experience</p>
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] sm:text-7xl lg:text-8xl">
                Your idea gets a pulse.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-htr-white/76">
                This is where curiosity turns into code, sketches become interfaces, and teams discover that the best projects often start as one wild conversation.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="tilt-card rounded-[1.6rem] border border-htr-green/20 bg-htr-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-htr-green text-htr-blue">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-base font-bold leading-7 text-htr-white/90">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2.2rem] border border-htr-green/20 bg-htr-white/10 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
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

      <section id="register" className="relative min-h-screen overflow-hidden bg-htr-shaded px-5 py-20 text-htr-blue sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-htr-white/25 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-htr-green/35 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-htr-blue/15 bg-htr-white/92 p-8 text-center shadow-2xl shadow-htr-blue/16 backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-htr-blue text-htr-green shadow-xl shadow-htr-blue/15">
            <Rocket className="h-8 w-8" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-shaded">Registration</p>
          <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] text-htr-blue sm:text-7xl lg:text-8xl">
            Ready to join the build?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-htr-blue/74">
            Registration details can be connected when the official form is ready. Until then, visitors can follow updates or contact the team.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="https://www.instagram.com/hacktheridge/" target="_blank" rel="noopener noreferrer" className="button-shine rounded-full bg-htr-blue px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-htr-green transition hover:-translate-y-1 hover:bg-htr-blue/90">
              Instagram Updates
            </Link>
            <Link href="#contact" className="rounded-full border border-htr-blue/20 bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-htr-blue transition hover:-translate-y-1 hover:border-htr-blue hover:bg-htr-green/35">
              Contact Team
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="sponsors" className="relative z-0 min-h-screen overflow-hidden bg-htr-blue px-5 pb-32 pt-20 text-htr-white sm:px-8 lg:px-12 lg:pb-40 lg:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(175,213,188,.16),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(125,182,173,.16),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(223,215,215,.08)_1px,transparent_1px),linear-gradient(rgba(223,215,215,.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-5xl rounded-[2.5rem] border border-htr-green/25 bg-htr-white/10 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-12"
        >
          <p className="text-sm font-black uppercase tracking-[0.35em] text-htr-green">Sponsors</p>
          <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] text-htr-white sm:text-7xl lg:text-8xl">
            Sponsor space opening soon.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-htr-white/76">
            This space is ready for partners who want to support student builders, workshops, prizes, and local tech projects.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {['Partner logos', 'Prize support', 'Workshop support'].map((item) => (
              <div key={item} className="rounded-3xl border border-htr-green/20 bg-htr-white/10 p-5 text-sm font-black uppercase tracking-[0.18em] text-htr-green">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <TeamSection />
      <GradientSection />
      <Footer />
    </main>
  );
}
