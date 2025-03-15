import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MarketCard = ({ market }) => {
  // Utilisez une image par défaut ou celle spécifiée dans les données du marché
  const imageUrl = market.imageUrl || `/assets/images/pdct_${(market.id % 6) + 1}.jpg`;

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group h-full flex flex-col">
      {/* Image du marché */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={market.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
          {market.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaMapMarkerAlt className="text-green-600 mr-2 flex-shrink-0" />
          <span className="truncate">
            {market.address || 'Montpellier, France'}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaCalendarAlt className="text-green-600 mr-2 flex-shrink-0" />
          <span className="truncate">{market.days || 'Tous les samedis'}</span>
        </div>
        {market.hours && (
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <FaClock className="text-green-600 mr-2 flex-shrink-0" />
            <span className="truncate">{market.hours}</span>
          </div>
        )}

        <div className="mt-auto pt-4 flex justify-center">
          <Link
            to={`/marche/${market.slug || market.id}`}
            className="inline-flex items-center px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Détails <FaArrowRight className="ml-2" size={12} />
          </Link>
        </div>
      </div>
    </article>
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
