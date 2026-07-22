import { BoardType, Difficulty, DIFFICULTY_CONFIGS, BOARD_SIZE_MAP, GRID_SIZE_MAP } from '../types';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValid(board: number[][], row: number, col: number, num: number, size: number): boolean {
  for (let i = 0; i < size; i++) {
    if (board[row][i] === num) return false;
  }

  for (let i = 0; i < size; i++) {
    if (board[i][col] === num) return false;
  }

  const gridSize = GRID_SIZE_MAP[size === 4 ? '4x4' : '9x9'];
  const boxRow = Math.floor(row / gridSize) * gridSize;
  const boxCol = Math.floor(col / gridSize) * gridSize;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board: number[][], size: number): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle(Array.from({ length: size }, (_, i) => i + 1));
        for (const num of numbers) {
          if (isValid(board, row, col, num, size)) {
            board[row][col] = num;
            if (solveSudoku(board, size)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function countSolutions(board: number[][], size: number, limit: number = 2): number {
  let count = 0;

  function solve(): boolean {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(board, row, col, num, size)) {
              board[row][col] = num;
              if (solve()) {
                board[row][col] = 0;
                if (count >= limit) return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    count++;
    return count >= limit;
  }

  solve();
  return count;
}

export function generateSudoku(boardType: BoardType, difficulty: Difficulty): { puzzle: number[][]; solution: number[][] } {
  const size = BOARD_SIZE_MAP[boardType];
  const removeRatio = DIFFICULTY_CONFIGS[difficulty].removeRatio;
  const totalCells = size * size;
  const cellsToRemove = Math.floor(totalCells * removeRatio);

  const solution: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  solveSudoku(solution, size);

  const puzzle: number[][] = solution.map(row => [...row]);

  const positions = shuffle(
    Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => ({ row, col }))
    ).flat()
  );

  let removed = 0;
  for (const { row, col } of positions) {
    if (removed >= cellsToRemove) break;

    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    const testBoard = puzzle.map(r => [...r]);
    if (countSolutions(testBoard, size, 2) === 1) {
      removed++;
    } else {
      puzzle[row][col] = backup;
    }
  }

  return { puzzle, solution };
}

export function checkCompletion(board: number[][], solution: number[][]): boolean {
  const size = board.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
}

export function isBoardFilled(board: number[][]): boolean {
  const size = board.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0 || board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
}