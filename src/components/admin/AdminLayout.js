import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiFileText,
  FiMap,
  FiTruck,
  FiPieChart,
  FiLogOut,
  FiClock,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';

const AdminLayout = ({ children }) => {
  const [inactivityTimeout, setInactivityTimeout] = useState(3); // Default 3 minutes
  const [timeLeft, setTimeLeft] = useState(inactivityTimeout * 60);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Navigation items
  const navigationItems = [
    { name: 'Tableau de bord', path: '/admin', icon: <FiHome size={20} /> },
    {
      name: 'Boutique',
      path: '/admin/shop',
      icon: <FiShoppingBag size={20} />,
    },
    {
      name: 'Magazine',
      path: '/admin/magazine',
      icon: <FiFileText size={20} />,
    },
    { name: 'Marchés', path: '/admin/markets', icon: <FiMap size={20} /> },
    { name: 'Commandes', path: '/admin/orders', icon: <FiTruck size={20} /> },
    { name: 'Utilisateurs', path: '/admin/users', icon: <FiUsers size={20} /> },
    {
      name: 'Statistiques',
      path: '/admin/stats',
      icon: <FiPieChart size={20} />,
    },
    {
      name: 'Paramètres',
      path: '/admin/settings',
      icon: <FiSettings size={20} />,
    },
  ];

  // User activity tracker
  const resetTimer = () => {
    setLastActivity(Date.now());
    setTimeLeft(inactivityTimeout * 60);
  };

  const handleExtendTime = () => {
    setInactivityTimeout(30); // Extend to 30 minutes
    resetTimer();
  };

  // Auto logout after inactivity
  useEffect(() => {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Timer to check inactivity
    const inactivityInterval = setInterval(() => {
      const inactiveTime = Math.floor((Date.now() - lastActivity) / 1000);
      const remaining = inactivityTimeout * 60 - inactiveTime;
      setTimeLeft(remaining > 0 ? remaining : 0);

      if (inactiveTime >= inactivityTimeout * 60) {
        clearInterval(inactivityInterval);
        handleLogout();
      }
    }, 1000);

    return () => {
      // Clean up
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(inactivityInterval);
    };
  }, [inactivityTimeout, lastActivity]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) navigate('/signin');
  };

  // Format time left as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="flex items-center justify-center h-16 border-b bg-[#FE5000]">
          <h2 className="text-xl font-bold text-white">Admin In Herbis</h2>
        </div>
        <div className="overflow-y-auto h-full">
          <nav className="mt-5 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mb-1 transition-colors rounded-md hover:bg-gray-100 
                ${location.pathname === item.path ? 'bg-gray-100 text-[#FE5000]' : 'text-gray-700'}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 mb-1 mt-4 text-red-600 transition-colors rounded-md hover:bg-red-50"
            >
              <FiLogOut className="mr-3" size={20} />
              <span className="font-medium">Déconnexion</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {navigationItems.find((item) => item.path === location.pathname)
                ?.name || 'Admin'}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <FiClock className="mr-1" />
                <span>Session: {formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={handleExtendTime}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
              >
                30 min
              </button>

              <div className="text-sm font-medium text-gray-700">
                {currentUser.email}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
