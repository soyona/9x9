# Data Models

```typescript
// 难度梯度定义
export type DifficultyTier = 'level_3x3' | 'level_6x6' | 'level_9x9' | 'level_10x10';

export interface GameSettings {
  tier: DifficultyTier;
  hasTimer: boolean;
  timeLimitSeconds: number;
}

// 矩阵单元格状态强类型
export interface MatrixCell {
  row: number;           // 行坐标
  col: number;           // 列坐标
  correctAnswer: number; // 预期结果 row * col
  userValue: string;   // 用户当前输入
  isSubmitted: boolean; // 是否已判定
  isCorrect: boolean;  // 判定结果
  isReadOnly: boolean; // 是否当前关卡无需填写的单元格
}