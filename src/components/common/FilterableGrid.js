import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import SearchAndFilterBar from '../Ui/SearchAndFilterBar';

/**
 * Composant réutilisable pour afficher une grille avec fonctionnalités de recherche et filtrage
 * Évite la duplication de code entre ProductGrid et ArticlesGrid
 */
const FilterableGrid = ({
  items = [],
  renderItem,
  searchFields = ['title', 'description'],
  categoryField = 'category',
  cols = { default: 1, md: 2, lg: 3 },
  gap = 6,
  searchPlaceholder = "Rechercher...",
  filterLabel = "Filtrer par :",
  noResultsMessage = "Aucun résultat ne correspond à votre recherche",
  itemSuffix = "éléments trouvés",
  singleItemSuffix = "élément trouvé",
  className = "",
  gridClassName = "",
  as = "section", // Balise sémantique par défaut
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Extraire toutes les catégories
  const categories = [
    'Tous',
    ...new Set(items.map(item => item[categoryField]).filter(Boolean))
  ];

  // Filtrer les éléments
  const filteredItems = items.filter(item => {
    // Recherche dans les champs spécifiés
    const matchesSearch = searchFields.some(field => 
      item[field] && item[field].toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filtre par catégorie
    const matchesCategory = 
      selectedCategory === 'Tous' || 
      item[categoryField] === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tous');
  };

  return (
    <div className={`container mx-auto px-4 py-8 max-w-7xl ${className}`}>
      {/* Barre de recherche et filtres */}
      <SearchAndFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={searchPlaceholder}
        filterOptions={categories}
        selectedFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterLabel={filterLabel}
        className="mb-8"
        resultsCount={filteredItems.length}
        resultsCountSuffix={
          filteredItems.length > 1 ? itemSuffix : singleItemSuffix
        }
      />

      {filteredItems.length > 0 ? (
        <Grid cols={cols} gap={gap} className={gridClassName} as={as}>
          {filteredItems.map(renderItem)}
        </Grid>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-2">{noResultsMessage}</p>
          <p>Essayez avec des termes différents ou réinitialisez les filtres</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Réinitialiser tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

FilterableGrid.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  searchFields: PropTypes.arrayOf(PropTypes.string),
  categoryField: PropTypes.string,
  cols: PropTypes.shape({
    default: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number
  }),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchPlaceholder: PropTypes.string,
  filterLabel: PropTypes.string,
  noResultsMessage: PropTypes.string,
  itemSuffix: PropTypes.string,
  singleItemSuffix: PropTypes.string,
  className: PropTypes.string,
  gridClassName: PropTypes.string,
  as: PropTypes.elementType
};

export default FilterableGrid;
