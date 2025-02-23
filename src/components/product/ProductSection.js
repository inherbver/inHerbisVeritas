import React from 'react';
import PropTypes from 'prop-types';

const ProductSection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    {children}
  </section>
);

ProductSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default ProductSection;
