import { create } from 'zustand';
import { GameState, Difficulty } from '../types';
import { generateCards, DIFFICULTY_CONFIGS } from '../utils/gameLogic';
import { completeLevel } from '../utils/storage';

interface GameStore extends GameState {
  startGame: (difficulty: Difficulty, level: number) => void;
  flipCard: (index: number) => void;
  resetGame: () => void;
  nextLevel: () => void;
  setGameOver: (isWin: boolean) => void;
  decrementTime: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentDifficulty: null,
  currentLevel: 1,
  isPlaying: false,
  isGameOver: false,
  isWin: false,
  matchedPairs: 0,
  totalPairs: 0,
  steps: 0,
  timeRemaining: 0,
  cards: [],
  flippedCards: [],
  isChecking: false,

  startGame: (difficulty: Difficulty, level: number) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const cards = generateCards(config.pairsCount);
    
    set({
      currentDifficulty: difficulty,
      currentLevel: level,
      isPlaying: true,
      isGameOver: false,
      isWin: false,
      matchedPairs: 0,
      totalPairs: config.pairsCount,
      steps: 0,
      timeRemaining: config.timeLimit,
      cards,
      flippedCards: [],
      isChecking: false
    });
  },

  flipCard: (index: number) => {
    const { cards, flippedCards, isChecking, isGameOver } = get();
    
    if (isChecking || isGameOver) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedCards.length >= 2) return;

    const newCards = cards.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    );
    const newFlippedCards = [...flippedCards, index];

    set({
      cards: newCards,
      flippedCards: newFlippedCards,
      steps: get().steps + 1
    });

    if (newFlippedCards.length === 2) {
      set({ isChecking: true });
      
      setTimeout(() => {
        const [first, second] = newFlippedCards;
        const isMatch = newCards[first].value === newCards[second].value;
        
        if (isMatch) {
          const updatedCards = newCards.map((card, i) => 
            i === first || i === second ? { ...card, isMatched: true } : card
          );
          
          const newMatchedPairs = get().matchedPairs + 1;
          
          set({
            cards: updatedCards,
            flippedCards: [],
            isChecking: false,
            matchedPairs: newMatchedPairs
          });

          if (newMatchedPairs === get().totalPairs) {
            const { currentDifficulty, currentLevel } = get();
            if (currentDifficulty) {
              completeLevel(currentDifficulty, currentLevel);
            }
            setTimeout(() => {
              set({ isGameOver: true, isWin: true });
            }, 500);
          }
        } else {
          const updatedCards = newCards.map((card, i) => 
            i === first || i === second ? { ...card, isFlipped: false } : card
          );
          
          set({
            cards: updatedCards,
            flippedCards: [],
            isChecking: false
          });
        }
      }, 800);
    }
  },

  resetGame: () => {
    set({
      currentDifficulty: null,
      currentLevel: 1,
      isPlaying: false,
      isGameOver: false,
      isWin: false,
      matchedPairs: 0,
      totalPairs: 0,
      steps: 0,
      timeRemaining: 0,
      cards: [],
      flippedCards: [],
      isChecking: false
    });
  },

  nextLevel: () => {
    const { currentDifficulty, currentLevel } = get();
    if (currentDifficulty) {
      get().startGame(currentDifficulty, currentLevel + 1);
    }
  },

  setGameOver: (isWin: boolean) => {
    set({ isGameOver: true, isWin });
  },

  decrementTime: () => {
    const { timeRemaining, isGameOver } = get();
    if (timeRemaining > 0 && !isGameOver) {
      set({ timeRemaining: timeRemaining - 1 });
      if (timeRemaining - 1 === 0) {
        set({ isGameOver: true, isWin: false });
      }
    }
  }
}));