import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import SearchAndFilterBar from '../Ui/SearchAndFilterBar';
import Grid from '../common/Grid';

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

  // Fonction de filtrage commune pour éviter la duplication
  const filterArticle = (article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  };

  // Filtrer les articles mis en avant selon les critères
  const filteredFeaturedArticles = featuredArticles.filter(filterArticle);

  // Filtrer les articles réguliers selon les critères
  const filteredRegularArticles = regularArticles.filter(filterArticle);

  // Total des articles filtrés pour l'affichage du compteur
  const totalFilteredCount =
    filteredFeaturedArticles.length + filteredRegularArticles.length;

  // Fonction pour rendre un ArticleCard (évite la duplication)
  const renderArticleCard = (article, isFeatured = false) => (
    <ArticleCard
      key={`${isFeatured ? 'featured' : 'regular'}-${article.id}`}
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
      featured={isFeatured}
    />
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
              <Grid 
                cols={{ 
                  default: 1, 
                  md: 2 
                }} 
                gap={8} 
                as="section"
                className="featured-articles-grid"
              >
                {filteredFeaturedArticles.map((article) => renderArticleCard(article, true))}
              </Grid>
            </div>
          )}

          {/* Articles réguliers */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-3">
              Tous les articles
            </h2>
            <Grid 
              cols={{ 
                default: 1, 
                md: 2, 
                lg: 3 
              }} 
              gap={6} 
              as="section"
            >
              {filteredRegularArticles.map((article) => renderArticleCard(article, false))}
            </Grid>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Aucun résultat</h2>
          <p className="text-gray-600">
            Aucun article ne correspond à votre recherche. Essayez d'autres termes ou filtres.
          </p>
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
      excerpt: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string,
      readTime: PropTypes.string,
    })
  ),
  featuredArticles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string,
      readTime: PropTypes.string,
    })
  ),
};

export default ArticlesGrid;
