"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Writes a normalized pointer position (-1…1) to CSS custom properties on the
 * referenced element, so descendants can offset themselves with pure CSS
 * transforms. Nothing re-renders: updates are rAF-throttled and written
 * straight to the node.
 *
 * Disabled for coarse pointers and reduced-motion users.
 */
export function usePointerParallax<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || disabled) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const commit = () => {
      frame = 0;
      node.style.setProperty("--dm-parallax-x", x.toFixed(3));
      node.style.setProperty("--dm-parallax-y", y.toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(commit);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onPointerLeave = () => {
      x = 0;
      y = 0;
      schedule();
    };

    node.addEventListener("pointermove", onPointerMove, { passive: true });
    node.addEventListener("pointerleave", onPointerLeave);
    node.addEventListener("pointercancel", onPointerLeave);

    return () => {
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerleave", onPointerLeave);
      node.removeEventListener("pointercancel", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
      node.style.removeProperty("--dm-parallax-x");
      node.style.removeProperty("--dm-parallax-y");
    };
  }, [disabled]);

  return ref;
}
