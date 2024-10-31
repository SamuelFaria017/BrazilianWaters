import React from 'react';
import { Waves } from 'lucide-react';

const MarinePortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-400 to-cyan-300 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <Waves className="w-16 h-16 text-white mx-auto animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Bem-vindo a Amazônia Azul 
        </h1>
        
        <p className="text-xl text-blue-50 mb-12">
          Uma experiência educacional completa sobre a vida marinha brasileira, 
          combinando história, quiz , jogo, simulador e conhecimento e diversão em uma única plataforma.
        </p>

        <div 
          onClick={() => window.location.href = 'https://grand-stroopwafel-012036.netlify.app/'}
          className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 cursor-pointer hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
        >
          <span className="text-2xl font-bold text-white">
            Explore a Amazônia Azul
          </span>
          <p className="text-blue-50 mt-2">
            Clique para iniciar sua aventura pelo mundo marinho
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarinePortal;

// Deu certo!