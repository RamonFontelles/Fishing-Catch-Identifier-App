
import React, { useState, useRef } from 'react';
import ImageUploader from './ImageUploader';

interface FishFormProps {
  onSubmit: (imageBase64: string, mimeType: string, location: string) => void;
  isLoading: boolean;
}

const FishForm: React.FC<FishFormProps> = ({ onSubmit, isLoading }) => {
  const [image, setImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null);
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('Por favor, sube o captura una imagen.');
      return;
    }
    if (!location.trim()) {
      setError('Por favor, introduce el lugar de captura.');
      return;
    }
    setError(null);
    onSubmit(image.base64, image.mimeType, location);
    // Reset form after submission if needed, or let parent component handle it
    setImage(null);
    setLocation('');
  };

  const handleImageChange = (
    newImage: { base64: string; mimeType: string; preview: string } | null
  ) => {
    setImage(newImage);
    if (newImage) {
      setError(null); // Clear error when a new image is set
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
          <h2 className="text-2xl font-bold text-cyan-800">Analiza tu Captura</h2>
          <p className="text-gray-600 mt-1">Sube una foto de tu pez para identificarlo.</p>
      </div>

      <ImageUploader onImageChange={handleImageChange} currentPreview={image?.preview ?? null} />

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Lugar de Captura
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ej: Lago Espejo, Argentina"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || !image || !location.trim()}
        className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analizando...</span>
          </>
        ) : (
          <span>Identificar Pez</span>
        )}
      </button>
    </form>
  );
};

export default FishForm;
