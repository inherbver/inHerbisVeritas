import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

const AlertItem = ({ title, message, type, link }) => (
  <Link to={link} className="block">
    <div
      className={`p-4 rounded-lg mb-3 border-l-4 ${
        type === 'error'
          ? 'border-red-500 bg-red-50'
          : type === 'warning'
            ? 'border-yellow-500 bg-yellow-50'
            : 'border-blue-500 bg-blue-50'
      }`}
    >
      <div className="flex items-start">
        <div
          className={`rounded-full p-1 mr-3 ${
            type === 'error'
              ? 'text-red-500'
              : type === 'warning'
                ? 'text-yellow-500'
                : 'text-blue-500'
          }`}
        >
          <FiAlertCircle size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  </Link>
);

AlertItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info']).isRequired,
  link: PropTypes.string.isRequired,
};

export default AlertItem;
