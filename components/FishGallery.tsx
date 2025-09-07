
import React from 'react';
import type { Fish } from '../types';
import FishCard from './FishCard';

interface FishGalleryProps {
  fishEntries: Fish[];
}

const FishGallery: React.FC<FishGalleryProps> = ({ fishEntries }) => {
  if (fishEntries.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700">Tu galería está vacía</h3>
        <p className="text-gray-500 mt-2">Sube una imagen para empezar a identificar tus capturas.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-cyan-900 mb-8">Mi Galería de Capturas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {fishEntries.map((fish) => (
          <FishCard key={fish.id} fish={fish} />
        ))}
      </div>
    </div>
  );
};

export default FishGallery;
