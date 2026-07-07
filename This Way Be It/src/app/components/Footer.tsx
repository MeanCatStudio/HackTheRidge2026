"use client";

import React from "react";
import Link from "next/link";
import CyberWordmark from "./CyberWordmark";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Previous Winners", href: "#winners" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "Register", href: "#register" },
  { name: "Team", href: "#team" },
  { name: "FAQ", href: "#faq" },
];

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/hacktheridge/" },
  { name: "Discord", href: "https://discord.gg/RdEwzSeN" },
  { name: "Email", href: "mailto:hi@hacktheridge.ca" },
];

const Footer: React.FC = () => {
  const currentYear = "2026";

  return (
    <footer id="contact" className="border-t border-[#AFD5BC]/18 bg-[#1E3159] px-5 py-12 text-[#dfd7d7] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div>
            <CyberWordmark variant="footer" />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#dfd7d7]/62">Next season</p>
          </div>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#dfd7d7]/72">
            A student-led hackathon at Iroquois Ridge High School where innovators build, learn, and launch together.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.28em] text-[#AFD5BC]">Explore</h4>
          <div className="mt-5 grid gap-3">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-[#dfd7d7]/74 transition hover:text-[#AFD5BC]">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.28em] text-[#AFD5BC]">Connect</h4>
          <div className="mt-5 grid gap-3">
            {socials.map((link) => (
              <Link key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm font-semibold text-[#dfd7d7]/74 transition hover:text-[#AFD5BC]">
                {link.name}
              </Link>
            ))}
            <Link href="https://maps.google.com/?q=1123+Glenashton+Dr,+Oakville,+ON" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#dfd7d7]/74 transition hover:text-[#AFD5BC]">
              Iroquois Ridge High School
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#AFD5BC]/15 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#dfd7d7]/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© {currentYear} Hack The Ridge. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
