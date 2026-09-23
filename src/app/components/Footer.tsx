"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Register", href: "#register" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "Team", href: "#team" },
  { name: "FAQ", href: "#faq" },
  { name: "View 2025 Website", href: "/2025" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-htr-green/20 bg-[#08101d] px-5 py-16 text-htr-white sm:px-8 lg:px-12 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(175,213,188,0.10),transparent_34%),radial-gradient(circle_at_90%_80%,rgba(52,84,121,0.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-htr-green/16 pb-12 lg:grid-cols-[1.45fr_0.65fr_0.9fr] lg:gap-16 lg:pb-14">
          <div>
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                src="/2026Logo.png"
                alt="Hack the Ridge Logo"
                width={88}
                height={88}
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
              <div>
                <h3 className="font-sacco text-3xl font-black uppercase leading-none tracking-[0.03em] sm:text-4xl">HACK THE RIDGE</h3>
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-htr-white/82 sm:text-lg">
              Hack the Ridge is where innovation meets community. We are an annual hackathon at Iroquois Ridge High School that hosts over 150+ leaders in STEM every year to innovate and push the limit of technology.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.28em] text-htr-green">Quick Links</h4>
            <nav className="mt-6 grid gap-4" aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-base font-bold text-htr-white/82 transition hover:translate-x-1 hover:text-htr-green"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.28em] text-htr-green">Connect</h4>
            <div className="mt-6 grid gap-5">
              <a
                href="mailto:hi@hacktheridge.ca"
                className="flex items-start gap-3 text-sm font-semibold text-htr-white/82 transition hover:text-htr-green"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-htr-green" />
                <span>hacktheridge24@gmail.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=1123+Glenashton+Dr,+Oakville,+ON"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm font-semibold leading-6 text-htr-white/82 transition hover:text-htr-green"
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-htr-green" />
                <span>1123 Glenashton Dr, Oakville, ON</span>
              </a>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/hacktheridge/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-htr-green/28 bg-htr-green/[0.06] text-htr-green transition hover:-translate-y-1 hover:bg-htr-green hover:text-htr-blue"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://discord.gg/RdEwzSeN"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  title="Discord"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-htr-green/28 bg-htr-green/[0.06] text-htr-green transition hover:-translate-y-1 hover:bg-htr-green hover:text-htr-blue"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 pt-8 text-sm font-semibold text-htr-white/66 md:grid-cols-3 md:items-center">
          <p>© 2026 Hack the Ridge. All rights reserved.</p>
          <p className="md:text-center">
            Developed by <strong className="font-black text-htr-white">Atharv, Ekansh and Waylon</strong>
          </p>
          <p className="md:text-right">
            Code of Conduct <span className="text-htr-green/80">(coming soon)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
