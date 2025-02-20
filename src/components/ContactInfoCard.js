import React from 'react';

export default function ContactInfoCard() {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Coordonnées</h2>
      <address className="not-italic">
        <div className="mb-3">
          <span className="font-bold block">Adresse :</span>
          <span>Lieu de l'activité (à définir)</span>
        </div>
        <div className="mb-3">
          <span className="font-bold block">Email :</span>
          <a
            href="mailto:contact@inherbisveritas.com"
            className="text-blue-600 hover:text-blue-800"
          >
            contact@inherbisveritas.com
          </a>
        </div>
        <div>
          <span className="font-bold block">Téléphone :</span>
          <a
            href="tel:+33612345678"
            className="text-blue-600 hover:text-blue-800"
          >
            +33 6 12 34 56 78
          </a>
        </div>
      </address>
    </article>
  );
}
