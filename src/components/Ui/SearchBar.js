import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant de barre de recherche réutilisable
 */
const SearchBar = ({
  placeholder = 'Rechercher un produit...',
  onSearch,
  className = '',
  value,
  onChange,
  inputClassName = '',
  iconClassName = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 pl-4 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${inputClassName}`}
      />
      <svg
        className={`w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default SearchBar;
