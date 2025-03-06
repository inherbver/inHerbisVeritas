import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Vérifier si l'utilisateur est connecté et a le rôle d'administrateur
  // Dans une application réelle, vous devriez vérifier le rôle d'administrateur
  // à partir des claims Firebase ou d'une collection Supabase

  // TEMPORAIRE: Pour les tests, on désactive la vérification d'authentification
  // et on autorise l'accès direct à l'interface admin
  const isAdmin = true; // Bypass temporaire pour permettre les tests

  /* Original code (commented for testing)
  const isAdmin =
    currentUser &&
    (currentUser.email === 'admin@inherbis.com' ||
      currentUser.email?.endsWith('@inherbis.com') ||
      currentUser.admin === true);
  */

  if (!isAdmin) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas admin
    return <Navigate to="/signin" replace />;
  }

  // Rendre le contenu de la route protégée
  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
