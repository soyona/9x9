export type DifficultyTier =
  | "level_3x3"
  | "level_6x6"
  | "level_9x9"
  | "level_10x10";

export interface GameSettings {
  tier: DifficultyTier;
  hasTimer: boolean;
  timeLimitSeconds: number;
}

export interface MatrixCell {
  row: number;
  col: number;
  correctAnswer: number;
  userValue: string;
  isSubmitted: boolean;
  isCorrect: boolean;
  isReadOnly: boolean;
}

export type GameEffectType =
  | "answer-correct"
  | "answer-incorrect"
  | "level-complete"
  | "tier-changed"
  | "timer-ended";

export interface GameEffect {
  id: number;
  type: GameEffectType;
  value?: number;
}
