import React from 'react';
import PropTypes from 'prop-types';

const SpecList = ({ items }) => (
  <ul className="list-disc list-inside space-y-2">
    {items.map((item, index) => (
      <li key={index} className="text-gray-600">
        {item}
      </li>
    ))}
  </ul>
);

SpecList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SpecList;
