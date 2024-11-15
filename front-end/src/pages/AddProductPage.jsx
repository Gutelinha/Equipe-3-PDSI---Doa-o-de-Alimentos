import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarcodeScanner from '../components/BarcodeScanner';
import ErrorBoundary from '../components/ErrorBoundary';

function AddProductPage() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [volume, setVolume] = useState('');
    const [barCode, setBarCode] = useState('');
    const [scanning, setScanning] = useState(false);
    const navigate = useNavigate();
    const scanTimeout = useRef(null); // Ref para debounce

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, type, volume, barCode };
        try {
            await axios.post('http://localhost:3001/products', newProduct);
            alert('Produto cadastrado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Tente novamente mais tarde.');
        }
    };

    const handleScan = (scannedCode) => {
        if (scanTimeout.current) return; // Ignora se já houver um scan recente
        console.log("Código escaneado recebido:", scannedCode); // Log para verificar
        setBarCode(scannedCode);
        setScanning(false);
        // Definir timeout para ignorar detecções por 2 segundos
        scanTimeout.current = setTimeout(() => {
            scanTimeout.current = null;
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <div className="relative p-4 md:p-8 lg:p-10">
                <button onClick={() => navigate('/')} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Voltar
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-gray-700">Nome</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block mb-2 text-gray-700">Tipo</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            required
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
                            required
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
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setScanning(!scanning)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full mt-2"
                        >
                            {scanning ? 'Parar de Escanear' : 'Escanear Código de Barras'}
                        </button>
                        {scanning && (
                            <ErrorBoundary>
                                <BarcodeScanner onScan={handleScan} setScanning={setScanning} />
                            </ErrorBoundary>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                    >
                        Salvar Produto
                    </button>
                </form>
                {/* Exibir o código de barras escaneado para verificação */}
                {barCode && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
                        <strong>Código de Barras Escaneado:</strong> {barCode}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AddProductPage;