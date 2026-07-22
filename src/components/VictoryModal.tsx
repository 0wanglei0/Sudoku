import { Trophy, Star, ArrowRight, Home } from 'lucide-react';

interface VictoryModalProps {
  level: number;
  timer: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onBack: () => void;
}

export default function VictoryModal({ level, timer, isLastLevel, onNextLevel, onBack }: VictoryModalProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center transform animate-bounce-in">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isLastLevel ? '🎉 全部通关！' : '恭喜通关！'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {isLastLevel 
            ? '你已经完成了所有关卡，太棒了！' 
            : `第 ${level} 关挑战成功`
          }
        </p>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-800 font-bold">用时</span>
            </div>
            <span className="text-xl font-bold text-blue-600">{formatTime(timer)}</span>
          </div>
          <div className="bg-green-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-800 font-bold">关卡</span>
            </div>
            <span className="text-xl font-bold text-green-600">{level}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {!isLastLevel && (
            <button
              onClick={onNextLevel}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              下一关
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onBack}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}