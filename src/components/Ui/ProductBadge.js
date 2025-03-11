import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Badge unifié pour les produits
 * Affiche un badge avec icône et texte dans un style cohérent
 */
const ProductBadge = ({ icon, label, variant = 'default', className = '' }) => {
  // Palettes de couleurs harmonisées, inspirées par la nature
  const variantClasses = {
    default: 'bg-gray-50 text-gray-700 border border-gray-200',
    french: 'bg-gray-50 text-gray-800 border border-gray-200',
    vegan: 'bg-gray-50 text-green-800 border border-green-100',
    wild: 'bg-gray-50 text-amber-800 border border-amber-100',
  };

  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      <span className="font-medium">{label}</span>
    </div>
  );
};

ProductBadge.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'french', 'vegan', 'wild']),
  className: PropTypes.string,
};

export default ProductBadge;
