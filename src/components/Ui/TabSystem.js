import React from 'react';
import PropTypes from 'prop-types';

/**
 * Système d'onglets réutilisable
 * @param {string} activeTab - Onglet actif
 * @param {function} onChange - Fonction appelée lors du changement d'onglet
 * @param {array} tabs - Tableau d'objets {id, label, content}
 */
const TabSystem = ({ activeTab, onChange, tabs }) => {
  return (
    <section className="mt-16">
      <nav className="border-b border-gray-200 mb-8">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Contenu de l'onglet actif */}
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </section>
  );
};

TabSystem.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default TabSystem;
