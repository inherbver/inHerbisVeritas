import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

/**
 * Layout commun pour toutes les pages client
 * Inclut la barre de navigation et le contenu de la page
 */
const ClientLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children || <Outlet />}
    </>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node,
};

export default ClientLayout;
