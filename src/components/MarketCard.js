import React from 'react';
import PropTypes from 'prop-types';

function MarketCard({ name, days, address, mapLink }) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="mb-1">
        <strong>Jours et horaires:</strong> {days}
      </p>
      <p className="mb-1">
        <strong>Adresse:</strong> {address}
      </p>
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Voir sur Google Maps
      </a>
    </div>
  );
}

MarketCard.propTypes = {
  name: PropTypes.string.isRequired,
  days: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  mapLink: PropTypes.string.isRequired,
};

export default MarketCard;
