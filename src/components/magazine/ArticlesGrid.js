import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import SearchAndFilterBar from './Ui/SearchAndFilterBar';

const ArticlesGrid = ({ articles = [], featuredArticles = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Créer un ensemble d'articles sans doublons
  // D'abord extraire les IDs des articles mis en avant
  const featuredIds = new Set(featuredArticles.map((article) => article.id));

  // Créer un tableau d'articles réguliers sans les articles mis en avant
  const regularArticles = articles.filter(
    (article) => !featuredIds.has(article.id)
  );

  // Extraire toutes les catégories disponibles (sans doublons grâce au Set)
  const categories = [
    'Tous',
    ...new Set(
      [...featuredArticles, ...regularArticles].map(
        (article) => article.category
      )
    ),
  ];

  // Filtrer les articles mis en avant selon les critères
  const filteredFeaturedArticles = featuredArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtrer les articles réguliers selon les critères
  const filteredRegularArticles = regularArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Total des articles filtrés pour l'affichage du compteur
  const totalFilteredCount =
    filteredFeaturedArticles.length + filteredRegularArticles.length;

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
        resultsCount={totalFilteredCount}
        resultsCountSuffix={
          totalFilteredCount > 1 ? ' articles trouvés' : ' article trouvé'
        }
      />

      {totalFilteredCount > 0 ? (
        <>
          {/* Articles mis en avant - section spéciale */}
          {filteredFeaturedArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-3">
                Articles à la une
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredFeaturedArticles.map((article) => (
                  <ArticleCard
                    key={`featured-${article.id}`}
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
                  />
                ))}
              </div>
            </div>
          )}

          {/* Articles réguliers */}
          {filteredRegularArticles.length > 0 && (
            <div>
              {filteredFeaturedArticles.length > 0 && (
                <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-3">
                  Tous nos articles
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredRegularArticles.map((article) => (
                  <ArticleCard
                    key={`regular-${article.id}`}
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
