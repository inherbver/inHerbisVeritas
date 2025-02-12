import React from 'react';
import heroImage from '../assets/images/hero.jpg';
import '../styles/global.css';

console.log("heroImage:", heroImage);

const HeroSection = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <h1>Bienvenue sur In Herbis Veritas</h1>
      <p>
        Découvrez nos soins naturels et bio, conçus avec amour pour vous et la
        nature.
      </p>
      <button className="cta-button">Découvrir nos produits</button>
      <p>1 commande = 1 cadeau offert</p>
    </div>
  );
};

export default HeroSection;
