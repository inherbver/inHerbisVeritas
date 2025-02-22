import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';

const ArticlesGrid = ({ articles = [] }) => {
  if (!articles.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        Aucun article disponible pour le moment
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          excerpt={article.excerpt}
          imageUrl={article.imageUrl}
          category={article.category}
        />
      ))}
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
    })
  ).isRequired,
};

export default ArticlesGrid;
