export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  seaImage?: string;
  accentColor: string;
  gradient: string;
  category: string;
  stats: Stat[];
  stack: string[];
  overview: string;
  process: {
    step: string;
    title: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "cross-llm",
    index: "01",
    title: "Cross-LLM Product Insight Platform",
    shortDesc: "Automated testing platform aggregating 5 LLM providers via real Android device automation",
    thumbnail: "/projects/cross-llm.jpg",
    seaImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    category: "AI Automation",
    stats: [
      { value: "70%", label: "Less analysis time" },
      { value: "37%", label: "Faster test cycles" },
      { value: "94%", label: "Session success rate" },
      { value: "5", label: "LLM providers unified" },
    ],
    stack: ["Next.js", "TypeScript", "n8n", "BrowserStack", "PostgreSQL"],
    overview: "A unified platform that simultaneously tests 5 LLM providers — GPT, Claude, Gemini, Deepseek, Grok — on real Android devices via BrowserStack automation. Built a comparison dashboard that normalizes cross-provider outputs, eliminating spreadsheet-based analysis workflows entirely.",
    process: [
      {
        step: "01",
        title: "Problem",
        description: "Client needed to compare outputs across 5 LLM providers manually — a 6-hour daily process involving spreadsheets and manual device testing."
      },
      {
        step: "02",
        title: "Architecture",
        description: "Designed a parallelized BrowserStack session executor that runs all 5 providers simultaneously on real Android devices, with a multi-step auth flow automation achieving 94% success rate."
      },
      {
        step: "03",
        title: "Dashboard",
        description: "Built a unified comparison dashboard normalizing and visualizing cross-provider outputs with side-by-side scoring, cutting manual analysis time by 70%."
      },
      {
        step: "04",
        title: "Result",
        description: "Reduced total test cycle time by 37% through parallelization. Client now runs full LLM comparison reports in under 2 hours vs 6 previously."
      }
    ]
  },
  {
    id: "regulatory",
    index: "02",
    title: "Regulatory Financial Compliance Platform",
    shortDesc: "Intelligent MiFID II & FCA compliance platform cutting onboarding from 3 days to 4 hours",
    thumbnail: "/projects/regulatory.jpg",
    seaImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #0d1f0d 0%, #1a3a1a 100%)",
    category: "FinTech / Compliance",
    stats: [
      { value: "80%", label: "Faster onboarding" },
      { value: "91%", label: "Semantic match accuracy" },
      { value: "90%", label: "Less deployment time" },
      { value: "5x", label: "Faster risk detection" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Neo4j", "Pinecone"],
    overview: "An intelligent compliance platform automating MiFID II and FCA regulatory requirement mapping. Engineered a dynamic onboarding engine with 55+ conditional questions via JSON-driven logic, integrated Pinecone vector search with Neo4j graph modeling to map 100+ regulatory requirements.",
    process: [
      {
        step: "01",
        title: "Problem",
        description: "Financial clients spent 3 days on manual compliance onboarding — reviewing 100+ regulatory requirements against their operations with zero automation."
      },
      {
        step: "02",
        title: "Intelligence Layer",
        description: "Integrated Pinecone vector search with Neo4j graph modeling to semantically map regulatory requirements, achieving 91% match accuracy on compliance queries via custom RAG pipeline."
      },
      {
        step: "03",
        title: "Dynamic Engine",
        description: "Built a 55+ question onboarding engine driven entirely by JSON logic — no hardcoded branching. Rule changes deploy in minutes, not days. 90% reduction in deployment time."
      },
      {
        step: "04",
        title: "Result",
        description: "Onboarding time cut from 3 days to 4 hours. Real-time risk dashboard scoring across 6 regulatory dimensions surfaces high-risk gaps 5x faster than manual review."
      }
    ]
  },
  {
    id: "revenue-intelligence",
    index: "03",
    title: "Autonomous Revenue Intelligence System",
    shortDesc: "End-to-end agentic pipeline qualifying leads across 6 channels with zero human touch",
    thumbnail: "/projects/revenue.jpg",
    seaImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #2d1810 0%, #4a2510 100%)",
    category: "Revenue Operations",
    stats: [
      { value: "97%", label: "Faster lead response" },
      { value: "3.2x", label: "More qualified meetings" },
      { value: "89%", label: "Lead scoring accuracy" },
      { value: "500+", label: "Leads/month automated" },
    ],
    stack: ["n8n", "Claude API", "Pinecone", "Supabase", "Next.js", "TypeScript"],
    overview: "An end-to-end agentic pipeline intercepting leads from 6 channels — website, LinkedIn, email, WhatsApp, Typeform, Calendly. Multi-layer AI scoring engine built on Claude analyzes intent signals, company size, tech stack fit, and behavioral patterns. Zero human touch until a discovery call is booked.",
    process: [
      {
        step: "01",
        title: "Problem",
        description: "Sales team spending 4+ hours daily manually qualifying leads from 6 different channels with inconsistent scoring and slow response times losing warm leads."
      },
      {
        step: "02",
        title: "Agentic Pipeline",
        description: "Built n8n orchestration layer intercepting all 6 inbound channels, normalizing lead data, then passing through Claude-powered multi-layer scoring: intent signals, company fit, behavioral patterns."
      },
      {
        step: "03",
        title: "RAG Context Engine",
        description: "Integrated Pinecone knowledge base with company and product context. Claude uses RAG to personalize outreach for each lead tier — high intent gets immediate calendar booking, medium gets nurture sequence."
      },
      {
        step: "04",
        title: "Result",
        description: "Lead response time dropped from 4 hours to 8 minutes. 3.2x increase in qualified meeting bookings. 500+ leads processed monthly with zero manual intervention."
      }
    ]
  },
  {
    id: "ai-calling-agent",
    index: "04",
    title: "Conversational AI Voice Agent",
    shortDesc: "Hyper-realistic voice agents handling inbound support and outbound lead qualification.",
    thumbnail: "",
    seaImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)",
    category: "Voice AI",
    stats: [
      { value: "<500ms", label: "Response latency" },
      { value: "24/7", label: "Availability" },
      { value: "100%", label: "CRM Sync" },
      { value: "0", label: "Manual handoffs" },
    ],
    stack: ["OpenAI TTS", "WebSockets", "Next.js", "Deepgram"],
    overview: "Deploy hyper-realistic voice agents that handle inbound support, outbound lead qualification, and appointment setting. Sub-500ms latency, human-like interruptions, and seamless CRM integrations.",
    process: [
      { step: "01", title: "Integration", description: "Seamless WebSocket integration for real-time low latency streaming." },
      { step: "02", title: "Execution", description: "Human-like interruptions and natural conversational flow with dynamic RAG context." },
      { step: "03", title: "Handoff", description: "Automatic call summary generation and live transfer to human agents if intent requires." },
      { step: "04", title: "Result", description: "Zero missed inbound calls. Outbound campaigns scale infinitely without headcount." }
    ]
  },
  {
    id: "rag-pipeline",
    index: "05",
    title: "Agentic RAG Document Intelligence",
    shortDesc: "Document ingestion → Pinecone embedding → Claude answers with source citations.",
    thumbnail: "",
    seaImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)",
    category: "AI Automation",
    stats: [
      { value: "91%", label: "Semantic accuracy" },
      { value: "10k+", label: "Docs ingested" },
      { value: "100%", label: "Source cited" },
      { value: "24/7", label: "Uptime" },
    ],
    stack: ["Pinecone", "Claude", "Supabase", "n8n"],
    overview: "Document ingestion → Pinecone embedding → Claude agent answers with source citations → Supabase storage. Full RAG loop, zero manual steps.",
    process: [
      { step: "01", title: "Ingestion", description: "Auto-syncs with Google Drive and Notion." },
      { step: "02", title: "Embedding", description: "Chunks and vectorizes docs into Pinecone." },
      { step: "03", title: "Retrieval", description: "Claude uses strict citations based on retrieved context." },
      { step: "04", title: "Result", description: "Hallucination-free document QA." }
    ]
  },
  {
    id: "multi-llm",
    index: "06",
    title: "Multi-LLM Evaluation Engine",
    shortDesc: "Parallel prompts to 5 LLMs simultaneously → Claude judge scores each response.",
    thumbnail: "",
    seaImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #1f1a2e 0%, #2e1a3a 100%)",
    category: "AI Automation",
    stats: [
      { value: "70%", label: "Less analysis time" },
      { value: "5", label: "Models tested" },
      { value: "1", label: "Unified report" },
      { value: "100%", label: "Automated" },
    ],
    stack: ["GPT-4", "Claude", "Gemini", "n8n"],
    overview: "Parallel prompts to 5 LLMs simultaneously → Claude judge scores each response → comparison report auto-generated → delivered to Notion workspace.",
    process: [
      { step: "01", title: "Parallel Execution", description: "Broadcasts prompt to GPT, Claude, Gemini, Deepseek, Grok." },
      { step: "02", title: "Judging", description: "Claude-as-a-judge scores responses against rubric." },
      { step: "03", title: "Reporting", description: "Aggregates scores into a Notion database." },
      { step: "04", title: "Result", description: "70% less time spent evaluating prompt changes." }
    ]
  },
  {
    id: "lead-enrichment",
    index: "07",
    title: "Intelligent Lead-to-CRM Enrichment",
    shortDesc: "Apollo.io enrichment → Claude intent scoring → Calendly booking triggered.",
    thumbnail: "",
    seaImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #1a2e1f 0%, #1a3a2a 100%)",
    category: "Revenue Operations",
    stats: [
      { value: "97%", label: "Faster response" },
      { value: "6", label: "Channels" },
      { value: "100%", label: "Enriched" },
      { value: "24/7", label: "Scoring" },
    ],
    stack: ["Apollo.io", "Claude", "Calendly", "Supabase"],
    overview: "6-channel lead capture → Apollo.io enrichment → Claude intent scoring → Calendly booking triggered → full context pushed to Supabase CRM.",
    process: [
      { step: "01", title: "Capture", description: "Hooks into 6 inbound channels." },
      { step: "02", title: "Enrichment", description: "Pulls firmographic data from Apollo." },
      { step: "03", title: "Scoring", description: "Claude scores intent based on payload." },
      { step: "04", title: "Result", description: "Warm leads booked immediately, cold leads nurtured." }
    ]
  },
  {
    id: "compliance-monitor",
    index: "08",
    title: "Regulatory Compliance Agent",
    shortDesc: "Daily FCA feed scraper → Claude extracts changes → Neo4j graph updated.",
    thumbnail: "",
    seaImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#C4622D",
    gradient: "linear-gradient(135deg, #2e1a1a 0%, #3a1a1a 100%)",
    category: "FinTech / Compliance",
    stats: [
      { value: "80%", label: "Faster updates" },
      { value: "100%", label: "Coverage" },
      { value: "Daily", label: "Scraping" },
      { value: "24/7", label: "Monitoring" },
    ],
    stack: ["Neo4j", "Claude", "Python", "n8n"],
    overview: "Daily FCA/MiFID II feed scraper → Claude extracts changes → Neo4j graph updated → affected clients identified via graph traversal → alerts sent.",
    process: [
      { step: "01", title: "Scraping", description: "Monitors regulatory RSS and PDF feeds." },
      { step: "02", title: "Extraction", description: "Claude converts unstructured legal text to JSON." },
      { step: "03", title: "Graph Update", description: "Merges new rules into Neo4j ontology." },
      { step: "04", title: "Result", description: "Clients alerted to compliance risk dynamically." }
    ]
  }
];

