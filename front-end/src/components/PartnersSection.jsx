// src/components/PartnersSection.jsx
import React from 'react';

function PartnersSection() {
  return (
    <div className="text-white pr-0 md:pr-8">
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-xl text-center">Nossos Parceiros</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4, 5].map((partner) => (
            <div key={partner} className="flex items-center">
              <span className="mr-2 text-2xl">🤝</span>
              <span className="text-lg">Parceiro {partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnersSection;