"use client";

import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import TerminalToys from "./TerminalToys";
import { motion } from "framer-motion";
import { Tree, Folder, File, type TreeViewElement } from "@/components/magicui/file-tree";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

type TerminalLine = {
  type: "input" | "output" | "error" | "train" | "boot" | "neofetch";
  text: string;
};

const faqData: FAQItem[] = [
  {
    id: "what-is-htr",
    question: "What is Hack the Ridge?",
    answer: `Hack The Ridge is a student led hackathon at Iroquois Ridge High School where students build projects, learn new skills, and turn ideas into working demos.

It is made for beginners, experienced builders, designers, problem solvers, and anyone who wants to make something with a team.`,
  },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer: `Students with an interest in technology, design, creativity, or problem solving can participate.

You do not need to be an expert. First time hackers are welcome, and the event includes support to help people get started.`,
  },
  {
    id: "registration-cost",
    question: "How much does it cost?",
    answer: `Hack The Ridge is free to attend.

Food, workspace, mentorship, workshops, and event activities are planned so students can focus on building without worrying about a registration fee.`,
  },
  {
    id: "what-to-bring",
    question: "What should I bring?",
    answer: `Bring a laptop, charger, water bottle, and any hardware or materials you want to use for your project.

Bring an idea if you have one, but it is also fine to show up and find one with a team.`,
  },
  {
    id: "team-formation",
    question: "Do I need a team?",
    answer: `No. You can come with a team, join a team at the event, or work solo.

Teams are usually strongest with a mix of coding, design, presentation, and idea building skills.`,
  },
  {
    id: "prizes-judging",
    question: "What are the prizes?",
    answer: `Prize details will be shared closer to the event.

The main goal is still to build something real, learn fast, and have a demo you are proud to show.`,
  },
  {
    id: "schedule-timeline",
    question: "What's the schedule?",
    answer: `Do not ask me. The schedule is still loading somewhere between planning mode and organized chaos.

A proper schedule will be posted when the event timeline is ready.`,
  },
  {
    id: "found-a-bug",
    question: "Found a bug?",
    answer: `Do not tell me. The website is perfect and definitely has no bugs.

Jokes aside, if something is actually broken or serious, email us at hi@hacktheridge.ca.`,
  },
];

const treeData: TreeViewElement[] = [
  {
    id: "faq-root",
    name: "FAQ",
    children: faqData.map((faq) => ({
      id: faq.id,
      name: faq.question,
      isSelectable: true,
    })),
  },
];

const aliases: Record<string, string> = {
  htr: "what-is-htr",
  about: "what-is-htr",
  participate: "who-can-participate",
  cost: "registration-cost",
  price: "registration-cost",
  bring: "what-to-bring",
  team: "team-formation",
  prizes: "prizes-judging",
  prize: "prizes-judging",
  schedule: "schedule-timeline",
  timeline: "schedule-timeline",
  bug: "found-a-bug",
  bugs: "found-a-bug",
  report: "found-a-bug",
  "report-a-bug": "found-a-bug",
};

const htrArt = String.raw`+--------------------------------+
|  _   _   _____   ____          |
| | | | | |_   _| |  _ \         |
| | |_| |   | |   | |_) |        |
| |  _  |   | |   |  _ <         |
| | | | |   | |   | | \ \        |
| |_| |_|   |_|   |_|  \_\       |
|                                |
|      B U I L D .  L A U N C H . |
+--------------------------------+`;

const tuxArt = String.raw`      .--.
     |o_o |
     |:_/ |
    //   \\
   (|     | )
   /\_   _/\
   \___)=(___/`;

