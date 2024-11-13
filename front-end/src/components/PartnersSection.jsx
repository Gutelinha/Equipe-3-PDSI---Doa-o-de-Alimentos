// src/components/PartnersSection.jsx
import React from 'react';

function PartnersSection() {
  return (
    <div className="text-white">
      <h3 className="mb-4">Nossos Parceiros</h3>
      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map((partner) => (
          <div key={partner} className="flex items-center">
            <span className="mr-1">🤝</span>
            <span>Parceiro {partner}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartnersSection;