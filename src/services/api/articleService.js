import { supabase } from '../../config/supabase';
import { TABLES, handleSupabaseError, DEFAULT_OPTIONS } from './config';
import { articles as mockArticles } from '../../data/articles';
import { products } from '../../data/products';

/**
 * Service pour la gestion des articles
 * Fournit une interface unifiée pour interagir avec les données des articles
 * Supporte un mode de développement (données mockées) et un mode production (Supabase)
 */
class ArticleService {
  constructor() {
    // Pour le développement, utilisez true pour utiliser les données mockées
    // Changez en false pour utiliser les données Supabase en production
    this.useMockData = true;
  }

  /**
   * Enrichit un article avec les données du produit associé s'il existe
   * @param {Object} article - Article à enrichir
   * @returns {Object} Article enrichi
   */
  enrichArticleWithProductData(article) {
    if (!article.relatedProductId) return article;

    const product = products.find((p) => p.id === article.relatedProductId);
    if (!product) return article;

    return {
      ...article,
      relatedProductImage: product.imageUrl,
      relatedProductName: product.title || product.name,
      relatedProductPrice: product.price,
    };
  }

  /**
   * Récupère tous les articles
   * @param {Object} options - Options de filtre et de pagination
   * @returns {Promise<{data: Array, count: number, error: Error|null}>}
   */
  async getArticles(options = {}) {
    try {
      if (this.useMockData) {
        // Utilisation des données mockées pour le développement
        let filteredArticles = [...mockArticles];

        // Filtrer par catégorie si spécifié
        if (options.category) {
          filteredArticles = filteredArticles.filter(
            (article) => article.category === options.category
          );
        }

        // Filtrer par recherche si spécifié
        if (options.search) {
          const searchLower = options.search.toLowerCase();
          filteredArticles = filteredArticles.filter(
            (article) =>
              article.title.toLowerCase().includes(searchLower) ||
              article.excerpt.toLowerCase().includes(searchLower)
          );
        }

        // Tri
        if (options.sortBy) {
          filteredArticles = filteredArticles.sort((a, b) => {
            if (options.sortDirection === 'desc') {
              return a[options.sortBy] < b[options.sortBy] ? 1 : -1;
            }
            return a[options.sortBy] > b[options.sortBy] ? 1 : -1;
          });
        }

        // Pagination
        const start = options.page
          ? (options.page - 1) * (options.limit || 10)
          : 0;
        const limit = options.limit || 10;
        const paginatedArticles = filteredArticles.slice(start, start + limit);

        // Enrichir les articles avec les données de produits associés
        const enrichedArticles = paginatedArticles.map((article) =>
          this.enrichArticleWithProductData(article)
        );

        return {
          data: enrichedArticles,
          count: filteredArticles.length,
          error: null,
        };
      } else {
        // Utilisation de Supabase pour la production
        let query = supabase
          .from(TABLES.ARTICLES)
          .select('*', { ...DEFAULT_OPTIONS });

        // Appliquer les filtres
        if (options.category) {
          query = query.eq('category', options.category);
        }

        if (options.search) {
          query = query.or(
            `title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`
          );
        }

        // Tri
        if (options.sortBy) {
          query = query.order(options.sortBy, {
            ascending: options.sortDirection !== 'desc',
          });
        } else {
          // Tri par défaut
          query = query.order('created_at', { ascending: false });
        }

        // Pagination
        if (options.limit) {
          query = query.limit(options.limit);

          if (options.page) {
            const start = (options.page - 1) * options.limit;
            query = query.range(start, start + options.limit - 1);
          }
        }

        const { data, error, count } = await query;

        if (error) throw error;

        // Enrichir les articles avec les données de produits associés
        const enrichedArticles = data.map((article) =>
          this.enrichArticleWithProductData(article)
        );

        return { data: enrichedArticles, count, error: null };
      }
    } catch (error) {
      return {
        data: [],
        count: 0,
        error: handleSupabaseError(
          error,
          'Erreur lors de la récupération des articles'
        ),
      };
    }
  }

