"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, MapPin, Trophy, Users } from "lucide-react";

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
];

const sponsors = [
  { name: "Deloitte", src: "/deloitte.png" },
  { name: "Geotab", src: "/geotab.png" },
  { name: "Hatch", src: "/hatch.png" },
  { name: "Colab", src: "/colab.png" },
  { name: "Oakville", src: "/oakville.png.png" },
];

const highlights = [
  { label: "Students showed up", value: "150+", icon: Users },
  { label: "Prizes and support", value: "$6K+", icon: Trophy },
  { label: "One day of building", value: "1", icon: CalendarDays },
];

const cards = [
  {
    title: "Where innovation met community",
    body: "Hack The Ridge brought students together to build projects, learn from mentors, and turn ideas into demos.",
  },
  {
    title: "Beginner friendly, builder approved",
    body: "Teams came in with different skill levels and left with working projects, new friends, and better stories.",
  },
  {
    title: "Built for tomorrow, today",
    body: "The 2025 event focused on creativity, technology, teamwork, and the energy that makes HTR feel like HTR.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PreviousWebsite() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#2e2e2e] text-[#dfd7d7]">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#D9BE6A]/20 bg-[#2e2e2e]/68 px-4 py-3 shadow-2xl shadow-black/18 backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#D9BE6A] transition hover:bg-[#D9BE6A]/10">
            <ArrowLeft className="h-4 w-4" />
            Current site
          </Link>
          <span className="hidden text-xs font-black uppercase tracking-[0.28em] text-[#A7C1BA] sm:inline">2025 archive</span>
        </nav>
      </header>

      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(217,190,106,.08)_1px,transparent_1px),linear-gradient(rgba(217,190,106,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#D9BE6A]/18 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#A7C1BA]/16 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 py-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#D9BE6A]">Hack The Ridge 2025</p>
            <h1 className="mt-5 font-sacco text-7xl font-black uppercase leading-[0.84] tracking-[0.04em] text-[#dfd7d7] sm:text-8xl lg:text-[9rem]">
              Built for tomorrow, today.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#dfd7d7]/78 lg:text-xl">
              This is the previous HTR website space, kept as an archive for last year&apos;s event, photos, sponsors, and memories.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/" className="rounded-full bg-[#D9BE6A] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#2e2e2e] transition hover:-translate-y-1 hover:bg-[#dfd7d7]">
                Back to current site
              </Link>
              <Link href="#gallery" className="rounded-full border border-[#D9BE6A]/35 bg-white/5 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#dfd7d7] transition hover:-translate-y-1 hover:bg-[#D9BE6A]/12">
                View photos
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.75, delay: 0.15 }} className="rounded-[2.2rem] border border-[#D9BE6A]/24 bg-black/22 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.6rem] border border-white/10 bg-[#1f1f1f]/80 p-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D9BE6A]">Event snapshot</p>
              <div className="mt-6 grid gap-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-3xl border border-[#D9BE6A]/18 bg-white/6 p-5">
                      <Icon className="mb-4 h-6 w-6 text-[#D9BE6A]" />
                      <p className="font-sacco text-5xl font-black leading-none text-[#A7C1BA]">{item.value}</p>
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#dfd7d7]/62">{item.label}</p>
                    </div>
                  );
                })}
                <div className="rounded-3xl border border-[#D9BE6A]/18 bg-white/6 p-5">
                  <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-[#D9BE6A]">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <p className="mt-3 text-lg font-black">Iroquois Ridge High School</p>
                  <p className="mt-1 text-sm text-[#dfd7d7]/60">Oakville, Ontario</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.article key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="rounded-[2rem] border border-[#D9BE6A]/18 bg-white/6 p-7 shadow-xl shadow-black/16 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#D9BE6A]">HTR 2025</p>
                <h2 className="mt-4 text-3xl font-black text-[#dfd7d7]">{card.title}</h2>
                <p className="mt-4 leading-7 text-[#dfd7d7]/72">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#D9BE6A]">Photo roll</p>
          <h2 className="mt-4 font-sacco text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] text-[#dfd7d7] sm:text-7xl lg:text-8xl">
            Last year in motion.
          </h2>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#D9BE6A]/18 bg-white/6 p-3 shadow-2xl shadow-black/25">
            <div className="marquee-track flex gap-3">
              {[...gallery, ...gallery].map((src, index) => (
                <div key={`${src}-${index}`} className="relative h-48 w-72 shrink-0 overflow-hidden rounded-[1.4rem] sm:h-56 sm:w-96">
                  <Image src={src} alt="Hack The Ridge 2025 event photo" fill sizes="(max-width: 768px) 18rem, 24rem" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2e2e2e]/55 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-[#D9BE6A]/18 bg-[#dfd7d7] p-8 text-[#2e2e2e] shadow-2xl shadow-black/20 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#8b6f22]">2025 sponsors</p>
              <h2 className="mt-4 font-sacco text-6xl font-black uppercase leading-[0.88] tracking-[0.045em] sm:text-7xl lg:text-8xl">
                Thanks for backing the build.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className="flex min-h-28 items-center justify-center rounded-3xl border border-[#1E3159]/10 bg-white p-5 shadow-lg shadow-[#1E3159]/8">
                  <Image src={sponsor.src} alt={sponsor.name} width={180} height={80} className="max-h-14 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
