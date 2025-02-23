import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({
  children,
  subtitle,
  size = '4xl',
  color = 'gray-900',
  className = '',
}) => (
  <div className="pt-24 pb-8">
    <div className="text-center mb-8">
      <div className="mx-auto max-w-2xl">
        <h1
          className={`text-${size} font-bold tracking-tight text-${color} ${className}`}
        >
          {children}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </div>
);

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  size: PropTypes.oneOf(['4xl', '5xl', '6xl']),
  color: PropTypes.string,
  className: PropTypes.string,
};

export default PageTitle;
