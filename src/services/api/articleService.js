import { supabase } from '../../config/supabase';
import { TABLES, handleSupabaseError, DEFAULT_OPTIONS } from './config';
import { articles as mockArticles } from '../../data/articles';
import { products } from '../../data/products';
import moment from 'moment';
import 'moment/locale/fr'; // Import de la locale française
import { toSnakeCase, toCamelCase } from '../../utils/convertKeys';

/**
 * Service pour la gestion des articles
 * Fournit une interface unifiée pour interagir avec les données des articles
 * Supporte un mode de développement (données mockées) et un mode production (Supabase)
 */
class ArticleService {
  constructor() {
    // Pour le développement, utilisez true pour utiliser les données mockées
    // Changez en false pour utiliser les données Supabase en production
    this.useMockData = false;
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
   * Formate les dates de l'article pour qu'elles soient compatibles avec PostgreSQL
   * @param {Object} articleData - Données de l'article
   * @returns {Object} - Données avec dates formatées
   */
  formatArticleDates(articleData) {
    const formattedData = { ...articleData };

    // Formater la date de l'article si elle existe
    if (formattedData.date) {
      try {
        // Si c'est une date au format français comme "10 mars 2025"
        if (
          typeof formattedData.date === 'string' &&
          formattedData.date.includes(' ')
        ) {
          // Configurer Moment.js pour reconnaître le format français
          moment.locale('fr');
          formattedData.date = moment(formattedData.date, 'D MMMM YYYY').format(
            'YYYY-MM-DDTHH:mm:ssZ'
          );
        } else {
          // Sinon utiliser le parseur standard
          formattedData.date = moment(formattedData.date).format(
            'YYYY-MM-DDTHH:mm:ssZ'
          );
        }
        console.log(`📅 Date formatée avec succès: ${formattedData.date}`);
      } catch (error) {
        console.error(
          `❌ Erreur lors du formatage de la date: ${error.message}`
        );
        // En cas d'erreur, on peut soit laisser la date telle quelle, soit la mettre à null
        formattedData.date = null;
      }
    }

    // Gérer le champ relatedProductId (UUID dans PostgreSQL)
    if (formattedData.relatedProductId === '') {
      formattedData.relatedProductId = null;
    }

    return formattedData;
  }

  /**
   * Formate les dates de l'article pour l'affichage (ISO vers format français)
   * @param {Object} article - Article avec des dates au format ISO
   * @returns {Object} - Article avec des dates formatées pour l'affichage
   */
  formatArticleDatesForDisplay(article) {
    if (!article) return article;

    const formattedArticle = { ...article };

    // Formater la date de publication pour l'affichage si elle existe
    if (formattedArticle.date) {
      try {
        moment.locale('fr');
        formattedArticle.date = moment(formattedArticle.date).format(
          'D MMMM YYYY'
        );
      } catch (error) {
        console.error(
          `❌ Erreur lors du formatage de la date pour l'affichage: ${error.message}`
        );
      }
    }

    return formattedArticle;
  }

  /**
   * Récupère tous les articles
   * @param {Object} options - Options de filtre et de pagination
   * @param {Object} options.filters - Critères de filtrage (ex: {slug: 'mon-article', category: 'Plantes'})
   * @param {string} options.search - Terme de recherche (cherche dans titre et extrait)
   * @param {number} options.limit - Nombre maximum d'articles à récupérer
   * @param {number} options.page - Numéro de page (pour pagination)
   * @param {string} options.sortBy - Champ de tri
   * @param {string} options.sortDirection - Direction du tri ('asc' ou 'desc')
   * @returns {Promise<{data: Array, count: number, error: Error|null}>}
   */
  async getArticles(options = {}) {
    try {
      if (this.useMockData) {
        // Utilisation des données mockées pour le développement
        let filteredArticles = [...mockArticles];

        // Filtrer par critères spécifiques si spécifiés
        if (options.filters) {
          filteredArticles = filteredArticles.filter((article) => {
            return Object.entries(options.filters).every(([key, value]) => {
              return article[key] === value;
            });
          });
        }

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

        // Enrichir les articles avec les données de produits associés et formater les dates
        const enrichedArticles = paginatedArticles.map((article) =>
          this.formatArticleDatesForDisplay(
            this.enrichArticleWithProductData(article)
          )
        );

        return {
          data: enrichedArticles,
          count: filteredArticles.length,
          error: null,
        };
      } else {
        // Utilisation de Supabase pour la production
        // Convertir les options en snake_case pour Supabase
        const snakeCaseOptions = toSnakeCase(options);

        let query = supabase
          .from(TABLES.ARTICLES)
          .select('*', { ...DEFAULT_OPTIONS });

        // Appliquer les filtres génériques
        if (snakeCaseOptions.filters) {
          Object.entries(snakeCaseOptions.filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Appliquer les filtres spécifiques
        if (snakeCaseOptions.category) {
          query = query.eq('category', snakeCaseOptions.category);
        }

        if (snakeCaseOptions.search) {
          query = query.or(
            `title.ilike.%${snakeCaseOptions.search}%,excerpt.ilike.%${snakeCaseOptions.search}%`
          );
        }

        // Tri
        if (snakeCaseOptions.sort_by) {
          query = query.order(snakeCaseOptions.sort_by, {
            ascending: snakeCaseOptions.sort_direction !== 'desc',
          });
        } else {
          // Tri par défaut
          query = query.order('created_at', { ascending: false });
        }

        // Pagination
        if (snakeCaseOptions.limit) {
          query = query.limit(snakeCaseOptions.limit);

          if (snakeCaseOptions.page) {
            const start = (snakeCaseOptions.page - 1) * snakeCaseOptions.limit;
            query = query.range(start, start + snakeCaseOptions.limit - 1);
          }
        }

        const { data, error, count } = await query;

        if (error) throw error;

        // Convertir les données de snake_case vers camelCase
        const camelCaseData = toCamelCase(data);

        // Enrichir les articles avec les données de produits associés et formater les dates
        const enrichedArticles = camelCaseData.map((article) =>
          this.formatArticleDatesForDisplay(
            this.enrichArticleWithProductData(article)
          )
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
          ? this.formatArticleDatesForDisplay(
              this.enrichArticleWithProductData(article)
            )
          : null;
        return { data: enrichedArticle, error: null };
      } else {
        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Convertir les données de snake_case vers camelCase
        const camelCaseData = toCamelCase(data);

        const enrichedArticle = this.formatArticleDatesForDisplay(
          this.enrichArticleWithProductData(camelCaseData)
        );
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
   * Génère un slug unique en ajoutant un suffixe si nécessaire
   * @param {string} baseSlug - Le slug de base à rendre unique
   * @returns {Promise<string>} - Le slug unique
   */
  async generateUniqueSlug(baseSlug) {
    try {
      // Vérifier si le slug existe déjà
      const { data, error } = await supabase
        .from(TABLES.ARTICLES)
        .select('slug')
        .eq('slug', baseSlug)
        .single();

      // Si aucune erreur, cela signifie que le slug existe déjà
      if (!error && data) {
        // Ajouter un suffixe unique basé sur la date et un nombre aléatoire
        const timestamp = Date.now().toString().slice(-4);
        const randomSuffix = Math.floor(Math.random() * 1000);
        const newSlug = `${baseSlug}-${timestamp}-${randomSuffix}`;
        console.log(`Slug existant détecté, nouveau slug généré: ${newSlug}`);
        return newSlug;
      }

      // Slug disponible, on le retourne tel quel
      return baseSlug;
    } catch (error) {
      console.error('Erreur lors de la vérification du slug:', error);
      // En cas d'erreur, on ajoute un timestamp pour garantir l'unicité
      return `${baseSlug}-${Date.now()}`;
    }
  }

  /**
   * Crée un nouvel article
   * @param {Object} articleData - Données de l'article
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async createArticle(articleData) {
    try {
      console.log("Création d'un nouvel article");
      console.log('Données reçues du frontend:', articleData);

      // Formater les dates de l'article
      const formattedArticleData = this.formatArticleDates(articleData);
      console.log('Données avec dates formatées:', formattedArticleData);

      if (this.useMockData) {
        // Simuler la création d'un article
        const newArticle = {
          ...formattedArticleData,
          id: Math.max(...mockArticles.map((a) => a.id)) + 1,
          created_at: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
          updated_at: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        };

        // Dans un environnement réel, les données mockées seraient persistantes
        // Ici, elles seront réinitialisées lors du rechargement de la page
        mockArticles.push(newArticle);

        const enrichedArticle = this.formatArticleDatesForDisplay(
          this.enrichArticleWithProductData(newArticle)
        );
        return { data: enrichedArticle, error: null };
      } else {
        // Retirer les propriétés qui ne sont pas dans la table Supabase
        const {
          articleUrl,
          relatedProductImage,
          relatedProductName,
          relatedProductPrice,
          ...cleanArticleData
        } = formattedArticleData;

        // Vérifier si le slug existe et le rendre unique si nécessaire
        if (cleanArticleData.slug) {
          cleanArticleData.slug = await this.generateUniqueSlug(
            cleanArticleData.slug
          );
        }

        // Créer un nouvel objet pour les données à envoyer à Supabase
        const dataToSend = { ...cleanArticleData };

        // Ajouter created_at et updated_at au format ISO
        const now = new Date().toISOString();
        dataToSend.created_at = now;
        dataToSend.updated_at = now;

        console.log(
          'Données nettoyées avant conversion en snake_case:',
          dataToSend
        );

        // Convertir en snake_case pour Supabase
        const snakeCaseData = toSnakeCase(dataToSend);
        console.log(
          'Données converties en snake_case pour Supabase:',
          snakeCaseData
        );

        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .insert([snakeCaseData])
          .select()
          .single();

        if (error) {
          console.error('Erreur Supabase détaillée:', error);
          throw error;
        }

        console.log('Réponse Supabase après création:', data);

        // Convertir les données de snake_case vers camelCase
        const camelCaseData = toCamelCase(data);
        console.log('Données converties en camelCase:', camelCaseData);

        const enrichedArticle = this.formatArticleDatesForDisplay(
          this.enrichArticleWithProductData(camelCaseData)
        );
        console.log('Article enrichi retourné au frontend:', enrichedArticle);

        return { data: enrichedArticle, error: null };
      }
    } catch (error) {
      console.error('Erreur complète lors de la création:', error);
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
      console.log("Mise à jour de l'article avec ID:", id);
      console.log('Données reçues du frontend:', articleData);

      // Formater les dates de l'article
      const formattedArticleData = this.formatArticleDates(articleData);
      console.log('Données avec dates formatées:', formattedArticleData);

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
          ...formattedArticleData,
          updated_at: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        };

        // Dans un environnement réel, les données mockées seraient persistantes
        mockArticles[index] = updatedArticle;

        const enrichedArticle = this.formatArticleDatesForDisplay(
          this.enrichArticleWithProductData(updatedArticle)
        );
        return { data: enrichedArticle, error: null };
      } else {
        // Retirer les propriétés qui ne sont pas dans la table Supabase
        const {
          articleUrl,
          relatedProductImage,
          relatedProductName,
          relatedProductPrice,
          ...cleanArticleData
        } = formattedArticleData;

        // Créer un nouvel objet pour les données à envoyer à Supabase
        const dataToSend = {
          ...cleanArticleData,
          updated_at: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        };

        console.log(
          'Données nettoyées avant conversion en snake_case:',
          dataToSend
        );

        // Convertir les données en snake_case pour Supabase
        const snakeCaseData = toSnakeCase(dataToSend);
        console.log(
          'Données converties en snake_case pour Supabase:',
          snakeCaseData
        );

        // S'assurer que l'ID est une chaîne pour compatibilité avec UUID Supabase
        const stringId = String(id);
        console.log('ID formaté pour Supabase:', stringId);

        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .update(snakeCaseData)
          .eq('id', stringId)
          .select()
          .single();

        if (error) {
          console.error('Erreur Supabase détaillée:', error);
          throw error;
        }

        console.log('Réponse Supabase après mise à jour:', data);

        // Convertir les données de snake_case vers camelCase
        const camelCaseData = toCamelCase(data);
        console.log('Données converties en camelCase:', camelCaseData);

        const enrichedArticle = this.formatArticleDatesForDisplay(
          this.enrichArticleWithProductData(camelCaseData)
        );
        console.log('Article enrichi retourné au frontend:', enrichedArticle);

        return { data: enrichedArticle, error: null };
      }
    } catch (error) {
      console.error('Erreur complète lors de la mise à jour:', error);
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
      console.log("Suppression de l'article avec ID:", id);

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
        // S'assurer que l'ID est une chaîne pour compatibilité avec UUID Supabase
        const stringId = String(id);
        console.log('ID formaté pour Supabase:', stringId);

        const { error } = await supabase
          .from(TABLES.ARTICLES)
          .delete()
          .eq('id', stringId);

        if (error) {
          console.error('Erreur Supabase détaillée:', error);
          throw error;
        }

        console.log('Article supprimé avec succès');
        return { success: true, error: null };
      }
    } catch (error) {
      console.error('Erreur complète lors de la suppression:', error);
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
        // Utilisation des données mockées pour le développement
        let featuredArticles = [...mockArticles]
          .filter((article) => article.featured)
          .slice(0, limit);

        // Enrichir les articles avec les données de produits associés et formater les dates
        const enrichedArticles = featuredArticles.map((article) =>
          this.formatArticleDatesForDisplay(
            this.enrichArticleWithProductData(article)
          )
        );

        return { data: enrichedArticles, error: null };
      } else {
        // Utilisation de Supabase pour la production
        const { data, error } = await supabase
          .from(TABLES.ARTICLES)
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;

        // Convertir les données de snake_case vers camelCase
        const camelCaseData = toCamelCase(data);

        // Enrichir les articles avec les données de produits associés et formater les dates
        const enrichedArticles = camelCaseData.map((article) =>
          this.formatArticleDatesForDisplay(
            this.enrichArticleWithProductData(article)
          )
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
        // Simuler le changement de statut d'un article
        const index = mockArticles.findIndex(
          (article) => article.id === Number(id)
        );

        if (index === -1) {
          throw new Error('Article non trouvé');
        }

        mockArticles[index].featured = featured;
        mockArticles[index].updated_at = moment().format(
          'YYYY-MM-DDTHH:mm:ssZ'
        );

        return { success: true, error: null };
      } else {
        // Convertir les données en snake_case pour Supabase
        const snakeCaseData = toSnakeCase({
          featured,
          updated_at: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        });

        const { error } = await supabase
          .from(TABLES.ARTICLES)
          .update(snakeCaseData)
          .eq('id', id);

        if (error) throw error;

        return { success: true, error: null };
      }
    } catch (error) {
      return {
        success: false,
        error: handleSupabaseError(
          error,
          `Erreur lors du changement de statut de l'article ${id}`
        ),
      };
    }
  }
}

// Exporter une instance unique du service
const articleService = new ArticleService();
export default articleService;
