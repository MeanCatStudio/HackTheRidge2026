"use client";

import React, { useEffect, useRef, useState } from "react";

const SoundDock: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breakTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  useEffect(() => {
    return () => {
      if (breakTimerRef.current) {
        window.clearTimeout(breakTimerRef.current);
      }
    };
  }, []);

  const playBreakAnimation = () => {
    setIsBreaking(false);
    window.requestAnimationFrame(() => {
      setIsBreaking(true);
      if (breakTimerRef.current) {
        window.clearTimeout(breakTimerRef.current);
      }
      breakTimerRef.current = window.setTimeout(() => setIsBreaking(false), 900);
    });
  };

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    playBreakAnimation();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 0.16;
    audio.muted = false;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <aside className="boombox-dock" aria-label="Site controls">
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src="/audio/htr-loop.mp3"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className={`boombox-control ${isPlaying ? "boombox-control--playing" : ""} ${isBreaking ? "boombox-control--breaking" : ""}`}
        onClick={toggleSound}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Mute site audio" : "Unmute site audio"}
      >
        <span className="boombox-handle" />
        <span className="boombox-shell">
          <span className="boombox-speaker boombox-speaker--left">
            <span />
          </span>
          <span className="boombox-center">
            <span className="boombox-screen">HTR</span>
            <span className="boombox-bars">
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="boombox-speaker boombox-speaker--right">
            <span />
          </span>
          <span className="boombox-crack" />
          <span className="boombox-piece boombox-piece--one" />
          <span className="boombox-piece boombox-piece--two" />
          <span className="boombox-piece boombox-piece--three" />
        </span>
        <span className="boombox-label">{isPlaying ? "Mute" : "Unmute"}</span>
      </button>
    </aside>
  );
};

export default SoundDock;