  /**
   * Récupère un article par son ID
   * @param {number|string} id - ID de l'article
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async getArticleById(id) {
    try {
      if (this.useMockData) {
        const article = mockArticles.find(
          (article) => article.id === Number(id)
        );
        const enrichedArticle = article
          ? this.enrichArticleWithProductData(article)
          : null;
        return { data: enrichedArticle, error: null };
      } else {
        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        const enrichedArticle = this.enrichArticleWithProductData(data);
        return { data: enrichedArticle, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: handleSupabaseError(
          error,
          `Erreur lors de la récupération de l'article ${id}`
        ),
      };
    }
  }

  /**
   * Crée un nouvel article
   * @param {Object} articleData - Données de l'article
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async createArticle(articleData) {
    try {
      if (this.useMockData) {
        // Simuler la création d'un article
        const newArticle = {
          ...articleData,
          id: Math.max(...mockArticles.map((a) => a.id)) + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Dans un environnement réel, les données mockées seraient persistantes
        // Ici, elles seront réinitialisées lors du rechargement de la page
        mockArticles.push(newArticle);

        const enrichedArticle = this.enrichArticleWithProductData(newArticle);
        return { data: enrichedArticle, error: null };
      } else {
        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .insert([
            {
              ...articleData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        const enrichedArticle = this.enrichArticleWithProductData(data);
        return { data: enrichedArticle, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: handleSupabaseError(
          error,
          "Erreur lors de la création de l'article"
        ),
      };
    }
  }

  /**
   * Met à jour un article existant
   * @param {number|string} id - ID de l'article à mettre à jour
   * @param {Object} articleData - Nouvelles données
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async updateArticle(id, articleData) {
    try {
      if (this.useMockData) {
        // Simuler la mise à jour d'un article
        const index = mockArticles.findIndex(
          (article) => article.id === Number(id)
        );

        if (index === -1) {
          throw new Error('Article non trouvé');
        }

        const updatedArticle = {
          ...mockArticles[index],
          ...articleData,
          updated_at: new Date().toISOString(),
        };

        // Dans un environnement réel, les données mockées seraient persistantes
        mockArticles[index] = updatedArticle;

        const enrichedArticle =
          this.enrichArticleWithProductData(updatedArticle);
        return { data: enrichedArticle, error: null };
      } else {
        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .update({
            ...articleData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;

        const enrichedArticle = this.enrichArticleWithProductData(data);
        return { data: enrichedArticle, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: handleSupabaseError(
          error,
          `Erreur lors de la mise à jour de l'article ${id}`
        ),
      };
    }
  }

  /**
   * Supprime un article
   * @param {number|string} id - ID de l'article à supprimer
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async deleteArticle(id) {
    try {
      if (this.useMockData) {
        // Simuler la suppression d'un article
        const index = mockArticles.findIndex(
          (article) => article.id === Number(id)
        );

        if (index === -1) {
          throw new Error('Article non trouvé');
        }

        // Dans un environnement réel, les données mockées seraient persistantes
        mockArticles.splice(index, 1);

        return { success: true, error: null };
      } else {
        const { error } = await supabase
          .from(TABLES.ARTICLES)
          .delete()
          .eq('id', id);

        if (error) throw error;

        return { success: true, error: null };
      }
    } catch (error) {
      return {
        success: false,
        error: handleSupabaseError(
          error,
          `Erreur lors de la suppression de l'article ${id}`
        ),
      };
    }
  }

  /**
   * Récupère les articles mis en avant
   * @param {number} limit - Nombre maximum d'articles à récupérer
   * @returns {Promise<{data: Array, error: Error|null}>}
   */
  async getFeaturedArticles(limit = 3) {
    try {
      if (this.useMockData) {
        // Simuler la récupération des articles mis en avant
        const featuredArticles = mockArticles
          .filter((article) => article.featured)
          .slice(0, limit);

        // Enrichir les articles avec les données de produits associés
        const enrichedArticles = featuredArticles.map((article) =>
          this.enrichArticleWithProductData(article)
        );

        return { data: enrichedArticles, error: null };
      } else {
        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;

        // Enrichir les articles avec les données de produits associés
        const enrichedArticles = data.map((article) =>
          this.enrichArticleWithProductData(article)
        );

        return { data: enrichedArticles, error: null };
      }
    } catch (error) {
      return {
        data: [],
        error: handleSupabaseError(
          error,
          'Erreur lors de la récupération des articles mis en avant'
        ),
      };
    }
  }

  /**
   * Change le statut "mis en avant" d'un article
   * @param {number|string} id - ID de l'article
   * @param {boolean} featured - Nouvel état
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async toggleFeatured(id, featured) {
    try {
      if (this.useMockData) {
        // Simuler le changement du statut "mis en avant"
        const index = mockArticles.findIndex(
          (article) => article.id === Number(id)
        );

        if (index === -1) {
          throw new Error('Article non trouvé');
        }

        // Dans un environnement réel, les données mockées seraient persistantes
        mockArticles[index].featured = featured;

        return { success: true, error: null };
      } else {
        const { error } = await supabase
          .from(TABLES.ARTICLES)
          .update({ featured })
          .eq('id', id);

        if (error) throw error;

        return { success: true, error: null };
      }
    } catch (error) {
      return {
        success: false,
        error: handleSupabaseError(
          error,
          `Erreur lors de la modification du statut "mis en avant" de l'article ${id}`
        ),
      };
    }
  }
}

// Exporter une instance unique du service
const articleService = new ArticleService();
export default articleService;
