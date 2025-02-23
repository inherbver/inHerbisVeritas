import React from 'react';
import PropTypes from 'prop-types';

const ProductPrice = ({ price, description }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-semibold text-green-600">
        {price}€
      </span>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

ProductPrice.propTypes = {
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ProductPrice;
