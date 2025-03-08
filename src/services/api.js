/**
 * Service d'API pour les requêtes au backend
 * Ce fichier gère toutes les communications avec le serveur Express
 */

// Configuration de base pour les requêtes API
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://votre-domaine-de-production.com'
    : 'http://localhost:5000';

// Configuration par défaut pour fetch
const defaultOptions = {
  credentials: 'include', // Important pour la gestion des cookies
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Fonction utilitaire pour gérer les erreurs de fetch
 * @param {Response} response - La réponse fetch
 * @returns {Promise} - La réponse JSON ou lève une erreur
 */
const handleApiResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    // Formater l'erreur de manière cohérente
    const error = {
      status: response.status,
      message: data.message || 'Erreur de serveur',
      details: data,
    };
    throw error;
  }

  return data;
};

/**
 * API d'authentification
 */
export const authApi = {
  /**
   * Connexion utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise} - Données utilisateur
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  /**
   * Inscription utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise} - Données utilisateur
   */
  async signup(email, password) {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  },

  /**
   * Récupérer l'utilisateur courant
   * @returns {Promise} - Données utilisateur ou null
   */
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        ...defaultOptions,
        method: 'GET',
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return null; // Retourner null en cas d'erreur (probablement non authentifié)
    }
  },

  /**
   * Déconnexion
   * @returns {Promise} - Statut de déconnexion
   */
  async logout() {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        ...defaultOptions,
        method: 'POST',
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  /**
   * Réinitialisation du mot de passe
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise} - Statut de la réinitialisation
   */
  async resetPassword(email) {
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error(
        'Erreur lors de la réinitialisation du mot de passe:',
        error
      );
      throw error;
    }
  },

  /**
   * Mise à jour du mot de passe
   * @param {string} newPassword - Nouveau mot de passe
   * @returns {Promise} - Statut de la mise à jour
   */
  async updatePassword(newPassword) {
    try {
      const response = await fetch(`${API_URL}/api/auth/update-password`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ newPassword }),
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      throw error;
    }
  },
};

/**
 * API pour les profils utilisateurs
 */
export const profilesApi = {
  /**
   * Récupérer le profil d'un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise} - Données de profil
   */
  async getUserProfile(userId) {
    try {
      const response = await fetch(`${API_URL}/api/profiles/${userId}`, {
        ...defaultOptions,
        method: 'GET',
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  },

  /**
   * Créer ou mettre à jour un profil utilisateur
   * @param {Object} profileData - Données du profil
   * @returns {Promise} - Données du profil mis à jour
   */
  async upsertProfile(profileData) {
    try {
      const response = await fetch(`${API_URL}/api/profiles`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(profileData),
      });

      return await handleApiResponse(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  },
};

export default {
  auth: authApi,
  profiles: profilesApi,
};
