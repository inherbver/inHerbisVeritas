import { markets, contactInfos, socialMediaLinks } from '../data/contact';
import ContactGrid from '../components/ContactGrid';
import SocialMediaLinks from '../components/SocialMediaLinks';
import PageTitle from '../components/Ui/PageTitle';
import StandardPageLayout from '../components/StandardPageLayout';

const Contact = () => {
  return (
    <StandardPageLayout>
      <PageTitle subtitle="Retrouvez-nous sur les marchés d'Occitanie">
        Points de vente
      </PageTitle>

      <ContactGrid markets={markets} />

      <div className="mt-16 border-t pt-12">
        <SocialMediaLinks
          className="flex justify-center gap-6"
          links={socialMediaLinks}
        />
      </div>
    </StandardPageLayout>
  );
};

export default Contact;
