import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function Slide({ number, eyebrow, title, dark = false, children }: {
  number: string;
  eyebrow: string;
  title?: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={`slide-${number}`} className={`scroll-mt-24 overflow-hidden rounded-3xl border border-[var(--line)] p-7 shadow-sm md:min-h-[65vh] md:p-12 ${dark ? "bg-[var(--dark)] text-[var(--paper-light)]" : "bg-[var(--paper-light)] text-[var(--ink)]"}`}>
      <p className="eyebrow">{eyebrow}</p>
      {title && <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[.98] tracking-[-.07em] md:text-6xl">{title}</h2>}
      {children}
      <p className={`mt-10 border-t pt-4 font-mono text-[10px] uppercase tracking-[.12em] ${dark ? "border-white/20 text-white/60" : "border-[var(--line)] text-[var(--muted)]"}`}>TEREGON LABS / 2026 · {number} / 09</p>
    </section>
  );
}

const offers = [
  ["Teregon Oasis", "Support automation for water and product teams."],
  ["Teregon Aquifer", "Grounded search across manuals, policies, and case history."],
  ["Teregon Zephyr", "Agents for repeatable service and business workflows."],
  ["Teregon Equinox", "Forecasting and planning from CRM, product, and service data."],
  ["Teregon Terra", "Land and watershed systems for exploring connected conditions."],
];

export function PitchDeckPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 md:gap-8 md:px-8 md:py-10" aria-label="Teregon Labs studio deck">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[var(--dark)] px-5 py-4 text-[var(--paper-light)]">
        <p className="font-mono text-xs uppercase tracking-[.14em]">TEREGON LABS / STUDIO DECK</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <nav aria-label="Case-study presentations" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/75">
            <Link href="/eria.html">ERIA case study</Link>
            <Link href="/brio-bot-deck.html">BrioBot presentation</Link>
            <Link href="/briopedia-deck.html">Briopedia presentation</Link>
          </nav>
          <a className="button button-light" href="/assets/teregon-labs-pitch-deck.pdf" download>Download PDF <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <Slide number="01" eyebrow="APPLIED AI / CUSTOM SOFTWARE" dark title={<>Software<br />that <em className="font-serif text-[var(--green)]">flows.</em></>}>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_.9fr]">
          <p className="max-w-xl text-lg leading-8 text-white/75">Applied AI and custom software for business workflows, with a focused practice for water systems.</p>
          <Image className="max-h-72 w-full rounded-2xl object-cover opacity-80" src="/assets/mesh/ai-workflow.webp" width={1536} height={1024} alt="Three-dimensional mesh showing information moving through an AI workflow" priority />
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wider text-white/65"><span>AI ASSISTANTS</span><span>WORKFLOW AUTOMATION</span><span>CUSTOM SOFTWARE</span></div>
      </Slide>

      <Slide number="02" eyebrow="TEREGON LABS / HOW THE STUDIO IS ORGANIZED" title={<>One studio.<br /><em className="font-serif text-[var(--moss)]">Two practices.</em></>}>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-[var(--dark)] p-6 text-[var(--paper-light)]"><p className="eyebrow text-[var(--green)]">PARENT STUDIO</p><h3 className="mt-4 text-2xl">Teregon</h3><p className="mt-3 leading-7 text-white/70">The studio behind Teregon Labs and Teregon Aqua.</p></article>
          <article className="rounded-2xl border border-[var(--line)] bg-white/50 p-6"><p className="eyebrow">AI + SOFTWARE</p><h3 className="mt-4 text-2xl">Teregon Labs</h3><p className="mt-3 leading-7 text-[var(--muted)]">Custom AI assistants, workflow automation, data tools, integrations, and production software.</p></article>
          <article className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6"><p className="eyebrow">WATER PRACTICE</p><h3 className="mt-4 text-2xl">Teregon Aqua</h3><p className="mt-3 leading-7 text-[var(--muted)]">Water-product support, service operations, and watershed systems.</p></article>
        </div>
      </Slide>

      <Slide number="03" eyebrow="CONFIGURABLE SERVICE OFFERINGS" title={<>AI and software<br /><em className="font-serif text-[var(--moss)]">for specific work.</em></>}>
        <p className="mt-5 max-w-3xl leading-7 text-[var(--muted)]">We configure these services around each team’s tools and process. They are offerings we build, not five standalone products.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map(([name, description]) => <article className="rounded-2xl border border-[var(--line)] bg-white/55 p-5" key={name}><h3 className="text-lg font-medium">{name}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p></article>)}
        </div>
      </Slide>

      <Slide number="04" eyebrow="LIVE CLIENT WEBSITE BUILDS" title={<>Two client websites.<br /><em className="font-serif text-[var(--moss)]">Both live.</em></>}>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/60">
            <a href="https://www.eria.co/" target="_blank" rel="noreferrer"><Image className="aspect-[1.8] w-full object-cover" src="/assets/project-eria.jpg" width={1440} height={960} alt="Current ERIA Events website homepage" /></a>
            <div className="p-5"><p className="eyebrow">HOSPITALITY / EVENTS · LIVE</p><h3 className="mt-3 text-2xl">ERIA Events</h3><p className="mt-2 leading-7 text-[var(--muted)]">Venue discovery, event stories, and press context lead to private-event and corporate inquiries.</p><p className="mt-4 font-mono text-xs text-[var(--muted)]">NEXT.JS · REACT · SANITY CMS</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2"><Link className="underline underline-offset-4" href="/eria.html">Read the case study ↗</Link><a className="underline underline-offset-4" href="https://www.eria.co/" target="_blank" rel="noreferrer">Visit live site ↗</a></div></div>
          </article>
          <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/60">
            <a href="https://www.w3sourcing.com/" target="_blank" rel="noreferrer"><Image className="aspect-[1.8] w-full object-cover" src="/assets/project-w3sourcing.jpg" width={1440} height={960} alt="Current W3 Sourcing website homepage" /></a>
            <div className="p-5"><p className="eyebrow">EXECUTIVE SEARCH · LIVE</p><h3 className="mt-3 text-2xl">W3 Sourcing</h3><p className="mt-2 leading-7 text-[var(--muted)]">Practice pages explain methodology, results, and leadership context before a direct inquiry.</p><p className="mt-4 font-mono text-xs text-[var(--muted)]">NEXT.JS · REACT · TYPESCRIPT</p><a className="mt-4 inline-block underline underline-offset-4" href="https://www.w3sourcing.com/" target="_blank" rel="noreferrer">Visit w3sourcing.com ↗</a></div>
          </article>
        </div>
      </Slide>

      <Slide number="05" eyebrow="PRIOR BRIO TEAM EXPERIENCE / BRIOBOT" dark title={<>BrioBot<br /><em className="font-serif text-[var(--green)]">support case triage.</em></>}>
        <div className="mt-6 grid items-center gap-7 md:grid-cols-[.8fr_1.2fr]">
          <Image className="w-full rounded-2xl border border-white/15 object-cover" src="/assets/mesh/briobot.webp" width={1200} height={900} alt="Three-dimensional workflow path through support evidence checks and human review" />
          <div><p className="leading-7 text-white/75">A Salesforce e-commerce support workflow gathers case context, retrieves product and policy evidence, reads attached images, and drafts structured actions.</p><ul className="mt-5 space-y-2 text-sm leading-6 text-white/75"><li>LangGraph gathers context, retrieves evidence, and proposes updates.</li><li>Deterministic Python checks validate writable fields.</li><li>Dry-run, safe-stop, and Langfuse traces support human review.</li></ul><p className="mt-5 rounded-xl border border-white/20 bg-white/5 p-4 text-sm leading-6"><b>Company-level context:</b> approximately $240K ARR at the time, as reported by the team. This revenue is not attributed to BrioBot.</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link className="underline underline-offset-4" href="/brio-bot-deck.html">Open BrioBot presentation ↗</Link><a className="underline underline-offset-4" href="/assets/case-studies/teregon-brio-bot-case-study.pdf" download>Download BrioBot PDF ↗</a></div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-white/60">PRIOR BRIO TEAM PRODUCT EXPERIENCE · NOT A TEREGON CLIENT ENGAGEMENT</p>
      </Slide>

      <Slide number="06" eyebrow="PRIOR BRIO TEAM EXPERIENCE / BRIOPEDIA" title={<>Briopedia<br /><em className="font-serif text-[var(--moss)]">support knowledge system.</em></>}>
        <div className="mt-6 grid items-center gap-7 md:grid-cols-[.8fr_1.2fr]">
          <Image className="w-full rounded-2xl border border-[var(--line)] object-cover" src="/assets/mesh/briopedia.webp" width={1200} height={900} alt="Three-dimensional knowledge book and source links for grounded support answers" />
          <div><p className="leading-7 text-[var(--muted)]">An internal knowledge system paired a git-backed wiki with FAISS retrieval and local or cloud LLM chat. Answers used retrieved source material; the wiki kept editable history.</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><span className="rounded-xl border border-[var(--line)] p-3 text-sm">Git-backed source</span><span className="rounded-xl border border-[var(--line)] p-3 text-sm">FAISS retrieval</span><span className="rounded-xl border border-[var(--line)] p-3 text-sm">Local + cloud LLM</span></div><p className="mt-5 rounded-xl border border-[var(--line)] bg-white/50 p-4 text-sm leading-6 text-[var(--muted)]"><b>Company-level context:</b> approximately $2M ARR now, as reported by the team. This revenue is not attributed to Briopedia.</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link className="underline underline-offset-4" href="/briopedia-deck.html">Open Briopedia presentation ↗</Link><a className="underline underline-offset-4" href="/assets/case-studies/teregon-briopedia-case-study.pdf" download>Download Briopedia PDF ↗</a></div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">PRIOR BRIO TEAM PRODUCT EXPERIENCE · NOT A TEREGON CLIENT ENGAGEMENT</p>
      </Slide>

      <Slide number="07" eyebrow="ILLUSTRATIVE WATER + WATERSHED CONCEPTS" title={<>Water and watershed<br /><em className="font-serif text-[var(--moss)]">planning concepts.</em></>}>
        <p className="mt-5 max-w-3xl leading-7 text-[var(--muted)]">Illustrative studies combine river observations, rainfall, land cover, and local assets. These are concepts, not deployed products.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2"><article className="rounded-2xl bg-[var(--dark)] p-6 text-white"><p className="eyebrow text-[var(--green)]">WATERSHED / ILLUSTRATIVE</p><h3 className="mt-4 text-2xl">Watershed data view</h3><p className="mt-3 leading-7 text-white/70">Combine land cover, rainfall, stream observations, and nearby assets to explore upstream-to-downstream connections.</p></article><article className="rounded-2xl bg-[var(--dark)] p-6 text-white"><p className="eyebrow text-[var(--green)]">RIVER FLOW / ILLUSTRATIVE</p><h3 className="mt-4 text-2xl">River observations</h3><p className="mt-3 leading-7 text-white/70">Bring rainfall, tributary, and stream observations together to explore changes along a river system.</p></article></div>
      </Slide>

      <Slide number="08" eyebrow="HOW WE WORK" title={<>From workflow<br /><em className="font-serif text-[var(--moss)]">to production.</em></>}>
        <p className="mt-5 max-w-3xl leading-7 text-[var(--muted)]">Scope a real task, build a small working system, deploy it with clear controls, and measure the result.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["01 / SCOPE", "Understand the workflow, sources, constraints, and owner."], ["02 / BUILD", "Connect data, models, interfaces, and checks."], ["03 / DEPLOY", "Put the tool into the process with clear permissions and failure paths."], ["04 / MEASURE", "Compare results against an agreed baseline."]].map(([step, copy]) => <article className="rounded-2xl border border-[var(--line)] bg-white/55 p-5" key={step}><p className="eyebrow">{step}</p><p className="mt-4 leading-6 text-[var(--muted)]">{copy}</p></article>)}</div>
        <p className="mt-6 border-t border-[var(--line)] pt-4 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">No outcome numbers without a verified baseline.</p>
      </Slide>

      <Slide number="09" eyebrow="TEREGON LABS / APPLIED AI + SOFTWARE" dark title={<>Start with a<br /><em className="font-serif text-[var(--green)]">real workflow.</em></>}>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">Tell us what your team is trying to automate, connect, or improve.</p>
        <a className="mt-7 inline-flex rounded-xl bg-[var(--paper)] px-5 py-4 font-medium text-[var(--ink)]" href="mailto:hello@teregonlabs.com?subject=Talk%20with%20Teregon">hello@teregonlabs.com ↗</a>
      </Slide>
    </div>
  );
}
