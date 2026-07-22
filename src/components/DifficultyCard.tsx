import { Star, CheckCircle2 } from 'lucide-react';
import { DifficultyConfig } from '../types';

interface DifficultyCardProps {
  config: DifficultyConfig;
  unlockedLevel: number;
  completedLevels: number[];
  onClick: () => void;
}

export const DifficultyCard = ({ config, unlockedLevel, completedLevels, onClick }: DifficultyCardProps) => {
  const progress = Math.round((completedLevels.length / 25) * 100);

  return (
    <div 
      onClick={onClick}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-4`}>
        <Star className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-2">{config.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{config.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">进度</span>
        <span className="text-xs font-bold text-purple-600">{completedLevels.length}/25</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className={`bg-gradient-to-r ${config.color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex items-center justify-center gap-2 text-sm">
        {completedLevels.length === 0 ? (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            第 1 关待挑战
          </span>
        ) : (
          <span className="flex items-center gap-1 text-purple-600 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            已完成 {completedLevels.length} 关
          </span>
        )}
      </div>
    </div>
  );
};