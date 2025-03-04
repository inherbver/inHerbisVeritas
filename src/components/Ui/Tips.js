import React from 'react';
import PropTypes from 'prop-types';

const Tips = ({ text }) => (
  <p className="text-gray-600 leading-relaxed">{text}</p>
);

Tips.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tips;
