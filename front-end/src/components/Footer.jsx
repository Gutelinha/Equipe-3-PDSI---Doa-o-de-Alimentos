// src/components/Footer.jsx
import React from 'react';
import ContactSection from './ContactSection';
import PartnersSection from './PartnersSection';

function Footer() {
  return (
    <footer className="bg-orange-500 py-8">
      <div className="container mx-auto max-w-full flex flex-col md:flex-row justify-between items-center"> {/* justify-between para espaçamento */}
        <div className="flex flex-col items-center w-full md:w-auto md:mr-4"> {/* Margem direita em telas médias */}
          <ContactSection />
        </div>
        <div className="flex flex-col items-center w-full md:w-auto md:ml-4"> {/* Margem esquerda em telas médias */}
          <PartnersSection />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
