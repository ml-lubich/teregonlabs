const offerings = [
  {
    name: "Teregon Aqua", category: "WATER PRACTICE", mark: "aqua",
    summary: "Water filtration and appliance service, with room to follow issues across products, teams, and places.",
    detail: "We configure manual-grounded troubleshooting, warranty workflows, service analytics, and watershed planning around the records a team already has.",
    delivers: ["Product and service support flows", "Water and watershed decision views"],
  },
  {
    name: "Teregon Oasis", category: "SUPPORT AUTOMATION", mark: "oasis",
    summary: "Give customers and service teams a grounded path through repeat product questions.",
    detail: "The configured assistant drafts replies from approved product and policy material, gathers case context, and routes exceptions to a person.",
    delivers: ["Manual-based troubleshooting", "Escalation and review paths"],
  },
  {
    name: "Teregon Aquifer", category: "KNOWLEDGE SEARCH", mark: "aquifer",
    summary: "Make trusted guidance easy to find, maintain, and trace back to its source.",
    detail: "A versioned knowledge base connects manuals, policies, and case history to search and grounded chat with visible citations.",
    delivers: ["Search and source references", "Maintained knowledge workflows"],
  },
  {
    name: "Teregon Zephyr", category: "WORKFLOW AGENTS", mark: "zephyr",
    summary: "Move repeatable business work through clear steps and accountable review.",
    detail: "Agents can gather records, summarize cases, and prepare structured actions, with deterministic checks and approval before consequential writes.",
    delivers: ["Workflow and integration design", "Deterministic checks and review"],
  },
  {
    name: "Teregon Equinox", category: "FORECASTING", mark: "equinox",
    summary: "Plan with CRM, product, and service data in one decision view.",
    detail: "Forecasts show service demand and customer or product trends alongside the assumptions and source data behind each estimate.",
    delivers: ["Forecasting and scenario views", "Data models and decision tools"],
  },
  {
    name: "Teregon Terra", category: "LAND SYSTEMS", mark: "terra",
    summary: "Connect environmental observations to the land, assets, and decisions around them.",
    detail: "Planning tools can bring field records, land cover, rainfall, and nearby assets into a shared place-based view. These are configured to the available data and use case.",
    delivers: ["Landscape and watershed views", "Data integration for planning"],
  },
];

const marks = [
  <svg key="aqua" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 5C18 14 11 21 11 29a13 13 0 0 0 26 0C37 21 30 14 24 5Z"/><path d="M17 30c0 4 3 7 7 8"/><circle cx="24" cy="29" r="19" opacity=".35"/></svg>,
  <svg key="oasis" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 24c5-9 11-13 16-13s11 4 16 13c-5 9-11 13-16 13S13 33 8 24Z"/><circle cx="24" cy="24" r="6"/><path d="M24 18v12M18 24h12"/></svg>,
  <svg key="aquifer" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 14h32M8 24h32M8 34h32"/><path d="M14 8v32M24 8v32M34 8v32"/><circle cx="24" cy="24" r="4" fill="currentColor" stroke="none"/></svg>,
  <svg key="zephyr" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M7 17h21c7 0 7-9 1-9-3 0-5 2-5 4M7 24h31c7 0 7 9 1 9-3 0-5-2-5-4M7 31h13"/></svg>,
  <svg key="equinox" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="16"/><path d="M8 24h32M24 8c6 5 6 27 0 32M24 8c-6 5-6 27 0 32"/></svg>,
  <svg key="terra" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M5 36c8-1 9-16 18-16s9 14 20 11M5 29c8-1 9-16 18-16 4 0 6 3 8 7M5 41c8-1 9-9 18-9 5 0 7 4 12 5"/></svg>,
];

export function ServiceOfferings() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {offerings.map((offer, index) => (
        <article key={offer.name} className="group flex h-full min-h-[290px] flex-col rounded-xl border border-white/15 bg-white/[.035] p-5 transition duration-500 hover:-translate-y-1 hover:border-[#bdd2ad66] hover:bg-white/[.07] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#bed0a3]">0{index + 1} / {offer.category}</p>
            <span className="service-offering-mark text-[#c5d89e] transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">{marks[index]}</span>
          </div>
          <h3 className="mt-4 text-2xl font-medium tracking-[-.05em]">{offer.name}</h3>
          <p className="mt-2 text-sm font-medium leading-6 text-[#e1e8dc]">{offer.summary}</p>
          <p className="mt-2 text-sm leading-6 text-[#c3d0c3]">{offer.detail}</p>
          <ul className="mt-auto grid gap-1.5 pt-5 font-mono text-[10px] uppercase tracking-[.08em] text-[#c1d0ba]">
            {offer.delivers.map((item) => <li key={item} className="border-t border-white/10 pt-2">{item}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

export { offerings };
