import React from 'react';

function WelcomeSection() {
  return (
    <div className="p-4 flex flex-col md:flex-row justify-between items-center">
      <h2 className="text-orange-500 text-lg md:text-xl">Seja Bem-vind@, User</h2>
      <div className="flex gap-2 mt-4 md:mt-0"> {/* Margem superior em telas pequenas */}
        <button className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition-colors">
          Login
        </button>
        <button className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition-colors">
          Registro
        </button>
      </div>
    </div>
  );
}

export default WelcomeSection;