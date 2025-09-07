
import React, { useState } from 'react';
import { Fish } from './types';
import { identifyFish } from './services/geminiService';
import FishForm from './components/FishForm';
import FishGallery from './components/FishGallery';
import Header from './components/Header';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [fishEntries, setFishEntries] = useState<Fish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleIdentifyFish = async (
    imageBase64: string,
    mimeType: string,
    location: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await identifyFish(imageBase64, mimeType);
      
      if (result.species.toLowerCase().includes('no fish detected')) {
        setError('No se detectó ningún pez en la imagen. Por favor, inténtelo de nuevo.');
        setIsLoading(false);
        return;
      }

      const newFish: Fish = {
        id: new Date().toISOString(),
        image: `data:${mimeType};base64,${imageBase64}`,
        species: result.species,
        dimensions: result.dimensions,
        location: location,
      };
      setFishEntries((prevEntries) => [newFish, ...prevEntries]);
    } catch (err) {
      console.error(err);
      setError('Hubo un error al analizar la imagen. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
          <FishForm onSubmit={handleIdentifyFish} isLoading={isLoading} />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mt-4 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && <Loader />}
        
        <FishGallery fishEntries={fishEntries} />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        <p>Potenciado por IA de Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
