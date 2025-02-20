import React from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { GoogleMap } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '150px',
  borderRadius: '0.5rem',
};

function MarketCard({ market }) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{market.name}</h3>
      <p className="mb-1 text-sm text-gray-500">
        <ClockIcon className="h-4 w-4 inline-block mr-1" />
        <strong>Jours et horaires:</strong> {market.days}
      </p>
      <p className="mb-1 text-sm text-gray-500">
        <MapPinIcon className="h-4 w-4 inline-block mr-1" />
        <strong>Adresse:</strong> {market.address}
      </p>
      <div className="h-48 w-full">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: market.latitude, lng: market.longitude }}
          zoom={15}
        />
      </div>
    </div>
  );
}

MarketCard.propTypes = {
  market: PropTypes.shape({
    name: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default MarketCard;
