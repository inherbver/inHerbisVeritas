import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Card, CardImage, CardContent, CardMeta, CardFooter } from '../common/Card';
import Badge from '../Ui/Badge';

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
  showRelatedProduct = false, // Prop pour contrôler l'affichage du produit associé
}) => {
  // Vérifions et consignons le chemin de l'image pour diagnostic
  console.log('ArticleCard imageUrl:', imageUrl);
  
  return (
    <Card 
      as="article"
      className={`group ${featured ? 'md:col-span-2' : ''}`}
      to={articleUrl}
      color="green"
      elevateOnHover
      fullHeight
      roundedSize="xl"
      shadow="sm"
    >
      <CardImage 
        src={imageUrl}
        alt={title}
        height="h-64"
        overlay={true}
        badge={
          <Badge variant="primary">{category}</Badge>
        }
        onError={(e) => {
          console.warn(`Article image failed to load: ${imageUrl}`);
        }}
      >
        {/* Titre sur l'image avec un gradient */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pb-6">
          <h3 className="text-white font-serif font-bold text-xl line-clamp-2 group-hover:text-green-300 transition-colors">
            {title}
          </h3>
        </div>
      </CardImage>
      
      <CardContent>
        {/* Métadonnées de l'article */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <CardMeta 
            icon={<FaCalendarAlt />}
            text={date}
            iconClassName="text-green-600"
          />
          <CardMeta 
            icon={<FaClock />}
            text={`${readTime} de lecture`}
            iconClassName="text-green-600"
          />
        </div>

        {/* Extrait de l'article */}
        <p className="text-gray-600 line-clamp-3 text-sm mb-4">{excerpt}</p>

        {/* CTA pour lire l'article */}
        <CardFooter className="flex justify-between items-center">
          <span className="font-medium text-green-600 group-hover:text-green-700 transition-colors">
            Lire la suite
          </span>
          <span className="text-sm text-gray-400 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </CardFooter>
      </CardContent>

      {/* Produit en relation - Affiché uniquement si showRelatedProduct est true */}
      {showRelatedProduct && relatedProductId && (
        <CardFooter 
          bordered 
          background="bg-gray-50"
          padding="px-5 pb-5 pt-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
              <img
                src={relatedProductImage}
                alt={relatedProductName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/placeholder.jpg';
                }}
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
                // Action d'ajout au panier (à implémenter)
                console.log(`Ajout du produit ${relatedProductId} au panier`);
              }}
              className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-full text-sm transition-colors"
            >
              Ajouter
            </button>
          </div>
        </CardFooter>
      )}
    </Card>
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
  relatedProductPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  featured: PropTypes.bool,
  showRelatedProduct: PropTypes.bool
};

export default ArticleCard;
