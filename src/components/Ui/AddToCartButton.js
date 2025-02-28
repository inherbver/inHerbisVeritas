import React from 'react';
import PropTypes from 'prop-types';

const AddToCartButton = ({
  onClick,
  text = 'Ajouter au panier',
  className = '',
}) => (
  <button
    className={`w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors ${className}`}
    onClick={onClick || (() => {})}
  >
    {text}
  </button>
);

AddToCartButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default AddToCartButton;
