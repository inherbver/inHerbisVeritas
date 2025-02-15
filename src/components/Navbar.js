import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Gestion des clics externes et touche ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const NavLink = ({ to, label, mobile, onClick }) => {
    const handleClick = () => {
      if (mobile) {
        setIsMobileMenuOpen(false);
      }
      if (onClick) {
        onClick();
      }
    };

    return (
      <Link
        to={to}
        className={`text-white hover:text-green-600 px-4 py-2 rounded-lg transition-colors duration-200 ${
          mobile ? 'text-lg' : ''
        }`}
        aria-current="page"
        onClick={handleClick}
      >
        {label}
      </Link>
    );
  };

  NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    mobile: PropTypes.bool,
  };

  const IconLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className="text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      aria-label={label}
    >
      {icon}
    </Link>
  );

  IconLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
  };

  const IconButton = ({ onClick, children, ariaLabel }) => (
    <button
      onClick={onClick}
      className="text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );

  IconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    ariaLabel: PropTypes.string.isRequired,
  };

  return (
    <nav className="fixed top-0 w-full bg-green-500 text-white shadow-md z-20 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo ou marque */}
        <div className="text-xl font-bold">inHerbisVeritas</div>

        {/* Liens desktop */}
        <div className="hidden lg:flex items-center gap-x-8">
          <NavLink to="/shop" label="Shop" />
          <NavLink to="/contact" label="Contact" />
          <NavLink to="/magazine" label="Magazine" />
        </div>

        {/* Contrôles droite */}
        <div className="flex items-center gap-x-6">
          <IconButton onClick={toggleDarkMode} ariaLabel="Toggle dark mode">
            {isDarkMode ? (
              <FaSun className="w-6 h-6" />
            ) : (
              <FaMoon className="w-6 h-6" />
            )}
          </IconButton>
          <IconLink to="/cart" icon={<FaShoppingCart className="w-6 h-6" />} label="Panier" />
          <IconLink to="/signin" icon={<FaUser className="w-6 h-6" />} label="Mon compte" />

          {/* Burger menu */}
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="p-2 lg:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu mobile avec transitions */}
        <div
          ref={menuRef}
          className={`lg:hidden absolute top-full left-0 w-full bg-green-500 text-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center py-4">
            <NavLink to="/shop" label="Shop" mobile onClick={toggleMobileMenu} />
            <NavLink to="/contact" label="Contact" mobile onClick={toggleMobileMenu} />
            <NavLink to="/magazine" label="Magazine" mobile onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
