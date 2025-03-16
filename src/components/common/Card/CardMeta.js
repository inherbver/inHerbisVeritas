import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant pour afficher des métadonnées dans une carte
 * (date, lieu, temps de lecture, etc.)
 */
const CardMeta = ({
  icon,
  text,
  iconClassName = 'text-green-600',
  textClassName = 'text-gray-600',
  className = '',
}) => {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      {icon && <span className={`mr-2 flex-shrink-0 ${iconClassName}`}>{icon}</span>}
      <span className={`truncate ${textClassName}`}>{text}</span>
    </div>
  );
};

CardMeta.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.node.isRequired,
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
  className: PropTypes.string,
};

export default CardMeta;
