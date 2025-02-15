import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import MagazineAdmin from '../components/admin/MagazineAdmin';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Admin = () => (
  <ProtectedRoute>
    <AdminLayout>
      <Routes>
        <Route path="magazine" element={<MagazineAdmin />} />
        <Route path="shop" element={<div>Shop Admin (à implémenter)</div>} />
      </Routes>
    </AdminLayout>
  </ProtectedRoute>
);

export default Admin;
