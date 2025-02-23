import React from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, MapPinIcon } from '@heroicons/react/20/solid';

const MarketCard = ({ market }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all">
    <h3 className="text-2xl font-semibold text-gray-900">{market.name}</h3>
    <p className="mt-2 text-gray-600">
      <ClockIcon className="h-4 w-4 inline-block mr-1" />
      {market.days}
    </p>
    <div className="mt-4">
      <p className="text-sm font-medium text-emerald-700">
        <MapPinIcon className="h-4 w-4 inline-block mr-1" />
        {market.address}
      </p>
      <a
        href={`https://www.openstreetmap.org/?mlat=${market.latitude}&mlon=${market.longitude}`}
        className="mt-3 inline-flex items-center text-sm text-sky-600 hover:text-sky-800"
      >
        Voir sur la carte →
      </a>
    </div>
  </div>
);

MarketCard.propTypes = {
  market: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default MarketCard;
