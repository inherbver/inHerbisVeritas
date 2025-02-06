import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaMoon, FaSun, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-10 dark:bg-gray-900 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-x-6">
          <Link to="/shop" className="hover:text-green-600 dark:text-white transition-colors duration-200 ease-in-out" aria-current="page">
            Shop
          </Link>
          <Link to="/contact" className="hover:text-green-600 dark:text-white transition-colors duration-200 ease-in-out">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-x-6">
          <button onClick={toggleDarkMode} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 ease-in-out">
            {isDarkMode ? <FaSun className="w-6 h-6 text-yellow-400" /> : <FaMoon className="w-6 h-6 text-gray-700" />}
          </button>
          <Link to="/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 ease-in-out">
            <FaShoppingCart className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
          <Link to="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 ease-in-out">
            <FaUser className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
          <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 ease-in-out lg:hidden">
            <FaBars className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col gap-y-4">
            <Link to="/shop" className="hover:text-green-600 dark:text-white transition-colors duration-200 ease-in-out" aria-current="page">
              Shop
            </Link>
            <Link to="/contact" className="hover:text-green-600 dark:text-white transition-colors duration-200 ease-in-out">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
