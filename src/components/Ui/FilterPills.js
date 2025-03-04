import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant de filtres sous forme de pills réutilisable
 */
const FilterPills = ({
  options,
  selectedOption,
  onChange,
  allLabel = 'Tous',
  className = '',
  pillClassName = '',
  activePillClassName = '',
  inactivePillClassName = '',
  label = 'Filtrer par :',
  showResetButton = true,
  resetButtonLabel = 'Réinitialiser les filtres',
  onReset,
}) => {
  // Déterminer si nous avons une option "Tous" et si elle est déjà présente
  const hasAllOption = options.includes(allLabel);
  const displayOptions = hasAllOption ? options : [allLabel, ...options];

  // Handler pour réinitialiser les filtres
  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      onChange(allLabel);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <p className="text-sm text-gray-500 mb-2">{label}</p>}

      <div className="flex flex-wrap gap-2">
        {displayOptions.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedOption === option
                ? `bg-green-600 text-white ${activePillClassName}`
                : `bg-gray-100 text-gray-700 hover:bg-gray-200 ${inactivePillClassName}`
            } ${pillClassName}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResetButton && selectedOption !== allLabel && (
        <div className="mt-3 text-right">
          <button
            onClick={handleReset}
            className="text-sm text-green-600 hover:underline"
          >
            {resetButtonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

FilterPills.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  allLabel: PropTypes.string,
  className: PropTypes.string,
  pillClassName: PropTypes.string,
  activePillClassName: PropTypes.string,
  inactivePillClassName: PropTypes.string,
  label: PropTypes.string,
  showResetButton: PropTypes.bool,
  resetButtonLabel: PropTypes.string,
  onReset: PropTypes.func,
};

export default FilterPills;
