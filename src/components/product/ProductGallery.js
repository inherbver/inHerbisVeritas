import React from 'react';
import PropTypes from 'prop-types';

const ProductGallery = ({ imageUrl, alt }) => (
  <figure className="relative aspect-square">
    <img
      src={imageUrl}
      alt={alt}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
  </figure>
);

ProductGallery.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductGallery;
