import { create } from 'zustand';
import { BoardType, Difficulty, Cell, GameState, BOARD_SIZE_MAP } from '../types';
import { generateSudoku, checkCompletion } from '../utils/sudokuGenerator';
import { markLevelCompleted } from '../utils/storage';

interface GameStore extends GameState {
  setBoardType: (boardType: BoardType) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setLevel: (level: number) => void;
  initGame: () => void;
  selectCell: (row: number, col: number) => void;
  fillNumber: (num: number) => void;
  clearCell: () => void;
  incrementTimer: () => void;
  resetTimer: () => void;
  checkGameCompletion: () => boolean;
  goToNextLevel: () => void;
  resetGame: () => void;
}

const initialBoard = (size: number): Cell[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      value: null,
      isOriginal: false,
      isSelected: false,
      isHighlighted: false,
      isError: false,
    }))
  );
};

export const useGameStore = create<GameStore>((set, get) => ({
  boardType: '4x4',
  difficulty: 'easy',
  level: 1,
  board: initialBoard(4),
  solution: [],
  selectedCell: null,
  timer: 0,
  isCompleted: false,

  setBoardType: (boardType) => {
    const size = BOARD_SIZE_MAP[boardType];
    set({ boardType, board: initialBoard(size) });
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
  },

  setLevel: (level) => {
    set({ level });
  },

  initGame: () => {
    const { boardType, difficulty, level } = get();
    const { puzzle, solution } = generateSudoku(boardType, difficulty);
    const size = BOARD_SIZE_MAP[boardType];
    
    const board: Cell[][] = puzzle.map((row, rowIndex) =>
      row.map((value, colIndex) => ({
        value: value === 0 ? null : value,
        isOriginal: value !== 0,
        isSelected: false,
        isHighlighted: false,
        isError: false,
      }))
    );

    set({ board, solution, selectedCell: null, timer: 0, isCompleted: false });
  },

  selectCell: (row, col) => {
    const { board, selectedCell } = get();
    const size = board.length;

    const newBoard = board.map((r, ri) =>
      r.map((cell, ci) => ({
        ...cell,
        isSelected: ri === row && ci === col,
        isHighlighted:
          ri === row ||
          ci === col ||
          (Math.floor(ri / (size === 4 ? 2 : 3)) === Math.floor(row / (size === 4 ? 2 : 3)) &&
            Math.floor(ci / (size === 4 ? 2 : 3)) === Math.floor(col / (size === 4 ? 2 : 3))),
      }))
    );

    set({ board: newBoard, selectedCell: { row, col } });
  },

  fillNumber: (num) => {
    const { board, selectedCell, solution, boardType, difficulty, level } = get();
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const cell = board[row][col];
    if (cell.isOriginal) return;

    const newBoard = board.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          return {
            ...c,
            value: num,
            isError: num !== solution[row][col],
          };
        }
        return c;
      })
    );

    set({ board: newBoard });

    const currentValues = newBoard.map(r => r.map(c => c.value ?? 0));
    
    let isBoardFilled = true;
    for (let i = 0; i < currentValues.length; i++) {
      for (let j = 0; j < currentValues[i].length; j++) {
        if (currentValues[i][j] === 0) {
          isBoardFilled = false;
          break;
        }
      }
      if (!isBoardFilled) break;
    }

    if (isBoardFilled && checkCompletion(currentValues, solution)) {
      set({ isCompleted: true });
      markLevelCompleted(boardType, difficulty, level);
    }
  },

  clearCell: () => {
    const { board, selectedCell } = get();
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const cell = board[row][col];
    if (cell.isOriginal) return;

    const newBoard = board.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          return {
            ...c,
            value: null,
            isError: false,
          };
        }
        return c;
      })
    );

    set({ board: newBoard });
  },

  incrementTimer: () => {
    set((state) => ({ timer: state.timer + 1 }));
  },

  resetTimer: () => {
    set({ timer: 0 });
  },

  checkGameCompletion: () => {
    const { board, solution, boardType, difficulty, level } = get();
    
    const currentValues = board.map(row => row.map(cell => cell.value ?? 0));
    
    if (checkCompletion(currentValues, solution)) {
      set({ isCompleted: true });
      markLevelCompleted(boardType, difficulty, level);
      return true;
    }
    
    return false;
  },

  goToNextLevel: () => {
    const { level } = get();
    set({ level: level + 1 });
    get().initGame();
  },

  resetGame: () => {
    get().initGame();
  },
}));