const fortunes = [
  "Tux believes in you. Commit your work.",
  "A small working demo beats a big unfinished idea.",
  "Take a water break. Your code will still be there.",
  "There is no place like 127.0.0.1.",
  "Your next great idea might start with a very bad sketch.",
  "Sleep is a dependency. Remember to install it.",
  "The best debugging tool is a friend who asks why.",
  "A rubber duck has never judged your code.",
  "If it works, save it. If it breaks, learn from it.",
  "Future you would appreciate a useful commit message.",
  "Behind every great demo is one cable someone remembered to bring.",
  "Ship a tiny thing. Then make it a better tiny thing.",
  "Your team has more ideas than your deadline has hours.",
  "The first prototype is allowed to look like a potato.",
  "Ask for help before the coffee goes cold.",
  "A bug is a plot twist with a stack trace.",
  "Great projects start with: what if we tried this?",
  "Tabs or spaces? Snacks.",
  "Celebrate the first working button.",
  "You cannot git push a project that exists only in your head.",
  "One clear explanation is worth ten mysterious comments.",
  "Make it work. Make it clear. Make it yours.",
  "The compiler is strict because it cares.",
  "Even the best developers search for that syntax again.",
  "Your demo does not need to change the world to make someone's day.",
  "The best feature might be the one your teammate suggested.",
  "Remember: a charger is a hardware dependency.",
  "Save early, test often, stretch occasionally.",
  "A good question can save an hour of guessing.",
  "You have permission to try something weird.",
  "A working prototype is an idea with evidence.",
  "Today's confusing error is tomorrow's useful story.",
];

const bootLines: TerminalLine[] = [{ type: "boot", text: "FAQ GNU Linux Node" }];

const terminalUsers = [
  "sudo_sandwich", "404_brain_not_found", "ctrl_alt_delulu", "captain_semicolon",
  "pixel_pirate", "rubber_duck_dev", "cache_me_outside", "byte_bandit",
  "merge_confetti", "tux_in_a_tie", "snack_overflow", "git_goblin",
  "kernel_panic", "cosmic_coder", "debug_dinosaur", "spacebar_cadet",
  "wifi_wizard", "null_ninja", "coffee_compiler", "syntax_sorcerer",
  "sleepy_scripter", "localhost_legend", "binary_burrito", "terminal_turtle",
];

const formatFAQ = (faq: FAQItem) => [`${faq.question}`, faq.answer];

