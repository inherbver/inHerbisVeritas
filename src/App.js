import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Magazine from './pages/Magazine';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Admin from './pages/Admin';
import GoogleMapsProvider from './providers/GoogleMapsProvider';

console.log('PUBLIC_URL:', process.env.PUBLIC_URL);

const products = [
  {
    id: 1,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct1.jpeg`,
    title: 'Baume apaisant au calendula',
    description: 'Nourrit et protège les peaux sensibles.',
    volume: '50ml',
    price: 9.9,
    discount: 5,
  },
  {
    id: 2,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct2.jpeg`,
    title: "Huile revitalisante à l'argan",
    description: "Hydrate en profondeur et restaure l'élasticité.",
    volume: '100ml',
    price: 14.5,
    discount: 10,
  },
  {
    id: 3,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct3.jpeg`,
    title: 'Savon purifiant au charbon actif',
    description: "Désincruste les impuretés et régule l'excès de sébum.",
    volume: '100g',
    price: 6.5,
    discount: null,
  },
  {
    id: 4,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct4.jpeg`,
    title: "Crème hydratante à l'aloe vera",
    description: 'Apporte une hydratation intense sans effet gras.',
    volume: '75ml',
    price: 11.2,
    discount: 15,
  },
  {
    id: 5,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct5.jpeg`,
    title: 'Sérum éclat à la rose musquée',
    description: "Unifie le teint et redonne de l'éclat à la peau.",
    volume: '30ml',
    price: 19.9,
    discount: 20,
  },
  {
    id: 6,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct6.jpeg`,
    title: 'Gel rafraîchissant à la menthe poivrée',
    description: 'Apaise et procure une sensation de fraîcheur immédiate.',
    volume: '50ml',
    price: 8.5,
    discount: 5,
  },
  {
    id: 7,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct7.jpeg`,
    title: "Baume de massage à l'arnica",
    description: "Détend les muscles et soulage après l'effort.",
    volume: '100ml',
    price: 12.5,
    discount: 10,
  },
  {
    id: 8,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct8.jpeg`,
    title: 'Huile sèche sublimatrice au monoï',
    description: 'Laisse la peau douce et parfumée, sans film gras.',
    volume: '100ml',
    price: 16.9,
    discount: 15,
  },
  {
    id: 9,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct9.jpeg`,
    title: 'Crème nourrissante au beurre de karité',
    description: 'Répare et nourrit les peaux très sèches.',
    volume: '75ml',
    price: 10.5,
    discount: 20,
  },
  {
    id: 10,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct10.jpeg`,
    title: "Gommage exfoliant aux éclats de noyaux d'abricot",
    description: 'Élimine les cellules mortes pour une peau douce et lisse.',
    volume: '150ml',
    price: 9.5,
    discount: 5,
  },
  {
    id: 11,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct11.jpeg`,
    title: "Masque hydratant à la fleur d'oranger",
    description: 'Apaise et repulpe la peau en profondeur.',
    volume: '50ml',
    price: 13.2,
    discount: 10,
  },
  {
    id: 12,
    image: `${process.env.PUBLIC_URL}/assets/images/pdct12.jpeg`,
    title: 'Lotion tonique aux hydrolats de lavande',
    description: 'Rafraîchit et purifie le teint en un seul geste.',
    volume: '200ml',
    price: 11.9,
    discount: 15,
  },
];

function App() {
  return (
    <GoogleMapsProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Shop />} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GoogleMapsProvider>
  );
}

export default App;
export { products };
