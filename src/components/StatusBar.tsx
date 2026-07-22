import { Clock, Footprints, Trophy, Zap } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';
import { DIFFICULTY_CONFIGS, formatTime } from '../utils/gameLogic';

export const StatusBar = () => {
  const { currentDifficulty, currentLevel, steps, timeRemaining, matchedPairs, totalPairs } = useGameStore();
  
  const config = currentDifficulty ? DIFFICULTY_CONFIGS[currentDifficulty] : null;
  const hasTimeLimit = config?.timeLimit && config.timeLimit > 0;
  const isLowTime = hasTimeLimit && timeRemaining <= 10;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">难度</p>
            <p className="font-bold text-gray-800">{config?.name || '-'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">关卡</p>
            <p className="font-bold text-gray-800">{currentLevel}/25</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <Footprints className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">步数</p>
            <p className="font-bold text-gray-800">{steps}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isLowTime ? 'bg-gradient-to-br from-red-400 to-red-600 animate-pulse' : 'bg-gradient-to-br from-green-400 to-green-600'}`}>
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">时间</p>
            <p className={`font-bold ${isLowTime ? 'text-red-600' : 'text-gray-800'}`}>
              {hasTimeLimit ? formatTime(timeRemaining) : '--:--'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>配对进度</span>
          <span>{matchedPairs}/{totalPairs}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};