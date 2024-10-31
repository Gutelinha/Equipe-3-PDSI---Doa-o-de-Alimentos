import React from 'react';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import ActionCardsSection from '../components/ActionCardsSection';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <WelcomeSection />
        <ActionCardsSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
