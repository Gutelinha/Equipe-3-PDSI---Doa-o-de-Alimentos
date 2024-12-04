// RegisterDonatePage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaign } from '../api/Campaign';
import { createDonation } from '../api/Donation';
import { getProduct } from '../api/Product';
import BarcodeScanner from '../components/BarcodeScanner';
import ErrorBoundary from '../components/ErrorBoundary';

const RegisterDonatePage = () => {
  const [campaign, setCampaign] = useState('');
  const [quantity, setQuantity] = useState('');
  const [barcode, setBarcode] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDonation, setLastDonation] = useState(null);
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaign('');
        if (response) {
          const campaignList = Array.isArray(response) ? response : [response];
          setCampaigns(campaignList);
          if (campaignList.length === 1) {
            setCampaign(campaignList[0].name);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
        alert('Erro ao carregar campanhas');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleScanBarcode = () => {
    if (scanning) {
      window.location.reload(); // Recarrega a página ao parar o scanner
    } else {
      setScanning(true); // Inicia o scanner
      setManualEntry(false);
    }
  };

  const handleScan = async (code) => {
    console.log('Código recebido:', code);
    if (code.startsWith('789')) {
      console.log('Processando código válido:', code);
      setBarcode(code);
      setScanning(false);
      alert('Código de barras escaneado com sucesso!');
      try {
        const product = await getProduct(code);
        if (product) {
          console.log('Produto encontrado:', product);
          alert('Produto encontrado e pronto para doação.');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Produto não encontrado. Por favor, verifique o código.');
        } else {
          console.error('Erro ao buscar produto:', error);
          alert('Erro ao buscar produto. Tente novamente mais tarde.');
        }
      }
    } else {
      console.log('Código inválido recebido:', code);
      alert('Código de barras inválido. Tente novamente.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaign) {
      alert('Por favor, selecione uma campanha');
      return;
    }

    if (!barcode) {
      alert('Por favor, insira o código de barras do produto');
      return;
    }

    const donationData = {
      key: {
        productBarcode: barcode,
        campaignName: campaign
      },
      quantity: parseInt(quantity)
    };

    try {
      const response = await createDonation(donationData);
      if (response) {
        const productInfo = await getProduct(barcode);
        setLastDonation({
          productName: productInfo.name,
          productBrand: productInfo.brand,
          campaign,
          quantity: parseInt(quantity),
          timestamp: new Date().toLocaleString()
        });
        setBarcode('');
        setQuantity('');
      }
    } catch (error) {
      console.error('Erro ao registrar doação:', error);
      alert('Erro ao registrar doação. Tente novamente mais tarde.');
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
        <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">Registrar Doação</h2>
      </div>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="barcode" className="block mb-2 text-gray-700">Código de Barras</label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setManualEntry(true);
                    setScanning(false);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Digitar Código
                </button>
                <button
                  type="button"
                  onClick={handleScanBarcode}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  {scanning ? 'Parar Scanner' : 'Escanear Código de Barras'}
                </button>
              </div>
              <input
                type="text"
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Digite o código de barras manualmente"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                readOnly={!manualEntry && scanning}
              />
              {scanning && (
                <div className="mt-4">
                  <ErrorBoundary>
                    <BarcodeScanner onScan={handleScan} />
                  </ErrorBoundary>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-2 text-gray-700">Quantidade</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                required
                min="1"
              />
            </div>

            <div>
              <label htmlFor="campaign" className="block mb-2 text-gray-700">Campanha</label>
              {loading ? (
                <div className="text-gray-500">Carregando campanhas...</div>
              ) : campaigns.length === 0 ? (
                <div className="text-red-500">Nenhuma campanha disponível</div>
              ) : campaigns.length === 1 ? (
                <div className="border border-gray-300 px-3 py-2 rounded-md w-full bg-gray-50">
                  {campaigns[0].name}
                </div>
              ) : (
                <select
                  id="campaign"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full bg-white"
                  required
                >
                  <option value="" disabled>Selecione uma campanha</option>
                  {campaigns.map((camp) => (
                    <option key={camp.name} value={camp.name}>
                      {camp.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors mt-8"
              disabled={loading || campaigns.length === 0}
            >
              Registrar Doação
            </button>
          </div>
        </form>
        {lastDonation && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Última Doação Registrada
            </h3>
            <div className="space-y-2 text-green-700">
              <p>
                <span className="font-medium">Produto:</span>{' '}
                {lastDonation.productName} - {lastDonation.productBrand}
              </p>
              <p>
                <span className="font-medium">Quantidade:</span>{' '}
                {lastDonation.quantity} unidades
              </p>
              <p>
                <span className="font-medium">Campanha:</span>{' '}
                {lastDonation.campaign}
              </p>
              <p className="text-sm text-green-600">
                <span className="font-medium">Registrado em:</span>{' '}
                {lastDonation.timestamp}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RegisterDonatePage;