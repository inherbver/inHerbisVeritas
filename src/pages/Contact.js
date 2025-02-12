import React from 'react';
import MarketCard from '../components/MarketCard';

function Contact() {
  console.log('Contact page loaded');
  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ minHeight: '100vh', height: 'auto' }}
    >
      <h1 className="text-3xl font-semibold text-center my-8">
        Nous contacter
      </h1>
      <div
        className="flex flex-col md:flex-row"
        style={{ alignItems: 'stretch', height: '100%' }}
      >
        <div
          className="md:w-2/3 relative mb-8 md:mb-0"
          style={{
            padding: '2rem',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/assets/images/contact-img.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100%',
              height: 'auto',
            }}
          ></div>
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
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Coordonnées
            </h2>
            <p
              className="mb-2"
              style={{
                color: '#2E3A23',
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Adresse : Lieu de l&apos;activité (à définir)
            </p>
            <p
              className="mb-2"
              style={{
                color: '#2E3A23',
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Email :{' '}
              <a
                href="mailto:contact@inherbisveritas.com"
                className="text-white"
                style={{
                  color: '#2E3A23',
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
                color: '#2E3A23',
                fontWeight: 'bold',
                fontSize: '1.125rem',
              }}
            >
              Téléphone : +33 6 12 34 56 78
            </p>
            <div className="mt-4">
              <a
                href="https://www.facebook.com/in.herbis.veritas"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/in_herbis_veritas?igsh=dGs2aXA5cGd6dW42"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-instagram"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
            <form className="mt-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#2E3A23' }}
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Votre nom"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#2E3A23' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Votre email"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold mb-2"
                  style={{ color: '#2E3A23' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Votre message"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="md:w-1/3">
          <h2 className="mb-4">Nos marchés</h2>
          <MarketCard
            name="Marché de Béziers"
            days="Samedi 8h-13h"
            address="Adresse 1"
            mapLink="Lien Google Maps 1"
          />
          <MarketCard
            name="Marché de Pézenas"
            days="Dimanche 9h-14h"
            address="Adresse 2"
            mapLink="Lien Google Maps 2"
          />
          <MarketCard
            name="Marché de Montpellier"
            days="Mercredi 7h-12h"
            address="Adresse 3"
            mapLink="Lien Google Maps 3"
          />
          <MarketCard
            name="Marché de Sète"
            days="Vendredi 8h-13h"
            address="Adresse 4"
            mapLink="Lien Google Maps 4"
          />
          <MarketCard
            name="Marché de Agde"
            days="Jeudi 9h-14h"
            address="Adresse 5"
            mapLink="Lien Google Maps 5"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
