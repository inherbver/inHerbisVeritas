import React from 'react';
import PropTypes from 'prop-types';

const TabNav = ({ tabs, activeTab, onTabChange }) => (
  <div className="mb-4 border-b border-gray-200">
    <ul className="flex flex-wrap -mb-px">
      {tabs.map((tab) => (
        <li key={tab.id} className="mr-2">
          <button
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === tab.id
                ? 'text-[#FE5000] border-[#FE5000]'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

TabNav.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TabNav;
