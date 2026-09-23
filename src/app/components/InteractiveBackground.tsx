"use client";

import React, { useEffect, useState } from "react";

type InteractiveBackgroundProps = {
  mode?: "full" | "lite";
};

const codeBits = [
  "<HTR />",
  "CSS",
  "JS",
  "BUILD",
  "DEMO",
  "SHIP",
  "LAUNCH",
];

const nodes = [
  { left: "10%", top: "18%", delay: "-0.4s", label: "BUILD" },
  { left: "19%", top: "72%", delay: "-1.7s", label: "PUSH" },
  { left: "34%", top: "32%", delay: "-2.8s", label: "RUN" },
  { left: "48%", top: "78%", delay: "-1.1s", label: "SHIP" },
  { left: "61%", top: "20%", delay: "-3.4s", label: "IDEA" },
  { left: "75%", top: "50%", delay: "-2.2s", label: "DEMO" },
  { left: "88%", top: "28%", delay: "-4.1s", label: "FIX" },
  { left: "91%", top: "76%", delay: "-2.9s", label: "LAUNCH" },
];

const sparks = [
  { top: "13%", delay: "-1s", duration: "8s", width: "9rem" },
  { top: "24%", delay: "-5s", duration: "11s", width: "13rem" },
  { top: "39%", delay: "-8s", duration: "9s", width: "7rem" },
  { top: "52%", delay: "-2s", duration: "12s", width: "15rem" },
  { top: "68%", delay: "-6s", duration: "10s", width: "10rem" },
  { top: "83%", delay: "-3s", duration: "13s", width: "12rem" },
];

const dataDrops = [
  { left: "7%", delay: "-1.6s", duration: "13s", text: "0101" },
  { left: "15%", delay: "-6.8s", duration: "15s", text: "push" },
  { left: "23%", delay: "-3.4s", duration: "12s", text: "run" },
  { left: "31%", delay: "-9.2s", duration: "16s", text: "merge" },
  { left: "43%", delay: "-2.1s", duration: "14s", text: "build" },
  { left: "51%", delay: "-7.4s", duration: "17s", text: "ship" },
  { left: "64%", delay: "-4.2s", duration: "13s", text: "debug" },
  { left: "73%", delay: "-11s", duration: "18s", text: "demo" },
  { left: "82%", delay: "-5.7s", duration: "15s", text: "launch" },
  { left: "92%", delay: "-8.6s", duration: "12s", text: "1001" },
];

const orbitTags = [
  { text: "idea", delay: "-1s", size: "14rem", left: "13%", top: "30%" },
  { text: "demo", delay: "-6s", size: "18rem", left: "63%", top: "22%" },
  { text: "ship", delay: "-9s", size: "16rem", left: "70%", top: "67%" },
];

export default function InteractiveBackground({ mode = "full" }: InteractiveBackgroundProps) {
  const [liteMode, setLiteMode] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMode = () => {
      const nextLiteMode = mode === "lite" || mediaQuery.matches || window.innerWidth < 1024;
      setLiteMode(nextLiteMode);
    };

    updateMode();

    mediaQuery.addEventListener("change", updateMode);
    window.addEventListener("resize", updateMode, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
      window.removeEventListener("resize", updateMode);
    };
  }, [mode]);

  return (
    <div className="interactive-bg" aria-hidden="true">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      {!liteMode && <div className="aurora aurora-three" />}
      {!liteMode && <div className="aurora aurora-four" />}
      <div className="grid-layer" />
      {!liteMode && <div className="deep-grid-layer" />}
      {!liteMode && <div className="cyber-lines" />}
      {!liteMode && <div className="diagonal-lanes" />}
      {!liteMode && (
        <div className="pulse-network">
          {nodes.map((node) => (
            <span
              key={`${node.left}-${node.top}`}
              className="energy-node"
              style={{ left: node.left, top: node.top, animationDelay: node.delay }}
            >
              <span className="node-label">{node.label}</span>
            </span>
          ))}
        </div>
      )}
      {!liteMode && (
        <div className="orbit-layer">
          {orbitTags.map((tag) => (
            <span
              key={tag.text}
              className="orbit-ring"
              style={{ width: tag.size, height: tag.size, left: tag.left, top: tag.top, animationDelay: tag.delay }}
            >
              <span>{tag.text}</span>
            </span>
          ))}
        </div>
      )}
      {!liteMode && (
        <div className="spark-layer">
          {sparks.map((spark, index) => (
            <span
              key={`${spark.top}-${index}`}
              className="data-spark"
              style={{ top: spark.top, animationDelay: spark.delay, animationDuration: spark.duration, width: spark.width }}
            />
          ))}
        </div>
      )}
      {!liteMode && (
        <div className="data-rain">
          {dataDrops.map((drop) => (
            <span
              key={`${drop.left}-${drop.text}`}
              style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.duration }}
            >
              {drop.text}
            </span>
          ))}
        </div>
      )}
      {!liteMode && <div className="scan-lines" />}
      {!liteMode && <div className="noise-layer" />}
      {!liteMode &&
        codeBits.map((bit, index) => (
          <span
            key={`${bit}-${index}`}
            className="float-code"
            style={{
              left: `${6 + ((index * 11) % 86)}%`,
              top: `${12 + ((index * 19) % 72)}%`,
              animationDelay: `${index * -1.05}s`,
              animationDuration: `${14 + (index % 6) * 2.5}s`,
            }}
          >
            {bit}
          </span>
        ))}
    </div>
  );
}
