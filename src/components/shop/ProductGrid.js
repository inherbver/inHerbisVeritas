import React, { useState } from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import SearchAndFilterBar from '../Ui/SearchAndFilterBar';

const ProductGrid = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Extraire toutes les catégories disponibles
  const categories = [
    'Tous',
    ...new Set(products.map((product) => product.category)),
  ];

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
      <SearchAndFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un produit..."
        filterOptions={categories}
        selectedFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterLabel="Filtrer par catégorie :"
        className="mb-8"
        resultsCount={filteredProducts.length}
        resultsCountSuffix={
          filteredProducts.length > 1 ? ' produits trouvés' : ' produit trouvé'
        }
      />

      {/* Grille de produits améliorée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Message si aucun produit n'est trouvé */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-2">
            Aucun produit ne correspond à votre recherche
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

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductGrid;
