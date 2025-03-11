import React from 'react';
import PropTypes from 'prop-types';
import { FaLeaf } from 'react-icons/fa';
import ProductBadge from '../Ui/ProductBadge';

/**
 * Composant FrenchMadeBadge stylisé avec les couleurs subtiles du drapeau français
 */
const FrenchMadeBadge = () => (
  <ProductBadge 
    variant="french"
    label={
      <span className="flex items-center">
        Fabriqué en <span className="font-semibold ml-1">France</span>
        <span className="ml-2 flex h-3 items-center">
          <span className="inline-block w-1 h-3 bg-blue-500 opacity-70 rounded-sm"></span>
          <span className="inline-block w-1 h-3 bg-white border border-gray-200 opacity-70 rounded-sm mx-px"></span>
          <span className="inline-block w-1 h-3 bg-red-500 opacity-70 rounded-sm"></span>
        </span>
      </span>
    }
  />
);

/**
 * Affiche des badges élégants pour les caractéristiques du produit
 */
const ProductBadges = ({ isCueilletteSauvage, isVegan, isFrenchMade }) => (
  <div className="flex flex-wrap gap-2 my-4">
    {isFrenchMade && <FrenchMadeBadge />}
    
    {isVegan && (
      <ProductBadge 
        variant="vegan"
        icon={<FaLeaf className="text-green-600" />}
        label="100% Végétal"
      />
    )}
    
    {isCueilletteSauvage && (
      <ProductBadge 
        variant="wild"
        icon={<svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v5" />
          <path d="M8 4.99a5 5 0 0 0-3 6.42" />
          <path d="M16 4.99a5 5 0 0 1 3 6.42" />
          <path d="M12 7v12" />
          <path d="M12 16a3 3 0 0 0 3-3h-6a3 3 0 0 0 3 3z" />
        </svg>}
        label="Plantes de cueillette sauvage"
      />
    )}
  </div>
);

ProductBadges.propTypes = {
  isCueilletteSauvage: PropTypes.bool,
  isVegan: PropTypes.bool,
  isFrenchMade: PropTypes.bool,
};

export default ProductBadges;
