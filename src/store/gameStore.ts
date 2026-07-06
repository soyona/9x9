"use client";

import { create } from "zustand";
import { createMatrixCells, TIER_SIZE } from "@/lib/matrix";
import type {
  DifficultyTier,
  GameEffect,
  GameEffectType,
  GameSettings,
  MatrixCell,
} from "@/types";

interface GameState {
  settings: GameSettings;
  cells: MatrixCell[];
  selectedCell: { row: number; col: number };
  score: number;
  secondsRemaining: number;
  timerRunning: boolean;
  lastEffect: GameEffect | null;
  setTier: (tier: DifficultyTier) => void;
  setTimerEnabled: (enabled: boolean) => void;
  selectCell: (row: number, col: number) => void;
  setCellValue: (row: number, col: number, value: string) => void;
  submitSelectedCell: () => GameEffectType | null;
  continuePractice: () => void;
  toggleTimer: () => void;
  tick: () => void;
  emitEffect: (type: GameEffectType, value?: number) => void;
}

const initialSettings: GameSettings = {
  tier: "level_6x6",
  hasTimer: true,
  timeLimitSeconds: 300,
};

let effectSequence = 0;

function nextEditableCell(
  cells: MatrixCell[],
  current: { row: number; col: number },
) {
  const editable = cells.filter(
    (cell) => !cell.isReadOnly && !cell.isCorrect,
  );
  const currentIndex = editable.findIndex(
    (cell) => cell.row === current.row && cell.col === current.col,
  );

  return editable[(currentIndex + 1) % Math.max(editable.length, 1)] ?? null;
}

export const useGameStore = create<GameState>((set, get) => ({
  settings: initialSettings,
  cells: createMatrixCells(initialSettings.tier),
  selectedCell: { row: 3, col: 4 },
  score: 0,
  secondsRemaining: initialSettings.timeLimitSeconds,
  timerRunning: true,
  lastEffect: null,

  emitEffect: (type, value) => {
    const effect = { id: ++effectSequence, type, value };
    set({ lastEffect: effect });

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent<GameEffect>("mathgrid:effect", { detail: effect }),
      );
    }
  },

  setTier: (tier) => {
    const size = TIER_SIZE[tier];
    set((state) => ({
      settings: { ...state.settings, tier },
      cells: createMatrixCells(tier),
      selectedCell: {
        row: Math.min(state.selectedCell.row, size),
        col: Math.min(state.selectedCell.col, size),
      },
      score: 0,
      secondsRemaining: state.settings.timeLimitSeconds,
      timerRunning: state.settings.hasTimer,
      lastEffect: null,
    }));
    get().emitEffect("tier-changed", size);
  },

  setTimerEnabled: (enabled) =>
    set((state) => ({
      settings: { ...state.settings, hasTimer: enabled },
      timerRunning: enabled,
      secondsRemaining: state.settings.timeLimitSeconds,
    })),

  selectCell: (row, col) => {
    const cell = get().cells.find(
      (candidate) => candidate.row === row && candidate.col === col,
    );
    if (cell && !cell.isReadOnly) {
      set({ selectedCell: { row, col } });
    }
  },

  setCellValue: (row, col, value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 3);
    set((state) => ({
      cells: state.cells.map((cell) =>
        cell.row === row && cell.col === col && !cell.isReadOnly
          ? {
              ...cell,
              userValue: numericValue,
              isSubmitted: false,
              isCorrect: false,
            }
          : cell,
      ),
    }));
  },

  submitSelectedCell: () => {
    const { cells, selectedCell } = get();
    const target = cells.find(
      (cell) =>
        cell.row === selectedCell.row && cell.col === selectedCell.col,
    );

    if (!target || target.isReadOnly || target.userValue === "") return null;

    const isCorrect = Number(target.userValue) === target.correctAnswer;
    const updatedCells = cells.map((cell) =>
      cell.row === target.row && cell.col === target.col
        ? { ...cell, isSubmitted: true, isCorrect }
        : cell,
    );

    const isLevelComplete =
      isCorrect &&
      updatedCells.every((cell) => cell.isReadOnly || cell.isCorrect);
    const effectType: GameEffectType = isLevelComplete
      ? "level-complete"
      : isCorrect
        ? "answer-correct"
        : "answer-incorrect";

    set((state) => ({
      cells: updatedCells,
      score: isCorrect && !target.isCorrect ? state.score + 10 : state.score,
      timerRunning: isLevelComplete ? false : state.timerRunning,
    }));
    get().emitEffect(effectType, target.correctAnswer);
    return effectType;
  },

  continuePractice: () => {
    const { cells, selectedCell } = get();
    const next = nextEditableCell(cells, selectedCell);
    if (next) set({ selectedCell: { row: next.row, col: next.col } });
  },

  toggleTimer: () => set((state) => ({ timerRunning: !state.timerRunning })),

  tick: () => {
    const { settings, secondsRemaining, timerRunning } = get();
    if (!settings.hasTimer || !timerRunning) return;

    if (secondsRemaining <= 1) {
      set({ secondsRemaining: 0, timerRunning: false });
      get().emitEffect("timer-ended");
      return;
    }

    set({ secondsRemaining: secondsRemaining - 1 });
  },
}));
