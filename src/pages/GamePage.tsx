import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { GameBoard } from '../components/GameBoard';
import { StatusBar } from '../components/StatusBar';
import { WinModal } from '../components/WinModal';
import { DIFFICULTY_CONFIGS } from '../utils/gameLogic';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Difficulty } from '../types';

export const GamePage = () => {
  const { difficulty, level } = useParams<{ difficulty: Difficulty; level: string }>();
  const navigate = useNavigate();
  const { startGame, resetGame, decrementTime, isPlaying, currentDifficulty } = useGameStore();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (difficulty && level && !hasStarted.current) {
      hasStarted.current = true;
      const config = DIFFICULTY_CONFIGS[difficulty];
      if (config) {
        startGame(difficulty, parseInt(level, 10));
      } else {
        navigate('/');
      }
    }
  }, [difficulty, level, navigate, startGame]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const config = currentDifficulty ? DIFFICULTY_CONFIGS[currentDifficulty] : null;
    if (!config || config.timeLimit === 0) return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentDifficulty]);

  const handleBack = () => {
    resetGame();
    navigate('/');
  };

  const handleRestart = () => {
    if (difficulty && level) {
      startGame(difficulty, parseInt(level, 10));
    }
  };

  return (
    <div className="min-h-screen py-4 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回</span>
          </button>
          
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-medium">重新开始</span>
          </button>
        </div>
        
        <StatusBar />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6">
          <GameBoard />
        </div>
        
        <WinModal />
        
        <div className="mt-6 text-center text-white/60 text-sm">
          <p>点击卡片翻转，找出所有配对</p>
        </div>
      </div>
    </div>
  );
};