import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaFooter from './SocialMediaFooter';

const Footer = () => {
  return (
    <footer className="w-full bg-green-500 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo et copyright */}
          <div className="text-white">
            <p>In Herbis Veritas 2025</p>
          </div>

          {/* Liens utiles */}
          <div className="flex gap-8">
            <Link to="/mentions-legales" className="text-white hover:underline">
              Mentions légales
            </Link>
            <Link to="/faq" className="text-white hover:underline">
              FAQ
            </Link>
            <Link to="/cgv" className="text-white hover:underline">
              CGV
            </Link>
          </div>

          {/* Réseaux sociaux */}
          <SocialMediaFooter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
