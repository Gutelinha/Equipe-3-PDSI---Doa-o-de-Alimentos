// src/components/Footer.jsx
import React from 'react';
import ContactSection from './ContactSection';

function Footer() {
  return (
    <footer className="bg-orange-500 py-8">
      <div className="container mx-auto flex justify-between items-start">
        <ContactSection />
        <div className="text-white text-lg">
          <h3 className="mb-6 text-2xl">Nossos Parceiros</h3>
          <div className="flex gap-6">
            {[1, 2, 3, 4, 5].map((partner) => (
              <div key={partner} className="flex items-center">
                <span className="mr-2">🤝</span>
                <span>Parceiro {partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;