"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { ServiceOfferings } from "../service-offerings";

const capabilities = [
  {
    number: "01",
    label: "SUPPORT ASSISTANTS",
    title: "Find the answer in the source",
    copy: "Search manuals, policies, and case history. Give the team a sourced answer and a draft to review.",
    image: "/assets/mesh/ai-workflow.webp",
    alt: "Three-dimensional mesh with luminous points moving across a flowing information landscape",
  },
  {
    number: "02",
    label: "WORKFLOW AUTOMATION",
    title: "Move a case through its checks",
    copy: "Gather records, read attachments, validate fields, and send uncertain cases to a person.",
    image: "/assets/mesh/briobot.webp",
    alt: "Abstract three-dimensional mesh representing a checked workflow",
  },
  {
    number: "03",
    label: "CUSTOM SOFTWARE",
    title: "Build around the way work happens",
    copy: "Connect the existing systems with internal tools, integrations, and production software.",
    image: "/assets/mesh/briopedia.webp",
    alt: "Abstract three-dimensional mesh representing connected knowledge",
  },
];

const caseStudies = [
  {
    title: "BrioBot",
    category: "BRIO TEAM / SUPPORT AUTOMATION",
    summary: "Turn a Salesforce case into a checked draft.",
    detail: "The agent gathers case details, retrieves product and policy evidence, reads attachments, and proposes structured fields. Deterministic checks and human review bound the write path.",
    image: "/assets/mesh/briobot.webp",
    alt: "Illustrative workflow mesh for support case evidence checks and human review",
    href: "/briobot.html",
    deckHref: "/brio-bot-deck.html",
  },
  {
    title: "Briopedia",
    category: "BRIO TEAM / SUPPORT KNOWLEDGE",
    summary: "Keep support knowledge editable, searchable, and sourced.",
    detail: "A git-backed wiki holds maintained guidance; FAISS retrieval brings relevant passages into a support chat with local or cloud model options.",
    image: "/assets/mesh/briopedia.webp",
    alt: "Illustrative knowledge mesh representing a maintained support library and source links",
    href: "/briopedia.html",
    deckHref: "/briopedia-deck.html",
  },
  {
    title: "BrioScope",
    category: "BRIO TEAM / CUSTOMER OPERATIONS",
    summary: "See recurring support issues across customer conversations.",
    detail: "BrioScope groups support events into a shared view so teams can follow what customers are reporting over time.",
    image: "/assets/mesh/brioscope.webp",
    alt: "Illustrative mesh grouping customer support events into issue patterns",
    href: "mailto:hello@teregonlabs.com?subject=Discuss%20BrioScope",
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
      }, { threshold: 0.02, rootMargin: "0px" });
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
          
        </div>

        <div className="hero-copy">
          <p className="eyebrow mb-7">APPLIED AI / SOFTWARE STUDIO</p>
          <h1 className="max-w-[16ch] text-[clamp(2.75rem,6vw,6.5rem)] font-medium leading-[.96] tracking-[-.075em]" aria-label="Software that flows.">
            <span className="hero-prefix block">Software that</span>
            <span className="hero-word-static" aria-hidden="true">flows.</span>
          </h1>
          <p className="lede mt-7 max-w-[45ch] text-base leading-7 text-[#d2ddd4] sm:text-lg sm:leading-8">
            We build support assistants, case automation, data tools, integrations, and production software for the work teams already do. Teregon Aqua focuses that work on water filtration and appliance service.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-5">
            <Link className="inline-flex min-h-14 items-center justify-between gap-8 rounded-md bg-[#e4ebdc] px-5 text-sm font-medium text-[#17271f] transition hover:-translate-y-0.5 hover:bg-white" href="#selected-work">Selected work <span aria-hidden="true">↘</span></Link>
            <a className="inline-flex min-h-12 items-center gap-3 text-sm text-[#e3e9df] transition hover:text-[#c5d89e]" href="mailto:hello@teregonlabs.com?subject=Talk%20with%20Teregon">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[.14em] text-[#aab9aa]">SUPPORT · OPERATIONS · SOFTWARE</p>
        </div>
        <aside className="hero-proof" aria-label="Selected work and practice">
          <Link className="hero-proof-card" href="/work.html">
            <span className="hero-proof-kicker"><i aria-hidden="true" /> LIVE CLIENT BUILDS</span>
            <strong>ERIA Events + W3 Sourcing</strong>
            <span>Websites, content systems, and workflows</span>
            <b aria-hidden="true">↗</b>
          </Link>
          <Link className="hero-proof-card" href="#brio-title">
            <span className="hero-proof-kicker"><i aria-hidden="true" /> PRIOR TEAM EXPERIENCE</span>
            <strong>BrioBot + Briopedia</strong>
            <span>Support automation and product knowledge</span>
            <b aria-hidden="true">↗</b>
          </Link>
          <Link className="hero-proof-card hero-proof-card-aqua" href="/water.html">
            <span className="hero-proof-kicker"><i aria-hidden="true" /> FOCUSED PRACTICE</span>
            <strong>Teregon Aqua</strong>
            <span>AI for water filtration and appliance service</span>
            <b aria-hidden="true">↗</b>
          </Link>
        </aside>
      </section>

      <section className="bg-[var(--paper)] px-5 py-12 sm:px-8 md:py-16 lg:px-[8vw]">
        <Reveal>
          <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-[.65fr_1.35fr] md:gap-12">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">WHAT WE BUILD</p>
            <div>
              <h2 className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">Put repeat work in software.</h2>
              <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <p className="max-w-[68ch] text-[15px] leading-7 text-[var(--muted)]">From product questions to Salesforce cases, we connect the source material, business rules, and systems a team needs to finish the job.</p>
                <Link className="shrink-0 border-b border-[var(--line)] pb-2 text-sm hover:text-[var(--water-deep)]" href="/approach.html">How we work <span className="ml-3 text-[var(--moss)]">↗</span></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[#e9ede4] px-5 py-12 sm:px-8 md:py-16 lg:px-[8vw]" aria-labelledby="capabilities-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">WHAT WE BUILD</p><h2 id="capabilities-title" className="max-w-[18ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl">AI inside the workflow.</h2></div>
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

      <section id="offerings" className="scroll-mt-24 bg-[linear-gradient(120deg,#142820_0%,#183438_100%)] px-5 py-12 text-[#f2f4ec] sm:px-8 md:py-16 lg:px-[8vw]" aria-labelledby="offerings-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-9 grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#c5d5ab]">SERVICES</p><h2 id="offerings-title" className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">A starting point, shaped to your team.</h2></div>
            <p className="max-w-[50ch] text-sm leading-7 text-[#c6d2c5]">These are named services we configure and build with each team. They are not standalone off-the-shelf products. Teregon Aqua is our focused water practice.</p>
          </Reveal>
          <Reveal><ServiceOfferings /></Reveal>
        </div>
      </section>

      <section id="selected-work" className="scroll-mt-24 bg-[var(--paper)] px-5 py-12 sm:px-8 md:py-16 lg:px-[8vw]" aria-labelledby="projects-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">LIVE CLIENT BUILDS</p><h2 id="projects-title" className="max-w-[15ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl md:text-6xl">Websites built for the business behind them.</h2></div>
            <p className="max-w-[40ch] text-sm leading-6 text-[var(--muted)]">ERIA Events and W3 Sourcing are live builds. Each has its own case study and public site.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <ProjectCard
                title="ERIA Events"
                url="https://www.eria.co/"
                caseHref="/eria.html"
                image="/assets/project-eria.jpg"
                alt="Screenshot of the live ERIA Events website"
                eyebrow="HOSPITALITY & EVENTS / LIVE CLIENT BUILD"
                body="Built ERIA’s public site for Bay Area venues, experiences, and events. A private admin portal and workflow automations support the team behind the site; venue stories lead visitors to event inquiries."
                tags={["VENUE & EVENT PAGES", "PRIVATE ADMIN TOOLS", "WORKFLOW AUTOMATION"]}
                stack="NEXT.JS · REACT · SANITY CMS"
              />
            </Reveal>
            <Reveal className="h-full">
              <ProjectCard
                title="W3 Sourcing"
                url="https://www.w3sourcing.com/"
                image="/assets/project-w3sourcing.jpg"
                alt="Screenshot of the live W3 Sourcing website"
                eyebrow="EXECUTIVE SEARCH / LIVE CLIENT BUILD"
                body="Built and deployed a responsive site for a principal-led search firm. Practice pages connect its methodology, results, and leadership context to a direct inquiry path."
                tags={["PRACTICE PAGES", "METHODOLOGY + RESULTS", "DIRECT INQUIRY"]}
                stack="NEXT.JS · REACT · TYPESCRIPT"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#e8ede4] px-5 py-12 sm:px-8 md:py-16 lg:px-[8vw]" aria-labelledby="brio-title">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-8 grid gap-5 md:grid-cols-[1fr_.65fr] md:items-end">
            <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">PRIOR BRIO TEAM PRODUCT EXPERIENCE</p><h2 id="brio-title" className="max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-.07em] sm:text-5xl">Support and knowledge systems.</h2></div>
            <p className="text-sm leading-6 text-[var(--muted)]">These are systems built with the Brio team before Teregon Labs. They show our team’s experience; they are not Teregon client engagements.</p>
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
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                      <Link className="border-b border-[var(--line)] pb-2 text-sm" href={study.href}>{study.title === "BrioScope" ? "Discuss a similar system" : "Read the case study"} <span className="ml-2 text-[var(--moss)]">↗</span></Link>
                      {study.deckHref && <Link className="border-b border-[var(--line)] pb-2 text-sm" href={study.deckHref}>View presentation <span className="ml-2 text-[var(--moss)]">↗</span></Link>}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[linear-gradient(120deg,#16271f_0%,#173238_100%)] px-5 py-12 text-[#f1f3ea] sm:px-8 md:py-16 lg:px-[8vw]" aria-labelledby="aqua-title">
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

      <section id="contact" className="closing section-pad">
        <p className="eyebrow">TEREGON / START WITH THE DECISION</p>
        <div className="closing-row">
          <h2>Bring us<br />the messy part.</h2>
          <a className="button button-dark" href="mailto:hello@teregonlabs.com?subject=I%20have%20a%20problem%20for%20Teregon">
            Tell us what is stuck <span>↗</span>
          </a>
        </div>
        <div className="contact-panel">
          <div>
            <h3>What are you trying to move forward?</h3>
            <p>Share the business workflow, AI opportunity, or software problem you want to move forward. Water-product and watershed work has its own focused practice.</p>
          </div>
          <form id="teregon-contact" className="contact-form" action="mailto:hello@teregonlabs.com" method="GET">
            <div className="contact-fields">
              <label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required /></label>
              <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required /></label>
              <label htmlFor="contact-project">Project summary<textarea id="contact-project" name="body" rows={4} required /></label>
            </div>
            <p className="contact-help" id="contact-help">This opens an email draft in your mail app. The site does not store your message.</p>
            <button className="button button-light" type="submit">Open email draft <span>↗</span></button>
          </form>
        </div>
        <div className="closing-foot">
          <span>AI + SOFTWARE · BUILT AROUND REAL WORK</span>
          <span>WATER · WATERSHEDS · FLOW</span>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ title, url, caseHref, image, alt, eyebrow, body, tags, stack }: {
  title: string;
  url: string;
  caseHref?: string;
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
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {caseHref && <Link className="inline-flex border-b border-[var(--line)] pb-2 text-sm" href={caseHref}>Read the case study <span className="ml-3 text-[var(--moss)]">↗</span></Link>}
          <a className="inline-flex border-b border-[var(--line)] pb-2 text-sm" href={url} target="_blank" rel="noreferrer">Visit live site <span className="ml-3 text-[var(--moss)]">↗</span></a>
        </div>
      </div>
    </article>
  );
}
