import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaParking,
  FaBus,
  FaMapPin,
} from 'react-icons/fa';
import { markets } from '../data/markets';
import MarketMediaDisplay from '../components/contact/MarketMediaDisplay';
import Breadcrumb from '../components/Ui/Breadcrumb';
import TabSystem from '../components/Ui/TabSystem';

const MarketDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  const [market, setMarket] = useState(null);

  // Récupération des données du marché
  useEffect(() => {
    // Chercher d'abord par slug puis par id si nécessaire
    const foundMarket =
      markets.find((m) => m.slug === slug) ||
      markets.find((m) => m.id.toString() === slug);

    if (foundMarket) {
      setMarket(foundMarket);
      // Remonter en haut de la page lors du chargement
      window.scrollTo(0, 0);
    } else {
      // Redirection si le marché n'existe pas
      navigate('/contact', { replace: true });
    }
  }, [slug, navigate]);

  if (!market) {
    return (
      <main className="container mx-auto px-4 py-20">
        <p className="text-center text-2xl text-gray-600">Chargement...</p>
      </main>
    );
  }

  // Préparation du fil d'Ariane
  const breadcrumbItems = [
    { label: 'Accueil', url: '/' },
    { label: 'Contact', url: '/contact' },
    { label: market.name, active: true },
  ];

  // Préparation des onglets (avec vérification des propriétés optionnelles)
  const tabs = [
    {
      id: 'description',
      label: 'À propos',
      content: (
        <div className="prose prose-green max-w-none">
          <h3 className="text-xl font-semibold mb-4">À propos de ce marché</h3>
          <p className="text-gray-600 mb-6">
            {market.longDescription ||
              market.description ||
              `Découvrez le marché de ${market.name} où nous vous proposons nos produits à base de plantes.`}
          </p>
        </div>
      ),
    },
    {
      id: 'infos-pratiques',
      label: 'Infos pratiques',
      content: (
        <div className="prose prose-green max-w-none">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Horaires</h3>
              <div className="flex items-center mb-4">
                <FaCalendarAlt
                  className="text-green-600 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-700">
                  {market.days || 'Jours à confirmer'}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock
                  className="text-green-600 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-700">
                  {market.hours || 'Horaires à confirmer'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Adresse complète</h3>
              <div className="flex items-center">
                <FaMapMarkerAlt
                  className="text-green-600 mr-3 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-700">
                  {market.fullAddress ||
                    market.address ||
                    'Adresse à confirmer'}
                </span>
              </div>
            </div>

            {(market.parkingInfo || market.publicTransport) && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Transport</h3>
                {market.parkingInfo && (
                  <div className="flex items-center mb-4">
                    <FaParking
                      className="text-green-600 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">{market.parkingInfo}</span>
                  </div>
                )}
                {market.publicTransport && (
                  <div className="flex items-center">
                    <FaBus
                      className="text-green-600 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">
                      {market.publicTransport}
                    </span>
                  </div>
                )}
              </div>
            )}

            {market.standLocation && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Où nous trouver</h3>
                <div className="flex items-center">
                  <FaMapPin
                    className="text-green-600 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">{market.standLocation}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  // Déterminer les coordonnées pour le lien Google Maps
  const lat = market.coordinates
    ? market.coordinates[0]
    : market.position
      ? market.position.lat
      : 43.6047;
  const lng = market.coordinates
    ? market.coordinates[1]
    : market.position
      ? market.position.lng
      : 3.8714;

  return (
    <main className="bg-gray-50 py-12 min-h-screen animate-fade-in">
      <article className="container mx-auto px-4 max-w-7xl">
        {/* Fil d'Ariane */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Bouton de retour */}
        <div className="mb-6">
          <Link
            to="/contact"
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Retour à la page Contact</span>
          </Link>
        </div>

        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          {/* En-tête du marché */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{market.name}</h1>
            <p className="text-gray-600 mt-2">
              {market.description ||
                `Retrouvez-nous sur ce marché pour découvrir nos produits naturels.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Carte et photos */}
            <MarketMediaDisplay market={market} />

            {/* Informations du marché */}
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Rencontrez-nous
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {market.description ||
                      `Venez découvrir nos produits à base de plantes au marché de ${market.name}.`}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center mb-3">
                    <FaCalendarAlt
                      className="text-green-600 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">
                      <span className="font-medium">Jours : </span>
                      {market.days || 'À confirmer'}
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaClock
                      className="text-green-600 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">
                      <span className="font-medium">Heures : </span>
                      {market.hours || 'À confirmer'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt
                      className="text-green-600 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">
                      <span className="font-medium">Adresse : </span>
                      {market.address || 'À confirmer'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="border-t border-gray-100 pt-6">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets d'information */}
          <div className="mt-12">
            <TabSystem
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={tabs}
            />
          </div>
        </section>
      </article>
    </main>
  );
};

export default MarketDetails;
