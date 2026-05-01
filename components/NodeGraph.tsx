"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NodeDef = {
  id: string;
  label: string;
  sublabel?: string;
  xFrac: number; // 0–1 fraction of container
  yFrac: number;
  color: string;
  icon: React.ReactNode;
};

type EdgeDef = { from: string; to: string; color: string; delay: number };
type PopupDef = { nodeId: string; delay: number; content: string; color: string };
type FlowConfig = { nodes: NodeDef[]; edges: EdgeDef[]; popups: PopupDef[] };

// ---- Icons ----
const Ico = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={d} /></svg>
);
const WebhookIco = () => <Ico d="m18 15-6-6-6 6" />;
const BrainIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/>
  </svg>
);
const DBIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
  </svg>
);
const SearchIco = () => <Ico d="M21 21l-4.35-4.35M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z" />;
const FileIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const GraphIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const CalIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const BellIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SendIco = () => <Ico d="m22 2-7 20-4-9-9-4ZM22 2 11 13" />;
const ChartIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

// ---- Flow Definitions ----
const flows: Record<string, FlowConfig> = {
  "rag-pipeline": {
    nodes: [
      { id: "trigger", label: "Drive Sync", xFrac: 0.08, yFrac: 0.5, color: "#C4622D", icon: <WebhookIco /> },
      { id: "chunk", label: "Chunk", sublabel: "+ Embed", xFrac: 0.32, yFrac: 0.5, color: "#D69E7B", icon: <FileIco /> },
      { id: "pinecone", label: "Pinecone", xFrac: 0.58, yFrac: 0.28, color: "#7C3AED", icon: <DBIco /> },
      { id: "claude", label: "Claude 3.5", xFrac: 0.58, yFrac: 0.72, color: "#D69E7B", icon: <BrainIco /> },
      { id: "store", label: "Supabase", xFrac: 0.84, yFrac: 0.5, color: "#10a37f", icon: <DBIco /> },
    ],
    edges: [
      { from: "trigger", to: "chunk", color: "#C4622D", delay: 0 },
      { from: "chunk", to: "pinecone", color: "#7C3AED", delay: 1.2 },
      { from: "chunk", to: "claude", color: "#D69E7B", delay: 1.2 },
      { from: "pinecone", to: "store", color: "#10a37f", delay: 2.5 },
      { from: "claude", to: "store", color: "#10a37f", delay: 2.5 },
    ],
    popups: [
      { nodeId: "trigger", delay: 400, content: '{"docs": 42, "source": "drive"}', color: "#C4622D" },
      { nodeId: "pinecone", delay: 1800, content: "1536-dim · upserted", color: "#7C3AED" },
      { nodeId: "claude", delay: 1800, content: '"3 citations found"', color: "#D69E7B" },
      { nodeId: "store", delay: 3100, content: "201 · match: 91%", color: "#10a37f" },
    ],
  },
  "multi-llm": {
    nodes: [
      { id: "prompt", label: "Prompt", xFrac: 0.08, yFrac: 0.5, color: "#C4622D", icon: <WebhookIco /> },
      { id: "gpt", label: "GPT-4o", xFrac: 0.35, yFrac: 0.15, color: "#10a37f", icon: <BrainIco /> },
      { id: "claude", label: "Claude", xFrac: 0.35, yFrac: 0.38, color: "#D69E7B", icon: <BrainIco /> },
      { id: "gemini", label: "Gemini", xFrac: 0.35, yFrac: 0.62, color: "#4285F4", icon: <BrainIco /> },
      { id: "deepseek", label: "Deepseek", xFrac: 0.35, yFrac: 0.85, color: "#7C3AED", icon: <BrainIco /> },
      { id: "judge", label: "Judge", sublabel: "Claude", xFrac: 0.65, yFrac: 0.5, color: "#D69E7B", icon: <ChartIco /> },
      { id: "notion", label: "Notion", xFrac: 0.9, yFrac: 0.5, color: "#C4622D", icon: <FileIco /> },
    ],
    edges: [
      { from: "prompt", to: "gpt", color: "#10a37f", delay: 0 },
      { from: "prompt", to: "claude", color: "#D69E7B", delay: 0 },
      { from: "prompt", to: "gemini", color: "#4285F4", delay: 0 },
      { from: "prompt", to: "deepseek", color: "#7C3AED", delay: 0 },
      { from: "gpt", to: "judge", color: "#D69E7B", delay: 1.5 },
      { from: "claude", to: "judge", color: "#D69E7B", delay: 1.5 },
      { from: "gemini", to: "judge", color: "#D69E7B", delay: 1.5 },
      { from: "deepseek", to: "judge", color: "#D69E7B", delay: 1.5 },
      { from: "judge", to: "notion", color: "#C4622D", delay: 3.0 },
    ],
    popups: [
      { nodeId: "gpt", delay: 500, content: "score: 94", color: "#10a37f" },
      { nodeId: "claude", delay: 600, content: "score: 98 ★", color: "#D69E7B" },
      { nodeId: "gemini", delay: 700, content: "score: 87", color: "#4285F4" },
      { nodeId: "deepseek", delay: 800, content: "score: 82", color: "#7C3AED" },
      { nodeId: "notion", delay: 3500, content: "Report pushed ✓", color: "#C4622D" },
    ],
  },
  "lead-enrichment": {
    nodes: [
      { id: "webhook", label: "Typeform", xFrac: 0.08, yFrac: 0.5, color: "#C4622D", icon: <WebhookIco /> },
      { id: "apollo", label: "Apollo.io", sublabel: "Enrich", xFrac: 0.32, yFrac: 0.5, color: "#4285F4", icon: <SearchIco /> },
      { id: "claude", label: "Claude", sublabel: "Score", xFrac: 0.56, yFrac: 0.5, color: "#D69E7B", icon: <BrainIco /> },
      { id: "calendly", label: "Calendly", xFrac: 0.82, yFrac: 0.22, color: "#10a37f", icon: <CalIco /> },
      { id: "supabase", label: "Supabase", sublabel: "CRM", xFrac: 0.82, yFrac: 0.5, color: "#10a37f", icon: <DBIco /> },
      { id: "notify", label: "Notify", xFrac: 0.82, yFrac: 0.78, color: "#C4622D", icon: <SendIco /> },
    ],
    edges: [
      { from: "webhook", to: "apollo", color: "#C4622D", delay: 0 },
      { from: "apollo", to: "claude", color: "#4285F4", delay: 1.2 },
      { from: "claude", to: "calendly", color: "#10a37f", delay: 2.4 },
      { from: "claude", to: "supabase", color: "#10a37f", delay: 2.4 },
      { from: "claude", to: "notify", color: "#C4622D", delay: 2.4 },
    ],
    popups: [
      { nodeId: "webhook", delay: 400, content: '{"company":"Acme","size":200}', color: "#C4622D" },
      { nodeId: "apollo", delay: 1600, content: "ARR: $4.2M · Series B", color: "#4285F4" },
      { nodeId: "claude", delay: 2800, content: "intent: 97 → HIGH", color: "#D69E7B" },
      { nodeId: "calendly", delay: 3200, content: "Meeting booked ✓", color: "#10a37f" },
    ],
  },
  "compliance-monitor": {
    nodes: [
      { id: "feed", label: "FCA Feed", sublabel: "Daily", xFrac: 0.08, yFrac: 0.5, color: "#C4622D", icon: <WebhookIco /> },
      { id: "claude", label: "Claude", sublabel: "Extract", xFrac: 0.32, yFrac: 0.5, color: "#D69E7B", icon: <BrainIco /> },
      { id: "neo4j", label: "Neo4j", sublabel: "Graph", xFrac: 0.58, yFrac: 0.3, color: "#7C3AED", icon: <GraphIco /> },
      { id: "traverse", label: "Traverse", sublabel: "Affected", xFrac: 0.58, yFrac: 0.7, color: "#4285F4", icon: <SearchIco /> },
      { id: "alert", label: "Alert", xFrac: 0.84, yFrac: 0.5, color: "#ef4444", icon: <BellIco /> },
    ],
    edges: [
      { from: "feed", to: "claude", color: "#C4622D", delay: 0 },
      { from: "claude", to: "neo4j", color: "#7C3AED", delay: 1.3 },
      { from: "claude", to: "traverse", color: "#4285F4", delay: 1.3 },
      { from: "neo4j", to: "alert", color: "#ef4444", delay: 2.8 },
      { from: "traverse", to: "alert", color: "#ef4444", delay: 2.8 },
    ],
    popups: [
      { nodeId: "feed", delay: 400, content: "MiFID-II §27 updated", color: "#C4622D" },
      { nodeId: "claude", delay: 1700, content: '{"rule":"best_exec","delta":3}', color: "#D69E7B" },
      { nodeId: "neo4j", delay: 3000, content: "4 nodes merged", color: "#7C3AED" },
      { nodeId: "alert", delay: 3500, content: "7 clients flagged ⚠", color: "#ef4444" },
    ],
  },
};

