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

  // Si l'utilisateur est connecté mais n'est pas admin, redirection vers la page d'accueil
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Rendre le contenu de la route protégée si l'utilisateur est connecté et a les droits d'administrateur
  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
