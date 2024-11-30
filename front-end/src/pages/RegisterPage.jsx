// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        // Adicione aqui sua lógica de registro
        console.log('Register attempt:', formData);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-orange-500 text-3xl font-bold text-center">
                        Criar nova conta
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Preencha os dados abaixo para se registrar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Nome completo</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="João Silva"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar senha</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
                            Registrar
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Já tem uma conta?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-orange-500 hover:text-orange-600 font-medium"
                        >
                            Entre aqui
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
