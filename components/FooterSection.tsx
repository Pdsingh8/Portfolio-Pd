"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#1A1714] relative overflow-hidden text-white pt-32 pb-12 border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#C4622D] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* CTA Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="font-geist text-[10px] tracking-[0.4em] text-[#C4622D] uppercase block mb-6">
              Availability
            </span>
            <h2 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-8">
              Open to new <em className="text-[#C4622D] italic">opportunities</em> and bold ideas.
            </h2>
            <p className="font-geist text-sm text-white/50 leading-relaxed max-w-md">
              Whether you need an AI agent that sells, or a complete full-stack web application, let's talk about how we can build it.
            </p>
          </div>

          <motion.a
            href="mailto:hello@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#C4622D] text-white flex-shrink-0 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <span className="font-geist text-[11px] tracking-widest uppercase relative z-10 group-hover:text-[#1A1714] transition-colors duration-500">
              Get in Touch
            </span>
            <div className="absolute inset-0 border border-[#C4622D] scale-[1.1] rounded-full group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </motion.a>
        </div>

        {/* Footer Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-geist text-[11px] uppercase tracking-widest text-white/40">
              Available for Freelance
            </span>
          </div>

          <div className="flex items-center gap-8">
            {["LinkedIn", "GitHub", "Twitter/X", "Read.cv"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-geist text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="font-geist text-[10px] uppercase tracking-widest text-white/20">
            &copy; {new Date().getFullYear()} Kartik Anand
          </div>

        </div>
      </div>
    </footer>
  );
}
