import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaign } from '../api/Campaign';

const ViewCampaignsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [inactiveCampaigns, setInactiveCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Novo estado

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    setHasSearched(true); // Marca que uma busca foi realizada
    try {
      const response = await getCampaign(searchTerm);
      if (!response) {
        setActiveCampaigns([]);
        setInactiveCampaigns([]);
        return;
      }
      const campaigns = Array.isArray(response) ? response : [response];
      setActiveCampaigns(campaigns.filter(camp => !camp.end_date));
      setInactiveCampaigns(campaigns.filter(camp => camp.end_date));
    } catch (error) {
      console.error('Erro ao buscar campanha:', error);
      setActiveCampaigns([]);
      setInactiveCampaigns([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleShowAll = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      // Busca campanhas ativas
      const activeResponse = await getCampaign('', { active: true });
      // Busca campanhas inativas
      const inactiveResponse = await getCampaign('', { active: false });
      
      // Processa campanhas ativas
      const activeCamps = activeResponse ? (Array.isArray(activeResponse) ? activeResponse : [activeResponse]) : [];
      
      // Processa campanhas inativas
      const inactiveCamps = inactiveResponse ? (Array.isArray(inactiveResponse) ? inactiveResponse : [inactiveResponse]) : [];
      
      setActiveCampaigns(activeCamps);
      setInactiveCampaigns(inactiveCamps);
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
      setActiveCampaigns([]);
      setInactiveCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      // Converte a string "MM/DD/YYYY" para um objeto Date
      const date = new Date(dateString);
      // Formata para o padrão brasileiro (DD/MM/YYYY)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateString; // Retorna a string original em caso de erro
    }
  };
  

  const generateReport = (campaign) => {
    navigate(`/relatorio-campanha/${campaign.name}`);
  };


  const CampaignList = ({ campaigns }) => (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div key={campaign.name} className="bg-orange-500 rounded-lg p-4 text-white">
          <h3 className="font-bold text-xl mb-2">{campaign.name}</h3>
          <p>Data de Início: {formatDate(campaign.start_date)}</p>
          {campaign.end_date && (
            <p>Data de Fim: {formatDate(campaign.end_date)}</p>
          )}
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => generateReport(campaign)}
              className="bg-white text-orange-500 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              Gerar Relatório
            </button>
            <button 
              onClick={() => navigate(`/editar-campanha/${campaign.name}`)}
              className="bg-white text-orange-500 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              Editar Campanha
            </button>
            {campaign.end_date ? (
              <button 
                onClick={() => navigate(`/excluir-campanha/${campaign.name}`)}
                className="bg-white text-red-500 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Excluir Campanha
              </button>
            ) : (
              <button 
                onClick={() => navigate(`/encerrar-campanha/${campaign.name}`)}
                className="bg-white text-red-500 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Encerrar Campanha
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

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
            ) : hasSearched ? (
              (activeCampaigns.length > 0 || inactiveCampaigns.length > 0) ? (
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-orange-600 p-1 mb-4">
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                        ${selected 
                          ? 'bg-white/90 text-orange-700 shadow font-bold border-b-4 border-orange-700'
                          : 'text-white hover:bg-white/[0.12] hover:text-white'
                        }
                        transition-all duration-100 ease-in-out
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white`
                      }
                    >
                      Campanhas Ativas ({activeCampaigns.length})
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                        ${selected 
                          ? 'bg-white/90 text-orange-700 shadow font-bold border-b-4 border-orange-700'
                          : 'text-white hover:bg-white/[0.12] hover:text-white'
                        }
                        transition-all duration-100 ease-in-out
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white`
                      }
                    >
                      Campanhas Encerradas ({inactiveCampaigns.length})
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <CampaignList campaigns={activeCampaigns} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <CampaignList campaigns={inactiveCampaigns} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              ) : (
                <div className="text-white text-center">
                  Nenhuma campanha encontrada
                </div>
              )
            ) : (
              <div className="text-white text-center">
                Use a busca ou clique em "Mostrar Todas" para visualizar as campanhas
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