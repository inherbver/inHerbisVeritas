import React from 'react';
import ProductGrid from '../components/shop/ProductGrid';
import HeroSection from '../components/shop/HeroSection';
import { products } from '../data/products';

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="mx-auto px-4">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Shop;
