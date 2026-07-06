import type { DifficultyTier, MatrixCell } from "@/types";

export const TIER_SIZE: Record<DifficultyTier, number> = {
  level_3x3: 3,
  level_6x6: 6,
  level_9x9: 9,
  level_10x10: 10,
};

export const TIER_LABEL: Record<DifficultyTier, string> = {
  level_3x3: "3×3",
  level_6x6: "6×6",
  level_9x9: "9×9",
  level_10x10: "10×10",
};

export const DIFFICULTY_TIERS = Object.keys(TIER_SIZE) as DifficultyTier[];

export function createMatrixCells(tier: DifficultyTier): MatrixCell[] {
  const unlockedSize = TIER_SIZE[tier];

  return Array.from({ length: 100 }, (_, index) => {
    const row = Math.floor(index / 10) + 1;
    const col = (index % 10) + 1;

    return {
      row,
      col,
      correctAnswer: row * col,
      userValue: "",
      isSubmitted: false,
      isCorrect: false,
      isReadOnly: row > unlockedSize || col > unlockedSize,
    };
  });
}
