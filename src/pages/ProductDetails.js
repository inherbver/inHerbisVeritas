import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetails = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="text-center py-20">Produit non trouvé</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
    </div>
  );
};

export default ProductDetails;
