import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ViewCampaignsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <Header />
      <div className="relative p-4 md:p-6 lg:p-8"> {/* Padding responsivo */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Voltar
        </button>
        <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center"> {/* Tamanho da fonte responsivo */}
          Visualizar Campanhas
        </h2>
      </div>
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center"> {/* Padding responsivo */}
        <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl"> {/* Largura responsiva */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Pesquise o nome da campanha..."
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <div className="bg-orange-400 rounded-2xl p-6 shadow-lg"> {/* Removido min-h */}
            <div className="text-white mb-4">Campanha 1: Detalhes...</div>
            <div className="text-white mb-4">Campanha 2: Detalhes...</div>
            {/* Adicione mais campanhas aqui */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewCampaignsPage;