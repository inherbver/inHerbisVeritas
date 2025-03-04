import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductNavigation = ({
  prevProduct,
  nextProduct,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={onPrevClick}
        disabled={!prevProduct}
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          prevProduct
            ? 'text-green-600 hover:bg-green-50'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Produit précédent"
      >
        <FaArrowLeft />{' '}
        {prevProduct
          ? `Précédent: ${prevProduct.title}`
          : 'Aucun produit précédent'}
      </button>
      <button
        onClick={onNextClick}
        disabled={!nextProduct}
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          nextProduct
            ? 'text-green-600 hover:bg-green-50'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Produit suivant"
      >
        {nextProduct
          ? `Suivant: ${nextProduct.title}`
          : 'Aucun produit suivant'}{' '}
        <FaArrowRight />
      </button>
    </div>
  );
};

// Composant pour les flèches de navigation sur l'image
export const ImageNavigation = ({
  prevProduct,
  nextProduct,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={onPrevClick}
          disabled={!prevProduct}
          className={`bg-white/80 hover:bg-white p-2 rounded-r-full shadow ${
            !prevProduct && 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Produit précédent"
        >
          <FaArrowLeft
            className={prevProduct ? 'text-green-600' : 'text-gray-300'}
          />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={onNextClick}
          disabled={!nextProduct}
          className={`bg-white/80 hover:bg-white p-2 rounded-l-full shadow ${
            !nextProduct && 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Produit suivant"
        >
          <FaArrowRight
            className={nextProduct ? 'text-green-600' : 'text-gray-300'}
          />
        </button>
      </div>
    </>
  );
};

const productPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

ProductNavigation.propTypes = {
  prevProduct: productPropType,
  nextProduct: productPropType,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

ImageNavigation.propTypes = ProductNavigation.propTypes;

export default ProductNavigation;