// ---- Bezier path between two points ----
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cp = Math.abs(x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`;
}

// ---- Main Component ----
export default function NodeGraph({ flowType = "rag-pipeline" }: { flowType?: string }) {
  const config = flows[flowType] ?? flows["rag-pipeline"];
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRefs = useRef<number[]>([]);
  const [edges, setEdges] = useState<{ d: string; color: string; delay: number }[]>([]);
  const [pulses, setPulses] = useState<{ d: string; delay: number }[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [activePopups, setActivePopups] = useState<Set<string>>(new Set());

  // Compute edge paths from actual DOM positions
  const computeEdges = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();

    const computed = config.edges.map((edge) => {
      const fromEl = nodeRefs.current[edge.from];
      const toEl = nodeRefs.current[edge.to];
      if (!fromEl || !toEl) return null;
      const fR = fromEl.getBoundingClientRect();
      const tR = toEl.getBoundingClientRect();
      // right-center of source → left-center of target
      const x1 = fR.right - cRect.left;
      const y1 = fR.top + fR.height / 2 - cRect.top;
      const x2 = tR.left - cRect.left;
      const y2 = tR.top + tR.height / 2 - cRect.top;
      return { d: bezier(x1, y1, x2, y2), color: edge.color, delay: edge.delay };
    }).filter(Boolean) as { d: string; color: string; delay: number }[];

    setEdges(computed);
    setPulses(computed.map((e) => ({ d: e.d, delay: e.delay })));
  }, [config]);

  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      computeEdges();
    });
    const ro = new ResizeObserver(computeEdges);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", computeEdges);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", computeEdges);
    };
  }, [computeEdges]);

  useEffect(() => {
    setIsTesting(false);
    setActivePopups(new Set());
    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutRefs.current = [];
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, [flowType]);

  const handleTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    setActivePopups(new Set());
    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutRefs.current = [];
    config.popups.forEach(({ nodeId, delay }) => {
      const timeoutId = window.setTimeout(() => {
        setActivePopups((previous) => new Set([...previous, nodeId]));
      }, delay);
      timeoutRefs.current.push(timeoutId);
    });
    const maxDelay = Math.max(...config.popups.map((p) => p.delay));
    const resetTimeoutId = window.setTimeout(() => {
      setIsTesting(false);
      setActivePopups(new Set());
      timeoutRefs.current = [];
    }, maxDelay + 2200);
    timeoutRefs.current.push(resetTimeoutId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0e0e0e] rounded-3xl border border-white/5 overflow-hidden"
      style={{ height: 360 }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      {/* SVG edges — pixel space, no viewBox */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          {edges.map((e, i) => (
            <linearGradient key={i} id={`eg-${flowType}-${i}`} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={e.color} stopOpacity="0.15" />
              <stop offset="40%" stopColor={e.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={e.color} stopOpacity="0.15" />
            </linearGradient>
          ))}
        </defs>
        {edges.map((e, i) => (
          <motion.path
            key={`${flowType}-${i}-${isTesting}`}
            d={e.d}
            fill="none"
            stroke={`url(#eg-${flowType}-${i})`}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={isTesting ? { pathLength: 1, opacity: 1 } : { pathLength: 0.15, opacity: 0.3 }}
            transition={{ duration: 1.1, delay: isTesting ? e.delay : 0, ease: "easeInOut" }}
          />
        ))}
        {/* Data pulses */}
        {isTesting && pulses.map((p, i) => (
          <motion.circle key={`pulse-${i}`} r="4" fill="white" style={{ filter: `drop-shadow(0 0 4px ${edges[i]?.color ?? "#C4622D"})` }}>
            <animateMotion dur="1.1s" begin={`${p.delay}s`} repeatCount="1" path={p.d} />
          </motion.circle>
        ))}
      </svg>

      {/* Nodes */}
      {config.nodes.map((node) => {
        const popup = config.popups.find((p) => p.nodeId === node.id);
        const isActive = activePopups.has(node.id);
        return (
          <div
            key={node.id}
            ref={(el) => { nodeRefs.current[node.id] = el; }}
            className="absolute flex flex-col items-center gap-1.5"
            style={{
              left: `${node.xFrac * 100}%`,
              top: `${node.yFrac * 100}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            {/* Node box */}
            <motion.div
              className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center border relative"
              style={{
                background: `${node.color}18`,
                borderColor: `${node.color}50`,
                color: node.color,
                boxShadow: isActive ? `0 0 18px ${node.color}50` : "none",
                transition: "box-shadow 0.4s",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              {node.icon}
              {/* Right output port */}
              <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-[#0e0e0e]"
                style={{ background: node.color, opacity: 0.8 }} />
              {/* Left input port */}
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-white/15 border-2 border-[#0e0e0e]" />
            </motion.div>
            <span className="font-geist text-[9px] text-white/50 uppercase tracking-widest whitespace-nowrap">{node.label}</span>
            {node.sublabel && <span className="font-geist text-[8px] text-white/25 uppercase tracking-widest -mt-1 whitespace-nowrap">{node.sublabel}</span>}

            {/* Popup */}
            <AnimatePresence>
              {isActive && popup && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  className="absolute top-full mt-3 z-30 pointer-events-none"
                  style={{ minWidth: 130 }}
                >
                  <div className="px-3 py-2 rounded-xl border backdrop-blur-md"
                    style={{ background: `${popup.color}12`, borderColor: `${popup.color}50` }}
                  >
                    <pre className="font-mono text-[8px] leading-relaxed whitespace-pre-wrap m-0" style={{ color: popup.color }}>
                      {popup.content}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Test button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={handleTest}
          disabled={isTesting}
          className="px-4 py-2 bg-[#C4622D]/10 hover:bg-[#C4622D]/20 text-[#C4622D] border border-[#C4622D]/30 rounded-full font-geist text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-40"
        >
          {isTesting ? (
            <><span className="w-1.5 h-1.5 rounded-full bg-[#C4622D] animate-pulse" />Executing...</>
          ) : (
            <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>Test Workflow</>
          )}
        </button>
      </div>
    </div>
  );
}
