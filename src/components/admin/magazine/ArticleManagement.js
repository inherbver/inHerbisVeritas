import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import ArticleList from './ArticleList';
import ArticleForm from './ArticleForm';
import articleService from '../../../services/api/articleService';

const ArticleManagement = () => {
  const [view, setView] = useState('list'); // 'list', 'edit', 'create'
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gestion du retour à la liste
  const handleBackToList = () => {
    setView('list');
    setCurrentArticle(null);
    setError(null);
  };

  // Gestion de la sauvegarde d'un article
  const handleSaveArticle = async (articleData) => {
    setLoading(true);
    setError(null);

    try {
      let result;

      if (currentArticle) {
        // Mise à jour d'un article existant
        result = await articleService.updateArticle(
          currentArticle.id,
          articleData
        );
      } else {
        // Création d'un nouvel article
        result = await articleService.createArticle(articleData);
      }

      if (result.error) {
        throw result.error;
      }

      // Afficher une notification de succès
      alert(
        `L'article "${articleData.title}" a été ${currentArticle ? 'mis à jour' : 'créé'} avec succès.`
      );

      handleBackToList();
    } catch (err) {
      setError(
        err.message ||
          "Une erreur est survenue lors de l'enregistrement de l'article."
      );
      console.error("Erreur lors de la sauvegarde de l'article:", err);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de l'édition d'un article
  const handleEditArticle = (article) => {
    setCurrentArticle(article);
    setView('edit');
    setError(null);
  };

  // Gestion de la création d'un nouvel article
  const handleCreateArticle = () => {
    setCurrentArticle(null);
    setView('create');
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec navigation */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {view === 'list'
              ? 'Gestion des Articles'
              : view === 'edit'
                ? 'Modifier un Article'
                : 'Créer un Article'}
          </h1>
          <p className="text-gray-600">
            {view === 'list'
              ? 'Gérez les articles du magazine en ligne'
              : view === 'edit'
                ? "Modifiez les informations et le contenu de l'article"
                : 'Créez un nouvel article pour le magazine'}
          </p>
        </div>

        {view !== 'list' && (
          <button
            onClick={handleBackToList}
            className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            disabled={loading}
          >
            <FiArrowLeft className="mr-2" /> Retour à la liste
          </button>
        )}
      </div>

      {/* Afficher les erreurs s'il y en a */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      {view === 'list' && (
        <ArticleList
          onEdit={handleEditArticle}
          onCreate={handleCreateArticle}
        />
      )}

      {(view === 'edit' || view === 'create') && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <ArticleForm
            article={currentArticle}
            onSave={handleSaveArticle}
            onCancel={handleBackToList}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleManagement;
