import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaign, updateCampaign } from '../api/Campaign';

function EditCampaignPage() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [campaignName, setCampaignName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCampaign = async () => {
        try {
          const response = await getCampaign(name);
          if (response) {
            setCampaignName(response.name);
            setStartDate(formatDateForInput(response.start_date));
            setEndDate(response.end_date ? formatDateForInput(response.end_date) : '');
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
  
    const formatDateForInput = (dateString) => {
      // Converte de MM/DD/YYYY para YYYY-MM-DD
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
  
    const formatDateForApi = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const campaignData = {
        start_date: formatDateForApi(startDate),
        ...(endDate && { end_date: formatDateForApi(endDate) })
      };
  
      try {
        const response = await updateCampaign(name, campaignData);
        if (response) {
          alert('Campanha atualizada com sucesso!');
          navigate('/visualizar-campanhas');
        }
      } catch (error) {
        console.error('Erro ao atualizar campanha:', error);
        alert('Erro ao atualizar campanha');
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
          <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">Editar Campanha</h2>
        </div>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700">Nome da Campanha</label>
              <div className="bg-gray-100 px-3 py-2 rounded-md w-full text-gray-700">
                {campaignName}
              </div>
            </div>
            <div>
              <label htmlFor="startDate" className="block mb-2 text-gray-700">Data de Início</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 text-gray-700">Data de Fim</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Atualizar Campanha
            </button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
  

export default EditCampaignPage;