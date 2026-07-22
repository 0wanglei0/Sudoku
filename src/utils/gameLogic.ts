import { Card, DifficultyConfig } from '../types';

export const EMOJIS = [
  '🐶', '🐱', '🦁', '🐯', '🐼', '🐨', '🐸', '🦊',
  '🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍒', '🥝',
  '🚗', '🚀', '✈️', '🚢', '🚲', '🚂', '🚁', '🚤',
  '⚽', '🏀', '🎸', '🎨', '📚', '💎', '🔑', '🎁'
];

export const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: {
    key: 'easy',
    name: '入门',
    gridSize: 2,
    pairsCount: 2,
    timeLimit: 0,
    description: '适合新手，无时间限制',
    color: 'from-green-400 to-green-600'
  },
  basic: {
    key: 'basic',
    name: '初级',
    gridSize: 4,
    pairsCount: 4,
    timeLimit: 60,
    description: '稍有挑战，60秒限时',
    color: 'from-blue-400 to-blue-600'
  },
  intermediate: {
    key: 'intermediate',
    name: '中级',
    gridSize: 4,
    pairsCount: 8,
    timeLimit: 90,
    description: '需要策略，90秒限时',
    color: 'from-orange-400 to-orange-600'
  },
  advanced: {
    key: 'advanced',
    name: '高级',
    gridSize: 6,
    pairsCount: 12,
    timeLimit: 120,
    description: '高难度挑战，120秒限时',
    color: 'from-red-400 to-red-600'
  }
};

export const generateCards = (pairsCount: number): Card[] => {
  const selectedEmojis = EMOJIS.sort(() => Math.random() - 0.5).slice(0, pairsCount);
  const cards: Card[] = [];
  
  selectedEmojis.forEach((emoji, index) => {
    cards.push({
      id: index * 2,
      value: emoji,
      isFlipped: false,
      isMatched: false
    });
    cards.push({
      id: index * 2 + 1,
      value: emoji,
      isFlipped: false,
      isMatched: false
    });
  });
  
  return cards.sort(() => Math.random() - 0.5);
};

export const checkMatch = (cards: Card[], flippedIndices: number[]): boolean => {
  if (flippedIndices.length !== 2) return false;
  return cards[flippedIndices[0]].value === cards[flippedIndices[1]].value;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const MAX_LEVELS = 25;