import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaNewspaper, FaUsers, FaCog } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-6">
      <div className="flex items-center mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="flex items-center p-3 hover:bg-gray-700 rounded transition-colors"
            >
              <FaHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/magazine"
              className="flex items-center p-3 hover:bg-gray-700 rounded transition-colors"
            >
              <FaNewspaper className="mr-3" /> Magazine
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center p-3 hover:bg-gray-700 rounded transition-colors"
            >
              <FaUsers className="mr-3" /> Utilisateurs
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="flex items-center p-3 hover:bg-gray-700 rounded transition-colors"
            >
              <FaCog className="mr-3" /> Paramètres
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
