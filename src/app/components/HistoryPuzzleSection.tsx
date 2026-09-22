"use client";

import { createPortal } from "react-dom";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { X } from "lucide-react";

const historyImages = [
  "/last_year/history1.jpg",
  "/last_year/history2.jpeg",
  "/last_year/history3.jpg",
  "/last_year/history4.jpg",
  "/last_year/history5.jpg",
  "/history%20photos/photo1.jpg",
  "/history%20photos/photo2.jpeg",
  "/history%20photos/photo3.jpg",
];

const communityLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/hacktheridge/",
    qr: "/instagram-qr.png",
  },
  {
    name: "Devpost",
    href: "https://hack-the-ridge.devpost.com/",
    qr: "/devpost-qr.png",
  },
  {
    name: "Discord",
    href: "https://discord.gg/RdEwzSeN",
    qr: "/discord-qr.png",
  },
];

const historyStats = [
  { value: 150, prefix: "", suffix: "+", label: "students participated last year" },
  { value: 6, prefix: "$", suffix: "K+", label: "raised for prizes" },
  { value: 12, prefix: "", suffix: "+", label: "hours of building" },
];

type Point = { x: number; y: number };
type Piece = Point & { snapped: boolean; rotation: number };
type Edge = -1 | 0 | 1;

type PieceEdges = {
  top: Edge;
  right: Edge;
  bottom: Edge;
  left: Edge;
};

