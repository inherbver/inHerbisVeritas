import React from 'react';

export default function ContactInfoCard() {
  return (
    <article
      className="bg-white p-6 rounded-lg shadow-md flex-1"
      aria-label="Coordonnées de contact"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Coordonnées</h2>
      <address className="not-italic">
        <p className="mb-3">
          <span className="font-bold block">Adresse :</span>
          Lieu de l'activité (à définir)
        </p>
        <p className="mb-3">
          <span className="font-bold block">Email :</span>
          <a
            href="mailto:contact@inherbisveritas.com"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            contact@inherbisveritas.com
          </a>
        </p>
        <p>
          <span className="font-bold block">Téléphone :</span>
          <a
            href="tel:+33612345678"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            +33 6 12 34 56 78
          </a>
        </p>
      </address>
    </article>
  );
}
