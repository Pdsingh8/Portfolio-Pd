"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform } from "framer-motion";

const tools = [
  { name: "Next.js", src: "/assets/logos/next.js logo.png" },
  { name: "TypeScript", src: "/assets/logos/typescript-logo.png" },
  { name: "React", src: "/assets/logos/React-logo.png" },
  { name: "Tailwind", src: "/assets/logos/tailwind-css-logo.png" },
  { name: "Node.js", src: "/assets/logos/node.js-logo.jpeg" },
  { name: "PostgreSQL", src: "/assets/logos/postgresql-logo.jpg" },
  { name: "Supabase", src: "/assets/logos/supabase-logo.webp" },
  { name: "Vercel", src: "/assets/logos/vercel-icon.svg" },
  { name: "Claude", src: "/assets/logos/claude-logo.jpeg" },
  { name: "ChatGPT", src: "/assets/logos/gpt-logo.jpg" },
  { name: "Midjourney", src: "/assets/logos/midjourney-color-icon.webp" },
  { name: "ElevenLabs", src: "/assets/logos/eleven-labs-logo.png" },
  { name: "Runway", src: "/assets/logos/runway-ml.png" },
  { name: "KlingAI", src: "/assets/logos/KlingAI-logo.png" },
  { name: "Google Veo", src: "/assets/logos/google veo.png" },
  { name: "Higgsfield", src: "/assets/logos/higgsfield-logo.png" },
  { name: "n8n", src: "/assets/logos/n8n-logo.png" },
  { name: "Cursor", src: "/assets/logos/cursor-logo.avif" },
  { name: "Figma", src: "/assets/logos/Figma-logo.svg.png" },
  { name: "Git", src: "/assets/logos/git-logo.png" },
  { name: "GitHub", src: "/assets/logos/github-logo.png" },
  { name: "Electron", src: "/assets/logos/electron-logo.png" },
  { name: "Google Stitch", src: "/assets/logos/google-stitch.png" },
];

export default function StackSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredTool, setHoveredTool] = useState<{name: string, src: string} | null>(null);
  const [imgError, setImgError] = useState(false);

  // Mouse Tracking Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-20 md:py-28 bg-[#0D0C0B] overflow-hidden"
    >
      {/* Background grain or subtle overlay could go here */}

      <div className="flex flex-col items-center mb-16 md:mb-24 px-6 relative z-10">
        <div className="font-[family-name:var(--font-geist)] text-xs tracking-[0.4em] text-[#C4622D] opacity-80 uppercase mb-6">
          THE ENGINE
        </div>
        <motion.h2 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5.5vw,5.5rem)] font-light text-white leading-[0.9] tracking-[-0.02em] text-center"
        >
          23 tools. 1 person.
          <br />
          <span className="italic text-white/40">Infinite</span> output.
        </motion.h2>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="w-full max-w-[90vw] md:max-w-[75vw] mx-auto flex flex-wrap justify-center content-center gap-x-4 gap-y-1 md:gap-x-8 md:gap-y-2 relative z-10"
      >
        {tools.map((tool, idx) => {
          const isHovered = hoveredTool?.name === tool.name;
          const isDimmed = hoveredTool !== null && !isHovered;

          return (
            <div
              key={idx}
              onMouseEnter={() => {
                setHoveredTool(tool);
                setImgError(false); // Reset error state on new mount
              }}
              onMouseLeave={() => setHoveredTool(null)}
              className="cursor-crosshair relative py-1 md:py-2 select-none"
            >
              <div 
                className="font-[family-name:var(--font-cormorant)] text-[clamp(1.5rem,3vw,3rem)] font-light block transition-all duration-500 ease-out tracking-[-0.01em]"
                style={{
                  color: isHovered ? "#C4622D" : "white",
                  opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6),
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  textShadow: isHovered ? "0 4px 20px rgba(196,98,45,0.3)" : "none",
                }}
              >
                {tool.name}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Floating Logo Follower (Hidden on Mobile) */}
      <div className="hidden md:block">
        <AnimatePresence>
          {hoveredTool && (
            <motion.div
              key={hoveredTool.name}
              style={{ 
                left: smoothX,
                top: smoothY,
                x: "1rem",   // Cursor offset top-left
                y: "1rem"
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-3xl shadow-[0_20px_50px_rgba(196,98,45,0.25)] overflow-hidden pointer-events-none flex items-center justify-center p-5 origin-top-left border border-[rgba(255,255,255,0.1)]"
            >
              {!imgError ? (
                <Image 
                  src={hoveredTool.src.replace(/ /g, "%20")} 
                  alt={hoveredTool.name} 
                  width={128} 
                  height={128} 
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  unoptimized={true}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#1A1714] text-2xl font-serif font-light">
                  {hoveredTool.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full h-px bg-white/5 mt-16 md:mt-24 relative z-10" />
    </section>
  );
}
