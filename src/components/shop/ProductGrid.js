import React from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import FilterableGrid from '../common/FilterableGrid';

const ProductGrid = ({ products }) => {
  return (
    <FilterableGrid
      items={products}
      renderItem={(product) => (
        <ProductCard key={product.id} product={product} />
      )}
      searchFields={['title', 'description']}
      categoryField="category"
      cols={{ default: 1, md: 2, lg: 3 }}
      gap={6}
      searchPlaceholder="Rechercher un produit..."
      filterLabel="Filtrer par catégorie :"
      noResultsMessage="Aucun produit ne correspond à votre recherche"
      itemSuffix=" produits trouvés"
      singleItemSuffix=" produit trouvé"
      as="section"
    />
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductGrid;
