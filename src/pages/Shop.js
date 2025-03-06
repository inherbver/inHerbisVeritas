import React from 'react';
import ProductGrid from '../components/shop/ProductGrid';
import HeroSection from '../components/shop/HeroSection';
import StandardPageLayout from '../components/Ui/StandardPageLayout';
import { products } from '../data/products';

const Shop = () => {
  return (
    <StandardPageLayout>
      <div className="bg-gray-50">
        <HeroSection />
        <ProductGrid products={products} />
      </div>
    </StandardPageLayout>
  );
};

export default Shop;
