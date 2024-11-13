import React from 'react';
import rotaryLogo from '../assets/rotary-logo.png'; // Corrigido para importar a imagem

function Header() {
  return (
    <header className="bg-orange-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Arrecadação de Alimentos</h1>
      <img 
        src={rotaryLogo} // Usando a variável importada
        alt="Rotary Logo" 
        className="h-8 object-contain"
      />
    </header>
  );
}

export default Header;