import React from 'react';
import PageTitle from '../Ui/PageTitle';

const HeroSection = () => (
  <section className="relative h-[calc(100vh-4rem)]">
    {/* Arrière-plan */}
    <div className="absolute inset-0 z-0">
      <img
        src="/assets/images/hero.jpg"
        className="w-full h-full object-cover"
        alt="Herbes médicinales"
      />
    </div>

    {/* Contenu au premier plan */}
    <div className="relative z-10 h-full flex items-center justify-center pt-16">
      <PageTitle hasHero className="text-white text-center mx-auto">
        Découvrez nos plantes médicinales
        <p className="mt-4 text-lg">
          La puissance des plantes méditerranéennes
        </p>
      </PageTitle>
    </div>
  </section>
);

export default HeroSection;
