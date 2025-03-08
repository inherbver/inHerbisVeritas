import articleServiceDefault from './articleService';
import { TABLES, handleSupabaseError, recordExists } from './config';

/**
 * Index des services API
 * Permet d'importer tous les services à partir d'un seul fichier
 *
 * Exemple d'utilisation:
 * import { articleService } from '../services/api';
 */

// Re-export articleService as a named export
const articleService = articleServiceDefault;
export { articleService, TABLES, handleSupabaseError, recordExists };
