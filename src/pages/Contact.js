import React from 'react';
import MarketCard from '../components/MarketCard';

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
    <div
      className="container mx-auto px-4 py-8 bg-gray-50 text-gray-800"
      style={{ minHeight: '100vh', height: 'auto' }}
    >
      <h1 className="text-3xl font-bold text-center mt-16 md:mt-16 lg:mt-20 mb-6 text-gray-600">
        Nous contacter
      </h1>
      <div
        className="flex flex-col md:flex-row"
        style={{
          alignItems: 'stretch',
          height: '100%',
          backgroundColor: '#F9F9F9',
        }}
      >
        <div
          className="md:w-2/3 relative mb-8 md:mb-0"
          style={{
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
          }}
        >
          <div
            className="relative text-shadow"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(8px)',
              padding: '1rem',
            }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
              style={{
                color: '#2E3A23',
                fontWeight: '600',
                fontSize: '1.125rem',
                textTransform: 'uppercase',
              }}
            >
              Coordonnées
            </h2>
            <p
              className="mb-2"
              style={{
                color: '#2A2A2A',
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Adresse : Lieu de l&apos;activité (à définir)
            </p>
            <p
              className="mb-2"
              style={{
                color: '#2A2A2A',
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Email :{' '}
              <a
                href="mailto:contact@inherbisveritas.com"
                className="text-black"
                style={{
                  color: '#2A2A2A',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                }}
              >
                contact@inherbisveritas.com
              </a>
            </p>
            <p
              className="mb-2"
              style={{
                color: '#2A2A2A',
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Téléphone : +33 6 12 34 56 78
            </p>
            <div className="mt-4 flex items-center space-x-8">
              <a
                href="https://www.facebook.com/in.herbis.veritas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/facebook.jpeg"
                  alt="Facebook"
                  width="40"
                  height="40"
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              </a>
              <a
                href="https://www.instagram.com/in_herbis_veritas?igshid=dGs2aXA5cGd6dW42"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/instagram.jpeg"
                  alt="Instagram"
                  width="40"
                  height="40"
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              </a>
            </div>
            <form
              className="mt-8 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md p-4"
              style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#2A2A2A' }}
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 hover:border-gray-500 hover:shadow-md"
                  placeholder="Votre nom"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#2A2A2A' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 hover:border-gray-500 hover:shadow-md"
                  placeholder="Votre email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#2A2A2A' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 hover:border-gray-500 hover:shadow-md"
                  placeholder="Votre message"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{ backgroundColor: '#EF9C66' }}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="md:w-1/3">
          <h2 className="mb-4 text-center text-2xl font-serif font-semibold">
            Retrouvez-moi sur les marchés
          </h2>
          <div
            className="border rounded-lg shadow-md p-4"
            style={{ borderColor: 'white' }}
          >
            {markets.map((market) => (
              <MarketCard key={market.name} {...market} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
