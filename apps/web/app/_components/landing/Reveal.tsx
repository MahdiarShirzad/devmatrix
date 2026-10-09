"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Optional className forwarded to the wrapping element. */
  className?: string;
  /** Stagger delay in ms, applied via the dm-reveal CSS variable. */
  delay?: number;
  /** Element to render. Defaults to a div. */
  as?: "div" | "section" | "li" | "header" | "article";
}

/**
 * Scroll-triggered entrance for a single element.
 *
 * Renders its child content immediately; the reveal class only controls
 * opacity/transform, so the page is fully readable when JS is off or the
 * user prefers reduced motion (handled in globals.css).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced-motion users get full visibility from the CSS override in
    // globals.css, so no JS branch is needed here.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`dm-reveal ${className}`}
      data-revealed={revealed ? "true" : "false"}
      style={{ "--dm-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
