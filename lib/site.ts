export const siteConfig = {
  title: "Portfolio | AI Engineer & Product Designer",
  description: "Cinematic portfolio for an AI engineer building automations, agentic systems, and full-stack products.",
  location: "Jaipur, IN",
  availability: "Available for select builds",
  hero: {
    eyebrow: "AI Engineer / Product Designer / Automation Architect",
    title: ["AI SYSTEMS.", "AUTOMATIONS.", "PRODUCTS."],
    summary: "I design and ship AI workflows, internal tools, and product experiences that let a lean team move like a much bigger one.",
    support: "From evaluation pipelines and compliance engines to lead-gen automation and cinematic AI creative.",
    stats: [
      { value: "8+", label: "client builds" },
      { value: "23", label: "tools in rotation" },
      { value: "100%", label: "automated" },
    ],
  },
  nav: [
    { label: "Tools", href: "#tools" },
    { label: "Systems", href: "#systems" },
    { label: "Work", href: "#work" },
    { label: "Videos", href: "#videos" },
  ],
} as const;
