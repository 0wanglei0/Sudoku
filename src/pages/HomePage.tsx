import { useNavigate } from 'react-router-dom';
import { DifficultyCard } from '../components/DifficultyCard';
import { DIFFICULTY_CONFIGS } from '../utils/gameLogic';
import { getUnlockedLevel, getCompletedLevels } from '../utils/storage';
import { Difficulty } from '../types';
import { Gamepad2, Sparkles } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleDifficultyClick = (difficulty: Difficulty) => {
    const unlockedLevel = getUnlockedLevel(difficulty);
    navigate(`/game/${difficulty}/${unlockedLevel}`);
  };

  const difficulties = Object.values(DIFFICULTY_CONFIGS);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 mb-4 pulse-glow">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">记忆配对游戏</h1>
          <p className="text-white/80 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            选择难度开始你的挑战之旅
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {difficulties.map((config) => (
            <DifficultyCard
              key={config.key}
              config={config}
              unlockedLevel={getUnlockedLevel(config.key)}
              completedLevels={getCompletedLevels(config.key)}
              onClick={() => handleDifficultyClick(config.key)}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-white/60 text-sm">
            每个难度包含 25 个关卡，完成一关解锁下一关
          </p>
        </div>
      </div>
    </div>
  );
};