"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Rocket,
  Trophy,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";
import GradientSection from "./components/GradientSection";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";
import CyberWordmark from "./components/CyberWordmark";
import Background from './components/Background';
import SponsorsGrid from "./components/SponsorsGrid";
import HistoryPuzzleSection from "./components/HistoryPuzzleSection";
import TeamSection from "./components/TeamSection";
import { openMapsForDevice } from "@/lib/maps";

const stats = [
  { value: "150+", label: "students participated last year", icon: Users },
  { value: "$6K+", label: "was raised for prizes", icon: Trophy },
  { value: "12+", label: "hours of building", icon: Zap },
];

const tracks = [
  {
    title: "Automation + Tools",
    body: "Build useful tools that save time, solve small problems, or make everyday tasks easier.",
  },
  {
    title: "Climate + Community",
    body: "Create apps that support schools, local communities, sustainability, accessibility, or wellbeing.",
  },
  {
    title: "Web + Games",
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

const contactLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/hacktheridge/",
    qr: "/instagram-qr.png",
  },
  {
    name: "Email",
    href: "mailto:hacktheridge24@gmail.com",
    qr: "/email-qr.png",
    detail: "hacktheridge24@gmail.com",
  },
  {
    name: "Discord",
    href: "https://discord.gg/RdEwzSeN",
    qr: "/discord-qr.png",
  },
];

function ContactTeamModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="htr-puzzle-overlay" role="dialog" aria-modal="true" aria-label="Contact the Hack The Ridge team">
      <div className="htr-puzzle-noise" aria-hidden="true" />
      <div className="htr-puzzle-topbar">
        <div>
          <h2>Contact the team.</h2>
        </div>
        <button type="button" onClick={onClose} className="htr-puzzle-close" aria-label="Close contact details">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="htr-puzzle-complete is-visible" aria-live="polite">
        <p>HTR TEAM</p>
        <strong>Reach out anytime.</strong>
        <div className="htr-puzzle-community-links">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="htr-puzzle-reveal-card"
              aria-label={`Open Hack The Ridge ${link.name}`}
            >
              {link.qr ? (
                <span className="htr-puzzle-qr-wrap">
                  <img src={link.qr} alt={`${link.name} QR code`} />
                </span>
              ) : (
                <span className="htr-puzzle-qr-wrap flex items-center justify-center border border-htr-green/25 bg-htr-blue/20 text-center text-[0.7rem] font-black uppercase tracking-[0.18em] text-htr-white">
                  {link.name}
                </span>
              )}
              <b>{link.name}</b>
              <span className="htr-puzzle-link-hint">
                {link.detail ?? `Open ${link.name}`}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

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

      <section id="home" className="htr-hero relative px-5 text-htr-white sm:px-8 lg:px-12" aria-labelledby="home-title">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <h1 id="home-title" className="sr-only">Hack The Ridge 2026</h1>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }} className="htr-hero-stage">
            <div className="htr-hero-wordmark-wrap" aria-hidden="true">
              <CyberWordmark variant="hero" className="mx-auto w-full" />
            </div>
            <div className="htr-hero-date">
              <p className="htr-eyebrow">Hack The Ridge 2026</p>
              <button type="button" onClick={addToCalendar} className="htr-date-link group" aria-label="December 12, 2026. Add Hack The Ridge to calendar">
                <span className="htr-date-day">12</span>
                <span className="htr-date-month">December<br />2026</span>
                <span className="htr-text-link mt-5">Add to calendar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </button>
            </div>
          </motion.div>
          <div className="htr-event-strip" aria-label="Quick event info">
            <button type="button" onClick={openMaps} className="htr-event-location group" aria-label="Open Iroquois Ridge High School in Maps">
              <MapPin className="h-5 w-5 shrink-0 text-htr-green" />
              <span><strong>Iroquois Ridge HS</strong><span className="block text-sm text-htr-white/80">Oakville, Ontario</span></span>
            </button>
            <p className="htr-event-invitation">Join Hack The Ridge</p>
            <a
              href="#register"
              onClick={(event) => {
                event.preventDefault();
                const section = document.getElementById("register");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="htr-register-link group"
            >
              Register interest <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
          </div>
          <dl className="htr-hero-stats">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="htr-hero-stat">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">{stat.label}</dt>
                  <dd className="font-sacco text-5xl leading-none text-htr-green sm:text-6xl">{stat.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="htr-open-content relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <h2 className="font-sacco mt-4 max-w-3xl text-6xl font-black uppercase leading-[0.86] tracking-[0.035em] text-htr-white sm:text-7xl lg:text-8xl">
                A day to build something of your own.
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="text-lg font-semibold leading-8 text-htr-white sm:text-xl">
                Hack The Ridge is a student led hackathon at Iroquois Ridge High School in Oakville. Spend the day making a project with other students, getting help from mentors, and sharing what you built. Come with friends or meet a team here. No coding experience is required.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-black uppercase tracking-[0.18em] text-htr-shaded sm:text-sm">
                <span>Beginners welcome.</span>
                <span>All skills welcome.</span>
                <span>Bring your curiosity.</span>
              </div>
            </div>
          </div>

          <div className="mt-14 grid border-y border-htr-green/25 md:grid-cols-3">
            {[
              ["Choose an idea", "Start with a problem you care about. Keep it small enough to try in a day."],
              ["Build together", "Split the work, ask for help, and make the project better as a team."],
              ["Share your work", "Show what you made, explain how it works, and see what other teams tried."],
            ].map(([title, body], index) => (
              <div
                key={title}
                className={`py-7 md:px-7 md:py-9 ${index > 0 ? "border-t border-htr-green/25 md:border-l md:border-t-0" : ""}`}
              >
                <h3 className="mt-2 text-2xl font-black text-htr-white sm:text-3xl">{title}</h3>
                <p className="mt-3 max-w-sm text-base font-semibold leading-7 text-htr-white/85">{body}</p>
              </div>
            ))}
          </div>

          {/* <div className="mt-16 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
            <div>
              <h3 className="mt-3 max-w-lg text-4xl font-black leading-tight text-htr-white sm:text-5xl">Choose what interests you.</h3>
            </div>

            <div className="divide-y divide-htr-blue/12 border-y border-htr-green/25">
              {tracks.map((track) => {
                return (
                  <div key={track.title} className="py-7 sm:py-8">
                    <div>
                      <h4 className="mt-1 text-2xl font-black text-htr-white sm:text-3xl">{track.title}</h4>
                      <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-htr-white/85">{track.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </section>

      <section id="experience" className="relative min-h-screen overflow-hidden px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="htr-open-content relative z-10 mx-auto max-w-7xl">
          <div>
            <motion.div
              className="max-w-3xl"
            >
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] sm:text-7xl lg:text-8xl">
                What the day looks like.
              </h2>
              <p className="readable-copy readable-copy--dark mt-6 max-w-xl text-lg leading-8 text-htr-white">
                Try a tool you have never used, work through a problem with your team, and leave with a project you can keep developing. Mentors and workshops will help along the way.
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

      <section id="winners" className="relative min-h-screen overflow-hidden px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="htr-open-content relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="border-b border-htr-green/25 pb-10"
          >
            <div className="max-w-5xl">
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.86] tracking-[0.035em] text-htr-white sm:text-7xl lg:text-8xl">
                The 2025 winners.
              </h2>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-6">
            {winnerCards.map((card, index) => {
              return (
              <motion.article
                key={card.title}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden ${index < 3 ? "xl:col-span-2" : "xl:col-span-3"}`}
              >
                <div className={`relative overflow-hidden ${index < 3 ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
                  <Image
                    src={card.image}
                    alt={`${card.title} winners at Hack The Ridge 2025`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 34vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/65 to-transparent px-5 pb-3 pt-5">
                    <h3 className="winner-placement-label text-xl font-black sm:text-2xl">{card.title}</h3>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <HistoryPuzzleSection />

      <section id="register" className="relative scroll-mt-28 px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="htr-open-content relative mx-auto grid max-w-7xl gap-10 border-y border-htr-green/30 py-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-20 lg:py-16">
          <div>
            <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.95] tracking-[0.035em] sm:text-7xl lg:text-8xl">See you at the Ridge.</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-lg leading-8">Interested in joining us on December 12? Ask the team about registration and we will help you get started.</p>
            <a href="mailto:hacktheridge24@gmail.com?subject=HTR%202026%20registration%20interest" className="htr-register-link mt-7" style={{ borderRadius: 99 }}>Register interest <ArrowRight className="h-5 w-5" /></a>
          </div>
        </div>
      </section>

      <section id="sponsors" className="relative z-0 overflow-hidden px-5 pb-36 pt-24 text-htr-white sm:px-8 sm:pt-28 lg:px-12 lg:pb-44 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(175,213,188,.15),transparent_34%),radial-gradient(circle_at_90%_32%,rgba(125,182,173,.14),transparent_32%)]" />
        <div className="htr-open-content relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="relative"
          >
            <div className="max-w-3xl">
              <h2 className="font-sacco mt-4 text-6xl font-black uppercase leading-[0.87] tracking-[0.035em] text-htr-white sm:text-7xl lg:text-8xl">
                Help make HTR happen.
              </h2>
            </div>

            <div className="relative mt-16 overflow-hidden border-y border-htr-green/20 lg:mt-20">
              <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px bg-htr-green/16 lg:block" />

              <div className="grid lg:grid-cols-2">
                {[
                  { number: "01", title: "Prizes + gear", body: "Your company can recognise students’ effort with prizes, equipment, or software they can keep using after the event. Help a first project become the start of a longer interest.", icon: Trophy },
                  { number: "02", title: "Food + event support", body: "A meal, supplies, or help with event costs can make a real difference to a student’s day. Your support helps us keep the event free and makes more students feel welcome.", icon: Zap },
                  { number: "03", title: "Workshops + mentors", body: "Give your team a chance to share what they know. A short workshop or time spent mentoring can help a student get unstuck and see a future in your field.", icon: Users },
                  { number: "04", title: "Community support", body: "Build a connection with the students and schools around your business. Your support creates space for young people in Oakville to learn, meet peers, and try something new.", icon: Sparkles },
                ].map((item, index) => {
                  return (
                    <div
                      key={item.title}
                      className={`group relative min-h-[14rem] py-8 sm:py-10 lg:p-10 ${
                        index < 2 ? "border-b border-htr-green/16" : ""
                      } ${index % 2 === 0 ? "lg:pr-14" : "lg:pl-14"}`}
                    >
                      <div className="flex items-start gap-5 sm:gap-6">
                        

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

          <div className="mt-12 flex flex-col gap-6 border-b border-htr-green/25 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-htr-green">Sponsor HTR 2026</p>
            </div>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="htr-register-link rounded-full"
              style={{ borderRadius: 9999 }}
            >
              Contact the team
              <ArrowRight className="h-4 w-4" />
            </button>
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

      <TeamSection />
      <GradientSection />
      <Footer />
      <ContactTeamModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
