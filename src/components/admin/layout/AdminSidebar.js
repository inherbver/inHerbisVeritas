import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import {
  FiBox,
  FiTag,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiLogOut,
  FiFileText,
  FiMapPin,
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
    {
      icon: <FiBox size={20} />,
      label: 'Produits',
      path: '/admin/products',
      description: 'Gérer les produits de la boutique',
    },
    {
      icon: <FiFileText size={20} />,
      label: 'Articles',
      path: '/admin/articles',
      description: 'Gérer les articles du magazine',
    },
    {
      icon: <FiShoppingCart size={20} />,
      label: 'Commandes',
      path: '/admin/orders',
      description: 'Gérer les commandes clients',
    },
    {
      icon: <FiUsers size={20} />,
      label: 'Utilisateurs',
      path: '/admin/customers',
      description: 'Gérer les comptes utilisateurs',
    },
    {
      icon: <FiMessageSquare size={20} />,
      label: 'Avis',
      path: '/admin/reviews',
      description: 'Modérer les avis clients',
    },
    {
      icon: <FiTag size={20} />,
      label: 'Promotions',
      path: '/admin/promotions',
      description: 'Gérer les codes promo',
    },
    {
      icon: <FiMapPin size={20} />,
      label: 'Informations Contact',
      path: '/admin/contact-info',
      description: 'Modifier les informations de contact',
    },
    {
      icon: <FiSettings size={20} />,
      label: 'Paramètres',
      path: '/admin/settings',
      description: 'Configurer le site',
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
            title={item.description}
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
