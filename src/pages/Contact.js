import React from 'react';
import MarketCard from '../components/MarketCard';
import ContactInfoCard from '../components/ContactInfoCard';
import SocialMediaLinks from '../components/SocialMediaLinks';

function Contact() {
  console.log('Contact page loaded');
  const markets = [
    {
      name: 'Béziers',
      address: 'Place Pierre Sémard, 34500 Béziers',
      latitude: 43.3445,
      longitude: 3.2158,
    },
    {
      name: 'Pézenas',
      address: 'Place Frédéric Mistral, 34120 Pézenas',
      latitude: 43.459,
      longitude: 3.4236,
    },
    {
      name: 'Montpellier',
      address: 'Place des Arceaux, 34000 Montpellier',
      latitude: 43.6119,
      longitude: 3.8701,
    },
    {
      name: 'Sète',
      address: 'Les Halles de Sète, Rue Gambetta, 34200 Sète',
      latitude: 43.4075,
      longitude: 3.6935,
    },
    {
      name: 'Agde',
      address: 'Avenue du 8 Mai 1945 et Place Jean Jaurès, 34300 Agde',
      latitude: 43.3108,
      longitude: 3.4753,
    },
  ];
  return (
    <main
      className="container mx-auto px-4 py-8 bg-gray-50 text-gray-800"
      style={{ minHeight: '100vh', height: 'auto' }}
    >
      <header className="text-center mt-16 md:mt-16 lg:mt-20 mb-6">
        <h1 className="text-3xl font-bold text-gray-600">Nous contacter</h1>
      </header>

      <section
        className="flex flex-col md:flex-row gap-8"
        aria-labelledby="coordonnees-heading"
      >
        <ContactInfoCard />
        <SocialMediaLinks />
      </section>

      <section className="mt-12" aria-labelledby="marches-heading">
        <h2
          id="marches-heading"
          className="text-2xl font-semibold mb-6 text-gray-700"
        >
          Nos marchés
        </h2>
        <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => (
            <MarketCard key={index} market={market} />
          ))}
        </article>
      </section>
    </main>
  );
}

export default Contact;
