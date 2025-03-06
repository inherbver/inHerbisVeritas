import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - visible sur les grands écrans, toggable sur mobiles */}
      <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <AdminSidebar />
      </div>

      {/* Overlay pour fermer le menu sur mobile quand il est ouvert */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Even though the component doesn't currently accept props, we're adding PropTypes
// for future-proofing and consistency with other components
AdminLayout.propTypes = {};

export default AdminLayout;
