import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleCard = ({ imageUrl, title, category, excerpt, articleUrl }) => {
  return (
    <article className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-6 flex-1 flex flex-col">
        <span className="text-sm font-semibold text-emerald-700 mb-2">
          {category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link
          to={articleUrl}
          className="mt-auto text-emerald-700 font-medium hover:text-emerald-900 transition-colors"
          aria-label={`Lire l'article : ${title}`}
        >
          Lire la suite →
        </Link>
      </div>
    </article>
  );
};

ArticleCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
};

export default ArticleCard;
