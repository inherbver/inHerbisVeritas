import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../../pages/SignIn';
import ResetPassword from './ResetPassword';
import AuthCallback from './AuthCallback';
import AdminRoute from './AdminRoute';

/**
 * Composant qui définit toutes les routes liées à l'authentification
 */
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Les routes ci-dessous sont des exemples de routes protégées par AdminRoute */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
    </Routes>
  );
};

// Composants provisoires pour les exemples de routes
const AdminDashboard = () => <div className="p-8">Tableau de bord administrateur</div>;
const ProductManagement = () => <div className="p-8">Gestion des produits</div>;

export default AuthRoutes;
