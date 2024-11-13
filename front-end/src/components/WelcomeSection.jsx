import React from 'react';

function WelcomeSection() {
  return (
    <div className="p-4 flex justify-between items-center">
      <h2 className="text-orange-500 text-xl">Seja Bem-vind@, User</h2>
      <div className="flex gap-2">
        <button className="bg-yellow-400 text-white px-6 py-1 rounded-full hover:bg-yellow-500 transition-colors">
          Login
        </button>
        <button className="bg-yellow-400 text-white px-6 py-1 rounded-full hover:bg-yellow-500 transition-colors">
          Registro
        </button>
      </div>
    </div>
  );
}

export default WelcomeSection;