import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../config/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour vérifier et définir le rôle de l'utilisateur
  const checkUserRole = async (user) => {
    if (!user) {
      setUserRole(null);
      return;
    }

    try {
      // Récupérer les données utilisateur supplémentaires depuis la table "profiles"
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
        setUserRole(null);
      } else {
        setUserRole(data?.role || 'user');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du rôle:', error);
      setUserRole(null);
    }
  };

  useEffect(() => {
    // Initialiser l'état d'authentification
    const initAuth = async () => {
      // Vérifier si un utilisateur est déjà connecté
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setCurrentUser(session.user);
        checkUserRole(session.user);
      }

      setLoading(false);
    };

    initAuth();

    // S'abonner aux changements d'état d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setCurrentUser(session?.user || null);

      if (session?.user) {
        checkUserRole(session.user);
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Fonction de connexion
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Fonction d'inscription
  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // Si l'inscription réussit, créer un profil utilisateur dans la base de données
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').upsert([
          {
            id: data.user.id,
            email: data.user.email,
            role: 'user', // Rôle par défaut
            created_at: new Date(),
          },
        ]);

        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
        }
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Fonction de réinitialisation du mot de passe
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Fonction pour mettre à jour le mot de passe
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  const value = {
    currentUser,
    userRole,
    isAdmin: userRole === 'admin',
    signIn,
    signUp,
    signOut,
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
