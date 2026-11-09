"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ARCHITECTURE_MODULES } from "./architecture";
import Reveal from "./Reveal";
import { useReducedMotion } from "./motion/useReducedMotion";

const STAGES = [
  {
    step: "01 / fragmented",
    title: "Four tools, four contexts.",
    detail:
      "A REST client, a debugging chat, a commit dashboard, a spreadsheet. Each one holds a fragment of the same project.",
  },
  {
    step: "02 / the project",
    title: "One project appears.",
    detail:
      "Name a project once. From then on it is the destination for everything the modules produce.",
  },
  {
    step: "03 / connections",
    title: "The modules attach.",
    detail:
      "Requests, debug sessions, commit trends, and validation reports start routing into the same place.",
  },
  {
    step: "04 / one workspace",
    title: "The context is already there.",
    detail:
      "Open any module and the history of the project comes with it. That is the whole product.",
  },
];

const PANEL_POSITIONS = [
  { left: "30%", top: "26%" },
  { left: "70%", top: "26%" },
  { left: "30%", top: "74%" },
  { left: "70%", top: "74%" },
];

type Offset = { x: number; y: number; r: number; s: number };

/** Four staged compositions: fragmented → pulled in → near → unified. */
const STAGE_LAYOUT: Offset[][] = [
  [
    { x: -30, y: -22, r: -3, s: 0.95 },
    { x: 30, y: -22, r: 2.5, s: 0.97 },
    { x: -30, y: 22, r: 2, s: 0.96 },
    { x: 30, y: 22, r: -2.5, s: 0.95 },
  ],
  [
    { x: -22, y: -16, r: -2, s: 0.98 },
    { x: 22, y: -16, r: 1.5, s: 0.99 },
    { x: -22, y: 16, r: 1.5, s: 0.98 },
    { x: 22, y: 16, r: -1.5, s: 0.98 },
  ],
  [
    { x: -9, y: -7, r: -0.7, s: 1 },
    { x: 9, y: -7, r: 0.7, s: 1 },
    { x: -9, y: 7, r: 0.7, s: 1 },
    { x: 9, y: 7, r: -0.7, s: 1 },
  ],
  [
    { x: 0, y: 0, r: 0, s: 1 },
    { x: 0, y: 0, r: 0, s: 1 },
    { x: 0, y: 0, r: 0, s: 1 },
    { x: 0, y: 0, r: 0, s: 1 },
  ],
];

