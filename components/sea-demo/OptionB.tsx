"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/lib/projects";

const seaProjects = [...projects, ...projects, ...projects, ...projects].map((p, i) => ({ ...p, uniqueId: `${p.id}-${i}` }));

export default function OptionB() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 50 });

  return (
    <div ref={containerRef} className="h-[250vh] relative bg-[#0D0C0B]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        <div className="absolute top-24 left-0 w-full text-center z-50 pointer-events-none">
          <h2 className="font-cormorant text-5xl md:text-7xl font-light mb-6">
            Floating <em className="text-[#C4622D] italic">Canvas</em>
          </h2>
          <p className="font-geist text-sm text-white/50 tracking-widest uppercase">
            A spatial, parallax-driven experience. Scroll to explore.
          </p>
        </div>

        {/* The Sea */}
        <div className="relative w-full h-full">
          {seaProjects.map((project, i) => {
            // Randomize positions and movement speeds based on index
            const xOffset = (i % 4) * 25 - 30; // -30% to 45%
            const yStart = 120 + (i * 10);
            const yEnd = -50 - (i * 20);
            const scale = 0.6 + ((i % 3) * 0.2);
            
            // Individual parallax transforms
            const yMove = useTransform(smoothProgress, [0, 1], [`${yStart}%`, `${yEnd}%`]);
            const xMove = useTransform(smoothProgress, [0, 1], [`${xOffset}%`, `${xOffset + (i % 2 === 0 ? 10 : -10)}%`]);

            return (
              <motion.div
                key={project.uniqueId}
                style={{
                  y: yMove,
                  x: xMove,
                  scale,
                  position: "absolute",
                  left: `${10 + (i % 5) * 18}%`, // Distribute horizontally
                  top: "0%"
                }}
                className="w-[300px] sm:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                
                <div 
                  className="w-full h-full relative"
                  style={{ background: project.gradient }}
                >
                   <div className="absolute inset-0 flex items-center justify-center p-8 text-center opacity-30">
                     <span className="font-cormorant text-4xl font-light text-white">{project.title}</span>
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full font-geist text-[10px] tracking-widest uppercase text-[#C4622D] border border-white/10 mb-4">
                    {project.category}
                  </span>
                  <h3 className="font-cormorant text-3xl font-light leading-tight text-white">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
