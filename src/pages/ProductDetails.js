import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import PropTypes from 'prop-types';
import {
  FaStar,
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
  const [selectedVariant, setSelectedVariant] = useState('default');

  // Options de contenance (pour la démonstration - normalement depuis les données)
  const variants = [
    {
      id: 'default',
      name: product?.volume || '50ml',
      price: product?.price || '0.00',
    },
    {
      id: 'large',
      name: '100ml',
      price: (parseFloat(product?.price || 0) * 1.8).toFixed(2),
    },
    {
      id: 'xl',
      name: '150ml',
      price: (parseFloat(product?.price || 0) * 2.5).toFixed(2),
    },
  ];

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Logique d'ajout au panier
    console.log(`Ajout de ${quantity} ${product?.title} au panier`);
    console.log(`Variant: ${selectedVariant}`);
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

  const currentVariant =
    variants.find((v) => v.id === selectedVariant) || variants[0];

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
          <ProductHeader
            title={product.title}
            category={product.category}
            rating={product.rating}
          />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Galerie d'images */}
            <div className="relative">
              <ProductGallery imageUrl={product.imageUrl} alt={product.title} />
              <div className="absolute top-4 right-4 bg-white/80 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500 text-sm">(32 avis)</span>
              </div>
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
                  price={currentVariant.price}
                  description={product.description}
                />
                <p className="text-gray-400 text-sm mt-2">
                  <FaInfoCircle className="inline mr-1" />
                  Prix TTC, livraison non incluse
                </p>
              </div>

              {/* Badges et attributs produit */}
              <div className="flex flex-wrap gap-3 my-4">
                <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                  <FaLeaf /> Bio
                </span>
                <span className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                  <FaCheck /> Vegan
                </span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                  <FaTruck /> Fabriqué en France
                </span>
              </div>

              {/* Sélecteur de contenance */}
              <div>
                <label className="text-gray-700 font-medium block mb-2">
                  Choisir la contenance
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`px-3 py-2 border rounded-lg text-center text-sm ${
                        selectedVariant === variant.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedVariant(variant.id)}
                    >
                      {variant.name}
                      <div className="font-bold mt-1">{variant.price}€</div>
                    </button>
                  ))}
                </div>
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
                    text={`Acheter pour ${currentVariant.price}€`}
                    className="py-4 text-base hover:shadow-md"
                  />
                </div>
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg text-gray-500 hover:text-pink-500 hover:border-pink-300 transition-colors">
                  <FaRegHeart className="text-xl" />
                </button>
              </div>

              <p className="text-sm text-gray-500 italic">
                Nous expédions votre commande sous 24h ouvrées. Livraison
                gratuite à partir de 40€ d'achat.
              </p>
            </div>
          </section>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
              {[
                'description',
                'composition',
                'utilisation',
                'conservation',
                'avis',
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="py-4">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-serif mb-4">
                  À propos de ce produit
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                <h3 className="text-xl font-serif mb-3 mt-6">Bénéfices</h3>
                <SpecList items={product.benefits} />
              </div>
            )}

            {activeTab === 'composition' && (
              <div>
                <h2 className="text-2xl font-serif mb-4">Composition</h2>
                <p className="mb-4 text-gray-600">
                  Tous nos produits sont élaborés avec des ingrédients
                  biologiques, sans conservateurs artificiels.
                </p>
                <SpecList items={product.composition} />
              </div>
            )}

            {activeTab === 'utilisation' && (
              <div>
                <h2 className="text-2xl font-serif mb-4">
                  Conseils d'utilisation
                </h2>
                <Tips content={product.usageTips} />
              </div>
            )}

            {activeTab === 'conservation' && (
              <div>
                <h2 className="text-2xl font-serif mb-4">
                  Conservation du produit
                </h2>
                <Tips content={product.storageTips} />
              </div>
            )}

            {activeTab === 'avis' && (
              <div>
                <h2 className="text-2xl font-serif mb-4">Avis clients</h2>
                <div className="flex items-center mb-6">
                  <div className="bg-green-50 text-green-700 rounded-lg p-4 flex items-center mr-4">
                    <span className="text-3xl font-bold">{product.rating}</span>
                    <span className="text-xl">/5</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }
                          size={24}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500">Basé sur 32 avis</p>
                  </div>
                </div>
                <p className="text-gray-500 italic">
                  Les avis clients seront affichés ici.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif mb-6">
            Vous pourriez aussi aimer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Cette section sera remplie avec des ProductCard similaires */}
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              Produits similaires à venir...
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductDetails;
