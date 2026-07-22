export type BoardType = '4x4' | '9x9';

export type Difficulty = 'easy' | 'normal' | 'medium' | 'hard';

export interface Cell {
  value: number | null;
  isOriginal: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
}

export interface GameProgress {
  unlockedLevel: number;
  completedLevel: number;
}

export interface GameState {
  boardType: BoardType;
  difficulty: Difficulty;
  level: number;
  board: Cell[][];
  solution: number[][];
  selectedCell: { row: number; col: number } | null;
  timer: number;
  isCompleted: boolean;
}

export interface DifficultyConfig {
  label: string;
  color: string;
  bgColor: string;
  removeRatio: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { label: '入门', color: 'text-green-600', bgColor: 'bg-green-50', removeRatio: 0.3 },
  normal: { label: '初级', color: 'text-blue-600', bgColor: 'bg-blue-50', removeRatio: 0.45 },
  medium: { label: '中级', color: 'text-yellow-600', bgColor: 'bg-yellow-50', removeRatio: 0.6 },
  hard: { label: '高级', color: 'text-red-600', bgColor: 'bg-red-50', removeRatio: 0.75 },
};

export const BOARD_SIZE_MAP: Record<BoardType, number> = {
  '4x4': 4,
  '9x9': 9,
};

export const GRID_SIZE_MAP: Record<BoardType, number> = {
  '4x4': 2,
  '9x9': 3,
};

export const TOTAL_LEVELS = 25;