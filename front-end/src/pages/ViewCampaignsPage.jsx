import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaign } from '../api/Campaign';

const ViewCampaignsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    try {
      const response = await getCampaign(searchTerm);
      setCampaign(response);
    } catch (error) {
      console.error('Erro ao buscar campanha:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    if (!campaign) return;
    // Aqui você implementará a lógica de geração do relatório
    alert('Relatório gerado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <Header />
      <div className="relative p-4 md:p-6 lg:p-8">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Voltar
        </button>
        <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">
          Visualizar Campanhas
        </h2>
      </div>
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center">
        <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome da campanha..."
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-md hover:bg-orange-600"
            >
              Buscar
            </button>
          </div>
          
          <div className="bg-orange-400 rounded-2xl p-6 shadow-lg">
            {loading ? (
              <div className="text-white text-center">Buscando campanha...</div>
            ) : campaign ? (
              <div className="text-white">
                <h3 className="font-bold text-xl mb-4">{campaign.name}</h3>
                <p>Data de Início: {new Date(campaign.start_date).toLocaleDateString()}</p>
                {campaign.end_date && (
                  <p>Data de Fim: {new Date(campaign.end_date).toLocaleDateString()}</p>
                )}
                <button 
                  onClick={generateReport}
                  className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Gerar Relatório
                </button>
              </div>
            ) : (
              <div className="text-white text-center">
                Digite o nome de uma campanha e clique em buscar
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewCampaignsPage;
