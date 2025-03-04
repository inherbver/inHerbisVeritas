import React from 'react';
import PropTypes from 'prop-types';
import { FaLeaf, FaCheck, FaTruck } from 'react-icons/fa';

const ProductBadges = ({ isCueilletteSauvage, isVegan, isFrenchMade }) => (
  <div className="flex flex-wrap gap-3 my-4">
    {isCueilletteSauvage && (
      <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
        <FaLeaf /> Cueillette sauvage
      </span>
    )}
    {isVegan && (
      <span className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
        <FaCheck /> Vegan
      </span>
    )}
    {isFrenchMade && (
      <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
        <FaTruck /> Fabriqué en France
      </span>
    )}
  </div>
);

ProductBadges.propTypes = {
  isCueilletteSauvage: PropTypes.bool,
  isVegan: PropTypes.bool,
  isFrenchMade: PropTypes.bool,
};

export default ProductBadges;
