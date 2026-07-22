import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: () => void;
  size: number;
}

export const Card = ({ card, onClick, size }: CardProps) => {
  return (
    <div 
      className="card-flip cursor-pointer select-none"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <div className={`card-inner ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'card-matched' : ''}`}>
        <div className="card-front shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-3xl md:text-4xl text-white font-bold">?</span>
        </div>
        <div className={`card-back shadow-lg ${card.isMatched ? 'bg-green-100' : ''}`}>
          <span className="text-2xl md:text-3xl lg:text-4xl">{card.value}</span>
        </div>
      </div>
    </div>
  );
};