function CountUp({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        const started = performance.now();
        const duration = 1100;

        const tick = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-sacco text-4xl font-black leading-none text-htr-green sm:text-5xl lg:text-6xl">
      {prefix}{display}{suffix}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTargets(width: number, height: number, isMobile: boolean): Point[] {
  const pieceWidth = isMobile
    ? clamp(width * 0.36, 108, 160)
    : clamp(width * 0.15, 112, 220);
  const pieceHeight = pieceWidth * 0.75;

  const stepX = pieceWidth * 0.84;
  const stepY = pieceHeight * (59 / 75);
  const cols = isMobile ? 2 : 4;
  const rows = isMobile ? 4 : 2;
  const centerY = isMobile ? height * 0.53 : height * 0.54;

  return Array.from({ length: 8 }, (_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const px = width / 2 + (col - (cols - 1) / 2) * stepX;
    const py = centerY + (row - (rows - 1) / 2) * stepY;
    return { x: (px / width) * 100, y: (py / height) * 100 };
  });
}

function randomPieces(count: number): Piece[] {
  return Array.from({ length: count }, () => ({
    x: 8 + Math.random() * 84,
    y: 17 + Math.random() * 70,
    rotation: -22 + Math.random() * 44,
    snapped: false,
  }));
}

function getEdges(index: number, isMobile: boolean): PieceEdges {
  const cols = isMobile ? 2 : 4;
  const rows = isMobile ? 4 : 2;
  const col = index % cols;
  const row = Math.floor(index / cols);

  const horizontalType = (r: number, seam: number): Edge => ((r + seam) % 2 === 0 ? 1 : -1);
  const verticalType = (c: number, seam: number): Edge => ((c + seam) % 2 === 0 ? 1 : -1);

  const left: Edge = col === 0 ? 0 : (horizontalType(row, col - 1) * -1) as Edge;
  const right: Edge = col === cols - 1 ? 0 : horizontalType(row, col);
  const top: Edge = row === 0 ? 0 : (verticalType(col, row - 1) * -1) as Edge;
  const bottom: Edge = row === rows - 1 ? 0 : verticalType(col, row);

  return { top, right, bottom, left };
}

function piecePath(edges: PieceEdges) {
  const { top, right, bottom, left } = edges;
  const topY = top === 1 ? 0 : top === -1 ? 16 : 8;
  const rightX = right === 1 ? 100 : right === -1 ? 84 : 92;
  const bottomY = bottom === 1 ? 75 : bottom === -1 ? 59 : 67;
  const leftX = left === 1 ? 0 : left === -1 ? 16 : 8;

  return [
    "M 8 8",
    top === 0
      ? "L 92 8"
      : `L 39 8 C 44 8 44 ${topY} 50 ${topY} C 56 ${topY} 56 8 61 8 L 92 8`,
    right === 0
      ? "L 92 67"
      : `L 92 28 C 92 32 ${rightX} 32 ${rightX} 37.5 C ${rightX} 43 92 43 92 47 L 92 67`,
    bottom === 0
      ? "L 8 67"
      : `L 61 67 C 56 67 56 ${bottomY} 50 ${bottomY} C 44 ${bottomY} 44 67 39 67 L 8 67`,
    left === 0
      ? "L 8 8"
      : `L 8 47 C 8 43 ${leftX} 43 ${leftX} 37.5 C ${leftX} 32 8 32 8 28 L 8 8`,
    "Z",
  ].join(" ");
}

export default function HistoryPuzzleSection() {
  const puzzleImages = useMemo(() => historyImages, []);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [hasCompletedPuzzle, setHasCompletedPuzzle] = useState(false);
  const dragRef = useRef<{
    index: number;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  const targets = useMemo(
    () => getTargets(viewport.width, viewport.height, isMobile),
    [viewport, isMobile],
  );
  const solved = hasCompletedPuzzle || (pieces.length > 0 && pieces.every((piece) => piece.snapped));

  useEffect(() => {
    const syncViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    syncViewport();
    setPieces(randomPieces(puzzleImages.length));
    setMounted(true);
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, [puzzleImages.length]);

  useEffect(() => {
    if (!solved || hasCompletedPuzzle) return;
    setHasCompletedPuzzle(true);
  }, [hasCompletedPuzzle, solved]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("htr-puzzle-active", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.classList.remove("htr-puzzle-active");
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  const openPuzzle = () => {
    if (!hasCompletedPuzzle) setPieces(randomPieces(puzzleImages.length));
    setOpen(true);
  };

  const updatePiece = (index: number, next: Partial<Piece>) => {
    setPieces((current) => current.map((piece, i) => (i === index ? { ...piece, ...next } : piece)));
  };

  const pointerDown = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    if (pieces[index]?.snapped) return;
    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      index,
      pointerId: event.pointerId,
      offsetX: event.clientX - (rect.left + rect.width / 2),
      offsetY: event.clientY - (rect.top + rect.height / 2),
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    const drag = dragRef.current;
    if (!drag || drag.index !== index || drag.pointerId !== event.pointerId || pieces[index]?.snapped) return;
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) drag.moved = true;

    const x = ((event.clientX - drag.offsetX) / window.innerWidth) * 100;
    const y = ((event.clientY - drag.offsetY) / window.innerHeight) * 100;
    updatePiece(index, { x: Math.max(5, Math.min(95, x)), y: Math.max(10, Math.min(92, y)) });
  };

  const pointerUp = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    const drag = dragRef.current;
    if (!drag || drag.index !== index) return;

    const target = targets[index];
    const rect = event.currentTarget.getBoundingClientRect();
    const currentX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const currentY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    const distance = Math.hypot(currentX - target.x, currentY - target.y);

    if (!drag.moved || distance < (isMobile ? 11 : 7.5)) {
      updatePiece(index, { ...target, rotation: 0, snapped: true });
    } else {
      updatePiece(index, { x: currentX, y: currentY });
    }

    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const overlay = open && mounted ? createPortal(
    <div className="htr-puzzle-overlay" role="dialog" aria-modal="true" aria-label="Hack The Ridge history puzzle">
      <div className="htr-puzzle-noise" aria-hidden="true" />
      <div className="htr-puzzle-topbar">
        <div>
          <h2>Build the community.</h2>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="htr-puzzle-close" aria-label="Exit history puzzle">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="htr-puzzle-stage">
        {!solved && targets.map((target, index) => {
          const path = piecePath(getEdges(index, isMobile));
          return (
            <div
              key={`target-${index}`}
              className={`htr-puzzle-target ${pieces[index]?.snapped ? "is-filled" : ""}`}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 75" aria-hidden="true">
                <path d={path} />
              </svg>
            </div>
          );
        })}

        {!solved && puzzleImages.map((src, index) => {
          const piece = pieces[index];
          if (!piece) return null;
          const path = piecePath(getEdges(index, isMobile));
          const clipId = `htr-piece-clip-${index}`;
          const style = {
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            zIndex: piece.snapped ? 20 : 40 + index,
            "--piece-rotation": `${piece.rotation}deg`,
          } as CSSProperties;

          return (
            <button
              key={src}
              type="button"
              className={`htr-puzzle-piece ${piece.snapped ? "is-snapped" : ""}`}
              style={style}
              onPointerDown={(event) => pointerDown(event, index)}
              onPointerMove={(event) => pointerMove(event, index)}
              onPointerUp={(event) => pointerUp(event, index)}
              onPointerCancel={() => { dragRef.current = null; }}
              aria-label={`History puzzle photo ${index + 1}${piece.snapped ? ", connected" : ""}`}
            >
              <svg viewBox="0 0 100 75" role="img" aria-label="Hack The Ridge community moment">
                <defs>
                  <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                    <path d={path} />
                  </clipPath>
                </defs>
                <image
                  href={src}
                  x="0"
                  y="0"
                  width="100"
                  height="75"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clipId})`}
                />
                <path d={path} className="htr-puzzle-piece-outline" />
                <path d={path} className="htr-puzzle-piece-shine" />
              </svg>
            </button>
          );
        })}

        <div className={`htr-puzzle-complete ${solved ? "is-visible" : ""}`} aria-live="polite">
          <p>HTR COMMUNITY</p>
          <strong>Built piece by piece.</strong>
          <div className="htr-puzzle-community-links">
            {communityLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="htr-puzzle-reveal-card"
                aria-label={`Open Hack The Ridge ${link.name}`}
              >
                <span className="htr-puzzle-qr-wrap">
                  <img src={link.qr} alt={`${link.name} QR code`} />
                </span>
                <b>{link.name}</b>
                <span className="htr-puzzle-link-hint">Open {link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`htr-puzzle-progress ${solved ? "is-solved" : ""}`}>
        <span>{pieces.filter((piece) => piece.snapped).length} / {puzzleImages.length} connected</span>
        <div><i style={{ width: `${(pieces.filter((piece) => piece.snapped).length / puzzleImages.length) * 100}%` }} /></div>
      </div>
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <section id="history" className="relative scroll-mt-28 overflow-hidden px-5 py-24 text-htr-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="htr-open-content relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
            <div>
              <h2 className="font-sacco mt-4 max-w-4xl text-6xl font-black uppercase leading-[0.88] tracking-[0.035em] text-htr-white sm:text-7xl lg:text-8xl">
                10+ years of Hack The Ridge.
              </h2>
            </div>
            <div className="lg:pb-2">
              <div className="htr-history-actions">
                <a
                  href="#history-puzzle"
                  onClick={(event) => {
                    event.preventDefault();
                    openPuzzle();
                  }}
                  className="htr-history-puzzle-link"
                >
                  Piece together the HTR story
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:gap-5">
            {historyStats.map((stat) => (
              <div key={stat.label} className="border-t border-htr-green/30 py-6 sm:py-8">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="mt-3 text-[0.68rem] font-black uppercase leading-5 tracking-[0.15em] text-htr-white/72 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {overlay}
    </>
  );
}
