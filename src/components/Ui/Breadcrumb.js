import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant fil d'Ariane
 * @param {array} items - Tableau d'objets {label, url, active}
 */
const Breadcrumb = ({ items }) => (
  <nav className="text-sm text-gray-500 mb-6" aria-label="Fil d'Ariane">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span> &gt; </span>}
        {item.active ? (
          <span className="text-green-600">{item.label}</span>
        ) : (
          <span 
            className="hover:text-green-600 cursor-pointer" 
            onClick={() => { if (item.url) window.location.href = item.url; }}
          >
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

export default Breadcrumb;
