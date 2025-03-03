import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import PropTypes from 'prop-types';
import {
  FaLeaf,
  FaCheck,
  FaRegHeart,
  FaTruck,
  FaInfoCircle,
} from 'react-icons/fa';

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
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Logique d'ajout au panier
    console.log(`Ajout de ${quantity} ${product?.title} au panier`);
  };

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
    <div className="bg-gray-50 py-12 min-h-screen animate-fade-in">
      <article className="container mx-auto px-4 max-w-7xl">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-6">
          <span className="hover:text-green-600 cursor-pointer">Boutique</span>{' '}
          &gt;{' '}
          <span className="hover:text-green-600 cursor-pointer">
            {product.category}
          </span>{' '}
          &gt; <span className="text-green-600">{product.title}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          {/* En-tête du produit */}
          <ProductHeader title={product.title} category={product.category} />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Galerie d'images */}
            <div className="relative">
              <ProductGallery imageUrl={product.imageUrl} alt={product.title} />
              <div className="mt-4 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-16 rounded-md border-2 border-gray-200 hover:border-green-500 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={product.imageUrl}
                      alt={`Aperçu ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Informations du produit */}
            <div className="space-y-8">
              <div>
                <ProductPrice
                  price={product.price}
                  description={product.description}
                />
                <p className="text-sm text-gray-500 mt-1">{product.volume}</p>
                <p className="text-gray-400 text-sm mt-2">
                  <FaInfoCircle className="inline mr-1" />
                  Prix TTC, livraison non incluse
                </p>
              </div>

              {/* Badges et attributs produit */}
              <div className="flex flex-wrap gap-3 my-4">
                {product.isCueilletteSauvage && (
                  <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaLeaf /> Cueillette sauvage
                  </span>
                )}
                {product.isVegan && (
                  <span className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaCheck /> Vegan
                  </span>
                )}
                {product.isFrenchMade && (
                  <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaTruck /> Fabriqué en France
                  </span>
                )}
              </div>

              {/* Sélecteur de quantité */}
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Quantité</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center w-12 border-x border-gray-300 font-medium">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-5">
                  <AddToCartButton
                    onClick={handleAddToCart}
                    text={`Acheter pour ${product.price}€`}
                    className="py-4 text-base hover:shadow-md"
                  />
                </div>
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg text-gray-500 hover:text-pink-500 hover:border-pink-300 transition-colors">
                  <FaRegHeart size={22} />
                </button>
              </div>
            </div>
          </section>

          {/* Onglets d'information */}
          <section className="mt-16">
            <div className="border-b border-gray-200 mb-8">
              <div className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('composition')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'composition'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Composition
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'usage'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Utilisation
                </button>
              </div>
            </div>

            {/* Contenu des onglets */}
            {activeTab === 'description' && (
              <ProductSection title="Pourquoi l'aimer">
                <div className="prose prose-green max-w-none">
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <div className="my-8">
                    <h3 className="text-xl font-semibold mb-4">
                      Les bénéfices clés
                    </h3>
                    <SpecList items={product.benefits} />
                  </div>
                </div>
              </ProductSection>
            )}

            {activeTab === 'composition' && (
              <ProductSection title="Composition">
                <div className="prose prose-green max-w-none">
                  <p className="text-gray-600 mb-6">
                    Ce produit est formulé à partir d'ingrédients soigneusement
                    sélectionnés:
                  </p>
                  <SpecList items={product.composition} />
                </div>
              </ProductSection>
            )}

            {activeTab === 'usage' && (
              <ProductSection title="Conseils d'utilisation">
                <div className="prose prose-green max-w-none">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                      Comment l'utiliser
                    </h3>
                    <Tips text={product.usageTips} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Conservation</h3>
                    <Tips text={product.storageTips} />
                  </div>
                </div>
              </ProductSection>
            )}
          </section>
        </div>
      </article>
    </div>
  );
};

export default ProductDetails;
