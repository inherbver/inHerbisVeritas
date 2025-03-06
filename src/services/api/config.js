import { supabase } from '../../config/supabase';

/**
 * Configuration des tables Supabase
 * Centralise les noms des tables pour éviter les erreurs de frappe et faciliter les modifications
 */
export const TABLES = {
  ARTICLES: 'articles',
  PRODUCTS: 'products',
  USERS: 'profiles',
  ORDERS: 'orders',
  REVIEWS: 'reviews',
  PROMOTIONS: 'promotions',
};

/**
 * Options de requête par défaut
 */
export const DEFAULT_OPTIONS = {
  count: 'exact',
};

/**
 * Erreurs standardisées pour les services API
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Fonction d'assistance pour gérer les erreurs Supabase
 * @param {Object} error - L'erreur retournée par Supabase
 * @param {string} customMessage - Message personnalisé
 * @returns {ApiError} - Erreur standardisée
 */
export const handleSupabaseError = (
  error,
  customMessage = 'Une erreur est survenue'
) => {
  console.error('Supabase error:', error);
  return new ApiError(customMessage, error.status || 500, error.data || null);
};

/**
 * Vérification d'existence d'un enregistrement
 * @param {string} table - Nom de la table
 * @param {string} column - Nom de la colonne
 * @param {any} value - Valeur à vérifier
 * @returns {Promise<boolean>} - True si l'enregistrement existe
 */
export const recordExists = async (table, column, value) => {
  try {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq(column, value);

    if (error) throw error;
    return count > 0;
  } catch (error) {
    console.error(`Error checking if record exists in ${table}:`, error);
    return false;
  }
};

export default {
  supabase,
  TABLES,
  DEFAULT_OPTIONS,
  handleSupabaseError,
  recordExists,
};
