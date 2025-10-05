"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal';
import { Tree, Folder, File, type TreeViewElement } from '@/components/magicui/file-tree';


// FAQ Data Structure
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "what-is-htr",
    question: "What is Hack the Ridge?",
    answer: `Hack the Ridge is a 24-hour hackathon bringing together 200+ students, developers, and creators in Maple Ridge, BC. It's an epic journey of building, learning, and connecting where participants transform their innovative ideas into reality.

Since 2019, we've grown from 50 to 200+ hackers annually, creating lasting impact in our community. Join us for workshops, mentorship, prizes, and the chance to build something amazing!`
  },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer: `Anyone with a passion for technology and innovation! We welcome:

• Students (high school, college, university)
• Professional developers
• Designers and creators
• First-time hackers
• Experienced builders

No prior hackathon experience required. We provide mentorship and workshops to help everyone succeed, regardless of skill level.`
  },
  {
    id: "registration-cost",
    question: "How much does it cost?",
    answer: `Hack the Ridge is completely FREE to participate!

We provide:
• Free meals throughout the event
• Swag and merchandise
• Workspace and WiFi
• Mentorship and workshops
• Prizes for winners
• Networking opportunities

Our amazing sponsors make this possible, ensuring cost is never a barrier to innovation.`
  },
  {
    id: "what-to-bring",
    question: "What should I bring?",
    answer: `Essential items for the hackathon:

• Laptop and chargers
• Any hardware you want to use
• Comfortable clothes for 24 hours
• Sleeping bag/pillow (if you plan to rest)
• Personal hygiene items
• Government-issued ID
• Positive attitude and creativity!

We'll provide food, drinks, workspace, and WiFi. Just bring yourself and your ideas!`
  },
  {
    id: "team-formation",
    question: "Do I need a team?",
    answer: `Teams are optional but recommended! You can:

• Come with a pre-formed team (max 4 people)
• Join our team formation session at the start
• Work solo if you prefer

Teams of 2-4 people tend to be most successful, allowing for diverse skills and shared workload. Don't worry if you don't have a team - we'll help you find amazing teammates!`
  },
  {
    id: "prizes-judging",
    question: "What are the prizes?",
    answer: `We have amazing prizes across multiple categories:

• Overall Winner: $2000 + trophies
• Best Healthcare Innovation: $1500
• Best Use of AI/ML: $1000
• People's Choice Award: $750
• Best First-Time Hack: $500
• Best Design: $500

Plus sponsor prizes, swag, and recognition! All participants receive certificates and memorable experiences.`
  },
  {
    id: "schedule-timeline",
    question: "What's the schedule?",
    answer: `24-hour hackathon timeline:

Day 1:
• 6:00 PM - Registration & Check-in
• 7:00 PM - Opening Ceremony
• 8:00 PM - Team Formation
• 9:00 PM - Hacking Begins!
• 10:00 PM - Dinner

Day 2:
• 12:00 AM - Midnight Snacks
• 8:00 AM - Breakfast
• 12:00 PM - Lunch
• 6:00 PM - Submissions Due
• 7:00 PM - Presentations
• 9:00 PM - Awards & Closing

Workshops and mentorship available throughout!`
  }
];

// Convert FAQ data to Tree structure
const treeData: TreeViewElement[] = [
  {
    id: "faq-root",
    name: "FAQ",
    children: faqData.map(faq => ({
      id: faq.id,
      name: faq.question,
      isSelectable: true
    }))
  }
];

