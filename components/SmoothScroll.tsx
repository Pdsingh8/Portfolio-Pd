"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      // Prevent Lenis from handling scroll inside elements with data-lenis-prevent
      prevent: (node: Element) => node.hasAttribute("data-lenis-prevent"),
    });

    // Expose lenis instance globally so overlays can stop/start it
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return <>{children}</>;
}
