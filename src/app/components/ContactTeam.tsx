"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function ContactTeam() {
  const pending = useRef<{ frame?: number; timer?: ReturnType<typeof setTimeout>; email?: HTMLElement }>({});
  const cancel = () => {
    if (pending.current.frame) cancelAnimationFrame(pending.current.frame);
    if (pending.current.timer) clearTimeout(pending.current.timer);
    pending.current.email?.removeAttribute("data-contact-highlight");
    pending.current = {};
  };
  useEffect(() => cancel, []);
  const showEmail = () => {
    cancel();
    const email = document.getElementById("footer-contact-email");
    if (!email) return;
    pending.current.email = email;
    email.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
    let lastPosition = Infinity;
    let settledFrames = 0;
    const waitForScroll = () => {
      const rect = email.getBoundingClientRect();
      settledFrames = Math.abs(rect.top - lastPosition) < 0.5 ? settledFrames + 1 : 0;
      lastPosition = rect.top;
      if (rect.top >= 0 && rect.bottom <= window.innerHeight && settledFrames >= 4) {
        email.focus({ preventScroll: true });
        email.setAttribute("data-contact-highlight", "true");
        pending.current.timer = setTimeout(() => {
          email.removeAttribute("data-contact-highlight");
        }, 2000);
      } else {
        pending.current.frame = requestAnimationFrame(waitForScroll);
      }
    };
    pending.current.frame = requestAnimationFrame(waitForScroll);
  };
  return <div className="relative z-10">
    <button type="button" onClick={showEmail} aria-controls="footer-contact-email" className="htr-register-link rounded-full" style={{ borderRadius: 9999 }}>
      Connect with the team <ArrowRight className="h-4 w-4" />
    </button>
  </div>;
}
