import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterDonatePage = () => {
  const [campaign, setCampaign] = useState('');
  const [products, setProducts] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrando doação:', {
      campaign,
      products,
      quantity,
    });
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
        <h2 className="text-orange-500 text-2xl font-bold text-center">Registrar Doação</h2>
      </div>
      <main className="flex-1 p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="campaign" className="block mb-2 text-gray-700">Campanha</label>
            <input
              type="text"
              id="campaign"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="products" className="block mb-2 text-gray-700">Produtos</label>
            <input
              type="text"
              id="products"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block mb-2 text-gray-700">Quantidade</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Registrar Doação
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterDonatePage;