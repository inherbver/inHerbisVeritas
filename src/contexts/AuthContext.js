import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Constantes pour les URLs d'API
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://votre-domaine-de-production.com'
    : 'http://localhost:5000';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Fonction utilitaire pour extraire les détails d'une erreur
  const formatError = (error) => {
    if (!error) return null;
    return {
      message: error.message || 'Erreur inconnue',
      code: error.code,
      details: error.details,
      hint: error.hint,
    };
  };

  // Fonction pour créer un profil utilisateur manquant
  const createUserProfile = async (user) => {
    try {
      console.log(
        `Tentative de création d'un profil pour l'utilisateur ${user.id}`
      );
      const response = await fetch(`${API_URL}/api/profiles`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          role: 'user',
          created_at: new Date(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Erreur de création du profil',
          status: response.status,
        };
        console.error('Erreur de création du profil:', errorDetails);
        setAuthError({
          type: 'profile_creation',
          ...errorDetails,
        });
        setUserRole(null);
        return false;
      }

      console.log('Profil utilisateur créé avec succès');
      setUserRole('user');
      return true;
    } catch (error) {
      const errorMessage = error.message || JSON.stringify(error);
      console.error(`Exception lors de la création du profil: ${errorMessage}`);
      setAuthError({
        type: 'profile_creation_exception',
        message: errorMessage,
      });
      setUserRole(null);
      return false;
    }
  };

  // Fonction pour vérifier et définir le rôle de l'utilisateur
  const checkUserRole = async (user) => {
    if (!user) {
      console.log('Vérification du rôle annulée: aucun utilisateur fourni');
      setUserRole(null);
      return;
    }

    try {
      console.log(
        `Tentative de récupération du rôle pour l'utilisateur ${user.id}`
      );

      const response = await fetch(`${API_URL}/api/profiles/${user.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Erreur de récupération du rôle',
          status: response.status,
        };
        console.error('Erreur de récupération du rôle:', errorDetails);

        // PGRST116 = No rows returned by the query (l'utilisateur n'a pas de profil)
        if (errorDetails.status === 404) {
          console.log(
            `Profil non trouvé pour l'utilisateur ${user.id}, création en cours...`
          );
          const profileCreated = await createUserProfile(user);

          if (profileCreated) {
            // Récupérer à nouveau le rôle après création du profil
            console.log(
              'Profil créé, nouvelle tentative de récupération du rôle'
            );
            return await checkUserRole(user);
          } else {
            setAuthError({
              type: 'profile_not_found',
              message:
                'Profil utilisateur non trouvé et impossible de le créer automatiquement',
              code: errorDetails.status,
            });
          }
          return;
        }

        setAuthError({
          type: 'role_fetch',
          ...errorDetails,
        });

        setUserRole(null);
      } else {
        // Optimisation de la lecture du rôle
        const role = data.role || 'user';
        console.log(`Rôle récupéré avec succès: ${role}`);
        setUserRole(role);
        setAuthError(null);
      }
    } catch (error) {
      const errorMessage = error.message || JSON.stringify(error);
      console.error(
        `Exception lors de la vérification du rôle: ${errorMessage}`
      );
      setAuthError({
        type: 'role_check_exception',
        message: errorMessage,
      });
      setUserRole(null);
    }
  };

  // Ajouter un système de timeout pour éviter le blocage infini en chargement
  useEffect(() => {
    if (loading) {
      const loadingTimeout = setTimeout(() => {
        console.log(
          "Timeout de chargement atteint - forçage de l'état 'non chargé'"
        );
        setLoading(false);
      }, 5000); // 5 secondes max de chargement

      return () => clearTimeout(loadingTimeout);
    }
  }, [loading]);

  useEffect(() => {
    // Initialiser l'état d'authentification en vérifiant la session via le backend
    const initAuth = async () => {
      try {
        console.log("Initialisation de l'authentification...");
        // Vérifier si un utilisateur est déjà connecté via le cookie auth_token
        const response = await fetch(`${API_URL}/api/auth/user`, {
          method: 'GET',
          credentials: 'include', // Important pour envoyer les cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.log('Session non valide ou expirée');
          setCurrentUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        if (data.success && data.user) {
          console.log(`Session trouvée pour l'utilisateur ${data.user.id}`);
          setCurrentUser(data.user);
          await checkUserRole(data.user);
        } else {
          console.log('Aucune session active trouvée');
          setCurrentUser(null);
          setUserRole(null);
        }

        setLoading(false);
      } catch (error) {
        console.error(
          "Exception lors de l'initialisation de l'auth:",
          error.message || error
        );
        setAuthError({
          type: 'init_auth_exception',
          message: error.message || JSON.stringify(error),
        });
        setLoading(false);
      }
    };

    initAuth();

    // Note: Nous n'utilisons plus l'abonnement de Supabase ici car nous utilisons
    // désormais les cookies pour la gestion de session via notre backend
  }, []);

  // Fonction de connexion via le backend
  const signIn = async (email, password) => {
    try {
      setLoading(true); // Activer le chargement pendant la connexion
      console.log(`Tentative de connexion pour ${email}`);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include', // Important pour recevoir et stocker le cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Échec de la connexion',
          status: response.status,
        };
        console.error('Erreur de connexion:', errorDetails);
        setLoading(false);
        return {
          success: false,
          error: errorDetails,
        };
      }

      // Mettre à jour l'état avec les infos de l'utilisateur connecté
      setCurrentUser(data.user);
      await checkUserRole(data.user);
      setLoading(false);

      return { success: true, data };
    } catch (error) {
      console.error('Exception lors de la connexion:', error.message || error);
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

  // Fonction d'inscription via le backend
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      console.log(`Tentative d'inscription pour ${email}`);

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include', // Important pour recevoir et stocker le cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || "Échec de l'inscription",
          status: response.status,
        };
        console.error("Erreur d'inscription:", errorDetails);
        setLoading(false);
        return {
          success: false,
          error: errorDetails,
        };
      }

      // Mettre à jour l'état avec les infos de l'utilisateur inscrit
      setCurrentUser(data.user);
      await checkUserRole(data.user);
      setLoading(false);

      return { success: true, data };
    } catch (error) {
      console.error("Exception lors de l'inscription:", error.message || error);
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

  // Fonction de déconnexion via le backend
  const logout = async () => {
    try {
      setLoading(true);
      console.log('Tentative de déconnexion');

      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Important pour envoyer le cookie à supprimer
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Échec de la déconnexion',
          status: response.status,
        };
        console.error('Erreur de déconnexion:', errorDetails);
        setLoading(false);
        return {
          success: false,
          error: errorDetails,
        };
      }

      // Mettre à jour l'état après déconnexion réussie
      setCurrentUser(null);
      setUserRole(null);
      setLoading(false);

      return { success: true };
    } catch (error) {
      console.error(
        'Exception lors de la déconnexion:',
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

  // Fonction de réinitialisation du mot de passe via le backend
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      console.log(`Demande de réinitialisation du mot de passe pour ${email}`);

      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        credentials: 'include', // Important pour recevoir et stocker le cookie
        headers: {
          'Content-Type': 'application/json',
        },
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
          'Erreur de réinitialisation du mot de passe:',
          errorDetails
        );
        setLoading(false);
        return {
          success: false,
          error: errorDetails,
        };
      }

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error(
        'Exception lors de la réinitialisation du mot de passe:',
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

  // Fonction pour mettre à jour le mot de passe via le backend
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      console.log('Tentative de mise à jour du mot de passe');

      const response = await fetch(`${API_URL}/api/auth/update-password`, {
        method: 'POST',
        credentials: 'include', // Important pour recevoir et stocker le cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = {
          message: data.message || 'Échec de la mise à jour du mot de passe',
          status: response.status,
        };
        console.error('Erreur de mise à jour du mot de passe:', errorDetails);
        setLoading(false);
        return {
          success: false,
          error: errorDetails,
        };
      }

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error(
        'Exception lors de la mise à jour du mot de passe:',
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
