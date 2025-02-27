import React, { useState } from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const ProductGrid = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Extraire toutes les catégories disponibles
  const categories = ['Tous', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tous' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Section de recherche et filtres */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
        <div className="flex flex-col gap-4">
          {/* Barre de recherche */}
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          {/* Filtres sous forme de pills */}
          <div className="w-full">
            <p className="text-sm text-gray-500 mb-2">Filtrer par catégorie :</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category 
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="mb-4 text-gray-600 flex justify-between items-center">
        <div>
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
        </div>
        <div className="text-sm text-gray-500">
          {selectedCategory !== 'Tous' && (
            <button 
              onClick={() => setSelectedCategory('Tous')}
              className="text-green-600 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {/* Grille de produits améliorée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm my-8">
          <p className="text-gray-500 text-lg">Aucun produit ne correspond à votre recherche</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Tous');
            }}
            className="mt-4 text-green-600 hover:underline"
          >
            Réinitialiser la recherche
          </button>
        </div>
      )}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductGrid;
