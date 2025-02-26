// src/pages/Contact.js
import { contactInfos, socialMediaLinks, markets } from '../data/contact';
import ContactGrid from '../components/ContactGrid';
import ContactInfoCard from '../components/ContactInfoCard';
import SocialMediaLinks from '../components/SocialMediaLinks';
import PageTitle from '../components/Ui/PageTitle';
import StandardPageLayout from '../components/StandardPageLayout';

const Contact = () => {
  return (
    <StandardPageLayout>
      {/* Titre inchangé */}
      <PageTitle subtitle="Retrouvez-nous sur les marchés d'Occitanie">
        Points de vente
      </PageTitle>

      {/* Contenu principal en grille */}
      <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 md:grid-cols-[40%_60%] md:items-start">
        {/* Colonne gauche - Coordonnées et réseaux */}
        <div className="space-y-8 md:pr-8 md:sticky md:top-8 md:min-h-[calc(100vh-12rem)] md:overflow-y-auto">
          <ContactInfoCard
            address={contactInfos.address}
            email={contactInfos.email}
            phone={contactInfos.phone}
            className="bg-white shadow-xl rounded-2xl p-8"
          />

          <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Suivez notre actualité
            </h3>
            <SocialMediaLinks
              links={socialMediaLinks}
              className="flex flex-wrap gap-6"
              iconClassName="w-10 h-10 text-emerald-700 hover:text-emerald-800 transition-colors"
            />
          </div>
        </div>

        {/* Colonne droite - Cartes des marchés */}
        <div className="md:pl-4">
          <ContactGrid
            markets={markets}
            className="grid gap-6 lg:gap-8"
            cardClassName="hover:scale-[101%] transition-transform duration-300"
          />
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default Contact;
