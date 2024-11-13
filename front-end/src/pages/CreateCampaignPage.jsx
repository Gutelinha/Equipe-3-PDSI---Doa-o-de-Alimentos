// src/pages/CreateCampaignPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CreateCampaignPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nova campanha:', { name, status, startDate, endDate });
    navigate('/'); // Redireciona de volta para a página inicial
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="relative p-8">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Voltar
        </button>
        <h2 className="text-orange-500 text-2xl font-bold text-center">Criar Nova Campanha</h2>
      </div>
      <main className="flex-1 p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="status" className="block mb-2 text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            >
              <option value="">Selecione um status</option>
              <option value="ativa">Ativa</option>
              <option value="concluída">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-2 text-gray-700">Data de Início</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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