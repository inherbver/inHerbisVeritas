import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card, CardImage, CardContent, CardMeta, CardFooter } from '../common/Card';

const MarketCard = ({ market }) => {
  // Utilisez une image par défaut ou celle spécifiée dans les données du marché
  const imageUrl = market.imageUrl || `/assets/images/pdct_${(market.id % 6) + 1}.jpg`;

  return (
    <Card 
      as="article"
      color="green"
      elevateOnHover
    >
      {/* Section image avec overlay */}
      <CardImage 
        src={imageUrl} 
        alt={market.name} 
        height="h-48"
        overlay={true}
      />
      
      {/* Section contenu avec informations du marché */}
      <CardContent>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
          {market.name}
        </h3>
        
        {/* Métadonnées du marché avec les icônes */}
        <CardMeta 
          icon={<FaMapMarkerAlt />}
          text={market.address || 'Montpellier, France'}
          iconClassName="text-green-600"
          className="mb-2"
        />
        
        <CardMeta 
          icon={<FaCalendarAlt />}
          text={market.days || 'Tous les samedis'}
          iconClassName="text-green-600"
          className="mb-2"
        />
        
        {market.hours && (
          <CardMeta 
            icon={<FaClock />}
            text={market.hours}
            iconClassName="text-green-600"
            className="mt-2"
          />
        )}

        {/* Pied de carte avec le bouton d'action */}
        <CardFooter className="pt-4 flex justify-center">
          <Link
            to={`/marche/${market.slug || market.id}`}
            className="inline-flex items-center px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Détails <FaArrowRight className="ml-2" size={12} />
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

MarketCard.propTypes = {
  market: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    days: PropTypes.string,
    hours: PropTypes.string,
    coordinates: PropTypes.array,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    slug: PropTypes.string,
    imageUrl: PropTypes.string
  }),
};

export default MarketCard;
