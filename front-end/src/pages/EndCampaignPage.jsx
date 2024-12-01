import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaign, deleteCampaign } from '../api/Campaign';

function EndCampaignPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  const formatDateForInput = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      return dateString;
    }
  };

  const formatDateForApi = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const validateEndDate = (startDateString, endDateString) => {
    // Converte as strings para objetos Date
    const start = new Date(startDateString);
    const end = new Date(endDateString);
    
    // Adiciona um dia à data de início para comparação
    const minEndDate = new Date(start);
    minEndDate.setDate(minEndDate.getDate() + 1);
    
    return end >= minEndDate;
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaign(name);
        if (response) {
          setCampaignName(response.name);
          setStartDate(formatDateForInput(response.start_date));
          setEndDate(new Date().toISOString().split('T')[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar campanha:', error);
        alert('Erro ao carregar dados da campanha');
        navigate('/visualizar-campanhas');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [name, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEndDate(startDate, endDate)) {
      alert('A data de encerramento deve ser pelo menos um dia após a data de início');
      return;
    }

    if (!window.confirm('Tem certeza que deseja encerrar esta campanha?')) {
      return;
    }

    const campaignData = {
      end_date: formatDateForApi(endDate)
    };

    try {
      const response = await deleteCampaign(name, campaignData);
      if (response) {
        alert('Campanha encerrada com sucesso!');
        navigate('/visualizar-campanhas');
      }
    } catch (error) {
      alert('Erro ao encerrar campanha');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-orange-500">Carregando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calcula a data mínima para o input (um dia após a data de início)
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1);
  const minEndDateString = minEndDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="relative p-4 md:p-8 lg:p-10">
        <button 
          onClick={() => navigate('/visualizar-campanhas')} 
          className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Voltar
        </button>
        <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">Encerrar Campanha</h2>
      </div>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">
              Atenção: Encerrar uma campanha é uma ação irreversível. 
              A campanha não poderá ser reativada após o encerramento.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-700">Nome da Campanha</label>
              <div className="bg-gray-100 px-3 py-2 rounded-md w-full text-gray-700">
                {campaignName}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Data de Início</label>
              <div className="bg-gray-100 px-3 py-2 rounded-md w-full text-gray-700">
                {formatDateForApi(startDate)}
              </div>
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 text-gray-700">Data de Encerramento</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={minEndDateString}
                required
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              Confirmar Encerramento
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EndCampaignPage;
