"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import InteractiveScrollingCards, { CardData } from "./components/InteractiveScrollingCards";
import SponsorsTitle from "./components/SponsorsTitle";
import SponsorsGrid from "./components/SponsorsGrid";
import GradientSection from "./components/GradientSection";
import TeamSection from "./components/TeamSection";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    headerTitle: 'ABOUT HTR.',
    title: 'Where Innovation Meets Community',
    content: 'Hack the Ridge is where innovation meets community. We are an annual hackathon at Iroquois Ridge High School that hosts over 150+ leaders in STEM every year to innovate and push the limit of technology.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-green',
    textColor: 'text-white',
  },
  {
    id: 2,
    headerTitle: 'HISTORY',
    title: '500+ Past Participants',
    content: 'Since 2019, we\'ve grown from 50 to 200+ hackers annually, creating lasting impact.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-brown',
    textColor: 'text-white',
  },
  {
    id: 3,
    headerTitle: 'Last year...',
    title: 'Healthcare Revolution',
    content: '2024 marked our most impactful year as 300+ innovators pushed healthcare boundaries with cutting-edge AI solutions.',
    imageUrl: '',
    bgColor: 'bg-[#c39c74]',
    textColor: 'text-white',
  },
  {
    id: 4,
    headerTitle: '2026',
    title: 'Ready to Build?',
    content: 'Join us for our biggest event yet. Registration opens soon.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-app-bg',
    textColor: 'text-white',
  },
];

