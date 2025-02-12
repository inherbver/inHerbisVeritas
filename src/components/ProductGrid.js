import React from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductGrid;
