import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => (
  <article className="flex items-center gap-1">
    <FaStar className="text-yellow-400" />
    <span className="text-gray-600">{rating}</span>
  </article>
);

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingStars;
