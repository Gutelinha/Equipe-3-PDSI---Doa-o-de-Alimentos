import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, getProduct } from '../api/Product';
import BarcodeScanner from '../components/BarcodeScanner';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [volume, setVolume] = useState('');
    const [brand, setBrand] = useState('ignorado');
    const [barCode, setBarCode] = useState('');
    const [scanning, setScanning] = useState(false);
    const [manualEntry, setManualEntry] = useState(false);
    const navigate = useNavigate();
    const scannerRef = useRef(null);
    const barCodeInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop();
                scannerRef.current = null;
            }
        };
    }, []);

    const handleScan = async (code) => {
        console.log('Código recebido:', code);
        if (code.startsWith('789')) {
            console.log('Processando código válido:', code);
            setBarCode(code); 
            setScanning(false); 
            alert('Código de barras escaneado com sucesso!');
            let product = {};
            try {
                product = await getProduct(code);
            } catch (error) {
                if (error.response) {
                    // A resposta foi recebida, mas o servidor respondeu com um status de erro
                    console.error('Erro ao buscar produto:', error.response.data);
                    alert('Erro ao buscar produto. Tente novamente mais tarde.');
                } else if (error.request) {
                    // A requisição foi feita, mas nenhuma resposta foi recebida
                    console.error('Erro ao buscar produto: Nenhuma resposta recebida', error.request);
                    alert('Erro ao buscar produto. Tente novamente mais tarde.');
                } else {
                    // Algo aconteceu ao configurar a requisição que acionou um erro
                    console.error('Erro ao buscar produto:', error.message);
                    alert('Erro ao buscar produto. Tente novamente mais tarde.');
                }
            }
            setName(product.name);
            setType(product.type);
            setVolume(product.volumeUnit);
        } else {
            console.log('Código inválido recebido:', code);
            alert('Código de barras inválido. Tente novamente.');
        }
    };

    const handleBarCodeChange = async (e) => {
        const code = e.target.value;
        setBarCode(code);
        if (code.length === 13) {
            try {
                const product = await getProduct(code);
                if (product && product.barcode) {
                    console.log('Produto encontrado:', product);
                    setName(product.name);
                    setType(product.type);
                    setVolume(product.volumeUnit);
                    alert('Produto encontrado e informações preenchidas.');
                } else {
                    setName('');
                    setType('');
                    setVolume('');
                    alert('Produto não encontrado. Você pode cadastrar um novo produto.');
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setName('');
                    setType('');
                    setVolume('');
                    alert('Produto não encontrado. Você pode cadastrar um novo produto.');
                } else {
                    console.error('Erro ao buscar produto:', error);
                    alert('Erro ao buscar produto. Tente novamente mais tarde.');
                }
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { 
            barcode: barCode, 
            name, 
            brand, 
            type, 
            volume_unit: volume 
        };
        try {
            await createProduct(newProduct);
            alert('Produto cadastrado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Tente novamente mais tarde.');
        }
    };

    const toggleScanning = () => {
        if (scanning) {
            window.location.reload(); 
        } else {
            setScanning(true);
            setManualEntry(false);
        }
    };

    const enableManualEntry = () => {
        setManualEntry(true);
        setScanning(false);
        if (barCodeInputRef.current) {
            barCodeInputRef.current.focus();
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
                <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">
                    Adicionar Novo Produto
                </h2>
            </div>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={enableManualEntry}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                            Digitar Código
                        </button>
                        <button
                            type="button"
                            onClick={toggleScanning}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                            {scanning ? 'Parar Scanner' : 'Escanear Código de Barras'}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="barCode" className="block mb-2 text-gray-700">Código de Barras</label>
                        <input
                            type="number"
                            id="barCode"
                            value={barCode}
                            onChange={handleBarCodeChange}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            required
                            readOnly={!manualEntry}
                            ref={barCodeInputRef}
                        />
                        {scanning && (
                            <ErrorBoundary>
                                <BarcodeScanner ref={scannerRef} onScan={handleScan} />
                            </ErrorBoundary>
                        )}
                    </div>
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
                        <label htmlFor="brand" className="block mb-2 text-gray-700">Marca</label>
                        <input
                            type="text"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
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
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                    >
                        Salvar Produto
                    </button>
                </form>
                {barCode && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
                        <strong>Código de Barras:</strong> {barCode}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default AddProductPage;