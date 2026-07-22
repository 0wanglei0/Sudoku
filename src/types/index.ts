export type Difficulty = 'easy' | 'basic' | 'intermediate' | 'advanced';

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface DifficultyConfig {
  key: Difficulty;
  name: string;
  gridSize: number;
  pairsCount: number;
  timeLimit: number;
  description: string;
  color: string;
}

export interface GameProgress {
  [difficulty: string]: {
    unlockedLevel: number;
    completedLevels: number[];
  };
}

export interface GameState {
  currentDifficulty: Difficulty | null;
  currentLevel: number;
  isPlaying: boolean;
  isGameOver: boolean;
  isWin: boolean;
  matchedPairs: number;
  totalPairs: number;
  steps: number;
  timeRemaining: number;
  cards: Card[];
  flippedCards: number[];
  isChecking: boolean;
}