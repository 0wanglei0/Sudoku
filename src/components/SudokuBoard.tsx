import { Cell } from '../types';
import { useGameStore } from '../store/gameStore';

interface SudokuBoardProps {
  board: Cell[][];
  size: number;
  onCompletion: () => void;
}

export default function SudokuBoard({ board, size, onCompletion }: SudokuBoardProps) {
  const selectCell = useGameStore((state) => state.selectCell);
  const fillNumber = useGameStore((state) => state.fillNumber);

  const gridSize = size === 4 ? 2 : 3;

  const handleCellClick = (row: number, col: number) => {
    selectCell(row, col);
  };

  const handleCellKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= size) {
      selectCell(row, col);
      fillNumber(num);
      onCompletion();
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      selectCell(row, col);
    }
  };

  return (
    <div className="bg-white p-2 md:p-4 rounded-2xl shadow-xl">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          width: size === 4 ? '280px' : 'min(90vw, 400px)',
          aspectRatio: '1',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isBorderRight = (colIndex + 1) % gridSize === 0 && colIndex !== size - 1;
            const isBorderBottom = (rowIndex + 1) % gridSize === 0 && rowIndex !== size - 1;

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onKeyDown={(e) => handleCellKeyDown(e, rowIndex, colIndex)}
                className={`
                  flex items-center justify-center
                  border border-gray-300
                  ${isBorderRight ? 'border-r-2 border-r-gray-800' : ''}
                  ${isBorderBottom ? 'border-b-2 border-b-gray-800' : ''}
                  ${cell.isSelected ? 'bg-blue-100' : ''}
                  ${cell.isHighlighted && !cell.isSelected ? 'bg-blue-50' : ''}
                  ${!cell.isSelected && !cell.isHighlighted ? 'bg-white' : ''}
                  hover:bg-blue-50
                  transition-colors duration-150
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-400
                  ${size === 4 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
                  font-bold
                `}
              >
                {cell.value && (
                  <span
                    className={`
                      ${cell.isOriginal ? 'text-gray-800' : ''}
                      ${!cell.isOriginal && !cell.isError ? 'text-blue-600' : ''}
                      ${cell.isError ? 'text-red-500' : ''}
                    `}
                  >
                    {cell.value}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}