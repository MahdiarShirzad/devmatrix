"use client";

import Link from "next/link";
import { useState } from "react";
import { ARCHITECTURE_MODULES } from "./architecture";
import { usePointerParallax } from "./motion/usePointerParallax";
import { useReducedMotion } from "./motion/useReducedMotion";

/** Module row geometry inside the 560 × 344 diagram space, in percent. */
const ROW_TOP = [4.7, 27.9, 51.2, 74.4];
const ROW_Y = [16, 96, 176, 256];
const BOX_H = 62;
const HUB_CY = 178;

/** Per-card parallax depth, in px at full pointer deflection. */
const PARALLAX_DEPTH = [2.5, 4, 3.25, 4.5];

function modulePath(y: number) {
  const startY = y + BOX_H / 2;
  return `M 196 ${startY} C 268 ${startY}, 300 ${HUB_CY}, 368 ${HUB_CY}`;
}

function parallaxTransform(depth: number) {
  return `translate3d(calc(var(--dm-parallax-x, 0) * ${depth}px), calc(var(--dm-parallax-y, 0) * ${depth}px), 0)`;
}

/**
 * The product's real architecture as a living, interactive routing diagram:
 * four project-scoped workflows converging on a single Project.
 *
 * - hover/focus a module to lift it and trace its connection
 * - pointer parallax adds depth on fine pointers only
 * - mobile falls back to a stacked list with the same content
 * - reduced-motion users get the same layout without the movement
 */
