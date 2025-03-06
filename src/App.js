import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Magazine from './pages/Magazine';
import MagazineDetails from './pages/MagazineDetails';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Import Admin components
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import ProductList from './components/admin/shop/ProductList';
import ReviewList from './components/admin/shop/ReviewList';
import PromotionsManagement from './components/admin/shop/PromotionsManagement';
import OrdersManagement from './components/admin/orders/OrdersManagement';

// Import authorization check for admin role
import AdminRoute from './components/auth/AdminRoute';

console.log('PUBLIC_URL:', process.env.PUBLIC_URL);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="products"
            element={
              <ProductList
                search=""
                onEdit={() => {
                  /* Not needed in this context */
                }}
              />
            }
          />
          <Route path="reviews" element={<ReviewList search="" />} />
          <Route path="promotions" element={<PromotionsManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          {/* Autres routes admin à ajouter ici */}
        </Route>

        {/* Client Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Shop />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Navbar />
              <Shop />
            </>
          }
        />
        <Route
          path="/magazine"
          element={
            <>
              <Navbar />
              <Magazine />
            </>
          }
        />
        <Route
          path="/magazine/:id"
          element={
            <>
              <Navbar />
              <MagazineDetails />
            </>
          }
        />
        <Route
          path="/produits/:slug"
          element={
            <>
              <Navbar />
              <ProductDetails />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Navbar />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <Navbar />
              <SignIn />
            </>
          }
        />
        <Route
          path="/terms"
          element={
            <>
              <Navbar />
              <Terms />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <NotFound />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
