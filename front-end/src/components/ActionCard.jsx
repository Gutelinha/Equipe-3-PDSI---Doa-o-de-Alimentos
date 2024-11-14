// src/components/ActionCard.jsx
import React from 'react';

function ActionCard({ icon, title, bgColor, onClick }) {
  return (
    <div 
      className={`${bgColor} rounded-2xl p-6 flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 cursor-pointer transition-transform hover:scale-105`}
      onClick={onClick}
    >
      <span className="text-3xl md:text-4xl mb-2">{icon}</span>
      <span className="text-white text-center font-semibold text-sm md:text-base">{title}</span>
    </div>
  );
}

export default ActionCard;