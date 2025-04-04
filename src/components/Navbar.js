import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaClipboardList,
  FaHeart,
  FaIdCard,
  FaUserCog,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const { currentUser, userRole, isAdmin, logout } = useAuth();

  // Gestion des clics externes et touche ESC pour fermer le menu mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-green-500 text-white shadow-md z-[1001] transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 pt-3 pb-0 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">In Herbis Veritas</div>

        {/* Liens desktop avec animation */}
        <div className="hidden lg:flex items-center gap-x-8 relative">
          {[
            { path: '/', label: 'Boutique' },
            { path: '/magazine', label: 'Magazine' },
            { path: '/contact', label: 'Contact' },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-2 py-1 text-lg text-white hover:text-white transition-colors duration-200`
              }
            >
              {link.label}
              {(location.pathname === link.path ||
                (link.path === '/' && location.pathname === '/boutique')) && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-0.5 w-full bg-white"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              )}
            </NavLink>
          ))}
        </div>

        {/* Icônes Panier et Compte */}
        <div className="flex items-center gap-x-6">
          <Link
            to="/cart"
            className="text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <FaShoppingCart className="w-6 h-6" />
          </Link>

          {/* Menu compte utilisateur avec dropdown */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <FaUser className="w-6 h-6" />
            </button>

            {/* Dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-30">
                <div className="py-1">
                  {!currentUser ? (
                    /* Options pour utilisateur non connecté */
                    <>
                      <Link
                        to="/signin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignInAlt className="w-5 h-5 mr-3 text-green-600" />
                        Connexion
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUserPlus className="w-5 h-5 mr-3 text-green-600" />
                        Inscription
                      </Link>
                    </>
                  ) : isAdmin ? (
                    /* Options pour administrateur */
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        Connecté en tant qu'
                        <span className="font-semibold">administrateur</span>
                      </div>
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaTachometerAlt className="w-5 h-5 mr-3 text-green-600" />
                        Dashboard
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="w-5 h-5 mr-3 text-green-600" />
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    /* Options pour utilisateur standard connecté */
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        Connecté en tant que{' '}
                        <span className="font-semibold">
                          {currentUser.email}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaIdCard className="w-5 h-5 mr-3 text-green-600" />
                        Mes informations personnelles
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaClipboardList className="w-5 h-5 mr-3 text-green-600" />
                        Mes commandes
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaHeart className="w-5 h-5 mr-3 text-green-600" />
                        Mes produits favoris
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="w-5 h-5 mr-3 text-green-600" />
                        Déconnexion
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bouton Burger pour mobile */}
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="p-2 lg:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        <div
          ref={menuRef}
          className={`lg:hidden absolute top-full left-0 w-full bg-green-500 text-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } flex justify-center`}
        >
          <div className="flex flex-col items-center py-4 w-full">
            <NavLink to="/" className="py-2" onClick={toggleMobileMenu}>
              Boutique
            </NavLink>
            <NavLink to="/magazine" className="py-2" onClick={toggleMobileMenu}>
              Magazine
            </NavLink>
            <NavLink to="/contact" className="py-2" onClick={toggleMobileMenu}>
              Contact
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="py-2" onClick={toggleMobileMenu}>
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  toggleMobileMenu: PropTypes.func,
};

export default Navbar;
