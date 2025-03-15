import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiImage, FiX, FiLink } from 'react-icons/fi';
import { products } from '../../../data/products';

const ArticleForm = ({ article, onSave, onCancel, loading = false }) => {
  // Initialisation avec un article vide ou l'article à éditer
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    imageUrl: '',
    content: '',
    featured: false, // Renommé de isFeatured à featured pour correspondre au modèle de données du service
    readTime: '5 min',
    relatedProductId: '',
    date: new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  });

  // Liste des catégories disponibles
  const categories = [
    'Plantes médicinales',
    'Cuisine',
    'Huiles essentielles',
    'Cosmétiques naturels',
    'Jardinage',
    'Remèdes naturels',
    'Bien-être',
    'Aromathérapie',
  ];

  // Mise à jour du formulaire quand l'article change
  useEffect(() => {
    if (article) {
      // Assurer la compatibilité entre isFeatured et featured
      const updatedArticle = {
        ...article,
        featured: article.featured || article.isFeatured,
      };
      setFormData(updatedArticle);
    }
  }, [article]);

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Gestion du contenu du textarea
  const handleContentChange = (e) => {
    setFormData({
      ...formData,
      content: e.target.value,
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation basique
    if (!formData.title || !formData.category || !formData.excerpt) {
      alert(
        'Veuillez remplir tous les champs obligatoires (titre, catégorie, extrait).'
      );
      return;
    }

    // Créer un slug à partir du titre
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');

    // Appel de la fonction de sauvegarde
    onSave({
      ...formData,
      slug,
      articleUrl: `/magazine/${slug}`,
    });
  };

  // Estimation du temps de lecture basée sur la longueur du contenu
  useEffect(() => {
    if (formData.content) {
      let wordCount = 0;

      if (typeof formData.content === 'object') {
        // Fonction récursive pour extraire le texte du contenu JSON
        const extractText = (node) => {
          if (!node) return '';

          if (typeof node === 'string') return node;

          if (Array.isArray(node)) {
            return node.map(extractText).join(' ');
          }

          if (node.content) {
            return extractText(node.content);
          }

          if (node.text) {
            return node.text;
          }

          return '';
        };

        const textContent = extractText(formData.content);
        wordCount = textContent.split(/\s+/).length;
      } else if (typeof formData.content === 'string') {
        wordCount = formData.content.split(/\s+/).length;
      }

      const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));
      setFormData({
        ...formData,
        readTime: `${readTimeMin} min`,
      });
    }
  }, [formData.content]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titre de l'article */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre de l'article <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Titre de votre article"
          required
          disabled={loading}
        />
      </div>

      {/* Catégorie et mise en avant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            disabled={loading}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured || false}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            disabled={loading}
          />
          <label
            htmlFor="featured"
            className="ml-2 block text-sm text-gray-700"
          >
            Mettre cet article à la une
          </label>
          <div className="ml-1 text-xs text-gray-500">
            (visible en premier sur la page Magazine)
          </div>
        </div>
      </div>

      {/* Image de l'article */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image de couverture
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl || ''}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="/assets/images/votre-image.jpg"
            disabled={loading}
          />
          <button
            type="button"
            className="p-3 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            title="Parcourir les médias (fonctionnalité à venir)"
            onClick={() =>
              alert(
                'Cette fonctionnalité sera disponible dans une prochaine mise à jour.'
              )
            }
            disabled={loading}
          >
            <FiImage />
          </button>
        </div>

        {formData.imageUrl && (
          <div className="mt-2 relative inline-block">
            <img
              src={formData.imageUrl}
              alt="Aperçu"
              className="h-24 w-auto rounded border border-gray-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://via.placeholder.com/200x150?text=Image+non+disponible';
              }}
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 hover:bg-red-200"
              onClick={() => setFormData({ ...formData, imageUrl: '' })}
              disabled={loading}
            >
              <FiX size={16} />
            </button>
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Indiquez l'URL de l'image ou utilisez le sélecteur de médias.
        </p>
      </div>

      {/* Extrait de l'article */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Extrait / Résumé <span className="text-red-500">*</span>
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Un bref résumé de votre article qui apparaîtra dans les listes et résultats de recherche"
          rows={3}
          required
          disabled={loading}
        />
      </div>

      {/* Contenu de l'article */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contenu de l&apos;article <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          value={typeof formData.content === 'string' ? formData.content : JSON.stringify(formData.content)}
          onChange={handleContentChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Rédigez le contenu de votre article ici..."
          rows={15}
          required
          disabled={loading}
        />
        <p className="mt-1 text-sm text-gray-500">
          Temps de lecture estimé : {formData.readTime}
        </p>
      </div>

      {/* Produit associé */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Produit associé
        </label>
        <div className="flex items-center space-x-3">
          <select
            name="relatedProductId"
            value={formData.relatedProductId || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            <option value="">Aucun produit associé</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="p-3 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            title="Voir le produit"
            onClick={() => {
              if (formData.relatedProductId) {
                window.open(`/produits/${formData.relatedProductId}`, '_blank');
              }
            }}
            disabled={!formData.relatedProductId || loading}
          >
            <FiLink />
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Associez un produit de la boutique à cet article.
        </p>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {article ? 'Mise à jour en cours...' : 'Création en cours...'}
            </>
          ) : article ? (
            "Mettre à jour l'article"
          ) : (
            "Créer l'article"
          )}
        </button>
      </div>
    </form>
  );
};

ArticleForm.propTypes = {
  article: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ArticleForm;
