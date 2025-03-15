import { useState, useEffect } from 'react';
import ContactInfoCard from '../components/contact/ContactInfoCard';
import SocialMediaLinks from '../components/contact/SocialMediaLinks';
import ContactGrid from '../components/contact/ContactGrid';
import WorkshopGrid from '../components/contact/WorkshopGrid';
import StandardPageLayout from '../components/Ui/StandardPageLayout';
import PageHeader from '../components/Ui/PageHeader';
import { 
  FaMapMarkedAlt, 
  FaLeaf, 
  FaHandHoldingHeart, 
  FaCalendarAlt, 
  FaSpa, 
  FaArrowRight,
  FaPhone
} from 'react-icons/fa';
import { markets as marketsData } from '../data/markets';
import workshops from '../data/workshops';

const Contact = () => {
  const [workshopEvents, setWorkshopEvents] = useState([]);

  useEffect(() => {
    // Filtrer les ateliers et balades
    const allWorkshops = workshops.filter(w => w.type === 'Atelier');
    const allWalks = workshops.filter(w => w.type === 'Balade');
    
    // Combiner les ateliers et balades
    setWorkshopEvents([...allWorkshops, ...allWalks]);
  }, []);

  return (
    <StandardPageLayout>
      <main className="max-w-7xl mx-auto">
        {/* En-tête de page avec PageHeader */}
        <PageHeader
          image={<FaMapMarkedAlt size={60} />}
          title="Venez à notre rencontre"
          description="Marchés, événements, ateliers... Découvrez toutes les façons de nous rencontrer et d'échanger avec notre équipe de passionnés."
          backgroundColor="bg-green-50"
          actionButton={
            <a 
              href="#events" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Nos prochains événements
              <FaArrowRight className="ml-2" />
            </a>
          }
        />

        {/* Section des caractéristiques */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <article className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaMapMarkedAlt size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Nos événements</h3>
            <p className="text-gray-600">
              Marchés, festivals et salons : découvrez où venir échanger avec nous !
            </p>
            <a href="#events" className="mt-3 inline-block text-green-600 hover:text-green-700 font-medium">
              Voir les événements <FaArrowRight className="inline ml-1" size={12} />
            </a>
          </article>

          <article className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaLeaf size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Ateliers & Balades</h3>
            <p className="text-gray-600">
              Participez à nos ateliers pratiques et balades nature sur les plantes médicinales.
            </p>
            <a href="#workshops" className="mt-3 inline-block text-green-600 hover:text-green-700 font-medium">
              Voir nos ateliers <FaArrowRight className="inline ml-1" size={12} />
            </a>
          </article>

          <article className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaHandHoldingHeart size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Contactez-nous</h3>
            <p className="text-gray-600">
              Une question ? Notre équipe est à votre écoute pour vous répondre rapidement.
            </p>
            <a href="#contact" className="mt-3 inline-block text-green-600 hover:text-green-700 font-medium">
              Nous contacter <FaArrowRight className="inline ml-1" size={12} />
            </a>
          </article>
        </section>

        {/* Section des marchés et salons */}
        <section className="mb-16" id="events">
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <FaMapMarkedAlt className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                Nos marchés et salons
              </h2>
            </div>
            
            <p className="max-w-3xl text-gray-600 mb-6">
              Retrouvez-nous chaque semaine sur ces marchés et salons pour découvrir nos produits frais 
              et échanger avec notre équipe de passionnés. Nous serons ravis de vous présenter notre 
              gamme de produits et de répondre à toutes vos questions.
            </p>
          </header>
          
          <ContactGrid markets={marketsData} />
        </section>

        {/* Section des ateliers et balades */}
        <section className="mb-16" id="workshops">
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <FaSpa className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                Nos ateliers et balades nature
              </h2>
            </div>
            
            <p className="max-w-3xl text-gray-600 mb-6">
              Participez à nos ateliers et balades nature pour apprendre et découvrir le monde fascinant 
              des plantes médicinales. Ces moments d'échange et de partage vous permettront d'approfondir 
              vos connaissances en herboristerie traditionnelle.
            </p>
          </header>
          
          <WorkshopGrid workshops={workshopEvents} />
        </section>

        {/* Section de contact */}
        <section id="contact" className="mb-16">
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <FaHandHoldingHeart className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                Nous contacter
              </h2>
            </div>
            <p className="max-w-3xl text-gray-600 mb-6">
              Pour toute question sur nos produits ou nos ateliers, n'hésitez pas à nous contacter.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3 border-gray-100">
                Nos coordonnées
              </h3>

              <div className="space-y-6 text-gray-600 mb-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                    <FaMapMarkedAlt size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Adresse</p>
                    <p className="text-gray-600">
                      123 Rue des Plantes, 34000 Montpellier
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Téléphone</p>
                    <p className="text-gray-600">+33 4 67 XX XX XX</p>
                    <p className="text-gray-600 text-sm mt-1">(Lundi - Vendredi: 9h - 18h)</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="mailto:contact@inherbisveritas.fr" 
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors hover:shadow-md"
              >
                Nous écrire
              </a>
            </div>
            
            <SocialMediaLinks />
          </div>
        </section>
      </main>
    </StandardPageLayout>
  );
};

export default Contact;
