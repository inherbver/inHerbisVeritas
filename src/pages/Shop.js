import React from 'react';
import ProductGrid from '../components/ProductGrid';
import HeroSection from '../components/HeroSection';
import { products } from '../data/products';

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <HeroSection />

      <div className="mx-auto px-4 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Shop;
