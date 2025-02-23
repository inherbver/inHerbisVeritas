import { markets, contactInfos, socialMediaLinks } from '../data/contact';
import ContactGrid from '../components/ContactGrid';
import SocialMediaLinks from '../components/SocialMediaLinks';
import PageTitle from '../components/Ui/PageTitle';

const Contact = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <PageTitle subtitle="Retrouvez-nous sur les marchés d'Occitanie">
          Points de vente
        </PageTitle>
        
        <ContactGrid markets={markets} />
        
        <div className="mt-16 border-t pt-12">
          <SocialMediaLinks className="flex justify-center gap-6" links={socialMediaLinks} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
