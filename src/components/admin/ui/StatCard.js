import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon, trend, color = 'bg-blue-500' }) => (
  <div className="bg-white rounded-lg shadow p-5">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {trend !== undefined && (
          <p
            className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend > 0 ? '+' : ''}
            {trend}% depuis le mois dernier
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  trend: PropTypes.number,
  color: PropTypes.string,
};

export default StatCard;
