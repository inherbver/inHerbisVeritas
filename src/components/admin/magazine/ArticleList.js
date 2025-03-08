import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiSearch,
  FiStar,
  FiFilter,
} from 'react-icons/fi';
import articleService from '../../../services/api/articleService';

const ArticleList = ({ onEdit, onCreate }) => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['Tous']);

  // Chargement des articles à l'initialisation du composant
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fonction pour charger les articles depuis le service
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      // Utilisation du service pour récupérer les articles
      const result = await articleService.getArticles({
        search: searchTerm,
        category: filterCategory !== 'Tous' ? filterCategory : undefined,
      });

      if (result.error) {
        throw result.error;
      }

      setArticles(result.data);

      // Extraire les catégories uniques des articles
      const uniqueCategories = [
        'Tous',
        ...new Set(result.data.map((article) => article.category)),
      ];
      setCategories(uniqueCategories);

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des articles');
      console.error('Erreur lors du chargement des articles:', err);
      setLoading(false);
    }
  };

  // Effet pour refiltrer les articles quand les critères changent
  useEffect(() => {
    // Utilisation d'un délai pour éviter trop d'appels API pendant la frappe
    const debounceTimer = setTimeout(() => {
      fetchArticles();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filterCategory]);

  // Fonction pour marquer un article comme mis en avant
  const toggleFeatured = async (article) => {
    try {
      // Inversion de l'état actuel
      const newFeaturedState = !article.featured;

      // Appel au service pour mettre à jour l'état "featured"
      const result = await articleService.toggleFeatured(
        article.id,
        newFeaturedState
      );

      if (result.error) {
        throw result.error;
      }

      // Mise à jour de l'état local pour refléter le changement
      setArticles((prevArticles) =>
        prevArticles.map((a) =>
          a.id === article.id ? { ...a, featured: newFeaturedState } : a
        )
      );
    } catch (err) {
      alert(`Erreur lors de la mise à jour: ${err.message}`);
      console.error(
        'Erreur lors de la modification du statut mis en avant:',
        err
      );
    }
  };

  // Fonction pour supprimer un article
  const handleDelete = async (articleId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        // Appel au service pour supprimer l'article
        const result = await articleService.deleteArticle(articleId);

        if (result.error) {
          throw result.error;
        }

        // Si la suppression réussit, mettre à jour l'état local
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== articleId)
        );
      } catch (err) {
        alert(`Erreur lors de la suppression: ${err.message}`);
        console.error("Erreur lors de la suppression de l'article:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div>
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchArticles}
              className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">
          Gestion des Articles
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={onCreate}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FiPlus className="mr-2" /> Nouvel article
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="md:w-64">
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mis en avant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {article.excerpt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(article)}
                      className={`text-xl ${
                        article.featured
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                      title={
                        article.featured
                          ? 'Retirer des articles mis en avant'
                          : 'Ajouter aux articles mis en avant'
                      }
                    >
                      <FiStar
                        className={article.featured ? 'fill-current' : ''}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(article)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Modifier"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <FiTrash2 />
                      </button>
                      <a
                        href={`/magazine/${article.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir"
                      >
                        <FiEye />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">
            Aucun article ne correspond à votre recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('Tous');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

ArticleList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default ArticleList;
