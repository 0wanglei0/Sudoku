import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { MAX_LEVELS } from '../utils/gameLogic';
import { Trophy, Home, ArrowRight, RotateCcw } from 'lucide-react';

export const WinModal = () => {
  const { isGameOver, isWin, currentLevel, nextLevel, startGame, currentDifficulty } = useGameStore();
  const navigate = useNavigate();

  const handleNextLevel = () => {
    if (currentLevel >= MAX_LEVELS) {
      navigate('/');
    } else {
      nextLevel();
    }
  };

  const handleRetry = () => {
    if (currentDifficulty) {
      startGame(currentDifficulty, currentLevel);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-bounce-custom">
        {isWin ? (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center pulse-glow">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 恭喜过关！</h2>
            <p className="text-gray-600 mb-6">
              {currentLevel >= MAX_LEVELS 
                ? '太棒了！你已经完成了所有关卡！' 
                : `你成功通过了第 ${currentLevel} 关`
              }
            </p>
            <div className="space-y-3">
              {currentLevel < MAX_LEVELS && (
                <button
                  onClick={handleNextLevel}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  下一关
                </button>
              )}
              <button
                onClick={handleRetry}
                className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                重新挑战
              </button>
              <button
                onClick={handleHome}
                className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                返回首页
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <RotateCcw className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">⏰ 时间到！</h2>
            <p className="text-gray-600 mb-6">很遗憾，时间用完了，再试一次吧！</p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                重新挑战
              </button>
              <button
                onClick={handleHome}
                className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                返回首页
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};