/** Percent-space paths from each module position to the hub (50, 50). */
const CONNECTION_PATHS = [
  "M 30 26 C 35 34, 40 43, 50 50",
  "M 70 26 C 65 34, 60 43, 50 50",
  "M 30 74 C 35 66, 40 57, 50 50",
  "M 70 74 C 65 66, 60 57, 50 50",
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function DotMatrix({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid w-fit grid-cols-3 ${small ? "gap-[3px]" : "gap-1"}`}
    >
      {Array.from({ length: 9 }).map((_, dot) => (
        <span
          key={dot}
          className={`rounded-[1px] bg-brand-primary ${
            small ? "h-[6px] w-[6px]" : "h-2 w-2"
          } ${dot % 2 === 0 ? "opacity-90" : "opacity-35"}`}
        />
      ))}
    </span>
  );
}

/**
 * Scroll-driven explanation of the platform's core idea: four workflows
 * converging on one project. Panels move between four compositions while the
 * connection paths draw in. The section is sticky on desktop only; mobile and
 * reduced-motion users get the same information as a static composition.
 */
export default function WorkbenchStory() {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const node = trackRef.current;
    if (!node) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) return;

      const rect = node.getBoundingClientRect();
      const distance = node.offsetHeight - window.innerHeight;
      const progress =
        distance > 0
          ? Math.min(1, Math.max(0, -rect.top / distance))
          : 0;

      node.style.setProperty("--dm-story", progress.toFixed(4));

      const next =
        progress < 0.2 ? 0 : progress < 0.45 ? 1 : progress < 0.75 ? 2 : 3;
      setStage(next);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section
      aria-labelledby="workbench-title"
      className="relative border-b border-neutral-border bg-neutral-surface-1/40"
    >
      <div className="dm-shell pt-20 md:pt-24">
        <Reveal className="max-w-2xl">
          <p className="dm-mono-label text-neutral-text-secondary">
            the workbench
          </p>
          <h2
            id="workbench-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-neutral-text-primary md:text-[2.5rem] md:leading-[1.12]"
          >
            Four tools, one project — watch the context assemble.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-text-secondary">
            Every panel is a real DevMatrix module. As you scroll, each one
            attaches to the project they all share.
          </p>
        </Reveal>
      </div>

      {reducedMotion ? (
        <div className="dm-shell py-12">
          <StaticWorkbench />
        </div>
      ) : (
        <>
          <div
            ref={trackRef}
            className="relative hidden h-[240vh] lg:block"
            aria-hidden={false}
          >
            <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
              <div className="dm-shell w-full">
                <div className="grid grid-cols-[minmax(0,280px)_minmax(0,1fr)] items-center gap-12">
                  <div>
                    <ol className="space-y-4">
                      {STAGES.map((item, index) => {
                        const current = stage === index;
                        return (
                          <li
                            key={item.step}
                            aria-current={current ? "step" : undefined}
                            className="relative pl-4"
                          >
                            <span
                              aria-hidden
                              className={`absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px transition-colors duration-500 ${
                                current ? "bg-brand-primary" : "bg-neutral-border"
                              }`}
                            />
                            <span
                              className={`dm-mono-label transition-colors duration-500 ${
                                current
                                  ? "text-brand-primary"
                                  : "text-neutral-text-secondary/70"
                              }`}
                            >
                              {item.step}
                            </span>
                            <p
                              className={`mt-1.5 text-[13.5px] font-medium transition-colors duration-500 ${
                                current
                                  ? "text-neutral-text-primary"
                                  : "text-neutral-text-secondary/70"
                              }`}
                            >
                              {item.title}
                            </p>
                          </li>
                        );
                      })}
                    </ol>

                    <div
                      className="mt-7 min-h-[76px] border-l border-brand-primary/40 pl-4"
                      aria-live="polite"
                    >
                      <p
                        key={stage}
                        className="dm-fade-up text-[13px] leading-6 text-neutral-text-secondary"
                      >
                        {STAGES[stage].detail}
                      </p>
                    </div>

                    <div className="mt-5 h-px w-full bg-neutral-border">
                      <div
                        className="h-px origin-left bg-brand-primary"
                        style={{ transform: "scaleX(var(--dm-story, 0))" }}
                      />
                    </div>
                  </div>

                  <StoryCanvas stage={stage} />
                </div>
              </div>
            </div>
          </div>

          <div className="dm-shell py-12 lg:hidden">
            <StaticWorkbench />
          </div>
        </>
      )}
    </section>
  );
}

function StoryCanvas({ stage }: { stage: number }) {
  return (
    <div
      className="relative h-[500px] overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 xl:h-[540px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--theme-border) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
      role="img"
      aria-label="Four DevMatrix modules progressively connecting to one shared project as the page scrolls. The final state shows all four attached."
    >
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-brand-primary/50" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-brand-primary/50" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-brand-primary/50" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-brand-primary/50" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 h-full w-full"
      >
        {CONNECTION_PATHS.map((path, index) => (
          <path
            key={path}
            d={path}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
            className="text-brand-primary"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: stage >= 3 ? 0 : stage === 2 ? 0.45 : 1,
              opacity: stage >= 2 ? 0.85 : 0,
              transition: `stroke-dashoffset 900ms ${EASE} ${index * 70}ms, opacity 500ms ${EASE}`,
            }}
          />
        ))}
      </svg>

      {/* Project hub */}
      <div
        className="absolute left-1/2 top-1/2 z-0 w-[210px]"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${stage >= 1 ? 1 : 0.86})`,
          transition: `opacity 600ms ${EASE}, transform 800ms ${EASE}`,
        }}
      >
        <div className="relative flex flex-col items-center gap-2.5 rounded-sm border border-brand-primary/40 bg-neutral-surface-2 px-5 py-4 text-center">
          <span
            aria-hidden
            className={`pointer-events-none absolute -inset-px rounded-sm border border-brand-primary/30 ${
              stage >= 3 ? "dm-hub-ring" : ""
            }`}
          />
          <DotMatrix />
          <span className="block">
            <span className="block text-[13px] font-bold tracking-[0.08em] text-neutral-text-primary">
              PROJECT
            </span>
            <span className="block font-mono text-[9.5px] text-neutral-text-secondary">
              one shared context
            </span>
          </span>
          <span
            className={`dm-mono-label text-brand-primary transition-opacity duration-500 ${
              stage >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            shared
          </span>
        </div>
      </div>

      {/* Module panels */}
      {ARCHITECTURE_MODULES.map((module, index) => {
        const position = PANEL_POSITIONS[index];
        const offset = STAGE_LAYOUT[stage][index];

        return (
          <Link
            key={module.id}
            href={module.href}
            className="group absolute z-10 w-[min(46%,220px)] rounded-sm border border-neutral-border bg-neutral-surface-2 px-3.5 py-3 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)] outline-none transition-[border-color,background-color] duration-300 hover:border-brand-primary/50 hover:bg-neutral-surface-1 focus-visible:border-brand-primary"
            style={{
              left: position.left,
              top: position.top,
              transform: `translate(-50%, -50%) translate(${offset.x}%, ${offset.y}%) rotate(${offset.r}deg) scale(${offset.s})`,
              transition: `transform 850ms ${EASE}, opacity 600ms ${EASE}`,
            }}
          >
            <span className="dm-mono-label text-brand-primary">
              {module.index}
            </span>
            <span className="mt-1 block text-[13px] font-semibold leading-snug text-neutral-text-primary">
              {module.label}
            </span>
            <span className="mt-0.5 block truncate font-mono text-[10px] text-neutral-text-secondary">
              {module.artifact}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function StaticWorkbench() {
  return (
    <div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {ARCHITECTURE_MODULES.map((module) => (
          <li key={module.id}>
            <Link
              href={module.href}
              className="group flex h-full items-start justify-between gap-3 rounded-md border border-neutral-border bg-neutral-surface-1 px-4 py-3.5 transition-colors hover:border-brand-primary/40"
            >
              <span>
                <span className="dm-mono-label text-brand-primary">
                  {module.index}
                </span>
                <span className="mt-1.5 block text-sm font-semibold text-neutral-text-primary">
                  {module.label}
                </span>
                <span className="mt-0.5 block font-mono text-[10.5px] text-neutral-text-secondary">
                  {module.artifact}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-brand-primary transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="relative mt-3 flex items-center gap-3 rounded-md border border-brand-primary/35 bg-neutral-surface-2 px-4 py-4">
        <DotMatrix small />
        <div>
          <div className="text-[13px] font-bold tracking-[0.08em] text-neutral-text-primary">
            PROJECT
          </div>
          <div className="font-mono text-[10px] text-neutral-text-secondary">
            one shared context
          </div>
        </div>
        <span className="dm-mono-label ml-auto text-brand-primary">
          all four
        </span>
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-neutral-text-secondary">
        every module routes its artifacts into the project — requests, errors,
        commits, and idea reports share one memory
      </p>
    </div>
  );
}
