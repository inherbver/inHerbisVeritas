import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({
  onClick,
  icon,
  label,
  color = 'orange',
  type = 'button',
}) => {
  const colorClasses = {
    orange: 'bg-[#FE5000] hover:bg-orange-600',
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    gray: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    green: 'bg-green-500 hover:bg-green-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center ${colorClasses[color]} text-white px-4 py-2 rounded-md transition-colors duration-200`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

ActionButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['orange', 'red', 'blue', 'gray', 'green']),
  type: PropTypes.string,
};

export default ActionButton;
