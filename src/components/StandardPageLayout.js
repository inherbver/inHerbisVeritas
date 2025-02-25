import React from 'react';
import PropTypes from 'prop-types';

const StandardPageLayout = ({ children }) => (
  <main className="min-h-screen pt-16 px-4">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">{children}</div>
  </main>
);

StandardPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StandardPageLayout;
