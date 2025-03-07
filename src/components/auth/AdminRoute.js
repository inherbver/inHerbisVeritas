import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
