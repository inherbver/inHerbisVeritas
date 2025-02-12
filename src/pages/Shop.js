import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import { products } from '../App';

function Shop() {
  return (
    <div>
      <HeroSection />
      <div className="py-12 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Nos produits naturels et biologiques
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-6 App">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default Shop;
