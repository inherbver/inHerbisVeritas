import articleService from './articleService';
import { TABLES, handleSupabaseError, recordExists } from './config';

/**
 * Index des services API
 * Permet d'importer tous les services à partir d'un seul fichier
 * 
 * Exemple d'utilisation:
 * import { articleService } from '../services/api';
 */

export {
  articleService,
  TABLES,
  handleSupabaseError,
  recordExists
};
