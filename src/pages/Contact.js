import ContactInfoCard from '../components/ContactInfoCard';
import SocialMediaLinks from '../components/SocialMediaLinks';
import ContactGrid from '../components/ContactGrid';
import { useState, useEffect } from 'react';

const Contact = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    // Exemple de données pour les marchés
    setMarkets([
      {
        id: 1,
        name: 'Marché des Arceaux',
        position: { lat: 43.6109, lng: 3.8722 },
      },
      { id: 2, name: 'Marché du Lez', position: { lat: 43.6, lng: 3.89 } },
      {
        id: 3,
        name: 'Marché de Antigone',
        position: { lat: 43.608, lng: 3.89 },
      },
      { id: 4, name: 'Marché Paysan', position: { lat: 43.615, lng: 3.865 } },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section contact - Deux cartes côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md">
          <ContactInfoCard />
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <SocialMediaLinks />
        </div>
      </div>

      {/* Section mini-maps - Pleine largeur */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Nos marchés</h2>
        <ContactGrid markets={markets} />
      </div>
    </div>
  );
};

export default Contact;
