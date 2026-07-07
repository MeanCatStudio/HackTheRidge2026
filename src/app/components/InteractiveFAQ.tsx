"use client";

import React, { FormEvent, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tree, Folder, File, type TreeViewElement } from "@/components/magicui/file-tree";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

type TerminalLine = {
  type: "input" | "output" | "error";
  text: string;
};

const faqData: FAQItem[] = [
  {
    id: "what-is-htr",
    question: "What is Hack the Ridge?",
    answer: `Hack The Ridge is a student-led hackathon at Iroquois Ridge High School where students build projects, learn new skills, and turn ideas into working demos.

It is made for beginners, experienced builders, designers, problem-solvers, and anyone who wants to make something with a team.`,
  },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer: `Students with an interest in technology, design, creativity, or problem-solving can participate.

You do not need to be an expert. First-time hackers are welcome, and the event includes support to help people get started.`,
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

Teams are usually strongest with a mix of coding, design, presentation, and idea-building skills.`,
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

Jokes aside, if something is actually broken or serious, email Atharv at mahajanatharv2009@gmail.com.`,
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

const commandList = [
  "help",
  "list",
  "open what-is-htr",
  "open who-can-participate",
  "open registration-cost",
  "open what-to-bring",
  "open team-formation",
  "open prizes-judging",
  "open schedule-timeline",
  "open found-a-bug",
  "bug",
  "clear",
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
};

const formatFAQ = (faq: FAQItem) => [`${faq.question}`, faq.answer];

const InteractiveFAQ: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(faqData[0]);
  const [expandedId, setExpandedId] = useState<string | null>(faqData[0].id);
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "HTR FAQ shell ready." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const questionMap = useMemo(() => {
    return faqData.reduce<Record<string, FAQItem>>((acc, faq) => {
      acc[faq.id] = faq;
      return acc;
    }, {});
  }, []);

  const pushLines = (nextLines: TerminalLine[]) => {
    setLines((current) => [...current, ...nextLines]);
  };

  const runCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const inputLine: TerminalLine = { type: "input", text: `htr-terminal> ${trimmed}` };

    if (lower === "clear" || lower === "cls") {
      setLines([{ type: "output", text: "Cleared." }]);
      return;
    }

    if (lower === "help") {
      setLines((current) => [
        ...current,
        inputLine,
        { type: "output", text: `Commands:\n${commandList.join("\n")}` },
      ]);
      return;
    }

    if (lower === "list" || lower === "questions" || lower === "list questions") {
      setLines((current) => [
        ...current,
        inputLine,
        { type: "output", text: faqData.map((faq) => `${faq.id}  -  ${faq.question}`).join("\n") },
      ]);
      return;
    }

    const requestedId = lower.startsWith("open ") ? lower.replace(/^open\s+/, "").trim() : lower;
    const resolvedId = aliases[requestedId] ?? requestedId;
    const faq = questionMap[resolvedId];

    if (faq) {
      setSelectedFAQ(faq);
      setExpandedId(faq.id);
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
    runCommand(command);
    setCommand("");
  };

  const openFAQ = (id: string) => {
    const faq = questionMap[id];
    if (!faq) return;
    setSelectedFAQ(faq);
    setExpandedId(faq.id);
    pushLines([
      { type: "input", text: `htr-terminal> open ${faq.id}` },
      ...formatFAQ(faq).map<TerminalLine>((text) => ({ type: "output", text })),
    ]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      <motion.div
        className="text-left mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#dfd7d7] mb-4 tracking-wider"
          style={{ fontFamily: "Sacco, Arial, sans-serif" }}
        >
          FAQ Terminal
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="lg:col-span-1 rounded-3xl border border-[#AFD5BC]/20 bg-[#081326]/50 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
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
                    : "border-[#AFD5BC]/20 bg-[#1E3159]/30 text-[#dfd7d7]/80 hover:border-[#AFD5BC]/50"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-[#AFD5BC]/25 bg-[#081326]/88 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#AFD5BC]/15 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#AFD5BC]" />
              <span className="h-3 w-3 rounded-full bg-[#7DB6AD]" />
              <span className="h-3 w-3 rounded-full bg-[#dfd7d7]" />
            </div>
          </div>

          <div
            className="h-[390px] overflow-y-auto px-5 py-5 font-mono text-sm leading-relaxed text-[#dfd7d7]"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, index) => (
              <div
                key={`${line.type}-${index}`}
                className={`mb-3 whitespace-pre-wrap break-words ${
                  line.type === "input" ? "text-[#AFD5BC]" : line.type === "error" ? "text-[#dfd7d7]" : "text-[#dfd7d7]/90"
                }`}
              >
                {line.text}
              </div>
            ))}

            <form onSubmit={submitCommand} className="mt-4 flex items-center gap-2 border-t border-[#AFD5BC]/12 pt-4">
              <label htmlFor="faq-terminal-input" className="shrink-0 text-[#AFD5BC]">
                htr-terminal&gt;
              </label>
              <input
                id="faq-terminal-input"
                ref={inputRef}
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-[#dfd7d7] outline-none placeholder:text-[#dfd7d7]/35"
                placeholder=""
              />
              <button
                type="submit"
                className="rounded-full border border-[#AFD5BC]/35 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#AFD5BC] transition hover:bg-[#AFD5BC] hover:text-[#1E3159]"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      {selectedFAQ && (
        <motion.div
          className="mt-6 rounded-3xl border border-[#AFD5BC]/16 bg-[#1E3159]/25 p-6 text-[#dfd7d7]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setExpandedId(expandedId === selectedFAQ.id ? null : selectedFAQ.id)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <span className="text-xl font-black">{selectedFAQ.question}</span>
            <span className="text-[#AFD5BC]">{expandedId === selectedFAQ.id ? "close" : "open"}</span>
          </button>
          {expandedId === selectedFAQ.id && (
            <p className="mt-4 whitespace-pre-wrap text-[#dfd7d7]/82 leading-relaxed">{selectedFAQ.answer}</p>
          )}
        </motion.div>
      )}

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-[#dfd7d7]/80 text-sm mx-auto max-w-xl">
          Serious questions? Email{" "}
          <a
            href="mailto:mahajanatharv2009@gmail.com"
            className="text-[#AFD5BC] hover:text-[#dfd7d7] transition-colors underline"
          >
            mahajanatharv2009@gmail.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default InteractiveFAQ;
