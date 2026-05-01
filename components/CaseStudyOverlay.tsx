"use client";

import { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { animate } from "animejs";
import { Project } from "@/lib/projects";
import AIAgentWidget from "./AIAgentWidget";
import NodeGraph from "./NodeGraph";
import DashboardMock from "./DashboardMock";
import ComplianceMock from "./ComplianceMock";
import LeadPipelineMock from "./LeadPipelineMock";

interface CaseStudyOverlayProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
}

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const prefix = value.startsWith("$") ? "$" : "";

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      
      const current = easedProgress * numericPart;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [numericPart]);

  return (
    <span>
      {prefix}
      {numericPart % 1 === 0 ? Math.floor(displayValue) : displayValue.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function CaseStudyOverlay({ project, onClose, onNext }: CaseStudyOverlayProps) {
  const baseId = useId();
  const filterId = `liquid-filter-${baseId.replace(/:/g, "")}`;

  useEffect(() => {
    if (project) {
      // Stop Lenis so it doesn't steal wheel events from overlay's native scroll
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { stop: () => void; start: () => void } | undefined;
      lenis?.stop();

      // Liquid reveal animation using Anime.js (v4 animate)
      animate(`#${filterId} feTurbulence`, {
        baseFrequency: ["0.05 0.05", "0.0001 0.0001"],
        duration: 800,
        ease: "easeOutQuart",
      });

      return () => {
        lenis?.start();
      };
    }
  }, [project, filterId]);

  if (!project) return null;

  const renderIllustration = () => {
    switch (project.id) {
      case "ai-calling-agent":
        return (
          <div className="w-full p-6 md:p-8 bg-[#111]/80 border border-white/5 rounded-3xl overflow-hidden">
            <AIAgentWidget />
          </div>
        );
      case "rag-pipeline":
      case "multi-llm":
      case "lead-enrichment":
      case "compliance-monitor":
        return <NodeGraph flowType={project.id} />;
      case "cross-llm":
        return <DashboardMock />;
      case "regulatory":
        return <ComplianceMock />;
      case "revenue-intelligence":
        return <LeadPipelineMock />;
      default:
        return project.thumbnail ? (
          <motion.div
            style={{ filter: `url(#${filterId})` }}
            className="w-full aspect-video rounded-3xl overflow-hidden bg-[#1A1714] relative border border-white/10"
          >
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" unoptimized />
          </motion.div>
        ) : null;
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#0D0C0B] flex flex-col"
    >
      {/* SVG Filter Definition for Liquid Morph */}
      <svg className="absolute w-0 h-0 invisible">
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
          </filter>
        </defs>
      </svg>

      {/* Sticky Header Bar */}
      <div className="flex-shrink-0 w-full px-8 py-6 flex justify-between items-center bg-[#0D0C0B]/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-geist)] text-xs opacity-40 text-[#F5F0E8]">{project.index}</span>
          <h3 className="font-[family-name:var(--font-geist)] text-sm opacity-70 text-[#F5F0E8]">{project.title}</h3>
        </div>
        <button 
          onClick={onClose}
          className="font-[family-name:var(--font-geist)] text-xs tracking-[0.2em] text-[#F5F0E8] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          ✕ CLOSE
        </button>
      </div>

      {/* Scrollable Content — data-lenis-prevent stops Lenis hijacking scroll inside */}
      <div className="flex-1 overflow-y-auto" data-lenis-prevent>
        <div className="max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <section className="px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[family-name:var(--font-geist)] text-xs tracking-[0.4em] text-[#C4622D] mb-6 uppercase"
          >
            Case Study
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-[family-name:var(--font-cormorant)] text-[10vw] md:text-[6vw] font-light text-[#F5F0E8] leading-tight mb-8"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-[family-name:var(--font-geist)] text-lg lg:text-xl text-[#F5F0E8] opacity-50 font-light max-w-2xl leading-relaxed"
          >
            {project.shortDesc}
          </motion.p>
        </section>

          {/* Illustration */}
          {renderIllustration() && (
            <motion.section
              className="px-8 pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div className="font-[family-name:var(--font-geist)] text-[10px] tracking-[0.4em] text-[#F5F0E8] opacity-30 mb-4 uppercase">
                {project.id === "ai-calling-agent" ? "Live Demo" : "Interactive Illustration"}
              </div>
              {renderIllustration()}
            </motion.section>
          )}

        {/* Stats Grid */}
        <section className="px-8 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-y border-white/5">
          {project.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="font-[family-name:var(--font-cormorant)] text-[8vw] md:text-[4vw] text-[#F5F0E8] font-light">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="font-[family-name:var(--font-geist)] text-[9px] md:text-xs text-[#F5F0E8] opacity-40 tracking-[0.15em] uppercase mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

          {/* Main Image — only for projects without illustrations */}
          {!(["ai-calling-agent", "rag-pipeline", "multi-llm", "lead-enrichment", "compliance-monitor", "cross-llm", "regulatory", "revenue-intelligence"].includes(project.id)) && project.thumbnail && (
            <section className="px-8 py-12">
              <motion.div
                style={{ filter: `url(#${filterId})` }}
                className="w-full aspect-video rounded-3xl overflow-hidden bg-[#1A1714] relative border border-white/10"
              >
                <Image src={project.thumbnail} alt={project.title} fill className="object-cover" unoptimized />
              </motion.div>
            </section>
          )}

        {/* Overview */}
        <section className="px-8 py-16 md:py-20 max-w-4xl">
          <div className="font-[family-name:var(--font-geist)] text-[10px] tracking-[0.4em] text-[#F5F0E8] opacity-40 mb-6 md:mb-8 uppercase">
            Overview
          </div>
          <div className="font-[family-name:var(--font-cormorant)] text-[6vw] md:text-[2.2vw] font-light text-[#F5F0E8] opacity-80 leading-relaxed">
            {project.overview}
          </div>
        </section>

        {/* Process Grid */}
        <section className="px-8 py-24 border-t border-white/5">
          <div className="font-[family-name:var(--font-geist)] text-[10px] tracking-[0.4em] text-[#F5F0E8] opacity-40 mb-16 uppercase">
            The Process
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {project.process.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col border-t border-white/10 pt-10"
              >
                <span className="font-[family-name:var(--font-geist)] text-xs text-[#C4622D] opacity-70 mb-4">{step.step}</span>
                <h4 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#F5F0E8] mb-6">{step.title}</h4>
                <p className="font-[family-name:var(--font-geist)] text-sm text-[#F5F0E8] opacity-50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stack Tags */}
        <section className="px-8 py-20 border-t border-white/5">
          <div className="font-[family-name:var(--font-geist)] text-[10px] tracking-[0.4em] text-[#F5F0E8] opacity-40 mb-10 uppercase">
            Built With
          </div>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((item, i) => (
              <span 
                key={i}
                className="px-5 py-2 border border-white/10 rounded-full font-[family-name:var(--font-geist)] text-[11px] text-[#F5F0E8] opacity-70 tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="px-8 py-32 border-t border-white/5 flex flex-col items-center">
          <button 
            onClick={onNext}
            className="group flex flex-col items-center cursor-pointer"
          >
            <span className="font-[family-name:var(--font-geist)] text-[10px] tracking-[0.3em] text-[#F5F0E8] opacity-30 group-hover:opacity-60 transition-opacity uppercase mb-4">
              Next Project
            </span>
            <span className="font-[family-name:var(--font-cormorant)] text-[5vw] lg:text-[3vw] text-[#F5F0E8] opacity-40 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 font-light italic">
              Explore more Work &rarr;
            </span>
          </button>
        </footer>
        </div>
      </div>
    </motion.div>
  );
}
