// SPDX-License-Identifier: GPL-2.0-or-later
// Browser adaptation of Asciiquarium. Original artwork and license: third-party/asciiquarium.
"use client";
import { useEffect, useRef, useState } from "react";
import art from "./asciiquarium-art.json";
export default function TerminalToys({ mode, onClose }: { mode: "train" | "aquarium"; onClose: () => void }) {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fed, setFed] = useState(-100);
  const [restart, setRestart] = useState(0);
  const [{width, height}, setGrid] = useState({width: 76, height: 28});
  const aquarium = useRef<HTMLPreElement>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPaused(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  useEffect(() => {
    const viewport = aquarium.current;
    if (!viewport) return;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    const fitGrid = () => {
      const style = getComputedStyle(viewport);
      context.font = `${style.fontSize} ${style.fontFamily}`;
      const cellWidth = context.measureText("M").width;
      const cellHeight = parseFloat(style.lineHeight);
      const next = {
        width: Math.max(1, Math.floor(viewport.clientWidth / cellWidth)),
        height: Math.max(1, Math.floor(viewport.clientHeight / cellHeight)),
      };
      setGrid(current => current.width === next.width && current.height === next.height ? current : next);
    };
    const observer = new ResizeObserver(fitGrid);
    observer.observe(viewport);
    fitGrid();
    document.fonts.ready.then(fitGrid);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const command = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (value === 'p' || value === 'pause') setPaused(p => !p);
      if (value === 'r' || value === 'restart') { setTick(0); setFed(-100); setRestart(n => n+1); }
      if (value === 'feed') { setFed(tick); setPaused(false); }
    };
    window.addEventListener('htr-toy-command', command);
    return () => window.removeEventListener('htr-toy-command', command);
  }, [tick]);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => { if (!document.hidden) setTick(t => t + 1); }, 140);
    return () => clearInterval(timer);
  }, [paused]);
  const cells = Array.from({length: height}, () => Array.from({length: width}, () => ({char: ' ', color: '#79c5d6'})));
  const put = (text: string, x: number, y: number, color: string) => text.split('\n').forEach((line, row) => [...line].forEach((char, col) => {
    if (char !== ' ' && char !== '?' && x+col >= 0 && x+col < width && y+row >= 0 && y+row < height) cells[y+row][x+col] = {char, color};
  }));
  art.add_environment.forEach((line, i) => put(line.repeat(Math.ceil(width / Math.max(1, line.length)) + 2).slice((tick+i)%20), 0, 4+i, '#579cae'));
  put(art.add_castle[0], width-32, height-13, '#abb7a5');
  for (let i=0; i<width; i+=12) {
    for(let j=0;j<5;j++) put((tick+j)%8<4?'(':' )',i,height-1-j,'#8ab987');
    put(tick%3 ? 'o' : '.', i+4, 8+((height-8-Math.floor(tick/2)+i) % Math.max(1, height-8) + Math.max(1, height-8)) % Math.max(1, height-8), '#9cdbef');
  }
  const fish = [...art.add_new_fish.filter((_, i) => i%2===0), ...art.add_old_fish.filter((_, i) => i%2===0)];
  for(let i=0;i<(width<50?3:5);i++) {
    const cycle = Math.floor((tick+i*23)/(width+25));
    const index = (i*4+cycle*2)%fish.length;
    const leftward = i%2===1;
    const sprite = fish[index+(leftward?1:0)];
    const travel = (Math.floor(tick/(1+i%2))+i*21)%(width+25);
    const x = tick-fed<40 ? Math.floor(width/2)-10+i*3 : leftward ? width-travel : travel-24;
    put(sprite,x,8+Math.floor(i*Math.max(1,height-16)/5),['#f4ce87','#b7d99c','#dfadd0','#8ecbd4','#e9ab8f'][i]);
  }
  const visitors = [art.add_ship[0], art.add_shark[0], art.add_whale[0], art.add_new_monster[0], art.add_old_monster[0], art.add_big_fish_1[0], art.add_big_fish_2[0]];
  const visitor = visitors[Math.floor(tick/200)%visitors.length];
  put(visitor, width-(tick%200), Math.floor(tick/200)%visitors.length===0?0:9, '#d4cdb3');
  if(tick-fed<40) put('.  .  .', Math.floor(width/2), 8+Math.floor((tick-fed)/5), '#edcd82');
  const smoke = tick % 3 === 0
    ? '      (  )      (@@@)        (  )'
    : tick % 3 === 1 ? '       (@@)       (  )      (@@@)' : '      ( @ )     (@@@@)       ( )';
  const wheels = tick % 2 ? '(@)====(@)====(@)' : '(O)----(O)----(O)';
  const train = `${smoke}\n` + String.raw`        \          |          /
         \       __|__       /
          \     /=====\     /
    _______    _|  _  |_                 _____________________
   / _____ \__|_|_| |_|_|_____          /_____________________\
  | |  _  |  _______________ \        |  ___   ___   ___   ___ |
  | | |_| | |  HTR EXPRESS  | |        | |___| |___| |___| |___||
  |_|_____|_|_______________|_|___    |                       |
  |  []   |   ===     ===    |  [] |===|   BUILD BREAK LAUNCH   |
 /|_______|_________________|_____|   |_______________________|
/___/====\_________________/====\___   \___/=============\___/
` + `     ${wheels}                 (O)               (O)\n` +
  '================================================================';
  return <div ref={box} className={`terminal-toy terminal-toy-${mode}`}>
    <p className="terminal-toy-hint">{mode==='train'?'HTR Express':'Asciiquarium'}{paused?' · paused':''} · p: pause · r: restart{mode==='aquarium'?' · feed: feed fish':''} · q: exit <span className="sr-only">Type a command below and press Enter.</span></p>
    {mode==='aquarium' ? <pre ref={aquarium} className="terminal-aquarium" role="img" aria-label="Asciiquarium: colorful fish swim past a castle, swaying seaweed and rising bubbles. Occasional sea creatures and ships pass by.">{cells.map((row,y)=><span key={y}>{row.map((cell,x)=><span key={x} style={{color:cell.color}}>{cell.char}</span>)}{y < height-1 ? '\n' : null}</span>)}</pre> : <div className="terminal-train-track"><pre key={restart} className="terminal-train" style={{animationPlayState:paused?'paused':'running'}} onAnimationEnd={onClose}>{train}</pre></div>}
  </div>;
}
