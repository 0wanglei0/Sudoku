import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Difficulty, DIFFICULTY_CONFIGS, BOARD_SIZE_MAP, TOTAL_LEVELS } from '../types';
import { getGameProgress } from '../utils/storage';

const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'medium', 'hard'];

export default function DifficultySelect() {
  const navigate = useNavigate();
  const boardType = useGameStore((state) => state.boardType);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const setLevel = useGameStore((state) => state.setLevel);

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setLevel(1);
    navigate('/game');
  };

  const boardSize = BOARD_SIZE_MAP[boardType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 self-start"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg font-medium">返回</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">选择难度</h1>
        <p className="text-gray-600">{boardSize}x{boardSize} 数独</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto flex-1">
        {DIFFICULTIES.map((difficulty) => {
          const config = DIFFICULTY_CONFIGS[difficulty];
          const progress = getGameProgress(boardType, difficulty);
          const completedPercent = Math.round((progress.completedLevel / TOTAL_LEVELS) * 100);

          return (
            <button
              key={difficulty}
              onClick={() => handleSelectDifficulty(difficulty)}
              className={`${config.bgColor} rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center text-left w-full`}
            >
              <div className="flex items-center justify-between w-full mb-4">
                <h2 className={`text-2xl font-bold ${config.color}`}>{config.label}</h2>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                  {progress.completedLevel}/{TOTAL_LEVELS} 关
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    difficulty === 'easy' ? 'bg-green-500' :
                    difficulty === 'normal' ? 'bg-blue-500' :
                    difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${completedPercent}%` }}
                />
              </div>
              
              <p className="text-gray-600 text-sm">
                {difficulty === 'easy' ? '简单入门，适合新手' :
                 difficulty === 'normal' ? '略有挑战，需要基础技巧' :
                 difficulty === 'medium' ? '中等难度，考验逻辑能力' : '高难度，挑战你的极限'}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}