import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ScrollToTop from './components/Ui/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import AdminToggleButton from './components/admin/AdminToggleButton';

// Import Layouts
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/admin/layout/AdminLayout';

// Import Admin components
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import ProductList from './components/admin/shop/ProductList';
import ReviewList from './components/admin/shop/ReviewList';
import PromotionsManagement from './components/admin/shop/PromotionsManagement';
import OrdersManagement from './components/admin/orders/OrdersManagement';
import ArticleManagement from './components/admin/magazine/ArticleManagement';

// Import authorization check for admin role
import AdminRoute from './components/auth/AdminRoute';

console.log('PUBLIC_URL:', process.env.PUBLIC_URL);

function App() {
  return (
    <AuthProvider>
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
            <Route path="articles" element={<ArticleManagement />} />
            {/* Autres routes admin à ajouter ici */}
          </Route>

          {/* Client Routes avec Layout commun */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Shop />} />
            <Route path="shop" element={<Shop />} />
            <Route path="magazine" element={<Magazine />} />
            <Route path="magazine/:id" element={<MagazineDetails />} />
            <Route path="produits/:slug" element={<ProductDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Route protégée avec layout client */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ClientLayout>
                  <Profile />
                </ClientLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Bouton flottant pour basculer entre l'interface admin et le site public */}
        <AdminToggleButton />
      </Router>
    </AuthProvider>
  );
}

export default App;
