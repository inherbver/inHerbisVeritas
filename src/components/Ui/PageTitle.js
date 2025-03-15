import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ children, subtitle, className = '' }) => (
  <div className="max-w-7xl mx-auto px-4">
    <section className="pt-16 pb-8">
      <div className={`text-center max-w-7xl ${className}`}>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{children}</h1>
        {subtitle && (
          <p className="text-lg text-gray-600 text-center">{subtitle}</p>
        )}
      </div>
    </section>
  </div>
);

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default PageTitle;
