import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaClock, FaUsers, FaEuroSign, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Carte d'affichage pour un atelier ou une balade nature
 */
const WorkshopCard = ({ workshop }) => {
  const isAtelier = workshop.type === 'Atelier';
  const badgeColorClass = isAtelier 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-teal-100 text-teal-800';
  const iconColorClass = isAtelier ? 'text-purple-600' : 'text-teal-600';
  const buttonColorClass = isAtelier 
    ? 'bg-purple-600 hover:bg-purple-700' 
    : 'bg-teal-600 hover:bg-teal-700';
  const buttonBorderClass = isAtelier
    ? 'border-purple-600 hover:border-purple-700'
    : 'border-teal-600 hover:border-teal-700';

  return (
    <article className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      {/* Image */}
      {workshop.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={workshop.image} 
            alt={workshop.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/hero-2.webp.jpeg'; // Image par défaut
            }}
          />
          <div className="absolute top-3 left-3">
            <span className={`${badgeColorClass} text-xs font-semibold px-2.5 py-1 rounded-full`}>
              {workshop.type}
            </span>
          </div>
        </div>
      )}

      <div className="p-5 flex-grow flex flex-col">
        {/* Titre */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
          {workshop.name}
        </h3>

        {/* Description simplifiée */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-2">
          {workshop.description}
        </p>

        {/* Informations essentielles uniquement */}
        <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <FaClock className={`${iconColorClass} mr-2 flex-shrink-0`} />
            <span className="truncate">{workshop.duration}</span>
          </div>
          
          <div className="flex items-center">
            <FaEuroSign className={`${iconColorClass} mr-2 flex-shrink-0`} />
            <span className="truncate">{workshop.price}</span>
          </div>
          
          <div className="flex items-start">
            <FaMapMarkerAlt className={`${iconColorClass} mr-2 mt-1 flex-shrink-0`} />
            <div className="truncate">
              <div>{workshop.location}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons pour plus d'informations et inscription */}
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
        <a 
          href={`/ateliers/${workshop.id}`}
          className={`text-sm font-medium py-2 px-4 border transition-colors rounded-lg flex items-center justify-center ${iconColorClass} ${buttonBorderClass}`}
        >
          En savoir plus
        </a>
        <button 
          className={`flex-grow text-sm font-medium py-2 px-4 rounded-lg ${buttonColorClass} text-white transition-colors flex items-center justify-center`}
        >
          {isAtelier ? 'Je réserve' : 'Je m\'inscris'}
        </button>
      </div>
    </article>
  );
};

WorkshopCard.propTypes = {
  workshop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string,
    coordinates: PropTypes.array
  }).isRequired
};

export default WorkshopCard;
