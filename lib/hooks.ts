import { useEffect, useRef, useState } from 'react';

/**
 * Hook to pause/play video based on intersection observer
 * Returns a ref to be attached to the video element and a visibility state
 */
export function useIntersectionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Silently handle autoplay block
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 } // Start playing when 10% is visible
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return { videoRef, isVisible };
}
