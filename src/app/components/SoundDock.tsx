"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, StepBack, StepForward, Volume1, VolumeOff } from "lucide-react";

const SoundDock: React.FC = () => {
  const tracks = ["/audio/htr-loop-1.mp3", "/audio/htr-loop-2.mp3", "/audio/htr-loop-3.mp3"];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breakTimerRef = useRef<number | null>(null);
  const shouldAutoPlayOnTrackLoadRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const isFirstTrack = currentTrackIndex === 0;
  const isLastTrack = currentTrackIndex === tracks.length - 1;

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();

    if (shouldAutoPlayOnTrackLoadRef.current) {
      shouldAutoPlayOnTrackLoadRef.current = false;
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    playBreakAnimation();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 0.16;
    audio.muted = isMuted;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
    playBreakAnimation();
  };

  const changeTrack = (direction: "next" | "previous") => {
    const audio = audioRef.current;
    if (!audio) return;

    if (direction === "next" && isLastTrack) return;
    if (direction === "previous" && isFirstTrack) return;

    playBreakAnimation();

    const nextIndex = direction === "next" ? currentTrackIndex + 1 : currentTrackIndex - 1;
    const wasPlaying = isPlaying;

    shouldAutoPlayOnTrackLoadRef.current = wasPlaying;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTrackIndex(nextIndex);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2" aria-label="Site controls">
      <audio
        ref={audioRef}
        preload="metadata"
        src={tracks[currentTrackIndex]}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="pointer-events-none">
        <button
          type="button"
          className={`pointer-events-auto cassette-main-button ${isPlaying ? "cassette-main-button--playing" : ""} ${isBreaking ? "cassette-main-button--breaking" : ""}`}
          onClick={() => void togglePlayPause()}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause site audio" : "Play site audio"}
        >
          <span className="cassette-player relative z-10" aria-hidden="true">
            <span className="cassette-top-strip" />
            <span className="cassette-window">
              <span className="cassette-window-label">HTR</span>
              <span className="cassette-reel cassette-reel--left">
                <span />
              </span>
              <span className="cassette-reel cassette-reel--right">
                <span />
              </span>
              <span className="absolute bottom-1 left-1/2 ml-4 flex -translate-x-1/2 items-center gap-1.5">
                {tracks.map((_, index) => {
                  const isActiveTrack = index === currentTrackIndex;
                  const shouldSpin = isActiveTrack && isPlaying;

                  return (
                    <span
                      key={`track-indicator-${index}`}
                      className={`flex h-2.5 w-2.5 items-center justify-center rounded-full border ${isActiveTrack ? "border-[#D9BE6A]" : "border-white/45"} ${shouldSpin ? "animate-spin" : ""}`}
                    >
                      <span className={`h-1 w-1 rounded-full ${isActiveTrack ? "bg-[#D9BE6A]" : "bg-white/45"}`} />
                    </span>
                  );
                })}
              </span>
            </span>
            
          
          </span>        </button>
      </div>

      <div
        className="flex h-8 w-max items-center justify-center gap-6 rounded-full bg-htr-green opacity-70 px-6"
        aria-label="Audio controls"
      >
       
        <button
          type="button"
          className={`transition ${isFirstTrack ? "cursor-not-allowed text-gray-500" : "text-htr-blue hover:text-htr-blue/80"}`}
          onClick={() => void changeTrack("previous")}
          aria-label="Previous track"
          disabled={isFirstTrack}
        >
          <StepBack size={18} />
        </button>

        <button
          type="button"
          className="text-htr-blue transition hover:text-htr-blue/80"
          onClick={() => void togglePlayPause()}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause site audio" : "Play site audio"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          type="button"
          className={`transition ${isLastTrack ? "cursor-not-allowed text-gray-500" : "text-htr-blue hover:text-htr-blue/80"}`}
          onClick={() => void changeTrack("next")}
          aria-label="Next track"
          disabled={isLastTrack}
        >
          <StepForward size={18} />
        </button>
      </div>
    </aside>
  );
};

export default SoundDock;
