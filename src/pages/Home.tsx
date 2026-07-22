import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { BoardType } from '../types';

const BOARD_TYPES: { type: BoardType; label: string; description: string }[] = [
  { type: '4x4', label: '四宫格', description: '适合初学者' },
  { type: '9x9', label: '九宫格', description: '经典数独体验' },
];

export default function Home() {
  const navigate = useNavigate();
  const setBoardType = useGameStore((state) => state.setBoardType);

  const handleSelectBoard = (type: BoardType) => {
    setBoardType(type);
    navigate('/difficulty');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-2">数独游戏</h1>
        <p className="text-gray-600 text-lg">选择宫格类型开始游戏</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {BOARD_TYPES.map(({ type, label, description }) => (
          <button
            key={type}
            onClick={() => handleSelectBoard(type)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div
                className={`grid gap-0.5 bg-gray-800 p-2 rounded-lg ${type === '4x4' ? 'w-24 h-24' : 'w-32 h-32'}`}
                style={{
                  gridTemplateColumns: `repeat(${type === '4x4' ? 4 : 9}, 1fr)`,
                }}
              >
                {Array.from({ length: type === '4x4' ? 16 : 81 }).map((_, index) => {
                  const row = Math.floor(index / (type === '4x4' ? 4 : 9));
                  const col = index % (type === '4x4' ? 4 : 9);
                  const gridSize = type === '4x4' ? 2 : 3;
                  const isBorderRight = (col + 1) % gridSize === 0 && col !== (type === '4x4' ? 3 : 8);
                  const isBorderBottom = (row + 1) % gridSize === 0 && row !== (type === '4x4' ? 3 : 8);

                  return (
                    <div
                      key={index}
                      className="bg-white"
                      style={{
                        borderRight: isBorderRight ? '1px solid #1f2937' : '0.5px solid #e5e7eb',
                        borderBottom: isBorderBottom ? '1px solid #1f2937' : '0.5px solid #e5e7eb',
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{label}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}