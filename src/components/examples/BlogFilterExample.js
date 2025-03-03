import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../Ui/SearchBar';
import FilterPills from '../Ui/FilterPills';

/**
 * Exemple d'utilisation des composants de recherche et de filtres pour un blog
 */
const BlogFilterExample = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Extraire les catégories uniques
  const categories = [...new Set(articles.map((article) => article.category))];

  // Filtrer les articles en fonction de la recherche et de la catégorie
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'Tous' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Exemple de filtrage pour le blog</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Rechercher des articles</h3>
        
        {/* Utilisation indépendante de SearchBar */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Rechercher par titre ou contenu
          </label>
          <SearchBar
            placeholder="Saisissez des mots-clés..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        
        {/* Utilisation indépendante de FilterPills */}
        <div>
          <FilterPills
            options={categories}
            selectedOption={selectedCategory}
            onChange={setSelectedCategory}
            label="Filtrer par thématique :"
            allLabel="Tous les thèmes"
          />
        </div>
      </div>
      
      {/* Affichage des résultats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
        </h3>
        
        {filteredArticles.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <li key={article.id} className="py-4">
                <h4 className="font-medium text-lg">{article.title}</h4>
                <p className="text-sm text-green-600 mb-1">{article.category}</p>
                <p className="text-gray-600">{article.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun article ne correspond à votre recherche</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tous');
              }}
              className="mt-4 text-green-600 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

BlogFilterExample.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BlogFilterExample;
