import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children, title }) => {
  console.log('🟢 AdminLayout mounted');
  return (
    <div className="admin-layout bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default AdminLayout;
