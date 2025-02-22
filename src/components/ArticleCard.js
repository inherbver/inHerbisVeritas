import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleCard = ({ imageUrl, title, category, excerpt, articleUrl }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <header>
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </header>
      <section className="p-4 flex flex-col flex-grow items-center text-center h-full">
        <span className="text-sm font-semibold text-green-600 mb-2">
          {category}
        </span>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <footer className="w-full mt-auto flex-shrink-0">
          <Link
            to={articleUrl}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex justify-center items-center w-full"
            aria-label={`Lire l'article : ${title}`}
          >
            Lire la suite
          </Link>
        </footer>
      </section>
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
