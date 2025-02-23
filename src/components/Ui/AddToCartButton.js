import React from 'react';

const AddToCartButton = ({ onClick }) => (
  <button
    className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
    onClick={onClick}
  >
    Ajouter au panier
  </button>
);

export default AddToCartButton;
