import { useState, useEffect } from 'react';
import ContactInfoCard from '../components/contact/ContactInfoCard';
import SocialMediaLinks from '../components/contact/SocialMediaLinks';
import ContactGrid from '../components/contact/ContactGrid';
import StandardPageLayout from '../components/Ui/StandardPageLayout';
import PageTitle from '../components/Ui/PageTitle';
import { FaMapMarkedAlt, FaLeaf, FaHandHoldingHeart } from 'react-icons/fa';

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
    <StandardPageLayout>
      <div className="max-w-7xl mx-auto">
        {/* En-tête de page avec description */}
        <div className="text-center mb-12">
          <PageTitle subtitle="Nous sommes à votre écoute">
            Contactez-nous
          </PageTitle>
          <p className="max-w-2xl mx-auto text-gray-600 mt-6">
            N'hésitez pas à nous contacter pour toute question concernant nos
            produits, nos services ou nos événements. Notre équipe sera ravie de
            vous répondre.
          </p>
        </div>

        {/* Section des caractéristiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaMapMarkedAlt size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Nous rencontrer</h3>
            <p className="text-gray-600">
              Retrouvez-nous sur les marchés de la région montpelliéraine pour
              découvrir nos produits.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaLeaf size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Conseils personnalisés</h3>
            <p className="text-gray-600">
              Nos experts en herboristerie sont disponibles pour vous conseiller
              sur l'utilisation de nos produits.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaHandHoldingHeart size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Service client</h3>
            <p className="text-gray-600">
              Un service attentif et réactif pour vous accompagner dans toutes
              vos démarches.
            </p>
          </div>
        </div>

        {/* Section contact - Deux cartes côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ContactInfoCard />
          <SocialMediaLinks />
        </div>

        {/* Section mini-maps - Pleine largeur */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Nos marchés
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8 text-center">
            Retrouvez-nous chaque semaine sur ces marchés pour découvrir nos
            produits frais et discuter avec notre équipe de passionnés.
          </p>
          <ContactGrid markets={markets} />
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default Contact;
