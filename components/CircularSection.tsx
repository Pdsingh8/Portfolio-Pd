"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useIntersectionVideo } from "@/lib/hooks";

interface CircularSectionProps {
  videoSrc: string;
  backVideoSrc?: string;
}

export default function CircularSection({ videoSrc, backVideoSrc = "/assets/video-1.mp4" }: CircularSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { videoRef: frontVideoRef } = useIntersectionVideo();
  const { videoRef: backVideoRefHook } = useIntersectionVideo();
  
  // Scroll-linked scaling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.2, 0.7]);
  // Softened spring for much smoother performance (no high-frequency jitter)
  const springScale = useSpring(scrollScale, { stiffness: 60, damping: 25 });
  
  // useMotionValue for ring removed in favor of direct animate prop

  // Motion values for holographic interactive tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Softer springs for tilt tracking (prevents "lag" feeling by smoothing inertia)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Map mouse movement to subtle rotation angles
  const tiltX = useTransform(springY, [-350, 350], [12, -12]);
  const tiltY = useTransform(springX, [-350, 350], [-12, 12]);

  // Smoother Flip Rotation (Deliberate speed)
  const flipRotation = useSpring(isFlipped ? 180 : 0, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    flipRotation.set(isFlipped ? 180 : 0);
  }, [isFlipped, flipRotation]);

  // Mouse tracking relative to center
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Manual animation loop removed to offload CPU

  // Radius for the text path
  const rotatingText = "AI ENGINEER \u00B7 FULL STACK \u00B7 n8n AUTOMATION \u00B7 VIBE CODER \u00B7 CLAUDE CODE \u00B7 AI VIDEOS \u00B7 FIGMA \u00B7 ";
  const fullText = rotatingText.repeat(3);

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[560px] md:min-h-[800px] py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-[#0D0C0B]"
      style={{ perspective: 1500 }}
    >
      
      {/* Left Text Block — desktop only */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[5%] top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col"
      >
        <div className="w-12 h-px bg-[#F5F0E8]/20 mb-4" />
        <span className="font-[family-name:var(--font-geist)] text-xs tracking-[0.2em] opacity-40 text-[#F5F0E8] uppercase mb-1">
          Currently
        </span>
        <span className="font-[family-name:var(--font-cormorant)] text-[4vw] font-light text-[#F5F0E8] leading-tight">
          Available
        </span>
        <span className="font-[family-name:var(--font-cormorant)] text-[4vw] font-light italic text-[#F5F0E8] leading-tight">
          for work.
        </span>
      </motion.div>

      {/* Mobile availability badge — above circle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="lg:hidden flex items-center gap-2 mb-8 z-30"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="font-[family-name:var(--font-geist)] text-[10px] tracking-[0.3em] text-[#F5F0E8]/50 uppercase">
          Currently available for work
        </span>
      </motion.div>

      {/* Optimized Layered Glow (Removed CPU-intensive blur animations) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 65%)" }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(196, 98, 45, 0.08) 0%, transparent 75%)" }}
        />
      </div>

      <motion.div 
        style={{ rotateX: tiltX, rotateY: tiltY, scale: springScale }}
        className="relative w-[320px] h-[320px] md:w-[700px] md:h-[700px] flex items-center justify-center z-10 will-change-transform transform-gpu"
      >
        {/* SVG Ring Wrapper */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ 
            duration: isHovered ? 40 : 18, 
            ease: "linear", 
            repeat: Infinity 
          }}
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu"
        >
          <svg className="w-full h-full" viewBox="0 0 700 700">
            <defs>
              <path id="circlePath" d="M 350,350 m -310,0 a 310,310 0 1,1 620,0 a 310,310 0 1,1 -620,0" />
            </defs>
            <text fill="#F5F0E8" fontSize="13" fontFamily="var(--font-geist)" letterSpacing="3" opacity="0.35">
              <textPath href="#circlePath">{fullText}</textPath>
            </text>
          </svg>
        </motion.div>

        {/* 3D Flip Card Circle - TRIGGER ONLY ON THIS ELEMENT */}
        <div 
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            className="relative w-[180px] h-[180px] md:w-[360px] md:h-[360px] cursor-pointer z-10" 
            style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            style={{ rotateY: flipRotation, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full will-change-transform"
          >
            {/* Front Face */}
            <div 
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-2 border-[rgba(245,240,232,0.15)] bg-[#0D0C0B] shadow-[0_0_50px_rgba(212,175,55,0.1)]"
              style={{ backfaceVisibility: "hidden" }}
            >
                <video ref={frontVideoRef} src={videoSrc} muted loop playsInline className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-cormorant)] text-[60px] md:text-[120px] font-light text-white/20 select-none pointer-events-none">P.</div>
            </div>

            {/* Back Face */}
            <div 
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-2 border-[rgba(245,240,232,0.15)] bg-[#0D0C0B] shadow-[0_0_50px_rgba(212,175,55,0.15)]"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <video ref={backVideoRefHook} src={backVideoSrc} muted loop playsInline className="w-full h-full object-cover opacity-70" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Stats Block — desktop only */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-8 text-[#F5F0E8]"
      >
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-cormorant)] text-[3.5vw] font-light leading-none">8+</span>
          <span className="font-[family-name:var(--font-geist)] text-xs tracking-[0.2em] opacity-40 uppercase mt-1">Clients</span>
        </div>
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-cormorant)] text-[3.5vw] font-light leading-none">23</span>
          <span className="font-[family-name:var(--font-geist)] text-xs tracking-[0.2em] opacity-40 uppercase mt-1">Tools</span>
        </div>
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-cormorant)] text-[3.5vw] font-light leading-none">100%</span>
          <span className="font-[family-name:var(--font-geist)] text-xs tracking-[0.2em] opacity-40 uppercase mt-1">Remote</span>
        </div>
      </motion.div>

      {/* Mobile / Tablet stats bar — below the circle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="lg:hidden flex items-center justify-center gap-10 sm:gap-16 mt-10 z-30 text-[#F5F0E8]"
      >
        {[
          { value: "8+",   label: "Clients" },
          { value: "23",   label: "Tools" },
          { value: "100%", label: "Remote" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-light leading-none">
              {stat.value}
            </span>
            <span className="font-[family-name:var(--font-geist)] text-[9px] tracking-[0.25em] opacity-40 uppercase mt-1.5">
              {stat.label}
            </span>
            {i < 2 && (
              <div className="hidden" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Bottom Label Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-px h-8 bg-[#F5F0E8]/20 mb-3" />
        <div className="font-[family-name:var(--font-geist)] text-xs tracking-[0.3em] opacity-35 text-[#F5F0E8] uppercase">
          Explore the work
        </div>
      </motion.div>
    </section>
  );
}
