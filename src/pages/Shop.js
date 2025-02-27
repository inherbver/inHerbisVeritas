import React from 'react';
import ProductGrid from '../components/shop/ProductGrid';
import HeroSection from '../components/shop/HeroSection';
import { products } from '../data/products';

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <ProductGrid products={products} />
    </div>
  );
};

export default Shop;