const InteractiveFAQ: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [terminalKey, setTerminalKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Detect mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get current timestamp for realistic terminal output
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Generate realistic file size
  const getFileSize = (content: string) => {
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}K`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
  };

  const handleTreeSelect = (selectedId: string) => {
    // Find the FAQ item by ID
    const faq = faqData.find(item => item.id === selectedId);
    if (faq) {
      setSelectedFAQ(faq);
      // Force terminal to re-render with new content
      setTerminalKey(prev => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      {/* Section Title */}
      <motion.div
        className="text-left mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wider"
          style={{ fontFamily: 'Sacco, Arial, sans-serif' }}
        >
          FAQ
        </h2>
        <p className="text-teal-100 text-lg">
          {isMobile 
            ? "Tap any question to see the answer" 
            : "Click on any question in the file tree to see the answer appear in the terminal"}
        </p>
      </motion.div>

      {/* Mobile: Simple Accordion, Desktop: Terminal Interface */}
      {isMobile ? (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-teal-900/20 backdrop-blur-sm border border-teal-500/30 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-teal-800/20 transition-colors"
              >
                <span className="text-white font-semibold text-base sm:text-lg">{faq.question}</span>
                <motion.svg
                  className="w-5 h-5 text-teal-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedId === faq.id ? 'auto' : 0,
                  opacity: expandedId === faq.id ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-0 text-teal-100/90 whitespace-pre-wrap leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        {/* File Tree - Questions */}
        <div className="lg:col-span-1 p-6">
          <div className="h-[350px] w-full">
            <Tree
              className="h-full w-full text-white"
              elements={treeData}
              initialExpandedItems={["faq-root"]}
              indicator={true}
            >
              <Folder element="FAQ" value="faq-root" className="text-white text-lg font-semibold p-2" {...({} as any)}>
                {faqData.map((faq) => (
                  <File
                    key={faq.id}
                    value={faq.id}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      selectedFAQ?.id === faq.id
                        ? 'bg-teal-500/20 text-white'
                        : 'text-white hover:bg-teal-500/10'
                    }`}
                    onClick={() => handleTreeSelect(faq.id)}
                  >
                    <span className="text-sm">{faq.question}</span>
                  </File>
                ))}
              </Folder>
            </Tree>
          </div>
        </div>

        {/* Terminal - Answers */}
        <div className="lg:col-span-2 p-6">
          <div className="h-[350px] w-full">
            {selectedFAQ ? (
              <Terminal
                key={terminalKey}
                className="bg-black/80 border-green-500/30 h-full w-full max-w-none"
                sequence={true}
                startOnView={true}
              >
              {/* Command execution */}
              <TypingAnimation duration={18} className="text-green-400">
                {`hacker@hacktheridge:~/faq$ cat ${selectedFAQ.id}.md`}
              </TypingAnimation>

              <AnimatedSpan className="text-gray-400">
                <span>{`# Generated: ${getCurrentTimestamp()}`}</span>
              </AnimatedSpan>

              <AnimatedSpan className="text-gray-400">
                <span>{`# Size: ${getFileSize(selectedFAQ.answer)} | Lines: ${selectedFAQ.answer.split('\n').length}`}</span>
              </AnimatedSpan>

              {/* Empty line for spacing */}
              <AnimatedSpan className="text-white">
                <span></span>
              </AnimatedSpan>

              {/* Answer Content - Split into logical chunks with better formatting */}
              {selectedFAQ.answer.split('\n\n').map((paragraph, index) => (
                <AnimatedSpan key={index} className="text-white whitespace-pre-wrap break-words">
                  <span>{paragraph}</span>
                </AnimatedSpan>
              ))}

              {/* Empty line for spacing */}
              <AnimatedSpan className="text-white">
                <span></span>
              </AnimatedSpan>

              {/* Ready Prompt with blinking cursor */}
              <AnimatedSpan className="text-green-400">
                <span>hacker@hacktheridge:~/faq$ <span className="animate-pulse">█</span></span>
              </AnimatedSpan>
            </Terminal>
          ) : (
            <Terminal className="bg-black/80 border-green-500/30 h-[350px] w-full max-w-none" sequence={true} startOnView={true}>
              {/* Welcome banner */}
              <TypingAnimation duration={25} className="text-green-400">
                hacker@hacktheridge:~/faq$ figlet "FAQ"
              </TypingAnimation>

              {/* Fixed ASCII Art */}
              <AnimatedSpan className="text-cyan-400 font-mono text-xs leading-tight">
                <span>{`███████╗ █████╗    ██████╗
██╔════╝██╔══██╗██╔═══██╗
█████╗   ███████║██║     ██║
██╔══╝   ██╔══██║██║▄▄  ██║
██║        ██║   ██║╚██████╔╝
╚═╝        ╚═╝   ╚═╝ ╚══▀▀═╝`}</span>
              </AnimatedSpan>

              {/* Ready Prompt with blinking cursor */}
              <AnimatedSpan className="text-green-400">
                <span>hacker@hacktheridge:~/faq$ <span className="animate-pulse">█</span></span>
              </AnimatedSpan>
            </Terminal>
            )}
          </div>
        </div>
      </motion.div>
      )}

      {/* Additional Info */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-teal-200/80 text-sm mx-auto max-w-xl">
          Still have questions? Reach out to us at{' '}
          <a
            href="mailto:hello@hacktheridge.ca"
            className="text-teal-300 hover:text-white transition-colors underline"
          >
            hello@hacktheridge.ca
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default InteractiveFAQ;