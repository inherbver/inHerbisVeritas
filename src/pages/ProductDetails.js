import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import PropTypes from 'prop-types';

import ProductHeader from '../components/product/ProductHeader';
import ProductGallery from '../components/product/ProductGallery';
import ProductPrice from '../components/product/ProductPrice';
import ProductSection from '../components/product/ProductSection';
import SpecList from '../components/Ui/SpecList';
import Tips from '../components/Ui/Tips';
import AddToCartButton from '../components/Ui/AddToCartButton';

const ProductDetails = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-2xl text-gray-600">
          Produit non trouvé
        </div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 animate-fade-in">
      <ProductHeader
        title={product.title}
        category={product.category}
        rating={product.rating}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery imageUrl={product.imageUrl} alt={product.title} />

        <div className="space-y-8">
          <ProductPrice
            price={product.price}
            description={product.description}
          />

          <ProductSection title="Composition">
            <SpecList items={product.composition} />
          </ProductSection>

          <ProductSection title="Conseils d'utilisation">
            <Tips content={product.usageTips} />
          </ProductSection>

          <ProductSection title="Conservation">
            <Tips content={product.storageTips} />
          </ProductSection>

          <ProductSection title="Bénéfices">
            <SpecList items={product.benefits} />
          </ProductSection>

          <AddToCartButton />
        </div>
      </section>
    </article>
  );
};

export default ProductDetails;
