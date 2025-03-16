import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Composant Card réutilisable servant de base pour toutes les cartes de l'application.
 */
const Card = ({ 
  children, 
  as = 'article',
  color = 'green', 
  to = null, 
  onClick = null,
  className = '',
  fullHeight = true,
  elevateOnHover = true,
  roundedSize = 'xl',
  shadow = 'sm'
}) => {
  // Map de couleurs pour les différents éléments du design system
  const colorMap = {
    green: {
      primary: 'text-green-600',
      hover: 'hover:text-green-700',
      bg: 'bg-green-600',
      bgHover: 'hover:bg-green-700',
      border: 'border-green-600',
      borderHover: 'hover:border-green-700',
    },
    purple: {
      primary: 'text-purple-600',
      hover: 'hover:text-purple-700',
      bg: 'bg-purple-600',
      bgHover: 'hover:bg-purple-700',
      border: 'border-purple-600',
      borderHover: 'hover:border-purple-700',
    },
    teal: {
      primary: 'text-teal-600',
      hover: 'hover:text-teal-700',
      bg: 'bg-teal-600', 
      bgHover: 'hover:bg-teal-700',
      border: 'border-teal-600',
      borderHover: 'hover:border-teal-700',
    }
  };

  // Classes de base communes à toutes les cartes
  const baseClasses = `bg-white rounded-${roundedSize} shadow-${shadow} overflow-hidden flex flex-col transition-all duration-300 ${elevateOnHover ? 'hover:-translate-y-1 hover:shadow-md' : ''} ${fullHeight ? 'h-full' : ''} w-full ${className}`.trim();

  // Rendu du contenu
  const content = children;

  // Si un lien est fourni, on enveloppe le contenu dans un Link
  if (to) {
    return React.createElement(
      as,
      { className: baseClasses },
      <Link to={to} className={`block ${fullHeight ? 'h-full' : ''}`}>
        {content}
      </Link>
    );
  }

  // Si un gestionnaire de clic est fourni, on l'ajoute au composant
  if (onClick) {
    return React.createElement(
      as,
      { className: baseClasses, onClick },
      content
    );
  }

  // Sinon on retourne simplement le contenu
  return React.createElement(
    as,
    { className: baseClasses },
    content
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  color: PropTypes.oneOf(['green', 'purple', 'teal']),
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
  elevateOnHover: PropTypes.bool,
  roundedSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'none']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl']),
};

export default Card;
