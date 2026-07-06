"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  DIFFICULTY_TIERS,
  TIER_LABEL,
  TIER_SIZE,
} from "@/lib/matrix";
import { useGameStore } from "@/store/gameStore";
import type { DifficultyTier, MatrixCell } from "@/types";
import { playCorrect, playLevelComplete } from "@/utils/audio";

const PARTICLE_COLORS = ["#0071e3", "#64a8e8", "#8e8e93", "#b7b7bc", "#d7a84a"];
const CELEBRATION_PARTICLES = Array.from({ length: 28 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 28 - Math.PI / 2;
  const distance = 126 + (index % 5) * 18;

  return {
    id: index,
    color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (index % 4) * 0.018,
    rotation: 120 + (index % 6) * 48,
    size: 5 + (index % 3) * 2,
  };
});

export function TrainingMatrix() {
  const shouldReduceMotion = useReducedMotion();
  const rewardTimerRef = useRef<number | null>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showRewardCard, setShowRewardCard] = useState(false);
  const {
    settings,
    cells,
    selectedCell,
    setTier,
    selectCell,
    setCellValue,
    submitSelectedCell,
    continuePractice,
  } = useGameStore(
    useShallow((state) => ({
      settings: state.settings,
      cells: state.cells,
      selectedCell: state.selectedCell,
      setTier: state.setTier,
      selectCell: state.selectCell,
      setCellValue: state.setCellValue,
      submitSelectedCell: state.submitSelectedCell,
      continuePractice: state.continuePractice,
    })),
  );
  const activeCell = cells.find(
    (cell) =>
      cell.row === selectedCell.row && cell.col === selectedCell.col,
  );
  const activeSize = TIER_SIZE[settings.tier];

  useEffect(
    () => () => {
      if (rewardTimerRef.current !== null) {
        window.clearTimeout(rewardTimerRef.current);
      }
    },
    [],
  );

  function resetCelebration() {
    if (rewardTimerRef.current !== null) {
      window.clearTimeout(rewardTimerRef.current);
      rewardTimerRef.current = null;
    }
    setIsCelebrating(false);
    setShowRewardCard(false);
  }

  function handleTierChange(tier: DifficultyTier) {
    resetCelebration();
    setTier(tier);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const outcome = submitSelectedCell();

    if (outcome === "answer-correct") {
      playCorrect();
      return;
    }

    if (outcome === "level-complete") {
      playLevelComplete();
      setIsCelebrating(true);
      rewardTimerRef.current = window.setTimeout(
        () => setShowRewardCard(true),
        shouldReduceMotion ? 0 : 620,
      );
    }
  }

  function continueToNextLevel() {
    const currentIndex = DIFFICULTY_TIERS.indexOf(settings.tier);
    const nextTier =
      DIFFICULTY_TIERS[currentIndex + 1] ?? DIFFICULTY_TIERS[currentIndex];
    resetCelebration();
    setTier(nextTier);
  }

  return (
    <section className="training-section" aria-labelledby="training-title">
      <div className="section-heading training-heading">
        <div>
          <p className="section-number">02</p>
          <h2 id="training-title">乘法练习</h2>
        </div>
        <p>沿着行和列找到交点，把答案留在格子里。</p>
      </div>

      <div className="difficulty-bar">
        <span>难度</span>
        <div className="tier-options" role="group" aria-label="选择练习难度">
          {DIFFICULTY_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              className={settings.tier === tier ? "is-active" : undefined}
              onClick={() => handleTierChange(tier)}
            >
              {TIER_LABEL[tier]}
            </button>
          ))}
        </div>
        <span className="unlock-copy">已解锁 {activeSize} × {activeSize} 格</span>
      </div>

      <div className="training-layout">
        <div className="matrix-scroll">
          <div className="matrix-grid" role="grid" aria-label="乘法练习矩阵">
            <div className="matrix-corner" aria-hidden="true">
              ×
            </div>
            {Array.from({ length: 10 }, (_, index) => (
              <HeaderCell
                key={`col-${index + 1}`}
                value={index + 1}
                active={selectedCell.col === index + 1}
                locked={index + 1 > activeSize}
                axis="column"
              />
            ))}
            {Array.from({ length: 10 }, (_, rowIndex) => (
              <div className="contents" key={`row-${rowIndex + 1}`}>
                <HeaderCell
                  value={rowIndex + 1}
                  active={selectedCell.row === rowIndex + 1}
                  locked={rowIndex + 1 > activeSize}
                  axis="row"
                />
                {cells
                  .filter((cell) => cell.row === rowIndex + 1)
                  .map((cell) => (
                    <MatrixCellButton
                      key={`${cell.row}-${cell.col}`}
                      cell={cell}
                      selected={
                        selectedCell.row === cell.row &&
                        selectedCell.col === cell.col
                      }
                      inFocusBand={
                        selectedCell.row === cell.row ||
                        selectedCell.col === cell.col
                      }
                      onSelect={selectCell}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {activeCell && (
          <form className="answer-panel" onSubmit={handleSubmit}>
            <div>
              <p className="answer-label">当前题目</p>
              <p className="question">
                {activeCell.row} <span>×</span> {activeCell.col} <span>=</span>{" "}
                <strong>{activeCell.isCorrect ? activeCell.correctAnswer : "?"}</strong>
              </p>
            </div>

            <label className="answer-field">
              <span>答案输入</span>
              <input
                autoComplete="off"
                inputMode="numeric"
                value={activeCell.userValue}
                disabled={activeCell.isCorrect}
                onChange={(event) =>
                  setCellValue(
                    activeCell.row,
                    activeCell.col,
                    event.target.value,
                  )
                }
                aria-invalid={
                  activeCell.isSubmitted && !activeCell.isCorrect
                }
              />
            </label>

            <AnimatePresence mode="wait">
              {activeCell.isSubmitted && (
                <motion.p
                  key={activeCell.isCorrect ? "correct" : "incorrect"}
                  className={
                    activeCell.isCorrect
                      ? "feedback is-correct"
                      : "feedback is-incorrect"
                  }
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  {activeCell.isCorrect
                    ? "回答正确！"
                    : "再想一想：沿着行和列数一数。"}
                </motion.p>
              )}
            </AnimatePresence>

            {activeCell.isCorrect ? (
              <button
                type="button"
                className="primary-button answer-action"
                onClick={continuePractice}
              >
                继续练习
                <ArrowIcon />
              </button>
            ) : (
              <button
                type="submit"
                className="primary-button answer-action"
                disabled={!activeCell.userValue}
              >
                检查答案
                <CheckIcon />
              </button>
            )}
          </form>
        )}
      </div>

      <AnimatePresence>
        {isCelebrating ? (
          <motion.div
            className="reward-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
          >
            {!shouldReduceMotion ? (
              <div className="particle-burst" aria-hidden="true">
                {CELEBRATION_PARTICLES.map((particle) => (
                  <motion.span
                    key={particle.id}
                    className="reward-particle"
                    style={{
                      backgroundColor: particle.color,
                      width: particle.size,
                      height: particle.size * 1.8,
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                      x: [0, particle.x * 0.72, particle.x],
                      y: [0, particle.y * 0.72, particle.y + 112],
                      rotate: [0, particle.rotation],
                      scale: [0.6, 1, 0.78],
                    }}
                    transition={{
                      duration: 1.35,
                      delay: particle.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </div>
            ) : null}

            <AnimatePresence>
              {showRewardCard ? (
                <motion.div
                  className="reward-card"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="reward-title"
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="reward-eyebrow">LEVEL COMPLETE</p>
                  <h3 id="reward-title">这一关，全部答对。</h3>
                  <p>
                    你已经掌握 {activeSize} × {activeSize} 乘法矩阵，
                    {settings.tier === "level_10x10"
                      ? "可以再挑战一次，刷新熟练度。"
                      : "下一组格线已经准备好了。"}
                  </p>
                  <div className="reward-stat" aria-label={`${activeSize * activeSize} 题全对`}>
                    <strong>{activeSize * activeSize}</strong>
                    <span>题全对</span>
                  </div>
                  <button
                    type="button"
                    className="primary-button reward-action"
                    onClick={continueToNextLevel}
                    autoFocus
                  >
                    {settings.tier === "level_10x10" ? "再练一次" : "进入下一关"}
                    <ArrowIcon />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function HeaderCell({
  value,
  active,
  locked,
  axis,
}: {
  value: number;
  active: boolean;
  locked: boolean;
  axis: "row" | "column";
}) {
  return (
    <div
      className={[
        "matrix-header",
        active ? "is-active" : "",
        locked ? "is-locked" : "",
      ].join(" ")}
      role={axis === "row" ? "rowheader" : "columnheader"}
    >
      {value}
    </div>
  );
}

function MatrixCellButton({
  cell,
  selected,
  inFocusBand,
  onSelect,
}: {
  cell: MatrixCell;
  selected: boolean;
  inFocusBand: boolean;
  onSelect: (row: number, col: number) => void;
}) {
  return (
    <button
      type="button"
      role="gridcell"
      className={[
        "matrix-cell",
        selected ? "is-selected" : "",
        inFocusBand && !selected ? "is-in-band" : "",
        cell.isReadOnly ? "is-locked" : "",
        cell.isCorrect ? "is-correct" : "",
        cell.isSubmitted && !cell.isCorrect ? "is-incorrect" : "",
      ].join(" ")}
      onClick={() => onSelect(cell.row, cell.col)}
      disabled={cell.isReadOnly}
      aria-label={`${cell.row} 乘 ${cell.col}${
        cell.isReadOnly ? "，尚未解锁" : ""
      }`}
    >
      {cell.isReadOnly ? (
        <LockIcon />
      ) : cell.userValue ? (
        cell.userValue
      ) : (
        <span className="cell-placeholder" aria-hidden="true">
          ·
        </span>
      )}
    </button>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="5" y="9" width="10" height="8" rx="2" />
      <path d="M7.5 9V6.5a2.5 2.5 0 0 1 5 0V9" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4.5 10 3.5 3.5 7.5-8" />
    </svg>
  );
}
