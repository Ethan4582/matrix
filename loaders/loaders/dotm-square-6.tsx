"use client";

import { useEffect, useState } from "react";

import { DotMatrixBase } from "../base/dot-matrix-base";
import { useDotMatrixPhases } from "../core/phases";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";
import type { DotAnimationResolver, DotMatrixCommonProps } from "../types";

export type DotmSquare6Props = DotMatrixCommonProps;

const COLUMN_HEIGHT = 5;
const BASE_OPACITY = 0.08;
const SNAKE_TAIL = [0.8, 0.6, 0.4, 0.2, 0.1] as const;

export function DotmSquare6({
  speed = 1,
  pattern = "full",
  animated = true,
  hoverAnimated = false,
  ...rest
}: DotmSquare6Props) {
  const reducedMotion = usePrefersReducedMotion();
  const { phase: matrixPhase, onMouseEnter, onMouseLeave } = useDotMatrixPhases({
    animated: Boolean(animated && !reducedMotion),
    hoverAnimated: Boolean(hoverAnimated && !reducedMotion),
    speed
  });
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (reducedMotion || matrixPhase === "idle") {
      setHead(0);
      return;
    }

    const safeSpeed = speed > 0 ? speed : 1;
    const cycleMs = 1500 / safeSpeed;
    const stepMs = Math.max(24, Math.round(cycleMs / COLUMN_HEIGHT));
    const timer = window.setInterval(() => {
      setHead((prev) => (prev + 1) % COLUMN_HEIGHT);
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [matrixPhase, reducedMotion, speed]);

  const animationResolver: DotAnimationResolver = ({ isActive, row, col, phase }) => {
    if (!isActive) {
      return { className: "dmx-inactive" };
    }

    const goesUp = col % 2 === 0;
    const position = goesUp ? COLUMN_HEIGHT - 1 - row : row;

    if (reducedMotion || phase === "idle") {
      return { style: { opacity: 0.22 + (position / (COLUMN_HEIGHT - 1)) * 0.66 } };
    }

    const distance = (head - position + COLUMN_HEIGHT) % COLUMN_HEIGHT;
    const opacity = distance < SNAKE_TAIL.length ? SNAKE_TAIL[distance]! : BASE_OPACITY;
    return { style: { opacity } };
  };

  return (
    <DotMatrixBase
      {...rest}
      speed={speed}
      pattern={pattern}
      animated={animated}
      phase={matrixPhase}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      reducedMotion={reducedMotion}
      animationResolver={animationResolver}
    />
  );
}
