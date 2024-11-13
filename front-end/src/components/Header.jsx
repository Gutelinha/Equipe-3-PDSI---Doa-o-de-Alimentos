import React from 'react';

function Header() {
  return (
    <header className="bg-orange-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Arrecadação de Alimentos</h1>
      <img 
        src="/rotary-logo.png" 
        alt="Rotary Logo" 
        className="h-8 object-contain"
      />
    </header>
  );
}

export default Header;