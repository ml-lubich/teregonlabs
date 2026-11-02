import Image from "next/image";
import Link from "next/link";
import { ProjectTimeline } from "../project-timeline";

const steps = [
  ["01", "Gather the case", "Collect Salesforce case details and the supporting context available to the workflow."],
  ["02", "Retrieve evidence", "A LangGraph flow retrieves relevant product and policy material and reads attached images."],
  ["03", "Draft an action", "The workflow prepares a structured proposed response or case update for review."],
  ["04", "Check before writing", "Deterministic Python gates validate writable fields; dry-run and safe-stop paths keep writes explicit."],
];

export function BriobotPage() {
  return (
    <div className="bg-[var(--paper)] text-[var(--ink)]">
      <section className="overflow-hidden bg-[linear-gradient(120deg,#12271f_0%,#173438_100%)] px-5 py-14 text-[#f1f4eb] sm:px-8 md:py-24 lg:px-[8vw]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-14">
          <div>
            <Link className="mb-10 inline-flex text-sm text-[#d2ddcf] hover:text-white" href="/#team-systems">← Back to Brio team work</Link>
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#c6d7aa]">PRIOR BRIO TEAM PRODUCT EXPERIENCE / SUPPORT OPERATIONS</p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-medium leading-[.94] tracking-[-.08em] sm:text-6xl md:text-7xl">BrioBot<br /><em className="font-serif font-normal text-[#c5d8a2]">case triage.</em></h1>
            <p className="mt-6 max-w-[48ch] text-base leading-7 text-[#d0dbd0]">A Salesforce e-commerce support workflow gathers case context, retrieves product and policy evidence, reads attached images, and drafts structured actions.</p>
            <p className="mt-5 max-w-[48ch] text-sm leading-6 text-[#b8c9bd]">This describes prior Brio team product work. It was not a Teregon client engagement.</p>
            <a className="mt-8 inline-flex min-h-12 items-center gap-7 rounded-md bg-[#e4ebdc] px-5 text-sm font-medium text-[#17271f]" href="#workflow">See the workflow <span aria-hidden="true">↓</span></a>
          </div>
          <figure className="relative m-0 min-h-[300px] overflow-hidden rounded-[1.4rem] border border-white/15 bg-[#10231e] shadow-[0_25px_80px_#07120e55] sm:min-h-[430px] md:min-h-[540px]">
            <Image src="/assets/mesh/briobot.webp" alt="Three-dimensional mesh representing a support case moving through evidence checks and review" fill priority sizes="(max-width: 767px) 100vw, 56vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1712d9] via-transparent to-[#10231e22]" />
            <figcaption className="absolute inset-x-5 bottom-5 flex flex-wrap justify-between gap-3 font-mono text-[9px] uppercase tracking-[.12em] text-white/85 sm:inset-x-7 sm:bottom-7"><span>SALESFORCE / SUPPORT FLOW</span><span>RETRIEVE → CHECK → REVIEW</span></figcaption>
          </figure>
        </div>
      </section>

      <ProjectTimeline
        eyebrow="PRIOR BRIO TEAM WORK / UNDATED STEPS"
        title="A case moves through evidence and checks."
        steps={[
          { title: "Gather the case", detail: "Collect Salesforce case details and available supporting context." },
          { title: "Retrieve evidence", detail: "Use LangGraph to find product and policy material and read attached images." },
          { title: "Prepare a proposal", detail: "Draft structured response or case-update fields for a person to review." },
          { title: "Validate the write", detail: "Python gates, dry-run and safe-stop paths, human review, and Langfuse traces bound the workflow." },
        ]}
      />

      <section id="workflow" className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="workflow-title">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-9 grid gap-5 md:grid-cols-[1fr_.7fr] md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">HOW THE WORKFLOW RUNS</p><h2 id="workflow-title" className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl">From a support case to a review-ready draft.</h2></div>
            <p className="max-w-[52ch] text-sm leading-7 text-[var(--muted)]">The model helps collect context and prepare a proposal. Deterministic checks and a person keep consequential Salesforce changes controlled.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, copy]) => (
              <article className="flex min-h-52 flex-col rounded-xl border border-[var(--line)] bg-[#f8f9f3] p-5 sm:p-6" key={number}>
                <span className="font-mono text-[10px] tracking-[.14em] text-[var(--moss)]">{number} / WORKFLOW</span>
                <h3 className="mt-7 text-xl font-medium tracking-[-.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8ede4] px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="controls-title">
        <div className="mx-auto grid max-w-[1320px] gap-9 md:grid-cols-[.8fr_1.2fr] md:gap-16">
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">CONTROLS AND TRACEABILITY</p><h2 id="controls-title" className="max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl">Keep proposed actions bounded.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-5"><h3 className="text-lg font-medium">Deterministic write gates</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Python validation checks allowed fields before an update can be written.</p></article>
            <article className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-5"><h3 className="text-lg font-medium">Dry-run and safe-stop</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">The workflow can prepare and inspect a change without committing it, and stop when a check fails.</p></article>
            <article className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-5"><h3 className="text-lg font-medium">Human review</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">A person remains in control of consequential case actions.</p></article>
            <article className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-5"><h3 className="text-lg font-medium">Langfuse tracing</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Traces make workflow behavior available for inspection and review.</p></article>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-20 lg:px-[8vw]" aria-labelledby="brio-context-title">
        <div className="mx-auto grid max-w-[1320px] gap-6 rounded-xl border border-[var(--line)] bg-[#f8f9f3] p-5 sm:p-8 md:grid-cols-[.5fr_1fr] md:gap-10 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">COMPANY CONTEXT</p>
          <div><h2 id="brio-context-title" className="text-2xl font-medium tracking-[-.05em]">A note on the reported figure</h2><p className="mt-3 text-sm leading-7 text-[var(--muted)]">The Brio team reported company-level ARR of approximately $240K at the time. This company revenue is not attributed to BrioBot.</p></div>
        </div>
      </section>

      <section className="bg-[linear-gradient(120deg,#142820_0%,#183438_100%)] px-5 py-16 text-[#f1f4eb] sm:px-8 md:py-20 lg:px-[8vw]">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#c4d5a8]">PRIOR BRIO TEAM WORK / NOT A TEREGON ENGAGEMENT</p><h2 className="mt-4 max-w-[15ch] text-3xl font-medium leading-[1.05] tracking-[-.06em] sm:text-4xl">Experience that informs our support automation work.</h2></div>
          <div className="flex flex-wrap gap-3"><Link className="inline-flex min-h-12 items-center gap-5 rounded-md bg-[#e4ebdc] px-4 text-sm font-medium text-[#17271f]" href="/water.html">Explore Teregon Aqua <span aria-hidden="true">↗</span></Link><Link className="inline-flex min-h-12 items-center gap-5 rounded-md border border-white/25 px-4 text-sm" href="/briopedia.html">See Briopedia <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </div>
  );
}
