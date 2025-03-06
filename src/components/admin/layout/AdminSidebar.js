import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiBox,
  FiTag,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // La redirection est gérée par le ProtectedRoute
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const navItems = [
    { icon: <FiHome size={20} />, label: 'Tableau de bord', path: '/admin' },
    { icon: <FiBox size={20} />, label: 'Produits', path: '/admin/products' },
    {
      icon: <FiTag size={20} />,
      label: 'Promotions',
      path: '/admin/promotions',
    },
    {
      icon: <FiShoppingCart size={20} />,
      label: 'Commandes',
      path: '/admin/orders',
    },
    { icon: <FiUsers size={20} />, label: 'Clients', path: '/admin/customers' },
    {
      icon: <FiMessageSquare size={20} />,
      label: 'Avis',
      path: '/admin/reviews',
    },
    {
      icon: <FiSettings size={20} />,
      label: 'Paramètres',
      path: '/admin/settings',
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="bg-gray-800 text-white h-screen w-64 fixed top-0 left-0 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-orange-500 font-bold text-xl">InHerbis</span>
          <span className="font-light">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
              isActive(item.path)
                ? 'bg-orange-500 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 text-sm rounded-md text-gray-300 hover:bg-gray-700 w-full"
        >
          <FiLogOut size={20} className="mr-3" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

// Even though the component doesn't currently use props, we're adding PropTypes
// for future-proofing and consistency with other components
AdminSidebar.propTypes = {};

export default AdminSidebar;
