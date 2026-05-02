"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ─── Tool Categories ──────────────────────────────────────────────────────────
const categories = [
  {
    label: "Build",
    tools: [
      { name: "Next.js",    src: "/assets/logos/next.js logo.png" },
      { name: "TypeScript", src: "/assets/logos/typescript-logo.png" },
      { name: "React",      src: "/assets/logos/React-logo.png" },
      { name: "Node.js",    src: "/assets/logos/node.js-logo.jpeg" },
      { name: "Tailwind",   src: "/assets/logos/tailwind-css-logo.png" },
      { name: "Electron",   src: "/assets/logos/electron-logo.png" },
    ],
  },
  {
    label: "AI & LLMs",
    tools: [
      { name: "Claude",       src: "/assets/logos/claude-logo.jpeg" },
      { name: "ChatGPT",      src: "/assets/logos/gpt-logo.jpg" },
      { name: "ElevenLabs",   src: "/assets/logos/eleven-labs-logo.png" },
      { name: "Midjourney",   src: "/assets/logos/midjourney-color-icon.webp" },
      { name: "Runway",       src: "/assets/logos/runway-ml.png" },
      { name: "KlingAI",      src: "/assets/logos/KlingAI-logo.png" },
      { name: "Google Veo",   src: "/assets/logos/google veo.png" },
      { name: "Higgsfield",   src: "/assets/logos/higgsfield-logo.png" },
    ],
  },
  {
    label: "Data & Infra",
    tools: [
      { name: "PostgreSQL",   src: "/assets/logos/postgresql-logo.jpg" },
      { name: "Supabase",     src: "/assets/logos/supabase-logo.webp" },
      { name: "Vercel",       src: "/assets/logos/vercel-icon.svg" },
      { name: "Git",          src: "/assets/logos/git-logo.png" },
      { name: "GitHub",       src: "/assets/logos/github-logo.png" },
    ],
  },
  {
    label: "Automation & Design",
    tools: [
      { name: "n8n",          src: "/assets/logos/n8n-logo.png" },
      { name: "Cursor",       src: "/assets/logos/cursor-logo.avif" },
      { name: "Figma",        src: "/assets/logos/Figma-logo.svg.png" },
      { name: "Google Stitch",src: "/assets/logos/google-stitch.png" },
    ],
  },
];

type Tool = { name: string; src: string };

export default function StackSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null);
  const [imgError, setImgError] = useState(false);

  // Mouse tracking for floating logo follower
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 md:py-36 bg-[#0D0C0B] overflow-hidden"
    >
      {/* Section header */}
      <motion.div
        style={{ y, opacity }}
        className="flex flex-col items-center mb-16 md:mb-24 px-6 relative z-10"
      >
        <div className="font-geist text-[10px] tracking-[0.4em] text-[#C4622D] opacity-80 uppercase mb-5">
          THE ENGINE
        </div>
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cormorant text-[clamp(2.8rem,6vw,6rem)] font-light text-white leading-[0.9] tracking-[-0.02em] text-center"
        >
          23 tools. 1 person.
          <br />
          <span className="italic text-white/35">Infinite</span> output.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-geist text-sm text-white/40 leading-relaxed text-center max-w-md"
        >
          One engineer. Multiple specialities. Every system built from first principles — no agency overhead, no middle layers.
        </motion.p>
      </motion.div>

      {/* Tool categories */}
      <div className="w-full max-w-5xl mx-auto px-5 sm:px-10 relative z-10 flex flex-col gap-0">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Top divider + category label */}
            <div className="flex items-center gap-5 mb-4 mt-10">
              <span className="font-geist text-[9px] tracking-[0.35em] uppercase text-white/25">
                {cat.label}
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Tool names */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 md:gap-x-8 md:gap-y-2">
              {cat.tools.map((tool) => {
                const isHovered = hoveredTool?.name === tool.name;
                const isDimmed  = hoveredTool !== null && !isHovered;

                return (
                  <div
                    key={tool.name}
                    onMouseEnter={() => { setHoveredTool(tool); setImgError(false); }}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="cursor-crosshair select-none py-1"
                  >
                    <span
                      className="font-cormorant block transition-all duration-500 ease-out tracking-[-0.01em]"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 3rem)",
                        color:     isHovered ? "#C4622D" : "white",
                        opacity:   isDimmed  ? 0.12 : isHovered ? 1 : 0.55,
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                        textShadow: isHovered ? "0 4px 20px rgba(196,98,45,0.3)" : "none",
                        display: "inline-block",
                        lineHeight: 1.3,
                      }}
                    >
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating logo follower — desktop only */}
      <div className="hidden md:block">
        <AnimatePresence>
          {hoveredTool && (
            <motion.div
              key={hoveredTool.name}
              style={{
                left: smoothX,
                top:  smoothY,
                x: "1rem",
                y: "1rem",
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-2xl shadow-[0_20px_50px_rgba(196,98,45,0.2)] overflow-hidden pointer-events-none flex items-center justify-center p-4 origin-top-left border border-white/10"
            >
              {!imgError ? (
                <Image
                  src={hoveredTool.src.replace(/ /g, "%20")}
                  alt={hoveredTool.name}
                  width={128}
                  height={128}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  unoptimized
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#1A1714] text-xl font-serif font-light">
                  {hoveredTool.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom summary bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 md:mt-20 mx-5 sm:mx-10 max-w-5xl xl:mx-auto border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10"
      >
        <div className="flex gap-10 sm:gap-16">
          {[
            { value: "23+", label: "Tools mastered" },
            { value: "8+",  label: "Clients shipped" },
            { value: "100%", label: "Remote" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-cormorant text-3xl sm:text-4xl font-light text-white leading-none">
                {stat.value}
              </span>
              <span className="font-geist text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="font-geist text-xs text-white/25 leading-relaxed max-w-xs">
          Every tool chosen with intent. Every automation shipped to production.
        </div>
      </motion.div>

      <div className="w-full h-px bg-white/5 mt-16 md:mt-20 relative z-10" />
    </section>
  );
}
