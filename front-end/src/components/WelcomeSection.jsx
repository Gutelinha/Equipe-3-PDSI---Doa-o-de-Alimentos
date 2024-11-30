import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-8 sticky top-0 z-50 w-full">
      <div className="px-4 py-4 w-full max-w-full mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <h1 className="text-2xl font-bold text-orange-500">
            Seja Bem-vind@, User
          </h1>
        </div>
        <div className="flex space-x-4 justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={() => navigate('/login')}
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Registro
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
