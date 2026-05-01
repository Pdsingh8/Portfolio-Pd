"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import CaseStudyOverlay from "./CaseStudyOverlay";
import type { Project } from "@/lib/projects";

const seaLayouts = [
  { left: "8%", yStart: "84%", yEnd: "-18%", xStart: "-4%", xEnd: "8%", scale: 0.82, rotate: -8 },
  { left: "23%", yStart: "96%", yEnd: "-6%", xStart: "2%", xEnd: "-6%", scale: 0.92, rotate: -3 },
  { left: "39%", yStart: "76%", yEnd: "-26%", xStart: "-6%", xEnd: "4%", scale: 1.04, rotate: 5 },
  { left: "56%", yStart: "108%", yEnd: "6%", xStart: "3%", xEnd: "-7%", scale: 0.88, rotate: -6 },
  { left: "72%", yStart: "82%", yEnd: "-16%", xStart: "-3%", xEnd: "6%", scale: 1, rotate: 7 },
  { left: "86%", yStart: "102%", yEnd: "2%", xStart: "5%", xEnd: "-5%", scale: 0.8, rotate: -4 },
  { left: "17%", yStart: "126%", yEnd: "22%", xStart: "-5%", xEnd: "7%", scale: 0.9, rotate: 6 },
  { left: "63%", yStart: "128%", yEnd: "24%", xStart: "4%", xEnd: "-6%", scale: 0.86, rotate: -7 },
] as const;

function ProjectCard({
  project,
  progress,
  layout,
  onOpen,
}: {
  project: Project;
  progress: ReturnType<typeof useSpring>;
  layout: (typeof seaLayouts)[number];
  onOpen: (project: Project) => void;
}) {
  const y = useTransform(progress, [0, 1], [layout.yStart, layout.yEnd]);
  const x = useTransform(progress, [0, 1], [layout.xStart, layout.xEnd]);
  const opacity = useTransform(progress, [0, 0.12, 0.9, 1], [0.1, 1, 1, 0.5]);
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
      }}
      onClick={() => onOpen(project)}
      className="group relative aspect-[4/5] w-[280px] cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-[#141414] text-left shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:w-[360px]"
    >
      <div className="absolute inset-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 72vw, 360px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full" style={{ background: project.gradient }} />
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.28)_42%,rgba(5,5,5,0.78)_100%)] transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,98,45,0.26),transparent_28%)] opacity-70" />

      <div className="absolute left-6 top-6 flex items-center gap-3">
        <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 font-geist text-[10px] uppercase tracking-[0.24em] text-white/60 backdrop-blur-sm">
          {project.index}
        </span>
        <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 font-geist text-[10px] uppercase tracking-[0.18em] text-[#C4622D] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="translate-y-5 transition-transform duration-500 group-hover:translate-y-0">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-cormorant text-3xl font-light leading-tight text-white sm:text-[2rem]">
                {project.title}
              </h3>
              <p className="mt-3 max-w-[22rem] font-geist text-xs leading-6 text-white/60">
                {project.shortDesc}
              </p>
            </div>
            <div className="hidden rounded-full border border-white/12 bg-white/6 px-3 py-2 font-geist text-[10px] uppercase tracking-[0.22em] text-white/50 backdrop-blur-sm md:block">
              {project.stats[0].value}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-geist text-[10px] uppercase tracking-[0.16em] text-white/48 backdrop-blur-sm"
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

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 50 });

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
      <section ref={containerRef} className="h-[250vh] relative bg-[#0D0C0B]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,98,45,0.12),transparent_26%),linear-gradient(180deg,#120f0d_0%,#0d0c0b_36%,#0d0c0b_100%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <div className="absolute top-20 left-0 w-full text-center z-50 pointer-events-none px-6">
            <div className="flex items-baseline justify-center gap-4 mb-6">
              <span className="font-geist text-[10px] tracking-[0.4em] text-white/30 uppercase">
                Selected Work
              </span>
              <span className="font-geist text-[10px] tracking-[0.3em] text-white/20">
                0{projects.length} Projects
              </span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-7xl font-light mb-4 text-white">
              Sea of <em className="text-[#C4622D] italic">Projects.</em>
            </h2>
            <p className="mx-auto max-w-2xl font-geist text-sm leading-7 text-white/45">
              A drifting wall of builds across AI systems, revenue ops, voice agents, and compliance infrastructure.
            </p>
          </div>

          {/* The Sea */}
          <div className="relative w-full h-full">
            {projects.map((project, i) => {
              const layout = seaLayouts[i % seaLayouts.length];
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  progress={smoothProgress}
                  layout={layout}
                  onOpen={setActiveProject}
                />
              );
            })}
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
