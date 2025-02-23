import React from 'react';

function HeroSection() {
  return (
    <section
      className="relative min-h-screen pt-20"
      style={{
        backgroundImage: `url('/assets/images/hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-white mb-4 md:text-6xl">
          Bienvenue sur HerbisVeritas
        </h1>
        <p className="text-lg text-gray-200 mb-8 md:text-xl">
          Découvrez notre sélection de plantes médicinales
        </p>
        <button className="bg-green-600 px-6 py-3 rounded-lg text-white hover:bg-green-700 transition-colors">
          Découvrir nos produits
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
