
import React from 'react';
import type { Fish } from '../types';

interface FishCardProps {
  fish: Fish;
}

const FishCard: React.FC<FishCardProps> = ({ fish }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 border border-gray-200">
      <img className="h-56 w-full object-cover" src={fish.image} alt={`Pez: ${fish.species}`} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-cyan-800 mb-2">{fish.species}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Dimensiones:</strong> {fish.dimensions}
          </p>
          <p>
            <strong>Lugar:</strong> {fish.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FishCard;
