import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FiImage, FiX, FiLink, FiPlus } from 'react-icons/fi';
import { products } from '../../../data/products';

// Éditeur de texte simplifié pour un non-développeur
const SimpleEditor = ({ value, onChange, placeholder }) => {
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [previewImage, setPreviewImage] = useState(false);
  const textareaRef = useRef(null);

  // Fonction pour insérer l'image dans le contenu
  const insertImage = () => {
    if (!imageUrl.trim()) {
      alert("Veuillez saisir une URL d'image valide");
      return;
    }

    // Créer la balise markdown pour l'image
    const imgMarkdown = `\n![${imageAlt || 'Image'}](${imageUrl})\n`;

    // Récupérer la position du curseur
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;

    // Insérer l'image à la position du curseur
    const newValue =
      value.substring(0, startPos) +
      imgMarkdown +
      value.substring(textarea.selectionEnd);
    onChange(newValue);

    // Réinitialiser les champs
    setImageUrl('');
    setImageAlt('');
    setShowImageInput(false);
    setPreviewImage(false);

    // Replacer le focus sur le textarea
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = startPos + imgMarkdown.length;
      textarea.selectionEnd = startPos + imgMarkdown.length;
    }, 0);
  };

  // Vérifier si l'URL est valide
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Prévisualiser l'image
  const handlePreviewImage = () => {
    if (imageUrl && isValidUrl(imageUrl)) {
      setPreviewImage(true);
    } else {
      alert("Veuillez saisir une URL d'image valide");
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-50 p-2 border-b border-gray-300 flex items-center">
        <button
          type="button"
          onClick={() => setShowImageInput(!showImageInput)}
          className="p-2 text-gray-700 hover:bg-gray-200 rounded-md flex items-center space-x-1"
          title="Insérer une image"
        >
          <FiImage />
          <span className="text-sm">Insérer une image</span>
        </button>
      </div>

      {showImageInput && (
        <div className="p-3 bg-gray-50 border-b border-gray-300">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de l'image
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemple.com/mon-image.jpg"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <button
                  type="button"
                  onClick={handlePreviewImage}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm"
                  disabled={!imageUrl}
                >
                  Prévisualiser
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texte alternatif (description)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Description de l'image"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            {previewImage && imageUrl && (
              <div className="mt-2 relative inline-block">
                <img
                  src={imageUrl}
                  alt={imageAlt || 'Aperçu'}
                  className="h-32 w-auto rounded border border-gray-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/200x150?text=Image+non+disponible';
                    alert("Impossible de charger l'image. Vérifiez l'URL.");
                  }}
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowImageInput(false);
                  setImageUrl('');
                  setImageAlt('');
                  setPreviewImage(false);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={insertImage}
                className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                disabled={!imageUrl}
              >
                Insérer l'image
              </button>
            </div>
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border-none focus:outline-none focus:ring-0 min-h-[200px]"
      />
    </div>
  );
};

SimpleEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

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
      const wordCount = formData.content.split(/\s+/).length;
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
          Contenu de l'article
        </label>
        <SimpleEditor
          value={formData.content || ''}
          onChange={(value) => setFormData({ ...formData, content: value })}
          placeholder="Rédigez le contenu de votre article ici..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Un éditeur plus avancé sera disponible prochainement. Pour l'instant,
          vous pouvez utiliser ce champ texte simple.
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
