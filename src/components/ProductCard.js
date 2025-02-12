import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-64">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 font-serif min-h-[3rem]">{product.title}</h3>
          <p className="text-gray-700 font-sans min-h-[4.5rem]">{product.description}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mt-2">{product.price} €</p>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Acheter</button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
