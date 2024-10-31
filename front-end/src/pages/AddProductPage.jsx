// src/pages/AddProductPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AddProductPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [volume, setVolume] = useState('');
  const [barCode, setBarCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar o produto
    console.log('Novo produto:', { name, type, volume, barCode });
    navigate('/'); // Redireciona de volta para a página inicial
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 p-8">
        <h2 className="text-orange-500 text-xl mb-4">Adicionar Novo Produto</h2>
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
            <label htmlFor="type" className="block mb-2 text-gray-700">Tipo</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            >
              <option value="">Selecione um tipo</option>
              <option value="alimento">Alimento</option>
              <option value="higiene">Higiene</option>
              <option value="limpeza">Limpeza</option>
            </select>
          </div>
          <div>
            <label htmlFor="volume" className="block mb-2 text-gray-700">Unidade de Volume</label>
            <input
              type="text"
              id="volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="barCode" className="block mb-2 text-gray-700">Código de Barras</label>
            <input
              type="text"
              id="barCode"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Salvar Produto
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default AddProductPage;