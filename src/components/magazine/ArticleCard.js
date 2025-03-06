import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const ArticleCard = ({
  imageUrl,
  title,
  category,
  excerpt,
  articleUrl,
  date = '28 février 2025',
  readTime = '5 min',
  relatedProductId = null,
  relatedProductImage = null,
  relatedProductName = null,
  relatedProductPrice = null,
  featured = false,
}) => {
  return (
    <article
      className={`group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <Link to={articleUrl} className="block relative flex flex-col h-full">
        {/* Image container avec hauteur fixe */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pb-6">
            <h3 className="text-white font-serif font-bold text-xl line-clamp-2 group-hover:text-green-300 transition-colors">
              {title}
            </h3>
          </div>
        </div>

        {/* Contenu avec structure flex pour garantir l'alignement */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Métadonnées de l'article */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-green-600" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-green-600" />
              <span>{readTime} de lecture</span>
            </div>
          </div>

          {/* Extrait de l'article */}
          <p className="text-gray-600 line-clamp-3 text-sm mb-4">{excerpt}</p>

          {/* CTA pour lire l'article */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="font-medium text-green-600 group-hover:text-green-700 transition-colors">
              Lire la suite
            </span>
            <span className="text-sm text-gray-400 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </Link>

      {/* 
        Produit en relation (optionnel) - FONCTIONNALITÉ CONSERVÉE MAIS CACHÉE TEMPORAIREMENT
        Cette section affiche un produit associé à l'article avec un bouton d'achat
        À réactiver lorsque la fonctionnalité sera prête pour la production
      */}
      {/* 
      {relatedProductId && (
        <div className="mt-auto px-5 pb-5 pt-2 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
              <img
                src={relatedProductImage}
                alt={relatedProductName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">
                {relatedProductName}
              </h4>
              <p className="text-green-600 font-bold">{relatedProductPrice}€</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Logique d'ajout au panier
                console.log(`Ajout du produit ${relatedProductId} au panier`);
              }}
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-3 rounded-full transition-all duration-300 transform active:scale-95"
            >
              Acheter
            </button>
          </div>
        </div>
      )}
      */}
    </article>
  );
};

ArticleCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  date: PropTypes.string,
  readTime: PropTypes.string,
  relatedProductId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  relatedProductImage: PropTypes.string,
  relatedProductName: PropTypes.string,
  relatedProductPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  featured: PropTypes.bool,
};

export default ArticleCard;
