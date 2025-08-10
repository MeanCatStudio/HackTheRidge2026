"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface WeeksCounterProps {
  startDateISO: string;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const WeeksCounter: React.FC<WeeksCounterProps> = ({ startDateISO, className = "" }) => {
  const target = useMemo(() => {
    const start = new Date(startDateISO);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)));
  }, [startDateISO]);

  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current || started) return;
    const el = ref.current;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) return;
      setStarted(true);

      let startTs = 0;
      const dur = 4000;
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min(1, (ts - startTs) / dur);
        setDisplay(Math.round(target * easeOutCubic(p)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, started]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat().format(display)}
    </span>
  );
};

export default WeeksCounter;