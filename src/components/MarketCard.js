import React from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '150px',
  borderRadius: '0.5rem',
};

function MarketCard({ name, days, address, mapLink, latitude, longitude }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="mb-1 text-sm text-gray-500">
        <ClockIcon className="h-4 w-4 inline-block mr-1" />
        <strong>Jours et horaires:</strong> {days}
      </p>
      <p className="mb-1 text-sm text-gray-500">
        <MapPinIcon className="h-4 w-4 inline-block mr-1" />
        <strong>Adresse:</strong> {address}
      </p>
      <div className="flex justify-center">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={{ lat: latitude, lng: longitude }}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </div>
    </div>
  );
}

MarketCard.propTypes = {
  name: PropTypes.string.isRequired,
  days: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  mapLink: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MarketCard;
