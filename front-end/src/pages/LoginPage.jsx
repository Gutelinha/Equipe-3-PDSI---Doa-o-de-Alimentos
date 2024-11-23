// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione aqui sua lógica de autenticação
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-orange-500 text-3xl font-bold text-center">
                        Bem-vindo(a) de volta!
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Entre com suas credenciais para acessar
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                        >
                            Entrar
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Ainda não tem uma conta?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-orange-500 hover:text-orange-600 font-medium"
                        >
                            Registre-se aqui
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;