"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import Magnetic from "./Magnetic";
import { useIntersectionVideo } from "@/lib/hooks";

interface HeroSectionProps {
  bgVideoSrc?: string;
  thumbnailSrc?: string;
  bgVideos?: string[];
  thumbnailVideos?: string[];
}

// Animation variants
const navVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 1.4 }
  },
};

const contextLine1Variants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.3 }
  },
};

const contextLine2Variants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.45 }
  },
};

const cubicBezier: [number, number, number, number] = [0.16, 1, 0.3, 1];

const mainTextLine1Variants: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, delay: 0.5, ease: cubicBezier }
  },
};

const mainTextLine2Variants: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, delay: 0.7, ease: cubicBezier }
  },
};

const mainTextLine3Variants: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, delay: 0.9, ease: cubicBezier }
  },
};

// Thumbnail variants removed, handled by local state

const bioVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 1.3 }
  },
};

const scrollIndicatorVariants: Variants = {
  animate: {
    y: ["0%", "100%"],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
};

export default function HeroSection({
  bgVideoSrc,
  thumbnailSrc,
  bgVideos = [],
  thumbnailVideos = []
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);

  const { videoRef: bgVideoRef } = useIntersectionVideo();
  const { videoRef: thumbVideoRef } = useIntersectionVideo();

  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    if (bgVideos.length > 1) {
      const interval = setInterval(() => {
        setCurrentBgIndex((prev) => (prev + 1) % bgVideos.length);
      }, 6000); // Change background video every 6 seconds
      return () => clearInterval(interval);
    }
  }, [bgVideos]);

  useEffect(() => {
    if (thumbnailVideos.length > 1) {
      const interval = setInterval(() => {
        setCurrentThumbIndex((prev) => (prev + 1) % thumbnailVideos.length);
      }, 4000); // Change thumbnail video every 4 seconds
      return () => clearInterval(interval);
    }
  }, [thumbnailVideos]);

  const activeBgSrc = bgVideos.length > 0 ? bgVideos[currentBgIndex] : bgVideoSrc;
  const activeThumbnailSrc = thumbnailVideos.length > 0 ? thumbnailVideos[currentThumbIndex] : thumbnailSrc;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const videoY = useTransform(scrollYProgress, [0, 0.3], [0, 30]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#0D0C0B]"
    >
      {/* Background Video */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full"
      >
        {activeBgSrc ? (
          <motion.video
            ref={bgVideoRef}
            key={activeBgSrc} // Re-render when source changes to trigger play
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1.5 }}
            src={activeBgSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-35"
          />
        ) : (
          <div className="w-full h-full bg-[#0D0C0B] opacity-35" />
        )}
      </motion.div>

      {/* Nav */}
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 w-full flex justify-between items-center p-8 z-50 text-[#F5F0E8]"
      >
        <Magnetic strength={0.4}>
          <div className="font-cormorant font-normal text-xl cursor-pointer">
            P.
          </div>
        </Magnetic>
        <Magnetic strength={0.4}>
          <div className="font-geist font-light tracking-[0.3em] text-xs uppercase cursor-pointer">
            Menu
          </div>
        </Magnetic>
      </motion.header>

      <div className="absolute top-[12%] md:top-28 left-8 z-40 text-[#F5F0E8] font-geist font-light text-xs md:text-sm opacity-70">
        <motion.div variants={contextLine1Variants} initial="hidden" animate="visible">
          {siteConfig.hero.eyebrow.split(" / ")[0]}
        </motion.div>
        <motion.div variants={contextLine2Variants} initial="hidden" animate="visible" className="ml-4">
          {siteConfig.hero.eyebrow.split(" / ").slice(1).join(" / ")}
        </motion.div>
      </div>

      <motion.div
        style={{ y: textY }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute top-[22%] md:top-[18%] left-[6vw] z-30 font-cormorant text-[#F5F0E8] flex flex-col"
      >
        <motion.div
          variants={mainTextLine1Variants}
          initial="hidden"
          animate="visible"
          className="text-[12vw] md:text-[11vw] font-light leading-[0.88] tracking-[-0.02em]"
        >
          {siteConfig.hero.title[0]}
        </motion.div>
        <motion.div
          variants={mainTextLine2Variants}
          initial="hidden"
          animate="visible"
          className="text-[14vw] md:text-[13vw] font-light leading-[0.88] tracking-[-0.02em] ml-[8vw] md:ml-[6vw]"
        >
          {siteConfig.hero.title[1]}
        </motion.div>
        <motion.div
          variants={mainTextLine3Variants}
          initial="hidden"
          animate="visible"
          className="text-[12vw] md:text-[11vw] font-light leading-[0.88] tracking-[-0.02em] ml-[15vw] md:ml-[12vw]"
        >
          {siteConfig.hero.title[2]}
        </motion.div>
      </motion.div>

      {/* Floating thumbnail tracking mouse */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={activeThumbnailSrc || "fallback"} // Will trigger enter/exit when this changes
            style={{
              left: smoothX,
              top: smoothY,
              x: "1rem", // Top left alignment with slight offset so cursor isn't completely eaten
              y: "1rem"
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 3, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 w-[42vw] h-[28vw] md:w-[22vw] md:h-[15vw] border border-[rgba(245,240,232,0.15)] shadow-[0_12px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none bg-[#C4622D] flex items-center justify-center origin-top-left"
          >
            {activeThumbnailSrc ? (
              <video
                ref={thumbVideoRef}
                src={activeThumbnailSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <span className="font-geist text-xs text-[#F5F0E8] z-10 font-light">Project Preview</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={bioVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-center font-geist font-light text-[10px] md:text-sm text-[#F5F0E8] w-[80%] md:w-auto"
      >
        <div className="opacity-60 tracking-[0.05em]">
          I build AI systems, automations & full-stack products.
        </div>
        <div className="mt-1 opacity-60 tracking-[0.05em]">
          Let&apos;s build something that scales.
        </div>
      </motion.div>

      {/* Bottom left corner */}
      <div className="absolute bottom-8 left-8 z-40 font-geist text-xs font-light opacity-40 text-[#F5F0E8]">
        2026 / Jaipur, IN
      </div>

      {/* Bottom right corner - scroll indicator */}
      <div className="absolute bottom-8 right-8 z-40 flex flex-col items-center gap-2">
        <div className="font-geist text-[10px] tracking-[0.2em] opacity-40 text-[#F5F0E8]">
          SCROLL
        </div>
        <div className="w-px h-12 bg-[rgba(255,255,255,0.3)] relative overflow-hidden">
          <motion.div
            variants={scrollIndicatorVariants}
            animate="animate"
            className="w-full h-1/2 bg-white absolute top-0 left-0"
          />
        </div>
      </div>
    </section>
  );
}
