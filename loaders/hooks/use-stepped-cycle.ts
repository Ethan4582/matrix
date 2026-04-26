"use client";

import { useRef, useSyncExternalStore } from "react";

interface UseSteppedCycleOptions {
  active: boolean;
  cycleMsBase: number;
  steps: number;
  speed?: number;
  minStepMs?: number;
  idleStep?: number;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let rafId: number | null = null;
let snapshotNow = 0;

function emit(now: number) {
  snapshotNow = now;
  for (const listener of listeners) {
    listener();
  }
}

function tick(now: number) {
  emit(now);
  if (listeners.size > 0) {
    rafId = window.requestAnimationFrame(tick);
  } else {
    rafId = null;
  }
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (rafId === null) {
    rafId = window.requestAnimationFrame(tick);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

function getSnapshot() {
  return snapshotNow;
}

function getServerSnapshot() {
  return 0;
}

function useRafNow(active: boolean): number {
  const now = useSyncExternalStore(active ? subscribe : () => () => {}, getSnapshot, getServerSnapshot);
  return active ? now : 0;
}

/**
 * Shared frame-step clock for loaders to avoid per-loader setInterval state loops.
 */
export function useSteppedCycle({
  active,
  cycleMsBase,
  steps,
  speed = 1,
  minStepMs = 0,
  idleStep = 0
}: UseSteppedCycleOptions): number {
  const safeSteps = Math.max(1, Math.floor(steps));
  const safeSpeed = speed > 0 ? speed : 1;
  const rawCycleMs = cycleMsBase / safeSpeed;
  const rawStepMs = rawCycleMs / safeSteps;
  const stepMs = Math.max(minStepMs, rawStepMs);
  const cycleMs = stepMs * safeSteps;

  const now = useRafNow(active);
  const startMsRef = useRef<number>(0);
  const wasActiveRef = useRef(false);

  if (!active) {
    wasActiveRef.current = false;
    return idleStep;
  }

  if (!wasActiveRef.current) {
    startMsRef.current = now;
    wasActiveRef.current = true;
  }

  const elapsed = Math.max(0, now - startMsRef.current);
  const step = Math.floor((elapsed % cycleMs) / stepMs);
  return step % safeSteps;
}
