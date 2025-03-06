import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';

const StandardPageLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow pt-16 px-4">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">{children}</div>
    </main>
    <Footer />
  </div>
);

StandardPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StandardPageLayout;
