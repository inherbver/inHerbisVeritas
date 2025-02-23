import React from 'react';
import PropTypes from 'prop-types';

const Tips = ({ content }) => (
  <p className="text-gray-600 leading-relaxed">{content}</p>
);

Tips.propTypes = {
  content: PropTypes.string.isRequired
};

export default Tips;
