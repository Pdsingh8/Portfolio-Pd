"use client";

import { motion } from "framer-motion";

const riskDimensions = [
  { label: "Client Suitability", score: 92, status: "Pass" },
  { label: "Market Conduct", score: 78, status: "Review" },
  { label: "Data Privacy", score: 95, status: "Pass" },
  { label: "AML / KYC", score: 61, status: "Risk" },
  { label: "Transaction Report.", score: 88, status: "Pass" },
  { label: "Record Keeping", score: 74, status: "Review" },
];

const requirements = [
  { id: "MiFID-II §27", match: 98, text: "Best execution policy" },
  { id: "FCA COBS 9A", match: 91, text: "Suitability assessment" },
  { id: "GDPR Art.30", match: 96, text: "Records of processing" },
  { id: "AML 6AMLD §3", match: 64, text: "Enhanced due diligence" },
];

const statusColor: Record<string, string> = {
  Pass: "#10a37f",
  Review: "#C4622D",
  Risk: "#ef4444",
};

export default function ComplianceMock() {
  return (
    <div className="w-full bg-[#0a0f0a] rounded-3xl border border-white/5 overflow-hidden font-geist">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-white/30 text-[11px] tracking-widest uppercase">Canopy — Compliance Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-white/20">MiFID II · FCA</span>
          <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] uppercase tracking-widest">2 Items Need Review</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Risk Dimensions */}
        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-5">Risk Score — 6 Dimensions</p>
          <div className="flex flex-col gap-3">
            {riskDimensions.map((d, i) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-[10px] text-white/50 w-36 flex-shrink-0 truncate">{d.label}</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: statusColor[d.status] }}
                  />
                </div>
                <span className="text-[10px] w-14 text-right flex-shrink-0 px-2 py-0.5 rounded-full border"
                  style={{ color: statusColor[d.status], borderColor: `${statusColor[d.status]}33` }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Matches */}
        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-5">Semantic Requirement Matches</p>
          <div className="flex flex-col gap-3">
            {requirements.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <div>
                  <p className="text-[10px] text-[#C4622D] mb-1">{r.id}</p>
                  <p className="text-[11px] text-white/60">{r.text}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-light" style={{ color: r.match >= 85 ? "#10a37f" : r.match >= 70 ? "#C4622D" : "#ef4444" }}>
                    {r.match}
                  </span>
                  <span className="text-[9px] text-white/20 uppercase tracking-widest">match</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Onboarding progress */}
        <div className="md:col-span-2 bg-white/[0.03] rounded-2xl p-5 border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] uppercase tracking-widest text-white/30">Dynamic Onboarding Engine — Question 23 of 55</p>
            <span className="text-[10px] text-white/20">~4 hrs remaining</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "42%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#C4622D] to-[#D69E7B]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
