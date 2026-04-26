"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { DotMatrixPhase } from "./dotmatrix-core";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setPrefersReducedMotion(query.matches);
    };

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return prefersReducedMotion;
}

export interface UseCyclePhaseOptions {
  active: boolean;
  cycleMsBase: number;
  speed?: number;
}

export function useCyclePhase({ active, cycleMsBase, speed = 1 }: UseCyclePhaseOptions): number {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }

    const safeSpeed = speed > 0 ? speed : 1;
    const cycleMs = Math.max(120, cycleMsBase / safeSpeed);
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = ((now - start) % cycleMs + cycleMs) % cycleMs;
      setPhase(elapsed / cycleMs);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, cycleMsBase, speed]);

  return phase;
}

interface UseDotMatrixPhasesOptions {
  animated?: boolean;
  hoverAnimated?: boolean;
  speed?: number;
}

interface DotMatrixPhasesResult {
  phase: DotMatrixPhase;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function useDotMatrixPhases({
  animated = false,
  hoverAnimated = false,
  speed = 1
}: UseDotMatrixPhasesOptions): DotMatrixPhasesResult {
  const safeSpeed = speed > 0 ? speed : 1;
  const autoRun = Boolean(animated && !hoverAnimated);
  const [phase, setPhase] = useState<DotMatrixPhase>(() => (autoRun ? "loadingRipple" : "idle"));
  const timeouts = useRef<number[]>([]);
  const hoverGen = useRef(0);

  const clearTimers = useCallback(() => {
    for (const id of timeouts.current) {
      window.clearTimeout(id);
    }
    timeouts.current = [];
  }, []);

  useEffect(() => {
    clearTimers();
    if (autoRun) {
      setPhase("loadingRipple");
    } else {
      setPhase("idle");
    }
    return clearTimers;
  }, [autoRun, clearTimers]);

  const onMouseEnter = useCallback(() => {
    if (!hoverAnimated || autoRun) {
      return;
    }
    clearTimers();
    const gen = ++hoverGen.current;
    setPhase("collapse");
    const collapseMs = Math.max(80, Math.round(300 / safeSpeed));
    const id = window.setTimeout(() => {
      if (hoverGen.current !== gen) {
        return;
      }
      setPhase("hoverRipple");
    }, collapseMs);
    timeouts.current.push(id);
  }, [hoverAnimated, autoRun, safeSpeed, clearTimers]);

  const onMouseLeave = useCallback(() => {
    if (!hoverAnimated || autoRun) {
      return;
    }
    hoverGen.current += 1;
    clearTimers();
    setPhase("idle");
  }, [hoverAnimated, autoRun, clearTimers]);

  return useMemo(
    () => ({
      phase,
      onMouseEnter,
      onMouseLeave
    }),
    [phase, onMouseEnter, onMouseLeave]
  );
}
