import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarcodeScanner from '../components/BarcodeScanner';
import funcs from "../\App"


function AddProductPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [volume, setVolume] = useState('');
  const [barCode, setBarCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, type, volume, barCode };

    try {
      await axios.post('http://localhost:3001/products', newProduct);
      alert('Produto cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao cadastrar produto. Tente novamente mais tarde.');
    }
  };

  const handleScan = (scannedCode) => {
    setBarCode(scannedCode);
    setScanning(false);
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
            <button
              type="button"
              onClick={() => setScanning(!scanning)}
              className="bg-orange-500 text-white px-4 py-2 rounded-full mt-2"
            >
              {scanning ? 'Parar de Escanear' : 'Escanear Código de Barras'}
            </button>
            {scanning && <BarcodeScanner onScan={handleScan} />}
          </div>
          <button onClick={funcs.TesteDB}
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