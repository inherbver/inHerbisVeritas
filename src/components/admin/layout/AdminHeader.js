import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';

const AdminHeader = ({ toggleSidebar }) => {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Notifications factices pour la démo
  const notifications = [
    {
      id: 1,
      message: 'Nouvelle commande reçue',
      time: '10 minutes',
      read: false,
    },
    {
      id: 2,
      message: 'Produit à court de stock: Huile essentielle de Lavande',
      time: '1 heure',
      read: false,
    },
    {
      id: 3,
      message: 'Nouvel avis client: 5 étoiles',
      time: '3 heures',
      read: true,
    },
  ];

  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-4 z-10">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 hover:text-gray-900 lg:hidden mr-4"
      >
        <FiMenu size={24} />
      </button>

      <div className="flex-grow"></div>

      {/* Notifications */}
      <div className="relative mr-4">
        <button
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FiBell size={20} />
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-b border-gray-200">
              Notifications
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Aucune notification
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                      notification.read ? 'opacity-75' : 'font-semibold'
                    }`}
                  >
                    <div className="text-sm text-gray-800">
                      {notification.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Il y a {notification.time}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-2 text-xs text-center text-blue-600 hover:text-blue-800 border-t border-gray-200">
              <button>Marquer toutes comme lues</button>
            </div>
          </div>
        )}
      </div>

      {/* Profil utilisateur */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <FiUser size={20} className="text-gray-600" />
            )}
          </div>
          <span className="text-sm font-medium hidden sm:block">
            {currentUser?.email || 'Admin'}
          </span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
            <div className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">
              <div className="font-medium truncate">
                {currentUser?.email || 'admin@inherbis.com'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Administrateur</div>
            </div>
            <div className="py-1">
              <a
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Mon profil
              </a>
              <a
                href="/admin/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Paramètres
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

AdminHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default AdminHeader;
