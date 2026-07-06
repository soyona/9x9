"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const dots = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  sourceRow: Math.floor(index / 4),
  sourceCol: index % 4,
  targetGroup: Math.floor(index / 4),
  targetIndex: index % 4,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

export function ConceptVisualizer() {
  const [isMultiplied, setIsMultiplied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="concept-section" aria-labelledby="concept-title">
      <div className="section-heading">
        <div>
          <p className="section-number">01</p>
          <h2 id="concept-title">相同的数量，重复出现</h2>
        </div>
        <p>
          先看见三个相同的“四”，再把它们写成更简洁的乘法。
        </p>
      </div>

      <div className="concept-stage">
        <svg
          className="motion-guides"
          viewBox="0 0 940 300"
          aria-hidden="true"
        >
          {[0, 1, 2].map((row) => (
            <motion.path
              key={row}
              d={`M 290 ${76 + row * 72} C 430 ${40 + row * 92}, 510 ${
                56 + row * 72
              }, 650 ${70 + row * 62}`}
              initial={false}
              animate={{
                pathLength: isMultiplied ? 1 : 0,
                opacity: isMultiplied ? 0.32 : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: EASE }}
            />
          ))}
        </svg>

        <div
          className="dot-field"
          data-transformed={isMultiplied}
          aria-label="三组，每组四个圆点"
        >
          {dots.map((dot) => {
            const sourceX = dot.sourceCol * 54;
            const sourceY = dot.sourceRow * 62;
            const targetX = dot.targetGroup * 78 + 18;
            const targetY = dot.targetIndex * 44 - 18;

            return (
              <motion.span
                className="concept-dot"
                key={dot.id}
                initial={false}
                animate={{
                  x: isMultiplied ? targetX : sourceX,
                  y: isMultiplied ? targetY : sourceY,
                  scale: isMultiplied ? 0.88 : 1,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.9,
                  delay: prefersReducedMotion ? 0 : dot.sourceRow * 0.055,
                  ease: EASE,
                }}
              />
            );
          })}
        </div>

        <motion.div
          className="formula-panel"
          layout
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE }}
        >
          <p>{isMultiplied ? "三组，每组四个" : "四个，重复三次"}</p>
          <motion.div
            key={isMultiplied ? "multiplication" : "addition"}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="formula"
          >
            {isMultiplied ? (
              <>
                3 <span>×</span> 4 <span>=</span> <strong>12</strong>
              </>
            ) : (
              <>
                4 <span>+</span> 4 <span>+</span> 4 <span>=</span>{" "}
                <strong>12</strong>
              </>
            )}
          </motion.div>
          <button
            type="button"
            className="primary-button"
            onClick={() => setIsMultiplied((value) => !value)}
          >
            {isMultiplied ? "再看一次加法" : "转化为乘法"}
            <ArrowIcon reversed={isMultiplied} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowIcon({ reversed = false }: { reversed?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={reversed ? "rotate-180" : undefined}
    >
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}
