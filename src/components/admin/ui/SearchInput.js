import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder={placeholder || 'Rechercher...'}
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
