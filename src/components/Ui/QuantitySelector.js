import React from 'react';
import PropTypes from 'prop-types';

const QuantitySelector = ({ quantity, onChange, min = 1, max = 10 }) => {
  const handleChange = (newValue) => {
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label className="text-gray-700 font-medium">Quantité</label>
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          onClick={() => handleChange(quantity - 1)}
          disabled={quantity <= min}
          aria-label="Diminuer la quantité"
        >
          -
        </button>
        <span className="flex items-center justify-center w-12 border-x border-gray-300 font-medium">
          {quantity}
        </span>
        <button
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          onClick={() => handleChange(quantity + 1)}
          disabled={quantity >= max}
          aria-label="Augmenter la quantité"
        >
          +
        </button>
      </div>
    </div>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default QuantitySelector;
