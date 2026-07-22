import { useGameStore } from '../stores/gameStore';
import { DIFFICULTY_CONFIGS } from '../utils/gameLogic';
import { Card } from './Card';

export const GameBoard = () => {
  const { cards, flipCard, currentDifficulty } = useGameStore();
  
  const config = currentDifficulty ? DIFFICULTY_CONFIGS[currentDifficulty] : null;
  const columns = config?.gridSize || 2;
  const totalCards = cards.length;
  
  const getCardSize = () => {
    const screenWidth = window.innerWidth;
    const maxWidth = screenWidth < 640 ? screenWidth - 40 : 480;
    const gap = 8;
    return Math.floor((maxWidth - (columns - 1) * gap) / columns);
  };

  return (
    <div 
      className="grid gap-2 md:gap-3 justify-items-center"
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: totalCards > 0 ? `repeat(${Math.ceil(totalCards / columns)}, 1fr)` : 'none',
        maxWidth: 'fit-content'
      }}
    >
      {cards.map((card, index) => (
        <Card 
          key={card.id}
          card={card}
          onClick={() => flipCard(index)}
          size={getCardSize()}
        />
      ))}
    </div>
  );
};