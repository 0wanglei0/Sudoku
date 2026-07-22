import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { BOARD_SIZE_MAP, DIFFICULTY_CONFIGS, TOTAL_LEVELS } from '../types';
import SudokuBoard from '../components/SudokuBoard';
import NumberPad from '../components/NumberPad';
import VictoryModal from '../components/VictoryModal';

export default function Game() {
  const navigate = useNavigate();
  const {
    boardType,
    difficulty,
    level,
    board,
    timer,
    isCompleted,
    initGame,
    incrementTimer,
    resetGame,
    checkGameCompletion,
    goToNextLevel,
  } = useGameStore();

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (isCompleted) return;
    
    const interval = setInterval(() => {
      incrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, incrementTimer]);

  const checkCompletion = useCallback(() => {
    checkGameCompletion();
  }, [checkGameCompletion]);

  const handleNextLevel = () => {
    if (level < TOTAL_LEVELS) {
      goToNextLevel();
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const boardSize = BOARD_SIZE_MAP[boardType];
  const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">返回</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow-md">
            <span className="text-gray-600 text-sm">{difficultyConfig.label}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-lg font-bold text-gray-800">{formatTime(timer)}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-md">
            <span className="text-gray-600">关卡 {level}/{TOTAL_LEVELS}</span>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">重置</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <SudokuBoard board={board} size={boardSize} onCompletion={checkCompletion} />
        
        <NumberPad size={boardSize} />
      </div>

      {isCompleted && (
        <VictoryModal
          level={level}
          timer={timer}
          isLastLevel={level >= TOTAL_LEVELS}
          onNextLevel={handleNextLevel}
          onBack={handleBack}
        />
      )}
    </div>
  );
}