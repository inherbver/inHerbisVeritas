import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import SearchAndFilterBar from '../Ui/SearchAndFilterBar';

const ArticlesGrid = ({ articles = [], featuredArticles = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Extraire toutes les catégories disponibles
  const allArticles = [...featuredArticles, ...articles];
  const categories = [
    'Tous',
    ...new Set(allArticles.map((article) => article.category)),
  ];

  // Filtrer les articles en fonction des critères de recherche et de filtre
  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Séparer les articles mis en avant des articles réguliers pour l'affichage
  const regularFilteredArticles = filteredArticles.filter(
    (article) =>
      !featuredArticles.some((featured) => featured.id === article.id)
  );
  const featuredFilteredArticles = filteredArticles.filter((article) =>
    featuredArticles.some((featured) => featured.id === article.id)
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Section de recherche et filtres */}
      <SearchAndFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un article..."
        filterOptions={categories}
        selectedFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterLabel="Filtrer par thématique :"
        className="mb-8"
        resultsCount={filteredArticles.length}
        resultsCountSuffix={
          filteredArticles.length > 1 ? ' articles trouvés' : ' article trouvé'
        }
      />

      {filteredArticles.length > 0 ? (
        <>
          {/* Articles mis en avant - section spéciale */}
          {featuredFilteredArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-3">
                Articles à la une
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredFilteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    imageUrl={article.imageUrl}
                    category={article.category}
                    articleUrl={`/magazine/${article.id}`}
                    date={article.date}
                    readTime={article.readTime}
                    relatedProductId={article.relatedProductId}
                    relatedProductImage={article.relatedProductImage}
                    relatedProductName={article.relatedProductName}
                    relatedProductPrice={article.relatedProductPrice}
                    featured={true}
                    showRelatedProduct={false} // Ne pas afficher le produit associé dans la grille
                  />
                ))}
              </div>
            </div>
          )}

          {/* Articles réguliers */}
          {regularFilteredArticles.length > 0 && (
            <div>
              {featuredFilteredArticles.length > 0 && (
                <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-3">
                  Tous nos articles
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularFilteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    imageUrl={article.imageUrl}
                    category={article.category}
                    articleUrl={`/magazine/${article.id}`}
                    date={article.date}
                    readTime={article.readTime}
                    relatedProductId={article.relatedProductId}
                    relatedProductImage={article.relatedProductImage}
                    relatedProductName={article.relatedProductName}
                    relatedProductPrice={article.relatedProductPrice}
                    showRelatedProduct={false} // Ne pas afficher le produit associé dans la grille
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-2">
            Aucun article ne correspond à votre recherche
          </p>
          <p>Essayez avec des termes différents ou réinitialisez les filtres</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Tous');
            }}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Réinitialiser tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

ArticlesGrid.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
      imageUrl: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      readTime: PropTypes.string,
      relatedProductId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      relatedProductImage: PropTypes.string,
      relatedProductName: PropTypes.string,
      relatedProductPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ).isRequired,
  featuredArticles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
      imageUrl: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      readTime: PropTypes.string,
      relatedProductId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      relatedProductImage: PropTypes.string,
      relatedProductName: PropTypes.string,
      relatedProductPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ),
};

export default ArticlesGrid;
