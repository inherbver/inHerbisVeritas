import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <header className="bg-herbis-green-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Boutique HerbisVeritas
        </h1>
        <p className="text-xl text-gray-600">
          Nos produits naturels et bio pour votre bien-être
        </p>
      </header>

      <div className="mx-auto px-4 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Shop;