const InteractiveFAQ: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [toy, setToy] = useState<{mode:"train"|"aquarium";id:number}|null>(null);
  const started=useRef(Date.now());
  const [command, setCommand] = useState("");
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const commandDraft = useRef("");
  const [lines, setLines] = useState<TerminalLine[]>(bootLines);
  const [terminalUser, setTerminalUser] = useState(terminalUsers[0]);
  useEffect(() => { setTerminalUser(terminalUsers[Math.floor(Math.random() * terminalUsers.length)]); }, []);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const questionMap = useMemo(() => {
    return faqData.reduce<Record<string, FAQItem>>((acc, faq) => {
      acc[faq.id] = faq;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    const terminal = terminalScrollRef.current;
    if (terminal) terminal.scrollTop = toy ? 0 : terminal.scrollHeight;
  }, [lines, toy]);

  const runCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const inputLine: TerminalLine = { type: "input", text: `${terminalUser}> ${trimmed}` };
    if (!["p", "pause", "r", "restart", "feed"].includes(lower)) setToy(null);

    if (lower === "clear" || lower === "cls") {
      setToy(null);
      setLines(bootLines);
      return;
    }

    if (lower === "help") {
      setLines((current) => [
        ...current,
        inputLine,
        { type: "output", text: `Commands:\n${["help · list · open <question>", "bug · sl · aquarium", "neofetch · distro · fortune", "whoami · uptime · date · echo <text>", "p: pause · r: restart · feed · q: exit", "clear · cls"].join("\n")}` },
      ]);
      return;
    }

    if (lower === "list" || lower === "questions" || lower === "list questions") {
      setLines((current) => [
        ...current,
        inputLine,
        { type: "output", text: faqData.map((faq) => `${faq.id.replaceAll("-", " ")}`).join("\n") },
      ]);
      return;
    }

    if (["q","quit","stop"].includes(lower)) { setToy(null); return; }
    if (["sl","aquarium","asciiquarium"].includes(lower)) {
      setLines(current=>[...current,inputLine]);setToy({mode:lower==="sl"?"train":"aquarium",id:Date.now()});return;
    }
    if (toy && ["p", "pause", "r", "restart", "feed"].includes(lower)) {
      window.dispatchEvent(new CustomEvent("htr-toy-command", {detail: lower})); return;
    }
    let extra: string | null = null;
    if (["neofetch", "fastfetch"].includes(lower)) extra = `${terminalUser}@hacktheridge\n------------------------\nOS: HTR OS\nHost: Iroquois Ridge HS\nShell: ridge-shell\nTheme: Forest / Terminal\nUptime: ${Math.floor((Date.now()-started.current)/1000)} seconds\nMission: Build. Break. Launch.`;
    if (lower === "distro") {
      const systems = ["Windows", "Linux", "macOS"];
      extra = systems[Math.floor(Math.random() * systems.length)];
    }
    if (lower==="whoami") extra=terminalUser;
    if (lower==="uptime") extra=`${Math.floor((Date.now()-started.current)/1000)} seconds`;
    if (lower==="date") extra=new Date().toLocaleString();
    if (lower.startsWith("echo ")) extra=trimmed.slice(5);
    if (lower === "fortune") extra = fortunes[Math.floor(Math.random() * fortunes.length)];
    if(extra!==null){setLines(current=>[...current.slice(-120),inputLine,{type:["neofetch","fastfetch"].includes(lower)?"neofetch":"output",text:extra!}]);return;}

    const requestedId = lower.startsWith("open ") ? lower.replace(/^open\s+/, "").trim() : lower;
    const resolvedId = aliases[requestedId] ?? requestedId.replaceAll(" ", "-");
    const faq = questionMap[resolvedId];

    if (faq) {
      setSelectedFAQ(faq);
      setLines((current) => [
        ...current,
        inputLine,
        ...formatFAQ(faq).map<TerminalLine>((text) => ({ type: "output", text })),
      ]);
      return;
    }

    setLines((current) => [
      ...current,
      inputLine,
      { type: "error", text: "Command not found. Type help for the command list." },
    ]);
  };

  const submitCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitted = command.trim();
    if (submitted && commandHistory.current.at(-1) !== submitted) {
      commandHistory.current = [...commandHistory.current, submitted].slice(-100);
    }
    historyIndex.current = null;
    commandDraft.current = "";
    runCommand(command);
    setCommand("");
  };

  const openFAQ = (id: string) => {
    const faq = questionMap[id];
    if (!faq) return;
    setToy(null);
    setSelectedFAQ(faq);
    setLines((current) => [
      ...current,
      { type: "input", text: `${terminalUser}> open ${faq.id.replaceAll("-", " ")}` },
      ...formatFAQ(faq).map<TerminalLine>((text) => ({ type: "output", text })),
    ]);
  };

  const renderLine = (line: TerminalLine, index: number) => {
    if (line.type === "neofetch") {
      return <span key={`neofetch-${index}`} className="terminal-neofetch">
        <span className="terminal-htr-brand">
          <span className="terminal-htr-art" role="img" aria-label="HTR ASCII logo">{htrArt}</span>
          <span className="terminal-htr-caption">HACK THE RIDGE</span>
        </span>
        <span className="terminal-neofetch-info">{line.text}</span>
      </span>;
    }
    if (line.type === "boot") {
      return (
        <span key={`${line.type}-${index}`} className="terminal-boot" aria-label="FAQ GNU Linux Node and Tux">
          <span className="terminal-boot-faq">
            <span className="terminal-faq-word">FAQ</span>
            <span className="terminal-faq-node">GNU Linux Node</span>
          </span>
          <span className="terminal-boot-tux">
            <span className="terminal-tux-art">{tuxArt}</span>
            <span className="terminal-tux-caption">Tux is always watching</span>
          </span>
        </span>
      );
    }

    return (
      <span
        key={`${line.type}-${index}`}
        className={`terminal-line ${
          line.type === "input"
            ? "text-[#AFD5BC]"
            : line.type === "error"
              ? "text-[#dfd7d7]"
              : line.type === "train"
                ? "sl-train text-[#AFD5BC]"
                : "text-[#dfd7d7]"
        }`}
      >
        {line.text}
      </span>
    );
  };

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto py-8">
      <motion.div
        className="text-left mb-12"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#dfd7d7] mb-4 tracking-wider"
          style={{ fontFamily: "Sacco, Arial, sans-serif" }}
        >
          FAQ Terminal
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[minmax(200px,0.65fr)_minmax(0,2.35fr)] gap-4 items-start"
      >
        <div className="faq-questions min-w-0 lg:col-span-1 border-t border-[#AFD5BC]/25 bg-transparent py-4 lg:pr-5">
          <div className="hidden h-[390px] w-full lg:block">
            <Tree className="h-full w-full text-[#dfd7d7]" elements={treeData} initialExpandedItems={["faq-root"]} indicator={true}>
              <Folder element="FAQ" value="faq-root" className="text-[#dfd7d7] text-lg font-semibold p-2">
                {faqData.map((faq) => (
                  <File
                    key={faq.id}
                    value={faq.id}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      selectedFAQ?.id === faq.id ? "bg-[#AFD5BC]/20 text-[#dfd7d7]" : "text-[#dfd7d7] hover:bg-[#AFD5BC]/10"
                    }`}
                    onClick={() => openFAQ(faq.id)}
                  >
                    <span className="text-sm">{faq.question}</span>
                  </File>
                ))}
              </Folder>
            </Tree>
          </div>

          <div className="grid gap-2 lg:hidden">
            {faqData.map((faq) => (
              <button
                key={faq.id}
                onClick={() => openFAQ(faq.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  selectedFAQ?.id === faq.id
                    ? "border-[#AFD5BC]/60 bg-[#AFD5BC]/15 text-[#dfd7d7]"
                    : "border-[#AFD5BC]/28 bg-[#091426]/72 text-[#dfd7d7] hover:border-[#AFD5BC]/60"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 htr-terminal-container w-full">
          <div className="faq-terminal-window h-full w-full" onClick={() => inputRef.current?.focus()}>
            <div className="faq-terminal-header">
              <div className="flex flex-row gap-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>

            <div ref={terminalScrollRef} role="log" aria-label="FAQ terminal output" aria-live="polite" className={`terminal-scrollbar terminal-output ${toy ? "terminal-output-toy" : ""} min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 font-mono text-sm leading-relaxed text-[#dfd7d7]`}>
              <code className="terminal-lines" hidden={!!toy}>
                {lines.map((line, index) => <span key={index} data-terminal-entry>{renderLine(line, index)}</span>)}
              </code>
              {toy && <div className="terminal-toy-stage" aria-live="off"><TerminalToys key={toy.id} mode={toy.mode} onClose={()=>setToy(null)} /></div>}
            </div>

            <form onSubmit={submitCommand} className="faq-terminal-input-row">
              <label htmlFor="faq-terminal-input" className="shrink-0 text-[#AFD5BC] font-mono text-sm">
                {terminalUser}&gt;
              </label>
              <input
                id="faq-terminal-input"
                ref={inputRef}
                value={command}
                onChange={(event) => {
                  setCommand(event.target.value);
                  historyIndex.current = null;
                  commandDraft.current = event.target.value;
                }}
                onKeyDown={event => {
                  if (event.nativeEvent.isComposing) return;
                  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                    event.preventDefault();
                    const history = commandHistory.current;
                    if (!history.length) return;
                    if (event.key === "ArrowUp") {
                      if (historyIndex.current === null) commandDraft.current = command;
                      historyIndex.current = Math.max(0, (historyIndex.current ?? history.length) - 1);
                      setCommand(history[historyIndex.current]);
                    } else if (historyIndex.current !== null) {
                      const next = historyIndex.current + 1;
                      historyIndex.current = next < history.length ? next : null;
                      setCommand(next < history.length ? history[next] : commandDraft.current);
                    }
                    const input = event.currentTarget;
                    requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
                  } else if (event.key === "Escape" || (event.ctrlKey && event.key.toLowerCase() === "c")) {
                    event.preventDefault();
                    setToy(null);
                  }
                }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command"
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#dfd7d7] outline-none placeholder:text-[#dfd7d7]/60"
                placeholder=""
                enterKeyHint="send"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveFAQ;
