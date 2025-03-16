import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaClock, FaUsers, FaEuroSign, FaMapMarkerAlt } from 'react-icons/fa';
import { Card, CardImage, CardContent, CardMeta, CardFooter } from '../common/Card';

/**
 * Carte d'affichage pour un atelier ou une balade nature
 * Version refactorisée avec le système de composants Card
 */
const WorkshopCard = ({ workshop }) => {
  const isAtelier = workshop.type === 'Atelier';
  const colorScheme = isAtelier ? 'purple' : 'teal';
  const badgeColorClass = isAtelier 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-teal-100 text-teal-800';
  const iconColorClass = isAtelier ? 'text-purple-600' : 'text-teal-600';

  return (
    <Card
      as="article"
      color={colorScheme}
      elevateOnHover
    >
      {/* Image avec badge */}
      {workshop.image && (
        <CardImage 
          src={workshop.image} 
          alt={workshop.name} 
          height="h-48"
          badge={
            <span className={`${badgeColorClass} text-xs font-semibold px-2.5 py-1 rounded-full`}>
              {workshop.type}
            </span>
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/hero-2.webp.jpeg'; // Image par défaut
          }}
        />
      )}

      <CardContent>
        {/* Titre */}
        <h3 className={`text-xl font-bold text-gray-800 mb-2 hover:${iconColorClass} transition-colors`}>
          {workshop.name}
        </h3>

        {/* Description simplifiée */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-2">
          {workshop.description}
        </p>

        {/* Informations essentielles avec CardMeta */}
        <div className="space-y-2 mb-4">
          <CardMeta 
            icon={<FaClock />}
            text={workshop.duration}
            iconClassName={iconColorClass}
          />
          
          <CardMeta 
            icon={<FaEuroSign />}
            text={workshop.price}
            iconClassName={iconColorClass}
          />
          
          <CardMeta 
            icon={<FaMapMarkerAlt />}
            text={workshop.location}
            iconClassName={iconColorClass}
          />
        </div>
      </CardContent>

      {/* Boutons pour plus d'informations et inscription */}
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <a 
          href={`/ateliers/${workshop.id}`}
          className={`text-sm font-medium py-2 px-4 border transition-colors rounded-lg flex items-center justify-center ${iconColorClass} border-${isAtelier ? 'purple' : 'teal'}-600 hover:bg-${isAtelier ? 'purple' : 'teal'}-50`}
        >
          En savoir plus
        </a>
        <button 
          className={`flex-grow text-sm font-medium py-2 px-4 rounded-lg bg-${isAtelier ? 'purple' : 'teal'}-600 hover:bg-${isAtelier ? 'purple' : 'teal'}-700 text-white transition-colors flex items-center justify-center`}
        >
          {isAtelier ? 'Je réserve' : 'Je m\'inscris'}
        </button>
      </CardFooter>
    </Card>
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
