"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

const capabilities = [
  {
    number: "01",
    label: "APPLIED AI",
    title: "Assistants grounded in your work",
    copy: "Search approved knowledge, summarize records, and prepare answers or actions for review.",
    image: "/assets/mesh/ai-workflow.webp",
    alt: "Three-dimensional mesh with luminous points moving across a flowing information landscape",
  },
  {
    number: "02",
    label: "WORKFLOW AUTOMATION",
    title: "Less manual handoff",
    copy: "Connect CRM, support, product, and operating records to repeatable team workflows.",
    image: "/assets/mesh/briobot.webp",
    alt: "Abstract three-dimensional mesh representing a checked workflow",
  },
  {
    number: "03",
    label: "CUSTOM SOFTWARE",
    title: "Tools that fit the process",
    copy: "Build internal tools, integrations, and production web software around how a team works.",
    image: "/assets/mesh/briopedia.webp",
    alt: "Abstract three-dimensional mesh representing connected knowledge",
  },
];

const offers = [
  ["Teregon Aqua", "Water filtration and appliance support, service operations, and watershed systems."],
  ["Teregon Oasis", "Support automation configured for water and product teams."],
  ["Teregon Aquifer", "Grounded search across manuals, policies, and case history."],
  ["Teregon Zephyr", "Agents for repeatable service and business operations workflows."],
  ["Teregon Equinox", "Forecasting and planning from CRM, product, and service data."],
  ["Teregon Terra", "Land and watershed systems for exploring connected conditions."],
];

