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
    <main className="container mx-auto px-4 py-8 bg-gray-50">
      <section className="mt-12" aria-labelledby="contact-heading">
        <h2
          id="contact-heading"
          className="text-2xl font-semibold mb-6 text-gray-700"
        >
          Contact
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Carte Coordonnées */}
          <article className="lg:w-1/3 bg-white rounded-xl shadow-md p-6 flex flex-col">
            <ContactInfoCard />
          </article>

          {/* Carte Réseaux Sociaux */}
          <article className="lg:w-2/3 bg-white rounded-xl shadow-md p-6 flex flex-col">
            <SocialMediaLinks />
          </article>
        </div>
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
