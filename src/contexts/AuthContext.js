import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://votre-domaine-de-production.com'
    : 'http://localhost:5000';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const formatError = (error) => {
    if (!error) return null;
    return {
      message: error.message || 'Erreur inconnue',
      code: error.code,
      details: error.details,
      hint: error.hint,
    };
  };

  // Fonction pour récupérer le rôle via l'endpoint dédié
  const fetchUserRole = async () => {
    try {
      console.log('🔍 Tentative de récupération du rôle utilisateur...');
      const response = await fetch(`${API_URL}/api/auth/role`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(`🔄 Statut de la réponse /api/auth/role: ${response.status}`);

      if (!response.ok) {
        console.error(
          `❌ Échec de la récupération du rôle: ${response.status} ${response.statusText}`
        );
        throw new Error('Échec de la récupération du rôle');
      }

      const data = await response.json();
      console.log('✅ Rôle récupéré avec succès:', data);
      console.log(`👤 Attribution du rôle: ${data.role}`);
      setUserRole(data.role);
      return data.role; // Retourner le rôle pour permettre son utilisation immédiate
    } catch (error) {
      console.error(
        '❌ Erreur lors de la récupération du rôle:',
        error.message
      );
      console.log('⚠️ Utilisation du rôle par défaut: user');
      setUserRole('user');
      return 'user'; // Retourner le rôle par défaut
    }
  };

  // Fonction pour récupérer l'utilisateur et son rôle
  const fetchCurrentUserAndRole = async () => {
    try {
      console.log("🔍 Tentative de récupération de l'utilisateur courant...");
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(`🔄 Statut de la réponse /api/auth/user: ${response.status}`);

      const data = await response.json();
      console.log('📦 Données utilisateur reçues:', data);

      if (!response.ok || !data.user) {
        console.log('❌ Session non valide ou expirée');
        setCurrentUser(null);
        setUserRole('user');
        return;
      }

      console.log('✅ Utilisateur récupéré avec succès:', data.user);
      setCurrentUser(data.user);
      console.log('🔍 Récupération du rôle pour cet utilisateur...');
      const currentRole = await fetchUserRole();

      // Utiliser la valeur retournée directement pour les logs
      console.log(`👤 Utilisateur connecté - Rôle actuel: ${currentRole}`);
      console.log(
        `👑 Statut Admin: ${currentRole === 'admin' ? 'OUI' : 'NON'}`
      );
    } catch (error) {
      console.error(
        "❌ Erreur lors de la récupération de l'utilisateur:",
        error.message
      );
      setCurrentUser(null);
      setUserRole('user');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("🚀 Initialisation de l'authentification...");
      await fetchCurrentUserAndRole();
      console.log(`🔒 État d'authentification initialisé - Rôle: ${userRole}`);
      setLoading(false);
    };
    initAuth();
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      console.log(`🔑 Tentative de connexion pour ${email}`);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log(`🔄 Statut de la réponse login: ${response.status}`);
      const data = await response.json();
      console.log('📦 Données de connexion reçues:', data);

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Échec de la connexion',
          status: response.status,
        };
        console.error('❌ Erreur de connexion:', errorDetails);
        setLoading(false);
        return { success: false, error: errorDetails };
      }

      console.log('✅ Connexion réussie, récupération du profil et du rôle...');
      // Récupérer l'utilisateur et le rôle après connexion
      await fetchCurrentUserAndRole();

      console.log(`👤 Utilisateur connecté - Rôle actuel: ${userRole}`);
      console.log(`👑 Statut Admin: ${userRole === 'admin' ? 'OUI' : 'NON'}`);

      setLoading(false);
      return { success: true, data };
    } catch (error) {
      console.error(
        '❌ Exception lors de la connexion:',
        error.message || error
      );
      setLoading(false);
      return {
        success: false,
        error: {
          message: error.message || 'Erreur inconnue lors de la connexion',
          isException: true,
        },
      };
    }
  };

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      console.log(`📝 Tentative d'inscription pour ${email}`);

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || "Échec de l'inscription",
          status: response.status,
        };
        console.error("❌ Erreur d'inscription:", errorDetails);
        setLoading(false);
        return { success: false, error: errorDetails };
      }

      console.log(
        '✅ Inscription réussie, récupération du profil et du rôle...'
      );
      await fetchCurrentUserAndRole();
      console.log(`👤 Nouvel utilisateur - Rôle: ${userRole}`);

      setLoading(false);
      return { success: true, data };
    } catch (error) {
      console.error(
        "❌ Exception lors de l'inscription:",
        error.message || error
      );
      setLoading(false);
      return {
        success: false,
        error: {
          message: error.message || "Erreur inconnue lors de l'inscription",
          isException: true,
        },
      };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      console.log('🚪 Tentative de déconnexion');

      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Échec de la déconnexion',
          status: response.status,
        };
        console.error('❌ Erreur de déconnexion:', errorDetails);
        setLoading(false);
        return { success: false, error: errorDetails };
      }

      console.log('✅ Déconnexion réussie');
      setCurrentUser(null);
      setUserRole('user');
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error(
        '❌ Exception lors de la déconnexion:',
        error.message || error
      );
      setLoading(false);
      return {
        success: false,
        error: {
          message: error.message || 'Erreur inconnue lors de la déconnexion',
          isException: true,
        },
      };
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      console.log(
        `🔄 Demande de réinitialisation du mot de passe pour ${email}`
      );

      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message:
            data.message || 'Échec de la réinitialisation du mot de passe',
          status: response.status,
        };
        console.error(
          '❌ Erreur de réinitialisation du mot de passe:',
          errorDetails
        );
        setLoading(false);
        return { success: false, error: errorDetails };
      }
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error(
        '❌ Exception lors de la réinitialisation du mot de passe:',
        error.message || error
      );
      setLoading(false);
      return {
        success: false,
        error: {
          message:
            error.message ||
            'Erreur inconnue lors de la réinitialisation du mot de passe',
          isException: true,
        },
      };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      console.log('🔐 Tentative de mise à jour du mot de passe');

      const response = await fetch(`${API_URL}/api/auth/update-password`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Échec de la mise à jour du mot de passe',
          status: response.status,
        };
        console.error(
          '❌ Erreur de mise à jour du mot de passe:',
          errorDetails
        );
        setLoading(false);
        return { success: false, error: errorDetails };
      }
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error(
        '❌ Exception lors de la mise à jour du mot de passe:',
        error.message || error
      );
      setLoading(false);
      return {
        success: false,
        error: {
          message:
            error.message ||
            'Erreur inconnue lors de la mise à jour du mot de passe',
          isException: true,
        },
      };
    }
  };

  // Timeout pour éviter un chargement infini
  useEffect(() => {
    if (loading) {
      const loadingTimeout = setTimeout(() => {
        console.log(
          "⏱️ Timeout de chargement atteint - forçage de l'état 'non chargé'"
        );
        setLoading(false);
      }, 5000);
      return () => clearTimeout(loadingTimeout);
    }
  }, [loading]);

  // Ajout d'un effet pour observer les changements de rôle
  useEffect(() => {
    console.log(`🔄 Mise à jour du rôle utilisateur: ${userRole}`);
    console.log(
      `🔑 Est administrateur: ${userRole === 'admin' ? 'OUI' : 'NON'}`
    );
  }, [userRole]);

  if (loading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  const value = {
    currentUser,
    userRole,
    isAdmin: userRole === 'admin',
    authError,
    signIn,
    signUp,
    logout,
    resetPassword,
    updatePassword,
  };

  console.log("🔄 Mise à jour du contexte d'authentification", {
    userId: currentUser?.id,
    userEmail: currentUser?.email,
    userRole,
    isAdmin: userRole === 'admin',
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