const caseStudies = [
  {
    title: "BrioScope",
    category: "PRIOR BRIO TEAM EXPERIENCE / CUSTOMER OPERATIONS",
    summary: "A shared view of recurring customer support issues.",
    detail: "BrioScope brings support events together so teams can compare issue patterns over time and see what customers are reporting.",
    image: "/assets/mesh/brioscope.webp",
    alt: "Three-dimensional mesh grouping customer support events into issue patterns",
    href: "mailto:hello@teregonlabs.com?subject=Discuss%20BrioScope",
  },
  {
    title: "BrioBot",
    category: "PRIOR BRIO TEAM EXPERIENCE / SUPPORT OPERATIONS",
    summary: "Salesforce case context, evidence retrieval, and a draft action.",
    detail: "A support workflow gathers the case, retrieves product and policy evidence, reads attached images, then drafts structured actions for review.",
    image: "/assets/mesh/briobot.webp",
    alt: "Three-dimensional workflow mesh for support evidence checks and human review",
    href: "/briobot.html",
    note: "Company-level ARR was reported at approximately $240K at the time. This revenue is not attributed to BrioBot.",
  },
  {
    title: "Briopedia",
    category: "PRIOR BRIO TEAM EXPERIENCE / KNOWLEDGE SYSTEMS",
    summary: "A git-backed support library with search and grounded chat.",
    detail: "A support wiki paired editable source material with FAISS retrieval and local or cloud LLM chat. Answers used retrieved material; the wiki kept a reviewable history.",
    image: "/assets/mesh/briopedia.webp",
    alt: "Three-dimensional knowledge mesh representing a support library and source links",
    href: "/briopedia.html",
    note: "Company-level ARR is reported by the team at approximately $2M now. This revenue is not attributed to Briopedia.",
  },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-scroll-reveal
      className={`translate-y-5 opacity-0 transition duration-700 ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}

function WaterDropMotion() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLSpanElement>(null);
  const ringsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const drop = dropRef.current;
    const rings = ringsRef.current;
    if (!stage || !drop || rings.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setRestingState = () => {
      drop.style.opacity = "1";
      drop.style.transform = "translate(-50%, -50%) rotate(-45deg) scale(.9)";
      rings.forEach((ring, index) => {
        ring.style.opacity = index === 0 ? ".7" : index === 1 ? ".38" : ".2";
        ring.style.transform = `translate(-50%, -50%) scale(${1 + index * .22}, .62)`;
      });
    };

    if (reducedMotion.matches || !("animate" in drop)) {
      setRestingState();
      return;
    }

    const duration = 3600;
    const fall = Math.round(Math.min(stage.clientHeight * 0.43, 180));
    const animations: Animation[] = [drop.animate([
      { offset: 0, opacity: 0, transform: "translate(-50%, -50%) translateY(-12px) rotate(-45deg) scale(.65)" },
      { offset: 0.08, opacity: 1, transform: "translate(-50%, -50%) translateY(0) rotate(-45deg) scale(.85)" },
      { offset: 0.55, opacity: 1, transform: `translate(-50%, -50%) translateY(${fall}px) rotate(-45deg) scale(.85)` },
      { offset: 0.62, opacity: 0, transform: `translate(-50%, -50%) translateY(${fall + 12}px) rotate(-45deg) scale(.55)` },
      { offset: 1, opacity: 0, transform: `translate(-50%, -50%) translateY(${fall + 12}px) rotate(-45deg) scale(.55)` },
    ], { duration, iterations: Infinity, easing: "linear" })];

    rings.forEach((ring, index) => {
      const delay = index * 110;
      animations.push(ring.animate([
        { offset: 0, opacity: 0, transform: "translate(-50%, -50%) scale(.12, .12)" },
        { offset: 0.56 + delay / duration, opacity: 0, transform: "translate(-50%, -50%) scale(.12, .12)" },
        { offset: 0.64 + delay / duration, opacity: index === 0 ? .8 : .55, transform: "translate(-50%, -50%) scale(.72, .42)" },
        { offset: 0.84 + delay / duration, opacity: 0, transform: "translate(-50%, -50%) scale(1.42, .78)" },
        { offset: 1, opacity: 0, transform: "translate(-50%, -50%) scale(1.42, .78)" },
      ], { duration, iterations: Infinity, easing: "ease-out" }));
    });

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      animations.forEach((animation) => animation.cancel());
      setRestingState();
    };
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div ref={stageRef} className="relative min-h-[300px] overflow-hidden rounded-[1.4rem] border border-white/15 shadow-[0_25px_70px_#07120e55] sm:min-h-[400px]">
      <Image src="/assets/water-droplet-pond.webp" alt="A water droplet falling into a forest pond and forming ripples" fill sizes="(max-width: 767px) 100vw, 52vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#091b17e6] via-transparent to-[#0a181633]" />
      <span ref={dropRef} aria-hidden="true" className="absolute left-1/2 top-[18%] z-10 h-6 w-6 rounded-bl-[70%] rounded-br-[50%] rounded-tl-[50%] rounded-tr-[8%] border border-[#c4e9f2] bg-[#7ac4d6]/90 shadow-[0_0_28px_#60b8cbcc]" />
      {Array.from({ length: 3 }, (_, index) => <span key={index} ref={(element) => { if (element) ringsRef.current[index] = element; }} aria-hidden="true" className="absolute left-1/2 top-[61%] z-10 h-14 w-28 rounded-[50%] border border-[#a6dfec]/75 shadow-[0_0_20px_#55b0c766]" />)}
      <span className="absolute bottom-5 left-5 z-20 font-mono text-[10px] uppercase tracking-[.15em] text-white/90 sm:bottom-7 sm:left-7">WATER / SERVICE SYSTEMS</span>
      <span className="sr-only">The droplet falls, lands on the pond, and sends expanding ripples across the surface.</span>
    </div>
  );
}

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const heroMeshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopPointer = window.matchMedia("(min-width: 801px) and (hover: hover) and (pointer: fine)");
    const targets = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");

    let observer: IntersectionObserver | undefined;
    if (reducedMotion || !desktopPointer.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => { target.dataset.revealed = "true"; });
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
      observer = revealObserver;
      targets.forEach((target) => revealObserver.observe(target));
    }

    if (reducedMotion || !desktopPointer.matches) return () => observer?.disconnect();

    const hero = heroRef.current;
    const visual = heroVisualRef.current;
    const mesh = heroMeshRef.current;
    if (!hero || !visual || !mesh) return () => observer?.disconnect();

    const handleMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.translate = `${x * -7}px ${y * -6}px`;
      mesh.style.translate = `${x * 13}px ${y * 10}px`;
    };
    const reset = () => {
      visual.style.translate = "0 0";
      mesh.style.translate = "0 0";
    };

    hero.addEventListener("pointermove", handleMove, { passive: true });
    hero.addEventListener("pointerleave", reset, { passive: true });
    return () => {
      observer?.disconnect();
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="w-full">
      <section ref={heroRef} className="hero hero-home">
        <div ref={heroVisualRef} className="hero-visual" role="img" aria-label="Conceptual aerial watershed terrain with an overlaid AI signal mesh">
          <canvas id="terrain" aria-hidden="true" />
          <div ref={heroMeshRef} className="hero-ai-mesh" aria-hidden="true">
            <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="meshLine" x1="0" x2="1">
                  <stop stopColor="#b8d1a0" stopOpacity="0" />
                  <stop offset=".5" stopColor="#d4e8bc" stopOpacity=".68" />
                  <stop offset="1" stopColor="#a7c88c" stopOpacity="0" />
                  <animate attributeName="x1" values="-.4;.4;-.4" dur="14s" repeatCount="indefinite" />
                  <animate attributeName="x2" values=".6;1.4;.6" dur="14s" repeatCount="indefinite" />
                </linearGradient>
                <radialGradient id="nodeGlow">
                  <stop stopColor="#e1f2c9" stopOpacity=".85" />
                  <stop offset="1" stopColor="#d6edba" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g fill="none" stroke="url(#meshLine)" strokeWidth="1">
                <path d="M58 410 154 325 247 362 350 228 451 272 550 154 653 208 765 105 880 145" />
                <path d="M48 478 154 390 260 427 350 302 464 350 550 228 665 280 765 182 870 220" />
                <path d="M82 544 180 460 284 495 378 379 484 420 580 313 688 359 790 270 890 308" />
                <path d="M154 325 154 390 180 460M247 362 260 427 284 495M350 228 350 302 378 379M451 272 464 350 484 420M550 154 550 228 580 313M653 208 665 280 688 359M765 105 765 182 790 270" />
                <path d="m58 410 96-20m93-28 103-60m114-30 86-44m115-22 100-43" strokeDasharray="2 8" />
              </g>
              <g fill="url(#nodeGlow)">
                <circle cx="350" cy="228" r="34" />
                <circle cx="550" cy="154" r="44" />
                <circle cx="765" cy="105" r="30" />
              </g>
              <g fill="#d9edc1">
                <circle cx="350" cy="228" r="2.5" />
                <circle cx="550" cy="154" r="3" />
                <circle cx="765" cy="105" r="2.5" />
              </g>
            </svg>
          </div>
          <div className="visual-shade" />
          <div className="visual-note">WATER SYSTEMS / CONCEPT</div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow mb-7">APPLIED AI / SOFTWARE STUDIO</p>
          <h1 className="max-w-[12ch] text-[clamp(3.5rem,7.8vw,7.4rem)] font-medium leading-[.91] tracking-[-.085em]" aria-label="Software that flows.">
            <span className="hero-prefix block whitespace-nowrap">Software that</span>
            <span className="hero-word-cycle" aria-hidden="true">
              <span>flows.</span>
              <span>connects.</span>
              <span>adapts.</span>
              <span>works.</span>
            </span>
          </h1>
          <p className="lede mt-7 max-w-[45ch] text-base leading-7 text-[#d2ddd4] sm:text-lg sm:leading-8">
            Teregon Labs builds custom AI and software for business workflows: support assistants, workflow automation, data tools, integrations, and production software. Teregon Aqua is our focused practice for water-product service.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-5">
            <Link className="inline-flex min-h-14 items-center justify-between gap-8 rounded-md bg-[#e4ebdc] px-5 text-sm font-medium text-[#17271f] transition hover:-translate-y-0.5 hover:bg-white" href="#selected-work">Selected work <span aria-hidden="true">↘</span></Link>
            <a className="inline-flex min-h-12 items-center gap-3 text-sm text-[#e3e9df] transition hover:text-[#c5d89e]" href="mailto:hello@teregonlabs.com?subject=Talk%20with%20Teregon">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[.14em] text-[#aab9aa]">AI ASSISTANTS · AUTOMATION · CUSTOM SOFTWARE</p>
        </div>
      </section>

      <section className="bg-[var(--paper)] px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]">
        <Reveal>
          <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-[.65fr_1.35fr] md:gap-12">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">WHAT WE BUILD</p>
            <div>
              <h2 className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">Custom AI and business software.</h2>
              <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <p className="max-w-[68ch] text-[15px] leading-7 text-[var(--muted)]">We connect models, company knowledge, and existing systems to specific tasks: customer support, internal search, case handling, forecasts, and the software around them.</p>
                <Link className="shrink-0 border-b border-[var(--line)] pb-2 text-sm hover:text-[var(--water-deep)]" href="/approach.html">How we work <span className="ml-3 text-[var(--moss)]">↗</span></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[#e9ede4] px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="capabilities-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">CAPABILITIES</p><h2 id="capabilities-title" className="max-w-[18ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl">Build, connect, and put AI to work.</h2></div>
            <Link className="border-b border-[var(--line)] pb-2 text-sm" href="/work.html">All capabilities <span className="ml-3 text-[var(--moss)]">↗</span></Link>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((capability) => (
              <Reveal key={capability.number} className="h-full">
                <Link href={`/work.html#${capability.number === "01" ? "ai" : capability.number === "02" ? "data" : "build"}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_48px_#18231d14]">
                  <div className="relative aspect-[1.8] overflow-hidden bg-[#142923]">
                    <Image src={capability.image} alt={capability.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#10231dbb] px-3 py-2 font-mono text-[9px] tracking-[.12em] text-[#e7eddf]">{capability.number} / {capability.label}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-xl font-medium tracking-[-.04em]">{capability.title}</h3>
                    <p className="mt-3 max-w-[38ch] text-sm leading-6 text-[var(--muted)]">{capability.copy}</p>
                    <span className="mt-auto self-end pt-6 text-lg text-[var(--moss)] transition group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="offerings" className="scroll-mt-24 bg-[linear-gradient(120deg,#142820_0%,#183438_100%)] px-5 py-16 text-[#f2f4ec] sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="offerings-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-9 grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#c5d5ab]">TEREGON LABS / SERVICE OFFERINGS</p><h2 id="offerings-title" className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">Configured for a team’s tools and work.</h2></div>
            <p className="max-w-[50ch] text-sm leading-7 text-[#c6d2c5]">These are named services we configure and build with each team. They are not standalone off-the-shelf products. Teregon Aqua is our focused water practice.</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map(([name, copy], index) => (
              <Reveal key={name} className="h-full">
                <article className="flex h-full min-h-44 flex-col rounded-xl border border-white/15 bg-white/[.035] p-5 transition duration-500 hover:-translate-y-1 hover:border-[#bdd2ad66] hover:bg-white/[.07] sm:p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[.15em] text-[#bed0a3]">0{index + 1} / {index === 0 ? "PRACTICE" : "CONFIGURABLE OFFERING"}</p>
                  <h3 className="mt-5 text-2xl font-medium tracking-[-.05em]">{name}</h3>
                  <p className="mt-2 max-w-[38ch] text-sm leading-6 text-[#c3d0c3]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="selected-work" className="scroll-mt-24 bg-[var(--paper)] px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="projects-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">LIVE CLIENT WEBSITE BUILDS</p><h2 id="projects-title" className="max-w-[15ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">Recent work in production.</h2></div>
            <p className="max-w-[40ch] text-sm leading-6 text-[var(--muted)]">Two live websites for different businesses, each built around its content and inquiry path.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <ProjectCard
                title="ERIA Events"
                url="https://www.eria.co/"
                image="/assets/project-eria.jpg"
                alt="Screenshot of the live ERIA Events website"
                eyebrow="HOSPITALITY / EVENTS · CLIENT BUILD"
                body="Built and deployed a responsive, Sanity-backed site for ERIA’s Bay Area venues and experiences. Venue discovery, event stories, and press context lead to private-event and corporate inquiries."
                tags={["VENUE DISCOVERY", "EVENT STORIES", "INQUIRY JOURNEY"]}
                stack="NEXT.JS · REACT · SANITY CMS"
              />
            </Reveal>
            <Reveal className="h-full">
              <ProjectCard
                title="W3 Sourcing"
                url="https://www.w3sourcing.com/"
                image="/assets/project-w3sourcing.jpg"
                alt="Screenshot of the live W3 Sourcing website"
                eyebrow="EXECUTIVE SEARCH · CLIENT WEBSITE"
                body="Built and deployed a responsive site for a principal-led search firm. Practice pages connect its methodology, results, and leadership context to a direct inquiry path."
                tags={["PRACTICE PAGES", "METHODOLOGY + RESULTS", "DIRECT INQUIRY"]}
                stack="NEXT.JS · REACT · TYPESCRIPT"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#e8ede4] px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="brio-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-8 grid gap-5 md:grid-cols-[1fr_.65fr] md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">PRIOR BRIO TEAM PRODUCT EXPERIENCE</p><h2 id="brio-title" className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl">Support and knowledge systems.</h2></div>
            <p className="text-sm leading-6 text-[var(--muted)]">BrioBot and Briopedia are prior Brio team work, not Teregon client engagements. Company revenue figures below are not attributed to either product.</p>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Reveal key={study.title} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper)]">
                  <div className="relative aspect-[1.32] overflow-hidden bg-[#142923]">
                    <Image src={study.image} alt={study.alt} fill sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1712cc] to-transparent px-4 pb-4 pt-12 font-mono text-[9px] uppercase tracking-[.12em] text-white/85">{study.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-2xl font-medium tracking-[-.05em]">{study.title}</h3>
                    <p className="mt-2 font-medium leading-6 text-[var(--ink)]">{study.summary}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{study.detail}</p>
                    {study.note && <p className="mt-4 border-l-2 border-[#9caf81] bg-[#edf0e7] p-3 text-xs leading-5 text-[var(--muted)]">{study.note}</p>}
                    <Link className="mt-auto self-start border-b border-[var(--line)] pb-2 pt-5 text-sm" href={study.href}>{study.title === "Briopedia" ? "Read the case study" : study.title === "BrioBot" ? "Read the case study" : "Discuss a similar system"} <span className="ml-2 text-[var(--moss)]">↗</span></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[linear-gradient(120deg,#16271f_0%,#173238_100%)] px-5 py-16 text-[#f1f3ea] sm:px-8 md:py-24 lg:px-[8vw]" aria-labelledby="aqua-title">
        <div className="mx-auto grid max-w-[1320px] items-center gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-14">
          <Reveal>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#c3d5a8]">TEREGON AQUA / WATER PRACTICE</p>
            <h2 id="aqua-title" className="max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">AI for water-product service.</h2>
            <p className="mt-5 max-w-[49ch] text-sm leading-7 text-[#cbd6cb]">We configure support automation for filtration and appliance teams: search product manuals, retrieve policy, draft evidence-based replies, and review recurring service questions.</p>
            <Link className="mt-7 inline-flex min-h-12 items-center gap-8 rounded-md border border-white/30 px-5 text-sm transition hover:border-[#bed19e] hover:text-[#d1e0b7]" href="/water.html">Explore Teregon Aqua <span aria-hidden="true">↗</span></Link>
          </Reveal>
          <Reveal><WaterDropMotion /></Reveal>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[var(--paper-muted)] px-5 py-16 sm:px-8 md:py-24 lg:px-[8vw]">
        <Reveal className="mx-auto max-w-[1320px]">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">START WITH A REAL WORKFLOW</p>
          <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><h2 className="max-w-[13ch] text-5xl font-medium leading-[.96] tracking-[-.08em] sm:text-6xl md:text-7xl">What should work better?</h2><p className="mt-5 max-w-[55ch] text-sm leading-7 text-[var(--muted)]">Tell us what your team is trying to automate, connect, or improve. We’ll start with the workflow and its constraints.</p></div>
            <a className="inline-flex min-h-14 items-center justify-between gap-8 rounded-md bg-[#1b3026] px-5 text-sm text-[#f1f4eb] transition hover:-translate-y-0.5 hover:bg-[#26483a]" href="mailto:hello@teregonlabs.com?subject=Talk%20with%20Teregon">hello@teregonlabs.com <span aria-hidden="true">↗</span></a>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--line)] pt-4 font-mono text-[9px] uppercase tracking-[.13em] text-[var(--muted)]"><span>APPLIED AI · CUSTOM SOFTWARE</span><span>TEREGON LABS / 2026</span></div>
        </Reveal>
      </section>
    </div>
  );
}

function ProjectCard({ title, url, image, alt, eyebrow, body, tags, stack }: {
  title: string;
  url: string;
  image: string;
  alt: string;
  eyebrow: string;
  body: string;
  tags: string[];
  stack: string;
}) {
  return (
    <article className="h-full overflow-hidden rounded-xl border border-[var(--line)] bg-[#f7f8f2] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_48px_#18231d14]">
      <a href={url} target="_blank" rel="noreferrer" className="group relative block aspect-[1.8] overflow-hidden bg-[#142923]" aria-label={`Visit the live ${title} website`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
        <span className="absolute bottom-4 right-4 rounded-md bg-[#11231bbd] px-3 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-white">LIVE / {title.toUpperCase()} ↗</span>
      </a>
      <div className="p-5 sm:p-7">
        <p className="font-mono text-[9px] uppercase tracking-[.14em] text-[var(--muted)]">{eyebrow}</p>
        <h3 className="mt-3 text-3xl font-medium tracking-[-.06em] sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-[65ch] text-sm leading-6 text-[var(--muted)]">{body}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} project elements`}>
          {tags.map((tag) => <li key={tag} className="rounded-sm border border-[var(--line)] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[.08em] text-[var(--muted)]">{tag}</li>)}
        </ul>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[.08em] text-[var(--muted)]">BUILD / {stack}</p>
        <a className="mt-5 inline-flex border-b border-[var(--line)] pb-2 text-sm" href={url} target="_blank" rel="noreferrer">Visit {title} <span className="ml-3 text-[var(--moss)]">↗</span></a>
      </div>
    </article>
  );
}
