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
    answer: `Hack The Ridge is a student-led innovation challenge at Iroquois Ridge High School where students tackle real-world problems through technology. Join us for hands-on workshops, inspiring speakers, mentorship, and collaborative problem-solving. Work solo or in teams of up to four to build creative solutions aligned with the event theme.

Since launch, the event has grown into a community celebration of student creativity, technical learning, and practical project building.`
  },
  {
    id: "who-can-participate",
    question: "Who can participate?",
    answer: `Anyone with a passion for technology and innovation! We welcome:

• Students (high and elementary school)
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
• Water bottle and snacks
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
    answer: `Coming soon! We're working on securing amazing prizes and will announce details closer to the event. Stay tuned for updates!`
  },
  {
    id: "schedule-timeline",
    question: "What's the schedule?",
    answer: `Coming soon! We're finalizing the detailed schedule and will share it closer to the event. Stay tuned for updates!`
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#dfd7d7] mb-4 tracking-wider"
          style={{ fontFamily: 'Sacco, Arial, sans-serif' }}
        >
          FAQ
        </h2>
        <p className="text-[#AFD5BC] text-lg">
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
              className="bg-[#1E3159]/35 backdrop-blur-sm border border-[#AFD5BC]/30 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-[#AFD5BC]/10 transition-colors"
              >
                <span className="text-[#dfd7d7] font-semibold text-base sm:text-lg">{faq.question}</span>
                <motion.svg
                  className="w-5 h-5 text-[#AFD5BC] flex-shrink-0"
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
                <div className="p-5 pt-0 text-[#dfd7d7]/90 whitespace-pre-wrap leading-relaxed">
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
              className="h-full w-full text-[#dfd7d7]"
              elements={treeData}
              initialExpandedItems={["faq-root"]}
              indicator={true}
            >
              <Folder element="FAQ" value="faq-root" className="text-[#dfd7d7] text-lg font-semibold p-2">
                {faqData.map((faq) => (
                  <File
                    key={faq.id}
                    value={faq.id}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      selectedFAQ?.id === faq.id
                        ? 'bg-[#AFD5BC]/20 text-[#dfd7d7]'
                        : 'text-[#dfd7d7] hover:bg-[#AFD5BC]/10'
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
                className="bg-[#081326]/90 border-[#AFD5BC]/30 h-full w-full max-w-none"
                sequence={true}
                startOnView={true}
              >
              {/* Command execution */}
              <TypingAnimation duration={18} className="text-[#AFD5BC]">
                {`hacker@hacktheridge:~/faq$ cat ${selectedFAQ.id}.md`}
              </TypingAnimation>

              <AnimatedSpan className="text-gray-400">
                <span>{`# Generated: ${getCurrentTimestamp()}`}</span>
              </AnimatedSpan>

              <AnimatedSpan className="text-gray-400">
                <span>{`# Size: ${getFileSize(selectedFAQ.answer)} | Lines: ${selectedFAQ.answer.split('\n').length}`}</span>
              </AnimatedSpan>

              {/* Empty line for spacing */}
              <AnimatedSpan className="text-[#dfd7d7]">
                <span></span>
              </AnimatedSpan>

              {/* Answer Content - Split into logical chunks with better formatting */}
              {selectedFAQ.answer.split('\n\n').map((paragraph, index) => (
                <AnimatedSpan key={index} className="text-[#dfd7d7] whitespace-pre-wrap break-words">
                  <span>{paragraph}</span>
                </AnimatedSpan>
              ))}

              {/* Empty line for spacing */}
              <AnimatedSpan className="text-[#dfd7d7]">
                <span></span>
              </AnimatedSpan>

              {/* Ready Prompt with blinking cursor */}
              <AnimatedSpan className="text-[#AFD5BC]">
                <span>hacker@hacktheridge:~/faq$ <span className="animate-pulse">█</span></span>
              </AnimatedSpan>
            </Terminal>
          ) : (
            <Terminal className="bg-[#081326]/90 border-[#AFD5BC]/30 h-[350px] w-full max-w-none" sequence={true} startOnView={true}>
              {/* Welcome banner */}
              <TypingAnimation duration={25} className="text-[#AFD5BC]">
                hacker@hacktheridge:~/faq$ figlet &quot;FAQ&quot;
              </TypingAnimation>

              {/* Fixed ASCII Art */}
              <AnimatedSpan className="text-[#7DB6AD] font-mono text-xs leading-tight">
                <span>{`███████╗ █████╗    ██████╗
█████╗   ███████║██║     ██║
██╔══╝   ██╔══██║██║▄▄  ██║
██║        ██║   ██║╚██████╔╝
╚═╝        ╚═╝   ╚═╝ ╚══▀▀═╝`}</span>
              </AnimatedSpan>

              {/* Ready Prompt with blinking cursor */}
              <AnimatedSpan className="text-[#AFD5BC]">
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
        <p className="text-[#dfd7d7]/80 text-sm mx-auto max-w-xl">
          Still have questions? Reach out to us at{' '}
          <a
            href="mailto:hi@hacktheridge.ca"
            className="text-[#AFD5BC] hover:text-[#dfd7d7] transition-colors underline"
          >
            hi@hacktheridge.ca
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default InteractiveFAQ;