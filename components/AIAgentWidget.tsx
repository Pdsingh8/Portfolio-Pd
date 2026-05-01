"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

const mockConversation = [
  { sender: "user", text: "Hello, I'm calling about the enterprise automation package." },
  { sender: "ai", text: "Hi there! I'd be happy to help. Are you looking to automate your internal workflows or client-facing operations?" },
  { sender: "user", text: "Mostly internal workflows for our sales team. They spend too much time on manual qualification." },
  { sender: "ai", text: "I understand. Our AI agents can integrate directly with your CRM, LinkedIn, and email to handle lead qualification autonomously. They score leads based on intent and only loop in your sales reps for qualified discovery calls." },
  { sender: "user", text: "That sounds exactly like what we need. How long does implementation take?" },
  { sender: "ai", text: "Typically 2 to 3 weeks for a full end-to-end sales pipeline. Would you like me to check our engineering team's availability and book a technical discovery session for you?" },
];

export default function AIAgentWidget() {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isActive) {
      setMessages([]); // Reset
      let currentIndex = 0;

      const streamNextMessage = () => {
        if (currentIndex < mockConversation.length) {
          const msg = mockConversation[currentIndex];
          
          if (msg.sender === "ai") setIsTyping(true);
          
          // Delay before message appears
          const delay = msg.sender === "ai" ? 1500 : 800;
          
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Math.random().toString(), sender: msg.sender as "user" | "ai", text: msg.text }]);
            currentIndex++;
            streamNextMessage();
          }, delay);
        } else {
          // End of conversation
          timeoutId = setTimeout(() => setIsActive(false), 3000);
        }
      };

      streamNextMessage();
    } else {
      setMessages([]);
      setIsTyping(false);
    }

    return () => clearTimeout(timeoutId);
  }, [isActive]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center w-full h-[400px]">
      
      {/* Controls */}
      <div className="flex-shrink-0 flex flex-col justify-center gap-4">
        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="group relative inline-flex items-center gap-4 px-6 py-3 bg-[#1A1714] rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#C4622D] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <span className="relative z-10 font-geist text-[10px] uppercase tracking-widest text-white">
              Simulate Live Call
            </span>
            <span className="relative z-10 w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
          </button>
        ) : (
          <button
            onClick={() => setIsActive(false)}
            className="inline-flex items-center gap-4 px-6 py-3 bg-red-500/10 text-red-600 rounded-full border border-red-500/20"
          >
            <span className="font-geist text-[10px] uppercase tracking-widest">
              End Simulation
            </span>
            <span className="w-2 h-2 rounded-full bg-red-500" />
          </button>
        )}
      </div>

      {/* Widget Mockup */}
      <div className="flex-1 relative w-full h-full rounded-[2rem] bg-white shadow-[0_0_40px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
        {/* Widget Header */}
        <div className="p-4 md:p-6 border-b border-[#1A1714]/5 flex items-center justify-between bg-white/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#1A1714] to-[#3a352d] flex items-center justify-center">
                <span className="font-cormorant text-xl text-white italic">AI</span>
              </div>
              {isActive && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-geist text-sm font-medium text-[#1A1714]">Sales Rep Agent</h3>
              <p className="font-geist text-[10px] uppercase tracking-widest text-[#1A1714]/40 mt-1">
                {isActive ? "Connected" : "Standby"}
              </p>
            </div>
          </div>
          
          {/* Waveform indicator */}
          <div className="flex items-center gap-1 h-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={
                  isActive && isTyping
                    ? { height: ["20%", "100%", "40%", "80%", "20%"] }
                    : { height: "20%" }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-1 rounded-full bg-[#C4622D]"
              />
            ))}
          </div>
        </div>

        {/* Transcript Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#FAFAFA] flex flex-col gap-4 md:gap-6 scroll-smooth"
        >
          {!isActive && messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
              </svg>
              <p className="font-geist text-[11px] uppercase tracking-widest">Awaiting Call</p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[85%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}
              >
                <span className="font-geist text-[9px] uppercase tracking-widest text-[#1A1714]/40 mb-2 block px-2">
                  {msg.sender === "user" ? "You" : "AI Agent"}
                </span>
                <div 
                  className={`p-4 rounded-2xl ${
                    msg.sender === "user" 
                      ? "bg-[#1A1714] text-white rounded-tr-sm" 
                      : "bg-white border border-[#1A1714]/5 text-[#1A1714] rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p className="font-geist text-[11px] md:text-[13px] leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mr-auto"
              >
                <span className="font-geist text-[9px] uppercase tracking-widest text-[#1A1714]/40 mb-2 block px-2">
                  AI Agent
                </span>
                <div className="p-4 rounded-2xl bg-white border border-[#1A1714]/5 rounded-tl-sm flex gap-1 items-center h-[48px] md:h-[52px]">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-[#1A1714]/30" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[#1A1714]/30" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-[#1A1714]/30" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom input mockup */}
        <div className="p-4 bg-white border-t border-[#1A1714]/5">
          <div className="w-full h-10 md:h-12 bg-[#FAFAFA] rounded-full border border-[#1A1714]/5 flex items-center px-4">
            <span className="font-geist text-[11px] text-[#1A1714]/30 flex-1">
              {isActive ? "Microphone active..." : "Call ended"}
            </span>
            {isActive && (
               <motion.div
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="w-2 h-2 rounded-full bg-red-500"
               />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
