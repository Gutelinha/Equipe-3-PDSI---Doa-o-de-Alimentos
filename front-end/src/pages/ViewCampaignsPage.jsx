import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaign } from '../api/Campaign';

const ViewCampaignsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    try {
      const response = await getCampaign(searchTerm);
      setCampaigns(Array.isArray(response) ? response : [response]);
    } catch (error) {
      console.error('Erro ao buscar campanha:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAll = async () => {
    setLoading(true);
    try {
      const response = await getCampaign('');
      setCampaigns(Array.isArray(response) ? response : [response]);
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = (campaign) => {
    if (!campaign) return;
    alert(`Relatório gerado para campanha: ${campaign.name}`);
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
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome da campanha..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Buscar
            </button>
            <button
              onClick={handleShowAll}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Mostrar Todas
            </button>
          </div>
          
          <div className="bg-orange-400 rounded-2xl p-6 shadow-lg">
            {loading ? (
              <div className="text-white text-center">Carregando campanhas...</div>
            ) : campaigns.length > 0 ? (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.name} className="bg-orange-500 rounded-lg p-4 text-white">
                    <h3 className="font-bold text-xl mb-2">{campaign.name}</h3>
                    <p>Data de Início: {new Date(campaign.start_date).toLocaleDateString()}</p>
                    {campaign.end_date && (
                      <p>Data de Fim: {new Date(campaign.end_date).toLocaleDateString()}</p>
                    )}
                    <button 
                      onClick={() => generateReport(campaign)}
                      className="mt-2 bg-white text-orange-500 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Gerar Relatório
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white text-center">
                Nenhuma campanha encontrada
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