export interface AutomationFlow {
  id: string
  index: string
  title: string
  shortDesc: string
  stat: string
  statLabel: string
  screenshot: string
  tags: string[]
  gradient: string
  partA: string
  partB: string
}

export const automationFlows: AutomationFlow[] = [
  {
    id: "rag-pipeline",
    index: "01",
    title: "Agentic RAG Document Intelligence",
    shortDesc: "Document ingestion → Pinecone embedding → Claude agent answers with source citations → Supabase storage. Full RAG loop, zero manual steps.",
    stat: "91%",
    statLabel: "Semantic match accuracy",
    screenshot: "",
    tags: ["RAG", "Pinecone", "Claude", "Supabase"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)",
    partA: "Agentic RAG",
    partB: "Intelligence"
  },
  {
    id: "multi-llm",
    index: "02",
    title: "Multi-LLM Evaluation & Scoring Engine",
    shortDesc: "Parallel prompts to 5 LLMs simultaneously → Claude judge scores each response → comparison report auto-generated → delivered to Notion workspace.",
    stat: "70%",
    statLabel: "Less analysis time",
    screenshot: "",
    tags: ["GPT-4", "Claude", "Gemini", "Parallel Execution"],
    gradient: "linear-gradient(135deg, #1f1a2e 0%, #2e1a3a 100%)",
    partA: "Multi-LLM",
    partB: "Scoring Engine"
  },
  {
    id: "lead-enrichment",
    index: "03",
    title: "Intelligent Lead-to-CRM Enrichment",
    shortDesc: "6-channel lead capture → Apollo.io enrichment → Claude intent scoring → Calendly booking triggered → full context pushed to Supabase CRM.",
    stat: "97%",
    statLabel: "Faster lead response",
    screenshot: "",
    tags: ["Apollo.io", "Claude", "Calendly", "Supabase"],
    gradient: "linear-gradient(135deg, #1a2e1f 0%, #1a3a2a 100%)",
    partA: "Lead-to-CRM",
    partB: "Enrichment"
  },
  {
    id: "compliance-monitor",
    index: "04",
    title: "Regulatory Compliance Monitoring Agent",
    shortDesc: "Daily FCA/MiFID II feed scraper → Claude extracts changes → Neo4j graph updated → affected clients identified via graph traversal → alerts sent.",
    stat: "80%",
    statLabel: "Faster compliance updates",
    screenshot: "",
    tags: ["Neo4j", "Claude", "MiFID II", "Graph Traversal"],
    gradient: "linear-gradient(135deg, #2e1a1a 0%, #3a1a1a 100%)",
    partA: "Compliance",
    partB: "Monitoring Agent"
  }
];
