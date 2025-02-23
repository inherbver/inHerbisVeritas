import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/produits/${product.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="text-center">
          <span className="text-xs text-green-600 font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-lg font-semibold mb-2 font-serif min-h-[3rem] group-hover:text-green-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 font-sans min-h-[4.5rem] line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg font-semibold text-green-600">
            {product.price}€
          </p>
          <button
            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Voir le produit
          </button>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
