import HeroSection from "@/components/HeroSection";
import StackSection from "@/components/StackSection";
import CircularSection from "@/components/CircularSection";
import ProjectsSection from "@/components/ProjectsSection";
import AIVideosSection from "@/components/AIVideosSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection 
        bgVideos={[
          "/assets/bg.mp4",
          "/assets/video-1.mp4",
          "/assets/video-2.mp4",
          "/assets/video-3.mp4",
          "/assets/video-4.mp4"
        ]} 
        thumbnailVideos={[
          "/assets/thumbnail.mp4",
          "/assets/video-5.mp4",
          "/assets/video-6.mp4",
          "/assets/video-7.mp4",
          "/assets/video-8.mp4",
          "/assets/video-9.mp4",
          "/assets/video-10.mp4"
        ]} 
      />
      <CircularSection videoSrc="/assets/bg.mp4" />
      <ProjectsSection />
      <StackSection />
      <AIVideosSection />
      <FooterSection />
    </main>
  );
}
