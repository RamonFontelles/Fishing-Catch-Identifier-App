
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageChange: (image: { base64: string; mimeType: string; preview: string } | null) => void;
  currentPreview: string | null;
}

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      const mimeType = file.type;
      resolve({ base64, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, currentPreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { base64, mimeType } = await fileToBase64(file);
        const preview = URL.createObjectURL(file);
        onImageChange({ base64, mimeType, preview });
      } catch (error) {
        console.error("Error convirtiendo archivo a base64:", error);
        onImageChange(null);
      }
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerCameraInput = () => cameraInputRef.current?.click();

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={cameraInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
        {currentPreview ? (
          <img src={currentPreview} alt="Vista previa del pez" className="h-full w-full object-cover" />
        ) : (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Arrastra una imagen o haz clic para seleccionar</p>
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={triggerFileInput}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Subir Archivo
        </button>
        <button
          type="button"
          onClick={triggerCameraInput}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Usar Cámara
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
