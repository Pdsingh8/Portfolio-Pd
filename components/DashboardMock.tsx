"use client";

import { motion } from "framer-motion";

const providers = [
  { name: "GPT-4o", score: 94, color: "#10a37f", latency: "1.2s", tokens: "1,842" },
  { name: "Claude 3.5", score: 98, color: "#D69E7B", latency: "0.9s", tokens: "2,103" },
  { name: "Gemini Pro", score: 87, color: "#4285F4", latency: "1.8s", tokens: "1,674" },
  { name: "Deepseek", score: 82, color: "#7C3AED", latency: "2.1s", tokens: "1,531" },
  { name: "Grok", score: 79, color: "#e7e8ea", latency: "2.4s", tokens: "1,288" },
];

const testRows = [
  { id: "#T-041", prompt: "Summarize Q3 earnings call...", status: "Complete", duration: "4.2s" },
  { id: "#T-042", prompt: "Extract action items from...", status: "Running", duration: "—" },
  { id: "#T-043", prompt: "Classify sentiment of review...", status: "Queued", duration: "—" },
];

export default function DashboardMock() {
  return (
    <div className="w-full bg-[#0f0f0f] rounded-3xl border border-white/5 overflow-hidden font-geist">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-white/30 text-[11px] tracking-widest uppercase">LLM Comparison Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white/30 text-[10px] uppercase tracking-widest">5 Providers Active</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score bars */}
        <div className="md:col-span-2 bg-white/[0.03] rounded-2xl p-5 border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-5">Quality Score — Latest Run</p>
          <div className="flex flex-col gap-4">
            {providers.map((p, i) => (
              <div key={p.name} className="flex items-center gap-4">
                <span className="text-[11px] text-white/60 w-20 flex-shrink-0">{p.name}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: p.color }}
                  />
                </div>
                <span className="text-[11px] w-8 text-right flex-shrink-0" style={{ color: p.color }}>{p.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Avg Latency</p>
            <p className="text-3xl text-white/80 font-light">1.68<span className="text-lg text-white/30">s</span></p>
          </div>
          <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Tests Today</p>
            <p className="text-3xl text-white/80 font-light">41</p>
          </div>
          <div className="bg-[#C4622D]/10 rounded-2xl p-5 border border-[#C4622D]/20 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-[#C4622D]/70 mb-2">Best Model</p>
            <p className="text-xl text-[#C4622D] font-light">Claude 3.5</p>
          </div>
        </div>

        {/* Test queue */}
        <div className="md:col-span-3 bg-white/[0.03] rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 flex justify-between">
            <p className="text-[10px] uppercase tracking-widest text-white/30">Test Queue</p>
            <p className="text-[10px] uppercase tracking-widest text-white/20">BrowserStack — Android Real Devices</p>
          </div>
          {testRows.map((row, i) => (
            <div key={row.id} className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-0">
              <span className="text-[11px] text-white/40 w-14">{row.id}</span>
              <span className="text-[11px] text-white/60 flex-1 truncate px-4">{row.prompt}</span>
              <span className="text-[10px] px-3 py-1 rounded-full border text-[10px]"
                style={{
                  color: row.status === "Complete" ? "#10a37f" : row.status === "Running" ? "#C4622D" : "rgba(255,255,255,0.3)",
                  borderColor: row.status === "Complete" ? "rgba(16,163,127,0.3)" : row.status === "Running" ? "rgba(196,98,45,0.3)" : "rgba(255,255,255,0.1)"
                }}
              >
                {row.status === "Running" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C4622D] animate-pulse mr-1.5 -mb-[1px]" />}
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
