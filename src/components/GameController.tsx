"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "@/store/gameStore";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function GameController() {
  const {
    settings,
    score,
    secondsRemaining,
    timerRunning,
    lastEffect,
    toggleTimer,
    tick,
  } = useGameStore(
    useShallow((state) => ({
      settings: state.settings,
      score: state.score,
      secondsRemaining: state.secondsRemaining,
      timerRunning: state.timerRunning,
      lastEffect: state.lastEffect,
      toggleTimer: state.toggleTimer,
      tick: state.tick,
    })),
  );

  useEffect(() => {
    if (!settings.hasTimer || !timerRunning) return;
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [settings.hasTimer, tick, timerRunning]);

  return (
    <div className="game-controller" aria-label="练习状态">
      <button
        type="button"
        className="status-control"
        onClick={toggleTimer}
        aria-label={timerRunning ? "暂停倒计时" : "继续倒计时"}
      >
        <span className="status-label">倒计时</span>
        <span className="status-value">
          <TimerIcon paused={!timerRunning} />
          {settings.hasTimer ? formatTime(secondsRemaining) : "--:--"}
        </span>
      </button>

      <div className="status-divider" />

      <div className="status-control" aria-label={`得分 ${score}`}>
        <span className="status-label">得分</span>
        <span className="status-value">
          <TrophyIcon />
          {score}
        </span>
      </div>

      <AnimatePresence>
        {lastEffect?.type === "answer-correct" && (
          <motion.span
            key={lastEffect.id}
            className="score-pop"
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5 }}
          >
            +10
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimerIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      {paused ? (
        <path d="M10 8.5 16 12l-6 3.5z" className="fill-current" />
      ) : (
        <path d="M9.5 8.5v7M14.5 8.5v7" />
      )}
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8v4.5c0 3-1.8 5.5-4 5.5s-4-2.5-4-5.5V4Z" />
      <path d="M8 6H5.5v1.5A3.5 3.5 0 0 0 9 11M16 6h2.5v1.5A3.5 3.5 0 0 1 15 11M12 14v4M8.5 20h7" />
    </svg>
  );
}