export default function HubDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const parallaxRef = usePointerParallax<HTMLDivElement>(reducedMotion);

  const active = ARCHITECTURE_MODULES.find((m) => m.id === activeId) ?? null;

  return (
    <div
      ref={parallaxRef}
      className="dm-panel relative overflow-hidden rounded-md"
    >
      {/* Corner ticks — echo of the matrix-grid mark */}
      <span className="pointer-events-none absolute left-0 top-0 z-20 h-3 w-3 border-l border-t border-brand-primary/60" />
      <span className="pointer-events-none absolute right-0 top-0 z-20 h-3 w-3 border-r border-t border-brand-primary/60" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-20 h-3 w-3 border-b border-l border-brand-primary/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-3 w-3 border-b border-r border-brand-primary/60" />

      <div className="flex items-center justify-between border-b border-neutral-border px-4 py-2.5">
        <span className="dm-mono-label text-neutral-text-secondary">
          architecture / project-scoping
        </span>
        <span className="dm-mono-label text-brand-primary">
          4 modules · 1 project
        </span>
      </div>

      {/* ---- Desktop: interactive routing diagram ---- */}
      <div
        className="relative hidden aspect-[560/344] md:block"
        role="group"
        aria-label="Each module writes its work into one shared project."
      >
        <svg
          viewBox="0 0 560 344"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          preserveAspectRatio="none"
        >
          {/* faint baseline grid */}
          <g
            stroke="currentColor"
            className="text-neutral-border"
            strokeWidth="1"
            opacity="0.45"
          >
            {[80, 160, 240, 320].map((x) => (
              <line
                key={x}
                x1={x}
                y1="8"
                x2={x}
                y2="336"
                strokeDasharray="1 7"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* connection rails */}
          <g fill="none" strokeLinecap="round">
            {ARCHITECTURE_MODULES.map((module, index) => {
              const isActive = activeId === module.id;
              const dimmed = activeId !== null && !isActive;
              return (
                <path
                  key={`rail-${module.id}`}
                  d={modulePath(ROW_Y[index])}
                  stroke="currentColor"
                  className={
                    isActive
                      ? "text-brand-primary"
                      : "text-neutral-border"
                  }
                  strokeWidth={isActive ? 1.75 : 1.25}
                  opacity={dimmed ? 0.35 : 1}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {ARCHITECTURE_MODULES.map((module, index) => (
              <path
                key={`pulse-${module.id}`}
                d={modulePath(ROW_Y[index])}
                stroke="currentColor"
                className="text-brand-primary dm-route-pulse"
                strokeWidth="1.5"
                strokeDasharray="3 10"
                opacity={activeId && activeId !== module.id ? 0.12 : 0.8}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </svg>

        {/* Module panels — real destinations, elevated on hover/focus. */}
        {ARCHITECTURE_MODULES.map((module, index) => {
          const isActive = activeId === module.id;
          const dimmed = activeId !== null && !isActive;

          return (
            <div
              key={module.id}
              className="absolute"
              style={{
                left: "1.4%",
                top: `${ROW_TOP[index]}%`,
                width: "33.6%",
                height: "18%",
                transform: parallaxTransform(PARALLAX_DEPTH[index]),
                transition: "transform 140ms ease-out",
              }}
            >
              <Link
                href={module.href}
                onMouseEnter={() => setActiveId(module.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(module.id)}
                onBlur={() => setActiveId(null)}
                className={`group/module relative flex h-full flex-col justify-center gap-1 overflow-hidden rounded-[3px] border bg-neutral-surface-2 px-4 pl-5 outline-none transition-[transform,opacity,background-color,border-color,box-shadow] duration-300 ${
                  isActive
                    ? "-translate-y-0.5 border-brand-primary/55 bg-neutral-surface-1 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)]"
                    : "border-neutral-border hover:border-brand-primary/40"
                } ${dimmed ? "opacity-55" : "opacity-100"} focus-visible:border-brand-primary`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[3px] bg-brand-primary transition-opacity ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                />

                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-neutral-text-primary">
                    {module.label}
                  </span>
                  <span
                    aria-hidden
                    className={`font-mono text-[9px] transition-opacity ${
                      isActive
                        ? "text-brand-primary opacity-100"
                        : "text-neutral-text-secondary opacity-0"
                    }`}
                  >
                    →
                  </span>
                </span>

                <span className="truncate font-mono text-[10px] text-neutral-text-secondary">
                  {module.artifact}
                </span>
              </Link>
            </div>
          );
        })}

        {/* Project hub */}
        <div
          className="absolute z-10"
          style={{
            left: "65.7%",
            top: "32.6%",
            width: "32.9%",
            height: "38.4%",
            transform: parallaxTransform(-4),
            transition: "transform 140ms ease-out",
          }}
        >
          <div
            className={`relative flex h-full flex-col justify-center gap-2 rounded-[3px] border bg-neutral-surface-2 px-4 transition-colors duration-300 ${
              active ? "border-brand-primary/70" : "border-neutral-border"
            }`}
          >
            <span
              aria-hidden
              className="dm-hub-ring pointer-events-none absolute -inset-px rounded-[3px] border border-brand-primary/25"
            />

            <span className="grid w-fit grid-cols-3 gap-[3px]">
              {Array.from({ length: 9 }).map((_, dot) => (
                <span
                  key={dot}
                  className={`h-[6px] w-[6px] rounded-[1px] bg-brand-primary ${
                    dot % 2 === 0 ? "opacity-90" : "opacity-35"
                  }`}
                />
              ))}
            </span>

            <span className="block">
              <span className="block text-[13px] font-bold tracking-[0.06em] text-neutral-text-primary">
                PROJECT
              </span>
              <span className="block font-mono text-[9.5px] text-neutral-text-secondary">
                one shared context
              </span>
            </span>

            <span className="block border-t border-neutral-border pt-1.5 font-mono text-[9px] leading-[1.7] text-neutral-text-secondary">
              requests · errors · commits
              <br />
              metrics · idea reports
            </span>
          </div>
        </div>
      </div>

      {/* ---- Mobile: stacked equivalent ---- */}
      <ul className="divide-y divide-neutral-border md:hidden">
        {ARCHITECTURE_MODULES.map((module) => (
          <li key={module.id}>
            <Link
              href={module.href}
              className="flex items-baseline justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-neutral-surface-1"
            >
              <span>
                <span className="block text-sm font-semibold text-neutral-text-primary">
                  {module.label}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-neutral-text-secondary">
                  {module.artifact}
                </span>
              </span>
              <span aria-hidden className="dm-mono-label shrink-0 text-brand-primary">
                →
              </span>
            </Link>
          </li>
        ))}
        <li className="bg-neutral-surface-2 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid grid-cols-3 gap-[3px]" aria-hidden>
              {Array.from({ length: 9 }).map((_, dot) => (
                <span
                  key={dot}
                  className={`h-1.5 w-1.5 rounded-[1px] bg-brand-primary ${
                    dot % 2 === 0 ? "opacity-90" : "opacity-40"
                  }`}
                />
              ))}
            </span>
            <div>
              <div className="text-sm font-bold tracking-wide text-neutral-text-primary">
                PROJECT
              </div>
              <div className="font-mono text-[11px] text-neutral-text-secondary">
                one shared context
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div className="hidden border-t border-neutral-border px-4 py-2 md:block">
        <p
          aria-live="polite"
          className="font-mono text-[10.5px] leading-relaxed text-neutral-text-secondary"
        >
          {active ? (
            <>
              <span className="text-brand-primary">{active.label}</span> writes{" "}
              {active.artifact} into the project.
            </>
          ) : (
            "trace a module to see what it contributes to the shared project"
          )}
        </p>
      </div>

      <div className="border-t border-neutral-border px-4 py-2.5">
        <p className="font-mono text-[11px] leading-relaxed text-neutral-text-secondary">
          Every module in DevMatrix attaches to a project — that is what keeps a
          multi-tool platform feeling like one product.
        </p>
      </div>
    </div>
  );
}
