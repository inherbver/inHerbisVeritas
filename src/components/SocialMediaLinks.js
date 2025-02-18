import React from 'react';

export default function SocialMediaLinks() {
  return (
    <aside
      className="bg-white p-6 rounded-lg shadow-md flex-1"
      aria-label="Réseaux sociaux"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Nous suivre</h2>
      <div className="flex gap-6">
        <a
          href="https://www.facebook.com/in.herbis.veritas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Page Facebook"
          className="hover:opacity-75 transition-opacity"
        >
          <img
            src="/assets/images/facebook.png"
            alt=""
            role="presentation"
            width="40"
            height="40"
          />
        </a>
        <a
          href="https://www.instagram.com/in_herbis_veritas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profil Instagram"
          className="hover:opacity-75 transition-opacity"
        >
          <img
            src="/assets/images/instagram.png"
            alt=""
            role="presentation"
            width="40"
            height="40"
          />
        </a>
      </div>
    </aside>
  );
}
