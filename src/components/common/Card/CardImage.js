import React from 'react';
import PropTypes from 'prop-types';
import OptimizedImage from '../../Ui/OptimizedImage';

/**
 * Composant pour la section image des cartes
 * Utilise le composant OptimizedImage amélioré
 */
const CardImage = ({
  src,
  alt,
  height = 'h-64',
  overlay = false,
  badge = null,
  badgePosition = 'top-left',
  rating = null,
  className = '',
  onError,
  children,
  ...props
}) => {
  // Mappings des positions pour les badges
  const positionClasses = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3',
  };
  
  // Gestionnaire d'erreur pour les images
  const handleImageError = (e) => {
    console.warn(`CardImage error loading: ${src}`);
    
    // Appeler le gestionnaire personnalisé si fourni
    if (typeof onError === 'function') {
      onError(e);
    }
  };

  return (
    <figure className={`relative ${height} overflow-hidden ${className}`}>
      {/* Image optimisée avec notre composant amélioré */}
      {src && (
        <OptimizedImage
          src={src}
          alt={alt || ''}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
          {...props}
        />
      )}

      {/* Overlay gradient optionnel */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      )}

      {/* Badge optionnel */}
      {badge && (
        <div className={`absolute ${positionClasses[badgePosition]}`}>
          {badge}
        </div>
      )}

      {/* Note/Étoiles optionnel */}
      {rating && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          {rating}
        </div>
      )}

      {/* Contenu enfant optionnel */}
      {children}
    </figure>
  );
};

CardImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  overlay: PropTypes.bool,
  badge: PropTypes.node,
  badgePosition: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  rating: PropTypes.node,
  className: PropTypes.string,
  onError: PropTypes.func,
  children: PropTypes.node,
};

export default CardImage;