const HeroIllustration = () => {
  return (
    <div className="relative hidden h-[420px] w-[320px] items-center justify-center lg:flex">
      <div className="absolute inset-0 rounded-[2.5rem] border border-[#7DB6AD]/25 bg-white/60 backdrop-blur-sm shadow-[0_30px_90px_rgba(30,49,89,0.16)]" />
      <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-[#7DB6AD]/30 bg-[#AFD5BC]/30" />
      <div className="absolute right-8 top-10 h-20 w-20 rounded-full border border-[#1E3159]/10 bg-[#1E3159]/8" />
      <div className="absolute bottom-8 left-8 h-24 w-24 rounded-[1.5rem] border border-[#1E3159]/10 bg-[#1E3159]/6" />
      <div className="absolute right-6 bottom-10 h-28 w-28 rounded-full border border-[#7DB6AD]/20 bg-[#7DB6AD]/10" />

      <motion.div
        className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border-[3px] border-[#7DB6AD] bg-[#D9D9DA] shadow-[0_24px_70px_rgba(125,182,173,0.3)]"
        initial={{ scale: 0.95, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Image
          src="/logo.png"
          alt="Hack the Ridge logo"
          width={120}
          height={120}
          className="h-28 w-28 object-contain"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute left-6 top-24 z-20 rounded-2xl border border-[#1E3159]/10 bg-white/90 p-3 shadow-lg shadow-[#1E3159]/10"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 64 64" className="h-12 w-12">
          <path d="M18 10h8l6 14 6-14h8l-10 24h-8z" fill="#1E3159" />
          <path d="M24 38h16v6H24z" fill="#7DB6AD" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-2 top-28 z-20 rounded-2xl border border-[#7DB6AD]/20 bg-[#AFD5BC]/70 p-3 shadow-lg shadow-[#7DB6AD]/20"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 64 64" className="h-12 w-12">
          <rect x="14" y="16" width="36" height="28" rx="4" fill="#1E3159" />
          <rect x="20" y="22" width="24" height="10" rx="2" fill="#AFD5BC" />
          <rect x="24" y="34" width="16" height="4" rx="2" fill="#7DB6AD" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-8 z-20 rounded-2xl border border-[#1E3159]/10 bg-white/90 p-3 shadow-lg shadow-[#1E3159]/10"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 64 64" className="h-14 w-14">
          <rect x="24" y="12" width="16" height="34" rx="2" fill="#1E3159" />
          <rect x="20" y="18" width="24" height="4" rx="2" fill="#7DB6AD" />
          <rect x="20" y="28" width="24" height="4" rx="2" fill="#7DB6AD" />
          <rect x="28" y="8" width="8" height="8" rx="2" fill="#AFD5BC" />
          <rect x="26" y="42" width="12" height="6" rx="2" fill="#1E3159" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-10 bottom-12 z-20 rounded-full border border-[#7DB6AD]/30 bg-[#D9D9DA] p-3 shadow-lg shadow-[#7DB6AD]/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <path d="M22 18c8-6 18-6 26 0-5 4-8 7-8 14 0 4-3 7-7 7s-7-3-7-7c0-7-3-10-4-14z" fill="#7DB6AD" />
          <circle cx="36" cy="28" r="4" fill="#1E3159" />
        </svg>
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#dfd7d7] text-[#1E3159] overflow-x-hidden">
      <AnimatedNavbar />

      <section id="home" className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(175,213,188,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(125,182,173,0.22),transparent_30%)] pointer-events-none" />
        <div className="absolute z-100 right-0 top-24 hidden xl:block space-y-6 pr-10 pointer-events-none">
          <span className="block w-4 h-32 rounded-full bg-[#1E3159] shadow-[0_0_30px_rgba(30,49,89,0.35)]" />
          <span className="block w-4 h-24 rounded-full bg-[#1E3159]/80 shadow-[0_0_24px_rgba(30,49,89,0.24)]" />
          <span className="block w-4 h-16 rounded-full bg-[#1E3159]/60 shadow-[0_0_18px_rgba(30,49,89,0.16)]" />
        </div>

        <div className="relative z-10 mx-auto min-h-screen px-6 py-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8 pl-4 lg:pl-6">

                <div className="relative flex w-fit flex-col items-start justify-center gap-0">
                  <h1 className="text-[4.8rem] leading-[0.8] font-black uppercase tracking-[-0.05em] sm:text-[5.8rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] drop-shadow-[0_6px_2px_#7DB6AD]">
                  HACK
                </h1>
                <span
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center text-[2.2rem] font-black uppercase leading-none tracking-[0.12em] text-[#AFD5BC] drop-shadow-[0_4px_1px_#000000] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem]"
                >
                  THE
                </span>
                  <h1 className="text-[4.8rem] leading-[0.8] font-black uppercase tracking-[-0.05em] sm:text-[5.8rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem]">
                  RIDGE
                </h1>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 lg:mt-12">       
                <div className="flex min-w-[200px] flex-col gap-2 rounded-3xl border border-[#7DB6AD]/30 bg-white/80 p-5 shadow-lg shadow-[#1E3159]/8">
                  <span className="text-xs uppercase tracking-[0.35em] text-[#1E3159]/70">Location</span>
                  <p className="text-xl font-semibold text-[#1E3159]">Iroquois Ridge High School</p>
                </div>
                <div className="flex min-w-[200px] flex-col gap-2 rounded-3xl border border-[#7DB6AD]/30 bg-white/80 p-5 shadow-lg shadow-[#1E3159]/8">
                  <span className="text-xs uppercase tracking-[0.35em] text-[#1E3159]/70">Date</span>
                  <p className="text-xl font-semibold text-[#1E3159]">XX/12/2026</p>
                </div>
                <div className="flex min-w-[200px] flex-col gap-2 rounded-3xl border border-[#7DB6AD]/30 bg-white/80 p-5 shadow-lg shadow-[#1E3159]/8">
                  <span className="text-xs uppercase tracking-[0.35em] text-[#1E3159]/70">Participants</span>
                  <p className="text-xl font-semibold text-[#1E3159]">150+ hackers</p>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <motion.div
                className="relative w-full overflow-hidden rounded-[2rem] border border-[#1E3159]/10 bg-[#1E3159] shadow-[0_32px_80px_rgba(15,24,45,0.32)] aspect-[16/9] max-h-[600px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3159]/80 via-transparent to-[#7DB6AD]/20" />
                <div className="absolute bottom-8 left-8 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                  Random Image Desc. Carousel?
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="w-full bg-[#1E3159] pt-16 pb-24 text-white">
        <InteractiveScrollingCards cards={CARDS_DATA} />
      </section>

      <section id="sponsors" className="min-h-screen w-full bg-[#D9D9DA] py-20">
        <SponsorsTitle />
        <SponsorsGrid />
      </section>

      <section id="team" className="w-full bg-[#1E3159] py-20 text-white">
        <TeamSection />
      </section>

      <section id="faq" className="w-full bg-[#D9D9DA] py-20 text-[#1E3159]">
        <GradientSection />
      </section>

      <Footer />
    </div>
  );
}
