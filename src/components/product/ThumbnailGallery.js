import React from 'react';
import PropTypes from 'prop-types';

const ThumbnailGallery = ({ images, onSelect, selectedIndex = 0 }) => (
  <div className="mt-4 flex gap-2">
    {images.map((image, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        className={`h-16 w-16 rounded-md border-2 overflow-hidden ${
          i === selectedIndex
            ? 'border-green-500'
            : 'border-gray-200 hover:border-green-300'
        }`}
      >
        <img
          src={image.url}
          alt={image.alt || `Aperçu ${i + 1}`}
          className="h-full w-full object-cover"
        />
      </button>
    ))}
  </div>
);

ThumbnailGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
};

export default ThumbnailGallery;
