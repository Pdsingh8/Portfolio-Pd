"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const channels = ["Website", "LinkedIn", "Email", "WhatsApp", "Typeform", "Calendly"];

const leads = [
  { name: "James Whitmore", company: "Acme Corp", intent: 98, tier: "High", channel: "LinkedIn", action: "Meeting Booked" },
  { name: "Sarah Chen", company: "Finova Ltd", intent: 82, tier: "Medium", channel: "Typeform", action: "Nurture Seq." },
  { name: "Marcus Reid", company: "BuildCo", intent: 71, tier: "Medium", channel: "Website", action: "Nurture Seq." },
  { name: "Priya Nair", company: "TechStack AI", intent: 96, tier: "High", channel: "Email", action: "Meeting Booked" },
];

const tierColor: Record<string, string> = {
  High: "#10a37f",
  Medium: "#C4622D",
  Low: "#6b7280",
};

export default function LeadPipelineMock() {
  const [activeLead, setActiveLead] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveLead((i) => (i + 1) % leads.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full bg-[#100d08] rounded-3xl border border-white/5 overflow-hidden font-geist">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-white/30 text-[11px] tracking-widest uppercase">Revenue Intelligence — Live Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-white/30 uppercase tracking-widest">500+ leads/mo · 0 manual</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Channel intake */}
        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Inbound Channels</p>
          <div className="flex flex-col gap-2">
            {channels.map((ch, i) => (
              <motion.div
                key={ch}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
              >
                <span className="text-[11px] text-white/60">{ch}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-70" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead scoring feed */}
        <div className="md:col-span-2 bg-white/[0.03] rounded-2xl p-5 border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Claude Intent Scoring — Live Feed</p>
          <div className="flex flex-col gap-3">
            {leads.map((lead, i) => (
              <motion.div
                key={lead.name}
                animate={{
                  borderColor: activeLead === i ? "rgba(196,98,45,0.4)" : "rgba(255,255,255,0.05)",
                  backgroundColor: activeLead === i ? "rgba(196,98,45,0.05)" : "rgba(255,255,255,0.02)",
                }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between p-3 rounded-xl border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-white/50">{lead.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/80">{lead.name}</p>
                    <p className="text-[10px] text-white/30">{lead.company} · {lead.channel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-light" style={{ color: tierColor[lead.tier] }}>{lead.intent}</span>
                    <span className="text-[9px] text-white/20 uppercase tracking-widest">intent</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full border whitespace-nowrap"
                    style={{ color: tierColor[lead.tier], borderColor: `${tierColor[lead.tier]}40` }}
                  >
                    {lead.action}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[{ label: "Response time", val: "8 min" }, { label: "Qualified mtgs", val: "3.2x" }, { label: "Scoring acc.", val: "89%" }].map((s) => (
              <div key={s.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/5 text-center">
                <p className="text-lg text-white/70 font-light">{s.val}</p>
                <p className="text-[9px] text-white/20 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
