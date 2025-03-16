import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Card, CardImage, CardContent, CardFooter } from '../common/Card';
import AddToCartButton from '../Ui/AddToCartButton';

const ProductCard = ({ product }) => {
  return (
    <Card 
      as="article"
      to={`/produits/${product.slug}`}
      color="green"
      elevateOnHover
    >
      {/* Image avec note du produit */}
      <CardImage 
        src={product.imageUrl}
        alt={product.title}
        height="h-64"
        rating={
          <>
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </>
        }
      />
      
      {/* Contenu principal du produit */}
      <CardContent>
        {/* Catégorie, titre et volume */}
        <span className="text-xs text-green-600 font-medium uppercase tracking-wider">
          {product.category}
        </span>
        
        <h3 className="text-xl font-bold mt-1 mb-1 font-serif group-hover:text-green-600 transition-colors h-14 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="text-sm text-gray-500 font-light mb-3">
          {product.volume}
        </div>
        
        {/* Description courte */}
        <p className="text-gray-600 font-light h-16 line-clamp-3 text-sm">
          {product.description}
        </p>
      </CardContent>
      
      {/* Prix et bouton d'achat */}
      <CardFooter bordered>
        <p className="text-xl font-bold text-green-600 mb-3">
          {product.price}€
        </p>
        <AddToCartButton 
          text="Acheter" 
          className="py-2.5 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            // Ajouter au panier
            console.log(`Ajout du produit ${product.title} au panier`);
          }}
        />
      </CardFooter>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    volume: PropTypes.string,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
