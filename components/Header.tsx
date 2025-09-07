
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800">
          Identificador de Peces con IA
        </h1>
      </div>
    </header>
  );
};

export default Header;
