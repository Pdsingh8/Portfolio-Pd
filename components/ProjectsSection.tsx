"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { projects } from "@/lib/projects";
import CaseStudyOverlay from "./CaseStudyOverlay";
import type { Project } from "@/lib/projects";

// Sea layout: each card has a staggered Y position relative to scroll progress.
// We use a single raw scrollYProgress (no spring) so framer-motion can batch
// all transforms in a single rAF pass — no chained motion value derivations.
const seaLayouts = [
  { left: "8%",  yStart: "84%",  yEnd: "-18%", xOffset: "-4%",  scale: 0.82, rotate: -8 },
  { left: "23%", yStart: "96%",  yEnd: "-6%",  xOffset: "2%",   scale: 0.92, rotate: -3 },
  { left: "39%", yStart: "76%",  yEnd: "-26%", xOffset: "-6%",  scale: 1.04, rotate:  5 },
  { left: "56%", yStart: "108%", yEnd: "6%",   xOffset: "3%",   scale: 0.88, rotate: -6 },
  { left: "72%", yStart: "82%",  yEnd: "-16%", xOffset: "-3%",  scale: 1.00, rotate:  7 },
  { left: "86%", yStart: "102%", yEnd: "2%",   xOffset: "5%",   scale: 0.80, rotate: -4 },
  { left: "17%", yStart: "126%", yEnd: "22%",  xOffset: "-5%",  scale: 0.90, rotate:  6 },
  { left: "63%", yStart: "128%", yEnd: "24%",  xOffset: "4%",   scale: 0.86, rotate: -7 },
] as const;

// ─── Desktop Sea Card ─────────────────────────────────────────────────────────
// Uses a single raw MotionValue — no chained spring/transform, minimal overhead.
function SeaCard({
  project,
  scrollYProgress,
  layout,
  onOpen,
}: {
  project: Project;
  scrollYProgress: MotionValue<number>;
  layout: (typeof seaLayouts)[number];
  onOpen: (project: Project) => void;
}) {
  const y       = useTransform(scrollYProgress, [0, 1], [layout.yStart, layout.yEnd]);
  const x       = useTransform(scrollYProgress, [0, 1], ["0%", layout.xOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [0, 1, 1, 0.4]);
  const imageSrc = project.seaImage || project.thumbnail;

  return (
    <motion.button
      type="button"
      style={{
        y,
        x,
        opacity,
        scale: layout.scale,
        rotate: layout.rotate,
        position: "absolute",
        left: layout.left,
        top: "0%",
        willChange: "transform",
      }}
      onClick={() => onOpen(project)}
      className="group relative aspect-[4/5] w-[260px] xl:w-[340px] cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-[#141414] text-left shadow-[0_30px_80px_rgba(0,0,0,0.35)] transform-gpu"
    >
      <div className="absolute inset-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 1280px) 260px, 340px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full" style={{ background: project.gradient }} />
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.28)_42%,rgba(5,5,5,0.78)_100%)] transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,98,45,0.26),transparent_28%)] opacity-70" />

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 font-geist text-[10px] uppercase tracking-[0.24em] text-white/60 backdrop-blur-sm">
          {project.index}
        </span>
        <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 font-geist text-[10px] uppercase tracking-[0.18em] text-[#C4622D] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="translate-y-5 transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="font-cormorant text-2xl xl:text-[2rem] font-light leading-tight text-white mb-2">
            {project.title}
          </h3>
          <p className="font-geist text-xs leading-6 text-white/60 max-w-[22rem]">
            {project.shortDesc}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-geist text-[10px] uppercase tracking-[0.16em] text-white/50 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Mobile / Tablet Card ─────────────────────────────────────────────────────
function MobileCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const imageSrc = project.seaImage || project.thumbnail;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      className="group relative w-full aspect-[4/3] sm:aspect-[16/9] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#141414] text-left shadow-[0_16px_50px_rgba(0,0,0,0.35)] transform-gpu"
    >
      <div className="absolute inset-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 95vw, 75vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full" style={{ background: project.gradient }} />
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.05)_0%,rgba(5,5,5,0.72)_100%)]" />

      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-0.5 font-geist text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
          {project.index}
        </span>
        <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-0.5 font-geist text-[10px] uppercase tracking-[0.16em] text-[#C4622D] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-cormorant text-2xl font-light leading-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1 font-geist text-xs leading-5 text-white/55">
          {project.shortDesc}
        </p>
        <div className="mt-3 flex gap-2 flex-wrap opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {project.stats.slice(0, 2).map((s) => (
            <span
              key={s.label}
              className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-geist text-[10px] uppercase tracking-[0.14em] text-white/50"
            >
              {s.value} {s.label}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Single raw scrollYProgress — no spring, no chained transforms.
  // Spring was causing 24 simultaneous motion value updates per frame.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  const handleNext = useCallback(() => {
    setActiveProject((prev) => {
      if (!prev) return null;
      const i = projects.findIndex((p) => p.id === prev.id);
      return projects[(i + 1) % projects.length];
    });
  }, []);

  return (
    <>
      {/* ── Desktop Sea (lg+) ── */}
      <section
        ref={containerRef}
        className="hidden lg:block h-[250vh] relative bg-[#0D0C0B]"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,98,45,0.12),transparent_26%),linear-gradient(180deg,#120f0d_0%,#0d0c0b_36%,#0d0c0b_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute top-16 left-0 w-full text-center z-50 pointer-events-none px-6">
            <div className="flex items-baseline justify-center gap-4 mb-5">
              <span className="font-geist text-[10px] tracking-[0.4em] text-white/30 uppercase">
                Selected Work
              </span>
              <span className="font-geist text-[10px] tracking-[0.3em] text-white/20">
                0{projects.length} Projects
              </span>
            </div>
            <h2 className="font-cormorant text-6xl xl:text-7xl font-light mb-3 text-white">
              Sea of <em className="text-[#C4622D] italic">Projects.</em>
            </h2>
            <p className="mx-auto max-w-xl font-geist text-sm leading-7 text-white/40">
              A drifting wall of builds — AI systems, revenue ops, voice agents, compliance infrastructure.
            </p>
          </div>

          <div className="relative w-full h-full">
            {projects.map((project, i) => {
              const layout = seaLayouts[i % seaLayouts.length];
              return (
                <SeaCard
                  key={project.id}
                  project={project}
                  scrollYProgress={scrollYProgress}
                  layout={layout}
                  onOpen={setActiveProject}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mobile / Tablet list (< lg) ── */}
      <section className="lg:hidden bg-[#0D0C0B] py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-geist text-[10px] tracking-[0.4em] text-white/30 uppercase block mb-4">
              Selected Work
            </span>
            <h2 className="font-cormorant text-5xl font-light text-white">
              Sea of <em className="text-[#C4622D] italic">Projects.</em>
            </h2>
            <p className="mt-4 font-geist text-sm leading-7 text-white/40 max-w-md mx-auto">
              A wall of builds — AI systems, revenue ops, voice agents, compliance infrastructure.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {projects.map((project, i) => (
              <MobileCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setActiveProject}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <CaseStudyOverlay
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
