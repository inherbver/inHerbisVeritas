import React, { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import MagazineAdmin from '../components/admin/MagazineAdmin';
import { logout } from '../config/auth';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🟢 Admin component mounted');
  }, []);

  const handleLogout = async () => {
    console.log('🛑 Logout button clicked');
    try {
      await logout();
      console.log('✅ Successfully logged out, redirecting...');
      navigate('/signin');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  return (
    <AdminLayout title="Admin Panel">
      <div className="space-y-6">
        <Routes>
          <Route path="magazine" element={<MagazineAdmin />} />
          <Route path="shop" element={<div>Shop Admin (à implémenter)</div>} />
        </Routes>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </AdminLayout>
  );
};

export default Admin;
