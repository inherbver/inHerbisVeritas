import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MagazineAdmin = ({ magazines }) => {
  const [currentMagazines, setCurrentMagazines] = useState(magazines || []);

  return (
    <div className="magazine-admin">
      <h2 className="text-xl font-semibold mb-4">Gestion des magazines</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMagazines.map((magazine) => (
              <tr key={magazine.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {magazine.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(magazine.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Éditer
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

MagazineAdmin.propTypes = {
  magazines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
};

export default MagazineAdmin;
