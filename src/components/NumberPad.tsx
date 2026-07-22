import { useGameStore } from '../store/gameStore';

interface NumberPadProps {
  size: number;
}

export default function NumberPad({ size }: NumberPadProps) {
  const fillNumber = useGameStore((state) => state.fillNumber);
  const clearCell = useGameStore((state) => state.clearCell);

  const numbers = Array.from({ length: size }, (_, i) => i + 1);

  return (
    <div className="mt-6 w-full max-w-md">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
        }}
      >
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => fillNumber(num)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 py-3 md:py-4 text-xl md:text-2xl font-bold text-gray-800"
          >
            {num}
          </button>
        ))}
        <button
          onClick={clearCell}
          className="bg-gray-100 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 py-3 md:py-4 text-lg md:text-xl font-bold text-gray-600"
        >
          清除
        </button>
      </div>
    </div>
  );
}