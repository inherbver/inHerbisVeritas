import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant PageHeader réutilisable pour les entêtes de page
 * Affiche une image/icône, un titre, un sous-titre et optionnellement un bouton d'action
 */
const PageHeader = ({
  image,
  title,
  subtitle,
  description,
  actionButton,
  backgroundColor = 'bg-sage-50', // Couleur par défaut
}) => {
  return (
    <header className={`${backgroundColor} py-12 px-4 rounded-xl mb-12`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Image ou icône illustrative */}
        {image && (
          <div className="mb-6">
            {typeof image === 'string' ? (
              <img
                src={image}
                alt={title}
                className="h-24 mx-auto object-contain"
              />
            ) : (
              <div className="text-green-600 mx-auto flex justify-center">
                {image}
              </div>
            )}
          </div>
        )}

        {/* Titre principal */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
          {title}
        </h1>

        {/* Sous-titre */}
        {subtitle && (
          <p className="text-lg md:text-xl font-medium text-green-600 mb-4">
            {subtitle}
          </p>
        )}

        {/* Texte introductif */}
        {description && (
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Bouton d'action optionnel */}
        {actionButton && (
          <div className="mt-6">
            {actionButton}
          </div>
        )}
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  actionButton: PropTypes.element,
  backgroundColor: PropTypes.string,
};

export default PageHeader;
