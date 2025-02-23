import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../Ui/Badge';
import RatingStars from '../Ui/RatingStars';
import PageTitle from '../Ui/PageTitle';

const ProductHeader = ({ title, category, rating }) => (
  <header className="mb-12">
    <PageTitle size="4xl" extraClasses="mb-4 text-left">
      {title}
    </PageTitle>
    <div className="flex items-center gap-4">
      <Badge variant="primary">{category}</Badge>
      <RatingStars rating={rating} />
    </div>
  </header>
);

ProductHeader.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ProductHeader;
