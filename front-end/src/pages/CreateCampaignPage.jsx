import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createCampaign } from '../api/Campaign';

function CreateCampaignPage() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Função para formatar a data
    const formatDate = (dateString) => {
      const date = new Date(dateString + 'T00:00:00');
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  };
  

    const campaignData = {
        name: name.trim(),
        start_date: formatDate(startDate),
        ...(endDate && { end_date: formatDate(endDate) })
    };

    try {
        const response = await createCampaign(campaignData);
        if (response) {
          alert("Campanha criada com sucesso!")
            navigate('/');
        }
    } catch (error) {
        console.error('Erro ao criar campanha:', error);
    }
};


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="relative p-4 md:p-8 lg:p-10">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Voltar
        </button>
        <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">Criar Nova Campanha</h2>
      </div>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
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
            Salvar Campanha
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default CreateCampaignPage;
