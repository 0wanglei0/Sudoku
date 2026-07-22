import { GameProgress, Difficulty } from '../types';

const STORAGE_KEY = 'memory_game_progress';

export const getProgress = (): GameProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveProgress = (progress: GameProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.error('Failed to save progress');
  }
};

export const getUnlockedLevel = (difficulty: Difficulty): number => {
  const progress = getProgress();
  return progress[difficulty]?.unlockedLevel || 1;
};

export const getCompletedLevels = (difficulty: Difficulty): number[] => {
  const progress = getProgress();
  return progress[difficulty]?.completedLevels || [];
};

export const completeLevel = (difficulty: Difficulty, level: number): void => {
  const progress = getProgress();
  const current = progress[difficulty] || { unlockedLevel: 1, completedLevels: [] };
  
  if (!current.completedLevels.includes(level)) {
    current.completedLevels.push(level);
  }
  
  if (level >= current.unlockedLevel && level < 25) {
    current.unlockedLevel = level + 1;
  }
  
  progress[difficulty] = current;
  saveProgress(progress);
};

export const resetProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.error('Failed to reset progress');
  }
};