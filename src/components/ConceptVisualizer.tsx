"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useGameStore } from "@/store/gameStore";

const EASE = [0.22, 1, 0.36, 1] as const;

type VisualTheme = {
  name: string;
  renderIcon: () => ReactNode;
};

function FormulaBlank() {
  return (
    <span
      className="inline-block w-12 h-6 mx-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 rounded animate-pulse shadow-inner align-middle vertical-middle"
      aria-label="待填写结果"
    />
  );
}

const THEMES: VisualTheme[] = [
  {
    name: "3D Glossy Apple",
    renderIcon: () => <GlossyAppleIcon />,
  },
  {
    name: "3D Juicy Orange",
    renderIcon: () => <JuicyOrangeIcon />,
  },
  {
    name: "3D Crystal Diamond",
    renderIcon: () => <CrystalDiamondIcon />,
  },
];

export function ConceptVisualizer() {
  const selectedCell = useGameStore((state) => state.selectedCell);
  const activeCell = useGameStore((state) =>
    state.cells.find(
      (cell) =>
        cell.row === selectedCell.row && cell.col === selectedCell.col,
    ),
  );
  const lastEffect = useGameStore((state) => state.lastEffect);
  const prefersReducedMotion = useReducedMotion();
  const row = selectedCell?.row || 1;
  const col = selectedCell?.col || 1;
  const isDiagonal = row === col;
  const { totemSize, gapClass, containerChrome } = getScaleCaliper(row, col);
  const isDenseFormula = row > 6 || col > 6;
  const showResult = activeCell?.isCorrect ?? false;
  const resultValue = row * col;
  const addition = Array.from({ length: row }, () => col).join(" + ");
  const renderedResult = showResult ? resultValue : <FormulaBlank />;
  const theme = isDiagonal
    ? {
        name: "3D Golden Star",
        renderIcon: () => <GoldenStarIcon />,
      }
    : THEMES[(resultValue - 1) % THEMES.length];
  const groups = useMemo(
    () =>
      Array.from({ length: row }, (_, rowIndex) => ({
        id: rowIndex,
        dots: Array.from({ length: col }, (_, colIndex) => ({
          id: `${rowIndex}-${colIndex}`,
        })),
      })),
    [col, row],
  );
  const feedbackType =
    lastEffect?.type === "answer-correct"
      ? "correct"
      : lastEffect?.type === "answer-incorrect"
        ? "incorrect"
        : null;

  const viewportAnimate =
    prefersReducedMotion || !feedbackType
      ? { x: 0, y: 0 }
      : feedbackType === "correct"
        ? { y: [0, -12], x: 0 }
        : { x: [0, -6, 6, -6, 6, 0], y: 0 };
  const viewportTransition =
    feedbackType === "correct"
      ? {
          type: "spring" as const,
          stiffness: 300,
          repeat: prefersReducedMotion ? 0 : 1,
          repeatType: "reverse" as const,
        }
      : { duration: prefersReducedMotion ? 0 : 0.4 };

  return (
    <section className="concept-section" aria-label="乘法概念联动演示">
      <div className="relative w-full h-full flex flex-col p-6 overflow-hidden min-h-0 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100">
        {feedbackType ? (
          <motion.div
            key={`feedback-${lastEffect?.id}`}
            className={[
              "pointer-events-none absolute inset-0 rounded-2xl",
              feedbackType === "correct"
                ? "bg-emerald-300/20 shadow-[0_0_34px_rgba(16,185,129,0.34)]"
                : "bg-rose-300/20 shadow-[0_0_34px_rgba(244,63,94,0.32)]",
            ].join(" ")}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            aria-hidden="true"
          />
        ) : null}

        <motion.div
          key={`viewport-${lastEffect?.id ?? "idle"}`}
          className="w-full flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden"
          animate={viewportAnimate}
          transition={viewportTransition}
        >
          <div
            className={["dot-field", gapClass].join(" ")}
            aria-label={`${row}组，每组${col}个${theme.name}图形`}
            style={
              {
                "--concept-rows": row,
                "--concept-cols": col,
              } as CSSProperties
            }
          >
            {groups.map((group) => (
              <motion.div
                className={[
                  "concept-group",
                  gapClass,
                  containerChrome,
                ].join(" ")}
                key={group.id}
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  delay: prefersReducedMotion ? 0 : group.id * 0.025,
                  ease: EASE,
                }}
              >
                {group.dots.map((dot) => (
                  <motion.span
                    className={[
                      "concept-icon-wrap",
                      "box-border",
                      totemSize,
                    ].join(" ")}
                    key={dot.id}
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.28,
                      ease: EASE,
                    }}
                  >
                    {theme.renderIcon()}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="formula-stable-panel">
          <motion.div
            key={`${row}-${col}-${showResult ? "solved" : "pending"}`}
            initial={prefersReducedMotion ? false : { opacity: 0.72 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
            className="formula-list"
          >
            <p
              className={[
                "formula-addition",
                isDenseFormula ? "is-dense" : "",
              ].join(" ")}
            >
              加法算式：{addition} = {renderedResult}
            </p>
            <p>乘法算式：{col} × {row} = {renderedResult}</p>
            <p>读作：{col}乘{row}等于{renderedResult}。</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getScaleCaliper(row: number, col: number) {
  if (row > 6 || col > 6) {
    return {
      totemSize: "h-7 w-7",
      gapClass: "gap-1",
      containerChrome: "p-1 m-0.5",
    };
  }

  if (row > 3 || col > 3) {
    return {
      totemSize: "h-9 w-9",
      gapClass: "gap-1.5",
      containerChrome: "p-1.5 m-1",
    };
  }

  return {
    totemSize: "h-14 w-14",
    gapClass: "gap-3",
    containerChrome: "p-3 m-2",
  };
}

function GlossyAppleIcon() {
  return (
    <svg className="premium-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="apple-body" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#fff5f5" />
          <stop offset="18%" stopColor="#fb7185" />
          <stop offset="56%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <radialGradient id="apple-highlight" cx="28%" cy="24%" r="48%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.32)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="apple-leaf" x1="16" x2="52" y1="8" y2="24">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="45%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <path
        d="M34.2 19.2c2.7-6.2 7.8-9.6 14-9.4.2 7.2-5.4 11.7-13.8 12.8Z"
        fill="url(#apple-leaf)"
      />
      <path
        d="M31.7 24.1c5.6-5 18.8-3.7 22.1 7.2 3.1 10.4-6.2 26.6-14.2 26.6-3.1 0-4.8-1.7-7.8-1.7s-4.7 1.7-7.8 1.7c-8 0-17.3-16.2-14.2-26.6 3.3-10.9 16.3-12.2 21.9-7.2Z"
        fill="url(#apple-body)"
      />
      <path
        d="M31.9 24.2c-.8-5.8 1-10.5 4.7-14"
        fill="none"
        stroke="#78350f"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <ellipse
        cx="24.3"
        cy="29.8"
        rx="8.3"
        ry="12.4"
        fill="url(#apple-highlight)"
        transform="rotate(33 24.3 29.8)"
      />
      <path
        d="M17.9 32c2.7-4.3 7.2-6.2 12.6-5.5"
        fill="none"
        stroke="rgba(255,255,255,0.72)"
        strokeLinecap="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}

function JuicyOrangeIcon() {
  return (
    <svg className="premium-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="orange-body" cx="34%" cy="28%" r="66%">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="20%" stopColor="#fdba74" />
          <stop offset="58%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
        <radialGradient id="orange-highlight" cx="24%" cy="22%" r="42%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.84)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <pattern
          id="orange-pores"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.2" cy="1.4" r="0.55" fill="rgba(255,237,213,0.46)" />
          <circle cx="4.8" cy="3.6" r="0.45" fill="rgba(154,52,18,0.18)" />
        </pattern>
        <mask id="orange-skin-mask">
          <circle cx="32" cy="34" r="25" fill="white" />
        </mask>
        <linearGradient id="orange-stem" x1="28" x2="37" y1="7" y2="22">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
      </defs>
      <path
        d="M31.4 14.2c2.7-.7 6.6.1 8.9 2.1-2.6 2.5-6.7 3-10.5 1.5Z"
        fill="#15803d"
      />
      <path
        d="M31.7 17.4c.2-4.1 1.5-6.9 4.1-8.7"
        fill="none"
        stroke="url(#orange-stem)"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <circle cx="32" cy="34" r="25" fill="url(#orange-body)" />
      <circle
        cx="32"
        cy="34"
        r="25"
        fill="url(#orange-pores)"
        mask="url(#orange-skin-mask)"
        opacity="0.72"
      />
      <ellipse
        cx="24"
        cy="25.5"
        rx="8"
        ry="11"
        fill="url(#orange-highlight)"
        transform="rotate(38 24 25.5)"
      />
    </svg>
  );
}

function CrystalDiamondIcon() {
  return (
    <svg className="premium-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="diamond-top" x1="11" x2="53" y1="10" y2="26">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="52%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="diamond-left" x1="11" x2="32" y1="25" y2="58">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="62%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="diamond-right" x1="52" x2="31" y1="24" y2="58">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="48%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="diamond-flash" x1="21" x2="42" y1="13" y2="55">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="42%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <polygon points="16,14 48,14 58,27 32,59 6,27" fill="#1d4ed8" />
      <polygon points="16,14 27,27 6,27" fill="#93c5fd" />
      <polygon points="16,14 32,14 27,27" fill="url(#diamond-top)" />
      <polygon points="32,14 48,14 37,27" fill="#60a5fa" />
      <polygon points="48,14 58,27 37,27" fill="#2563eb" />
      <polygon points="6,27 27,27 32,59" fill="url(#diamond-left)" />
      <polygon points="27,27 37,27 32,59" fill="url(#diamond-flash)" />
      <polygon points="37,27 58,27 32,59" fill="url(#diamond-right)" />
      <path
        d="M17.5 17.2h28.4M10.6 27h43.1M27 27l5 29.2M37 27l-5 29.2"
        fill="none"
        stroke="rgba(255,255,255,0.48)"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function GoldenStarIcon() {
  return (
    <svg className="premium-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="1.6"
            dy="3"
            stdDeviation="2"
            floodColor="#92400e"
            floodOpacity="0.34"
          />
        </filter>
        <linearGradient id="star-light" x1="16" x2="41" y1="8" y2="58">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="42%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="star-dark" x1="48" x2="23" y1="16" y2="58">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="52%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      <g filter="url(#drop-shadow)">
        <path
          d="M32 6.4 39.8 23l18.1 2.3-13.3 12.5 3.4 18-16-8.8-16 8.8 3.4-18L6.1 25.3 24.2 23Z"
          fill="url(#star-dark)"
        />
        <path
          d="M32 6.4 32 47 16 55.8l3.4-18L6.1 25.3 24.2 23Z"
          fill="url(#star-light)"
        />
        <path
          d="M32 6.4 39.8 23 57.9 25.3 32 47Z"
          fill="#fbbf24"
          opacity="0.86"
        />
        <path
          d="M24.2 23 32 6.4 32 47 19.4 37.8Z"
          fill="#fde68a"
          opacity="0.72"
        />
        <path
          d="M39.8 23 44.6 37.8 32 47Z"
          fill="#a16207"
          opacity="0.5"
        />
        <path
          d="M21.2 27.1 30.2 10.6"
          fill="none"
          stroke="rgba(255,255,255,0.72)"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </g>
    </svg>
  );
}
