import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import FilterPills from './FilterPills';

/**
 * Composant combinant une barre de recherche et des filtres
 */
const SearchAndFilterBar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Rechercher...',
  filterOptions,
  selectedFilter,
  onFilterChange,
  filterLabel = 'Filtrer par :',
  filterAllLabel = 'Tous',
  showFilterReset = true,
  filterResetLabel = 'Réinitialiser les filtres',
  onFilterReset,
  className = '',
  resultsCount,
  showResultsCount = true,
  resultsCountPrefix = '',
  resultsCountSuffix = ' résultat(s)',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-5 ${className}`}>
      <div className="flex flex-col gap-6">
        {/* Barre de recherche */}
        <SearchBar
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />

        {/* Filtres */}
        <FilterPills
          options={filterOptions}
          selectedOption={selectedFilter}
          onChange={onFilterChange}
          allLabel={filterAllLabel}
          label={filterLabel}
          showResetButton={showFilterReset}
          resetButtonLabel={filterResetLabel}
          onReset={onFilterReset}
        />

        {/* Compteur de résultats (optionnel) */}
        {showResultsCount && resultsCount !== undefined && (
          <div className="pt-2 border-t border-gray-100 text-gray-600 flex justify-between items-center">
            <div>
              {resultsCountPrefix}
              {resultsCount}
              {resultsCountSuffix}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SearchAndFilterBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterLabel: PropTypes.string,
  filterAllLabel: PropTypes.string,
  showFilterReset: PropTypes.bool,
  filterResetLabel: PropTypes.string,
  onFilterReset: PropTypes.func,
  className: PropTypes.string,
  resultsCount: PropTypes.number,
  showResultsCount: PropTypes.bool,
  resultsCountPrefix: PropTypes.string,
  resultsCountSuffix: PropTypes.string,
};

export default SearchAndFilterBar;
