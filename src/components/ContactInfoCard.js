import React from 'react';
import PropTypes from 'prop-types';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

export default function ContactInfoCard(props) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <MapPinIcon className="w-8 h-8 text-emerald-600" />
        Notre adresse
      </h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MapPinIcon className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
          <p className="text-gray-700 leading-relaxed">{props.address}</p>
        </div>

        <div className="flex items-center gap-4">
          <EnvelopeIcon className="w-6 h-6 text-gray-600" />
          <a
            href={`mailto:${props.email}`}
            className="text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            {props.email}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <PhoneIcon className="w-6 h-6 text-gray-600" />
          <a
            href={`tel:${props.phone}`}
            className="text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            {props.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

ContactInfoCard.propTypes = {
  address: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};

ContactInfoCard.defaultProps = {
  address: '12 rue des rêves, 34500 Béziers',
  email: 'contact@inherbisveritas.com',
  phone: '+33612345678',
};
