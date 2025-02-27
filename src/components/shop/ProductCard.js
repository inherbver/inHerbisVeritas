import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
      <Link
        to={`/produits/${product.slug}`}
        className="block relative flex flex-col h-full"
      >
        {/* Image container avec hauteur fixe */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Contenu avec structure flex pour garantir l'alignement */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Section info produit avec hauteur fixe */}
          <div className="flex flex-col mb-auto">
            <span className="text-xs text-green-600 font-medium uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="text-xl font-bold mt-1 mb-1 font-serif group-hover:text-green-600 transition-colors h-14 line-clamp-2">
              {product.title}
            </h3>
            <div className="text-sm text-gray-500 font-light mb-3">
              {product.volume}
            </div>
            <p className="text-gray-600 font-light h-16 line-clamp-3 text-sm">
              {product.description}
            </p>
          </div>

          {/* Section prix et bouton avec position fixe en bas */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xl font-bold text-green-600 mb-3">
              {product.price}€
            </p>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-full transition-all duration-300 transform active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                // Ajouter au panier
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    volume: PropTypes.string,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
