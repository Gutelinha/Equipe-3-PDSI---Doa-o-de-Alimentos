// src/components/ActionCard.jsx
import React from 'react';

function ActionCard({ icon, title, bgColor, onClick }) {
  return (
    <div 
      className={`${bgColor} rounded-2xl p-6 flex flex-col items-center justify-center w-48 h-48 cursor-pointer transition-transform hover:scale-105`}
      onClick={onClick}
    >
      <span className="text-4xl mb-2">{icon}</span>
      <span className="text-white text-center font-semibold">{title}</span>
    </div>
  );
}

export default ActionCard;