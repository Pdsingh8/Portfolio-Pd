"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface VideoItem {
  id: string;
  src: string;
  orientation: "portrait" | "landscape";
  label: string;
  tool: string;
}

const videos: VideoItem[] = [
  { id: "v1", src: "/assets/video-1.mp4", orientation: "portrait", label: "Fashion Campaign", tool: "Kling AI" },
  { id: "v2", src: "/assets/video-2.mp4", orientation: "landscape", label: "Cinematic Reel", tool: "Runway" },
  { id: "v3", src: "/assets/video-3.mp4", orientation: "portrait", label: "Editorial Portrait", tool: "Higgsfield" },
  { id: "v4", src: "/assets/video-4.mp4", orientation: "landscape", label: "Product Showcase", tool: "Veo 3" },
  { id: "v5", src: "/assets/video-5.mp4", orientation: "portrait", label: "Luxury Brand", tool: "Kling AI" },
  { id: "v6", src: "/assets/video-6.mp4", orientation: "landscape", label: "Lifestyle Ad", tool: "Runway" },
  { id: "v7", src: "/assets/video-7.mp4", orientation: "portrait", label: "Campaign Visual", tool: "Higgsfield" },
  { id: "v8", src: "/assets/video-8.mp4", orientation: "landscape", label: "Cinematic Scene", tool: "Veo 3" },
];

interface VideoCardProps {
  video: VideoItem;
  parallaxAmount: number;
  className?: string;
}

function VideoCard({ video, parallaxAmount, className = "" }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxAmount]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {
      // Ignore autoplay block errors silently
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Overlay — visible always, stronger on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.3 : 0.5 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0D0C0B 0%, transparent 60%)" }}
      />

      {/* Bottom label */}
      <motion.div
        animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end"
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "4px"
            }}
          >
            {video.tool}
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.2vw",
              fontWeight: 300,
              color: "white",
              lineHeight: 1
            }}
          >
            {video.label}
          </p>
        </div>

        {/* Play indicator */}
        <motion.div
          animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center p-0 flex-shrink-0"
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "8px solid white",
              marginLeft: "3px" // to center visually
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function AIVideosSection() {
  return (
    <section
      className="w-full px-8 md:px-16 py-32"
      style={{ background: "#F5F0E8" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-24"
      >
        <div className="flex justify-between items-baseline mb-6">
          <span
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C4622D",
              opacity: 0.7
            }}
          >
            AI VIDEOS & ADS
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "11px",
              color: "rgba(26,23,20,0.3)"
            }}
          >
            (08)
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "7vw",
            fontWeight: 300,
            color: "#1A1714",
            lineHeight: 1.05
          }}
        >
          Visuals that
          <br />
          <em style={{ fontStyle: "italic", color: "#C4622D" }}>don&apos;t </em>
          look AI.
        </h2>

        {/* Tools used */}
        <div className="flex items-center gap-3 mt-8 flex-wrap">
          <span
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(26,23,20,0.3)"
            }}
          >
            Generated with
          </span>
          {["Kling AI", "Runway", "Higgsfield", "Veo 3"].map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C4622D",
                border: "1px solid rgba(196,98,45,0.3)",
                background: "rgba(196,98,45,0.05)",
                padding: "4px 12px",
                borderRadius: "9999px"
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 w-full grid-flow-dense">
          
          {/* Featured Landscape (2x2) */}
          <VideoCard
            video={videos[1]}
            parallaxAmount={0}
            className="md:col-span-2 md:row-span-2 w-full h-full"
          />

          {/* Portrait 1 (1x2) */}
          <VideoCard
            video={videos[0]}
            parallaxAmount={0}
            className="md:col-span-1 md:row-span-2 w-full h-full"
          />

          {/* Portrait 2 (1x2) */}
          <VideoCard
            video={videos[2]}
            parallaxAmount={0}
            className="md:col-span-1 md:row-span-2 w-full h-full"
          />

          {/* Portrait 3 (1x2) */}
          <VideoCard
            video={videos[4]}
            parallaxAmount={0}
            className="md:col-span-1 md:row-span-2 w-full h-full"
          />

          {/* Portrait 4 (1x2) */}
          <VideoCard
            video={videos[6]}
            parallaxAmount={0}
            className="md:col-span-1 md:row-span-2 w-full h-full"
          />

          {/* Wide Landscape (2x1) */}
          <VideoCard
            video={videos[7]}
            parallaxAmount={0}
            className="md:col-span-2 md:row-span-1 w-full h-full"
          />

          {/* Small Landscape 1 (1x1) */}
          <VideoCard
            video={videos[3]}
            parallaxAmount={0}
            className="md:col-span-1 md:row-span-1 w-full h-full"
          />

          {/* Small Landscape 2 (1x1) */}
          <VideoCard
            video={videos[5]}
            parallaxAmount={0}
            className="md:col-span-1 md:row-span-1 w-full h-full"
          />
          
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="w-full h-px mt-32"
        style={{ background: "rgba(26,23,20,0.1)" }}
      />
    </section>
  );
}
