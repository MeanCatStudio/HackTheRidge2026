"use client";

import React, { useRef, useState } from "react";

const SoundDock: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 0.2;
    audio.muted = false;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <aside className={`sound-pill ${isPlaying ? "sound-pill--active" : ""}`} aria-label="Site sound control">
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src="/audio/htr-loop.mp3"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="sound-pill__visual" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="sound-pill__copy">
        <span>{isPlaying ? "Audio live" : "Audio off"}</span>
        <strong>HTR ambient</strong>
      </div>

      <button type="button" className="sound-pill__button" onClick={toggleSound} aria-pressed={isPlaying}>
        {isPlaying ? "Mute" : "Unmute"}
      </button>
    </aside>
  );
};

export default SoundDock;
