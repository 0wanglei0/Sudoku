import { BoardType, Difficulty, GameProgress, TOTAL_LEVELS } from '../types';

const STORAGE_KEY_PREFIX = 'sudoku_progress';

function getStorageKey(boardType: BoardType, difficulty: Difficulty): string {
  return `${STORAGE_KEY_PREFIX}_${boardType}_${difficulty}`;
}

export function getGameProgress(boardType: BoardType, difficulty: Difficulty): GameProgress {
  const key = getStorageKey(boardType, difficulty);
  const stored = localStorage.getItem(key);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { unlockedLevel: 1, completedLevel: 0 };
    }
  }
  
  return { unlockedLevel: 1, completedLevel: 0 };
}

export function saveGameProgress(boardType: BoardType, difficulty: Difficulty, progress: GameProgress): void {
  const key = getStorageKey(boardType, difficulty);
  localStorage.setItem(key, JSON.stringify(progress));
}

export function markLevelCompleted(boardType: BoardType, difficulty: Difficulty, level: number): void {
  const progress = getGameProgress(boardType, difficulty);
  
  if (level > progress.completedLevel) {
    progress.completedLevel = level;
  }
  
  if (level >= progress.unlockedLevel && level < TOTAL_LEVELS) {
    progress.unlockedLevel = level + 1;
  }
  
  saveGameProgress(boardType, difficulty, progress);
}

export function isLevelUnlocked(boardType: BoardType, difficulty: Difficulty, level: number): boolean {
  const progress = getGameProgress(boardType, difficulty);
  return level <= progress.unlockedLevel;
}

export function isLevelCompleted(boardType: BoardType, difficulty: Difficulty, level: number): boolean {
  const progress = getGameProgress(boardType, difficulty);
  return level <= progress.completedLevel;
}