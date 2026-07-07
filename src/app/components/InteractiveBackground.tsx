"use client";

import React from "react";

const codeBits = ["<HTR />", "AI", "CSS", "JS", "#AFD5BC", "01", "BUILD", "DEMO", "SHIP", "LAUNCH"];

export default function InteractiveBackground() {
  return (
    <div className="interactive-bg" aria-hidden="true">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="grid-layer" />
      <div className="cyber-lines" />
      <div className="scan-lines" />
      <div className="noise-layer" />
      {codeBits.map((bit, index) => (
        <span
          key={`${bit}-${index}`}
          className="float-code"
          style={{
            left: `${8 + ((index * 13) % 82)}%`,
            top: `${14 + ((index * 17) % 70)}%`,
            animationDelay: `${index * -1.2}s`,
            animationDuration: `${10 + (index % 5) * 2}s`,
          }}
        >
          {bit}
        </span>
      ))}
    </div>
  );
}
