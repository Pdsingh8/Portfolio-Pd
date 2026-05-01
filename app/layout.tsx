import type { Metadata } from 'next';
import { cormorantGaramond, geist } from '@/lib/fonts';
import { siteConfig } from '@/lib/site';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${geist.variable} antialiased`}>
      <body className="min-h-screen bg-[#0D0C0B] text-[#F5F0E8] overflow-x-hidden font-sans relative">
        <SmoothScroll>
          {/* Global Grain Overlay — Low opacity for tactile feel without lag */}
          {/* Global Grain Overlay — Disabling this as feTurbulence is extremely CPU/GPU intensive and causes system lag */}
          {/* <div 
            className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]" 
            aria-hidden="true"
          >
            <svg width="100%" height="100%">
              <filter id="grainy-noise">
                <feTurbulence 
                  type="fractalNoise" 
                  baseFrequency="0.65" 
                  numOctaves="3" 
                  stitchTiles="stitch" 
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grainy-noise)" />
            </svg>
          </div> */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
