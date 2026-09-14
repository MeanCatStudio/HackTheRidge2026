"use client";

import React, { useEffect, useRef, useState } from "react";

interface InlineCurrencyCounterProps {
  value: number;
  durationMs?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const InlineCurrencyCounter: React.FC<InlineCurrencyCounterProps> = ({
  value,
  durationMs = 4000,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current || started) return;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) return;
      setStarted(true);

      let startTs = 0;
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min(1, (ts - startTs) / durationMs);
        setDisplay(value * easeOutCubic(p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, durationMs, started]);

  const formatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(display);

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
};

export default InlineCurrencyCounter;