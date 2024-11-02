// src/components/ActionCardsSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionCard from './ActionCard';
import ConnectingLines from './ConnectingLines';

function ActionCardsSection() {
  const navigate = useNavigate();

  const cards = [
    { icon: "📦", title: "Adicionar Produtos", bgColor: "bg-orange-400" },
    { icon: "✋", title: "Criar nova campanha", bgColor: "bg-orange-400" },
    { icon: "🤝", title: "Registrar Doações", bgColor: "bg-orange-400" },
    { icon: "📊", title: "Visualizar Campanhas", bgColor: "bg-orange-400" }
  ];

  const handleCardClick = (index) => {
    if (index === 0) {
      navigate('/adicionar-produto');
    }
    // Adicionar lógica para os outros cartões aqui
  };

  return (
    <div className="relative flex-1 flex justify-center items-center">
      <ConnectingLines />
      <div className="relative z-10 grid grid-cols-2 gap-8 md:grid-cols-4">
        {cards.map((card, index) => (
          <ActionCard
            key={index}
            {...card}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ActionCardsSection;