import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { FaInfoCircle, FaRegHeart } from 'react-icons/fa';

// Composants existants
import ProductHeader from '../components/product/ProductHeader';
import ProductGallery from '../components/product/ProductGallery';
import ProductPrice from '../components/product/ProductPrice';
import ProductSection from '../components/product/ProductSection';
import SpecList from '../components/Ui/SpecList';
import Tips from '../components/Ui/Tips';
import AddToCartButton from '../components/Ui/AddToCartButton';

// Nouveaux composants optimisés
import Breadcrumb from '../components/Ui/Breadcrumb';
import ProductNavigation, {
  ImageNavigation,
} from '../components/product/ProductNavigation';
import ProductBadges from '../components/product/ProductBadges';
import QuantitySelector from '../components/Ui/QuantitySelector';
import TabSystem from '../components/Ui/TabSystem';
import ThumbnailGallery from '../components/product/ThumbnailGallery';

// Composant pour afficher "Fabriqué en France" aux couleurs du drapeau français
// Conservé mais non utilisé pour l'instant - peut être réutilisé plus tard
// const FrenchMadeBadge = () => (
//   <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 mt-2">
//     <span className="font-medium">
//       <span className="text-blue-700">Fabriqué</span>
//       <span className="text-gray-800 bg-white px-1 mx-1 rounded shadow-sm border border-gray-300">
//         en
//       </span>
//       <span className="text-red-600">France</span>
//     </span>
//   </div>
// );

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Effet pour restaurer la position de défilement si on vient de naviguer
  useEffect(() => {
    // On vérifie s'il y a une position de défilement sauvegardée
    const savedScrollPosition = sessionStorage.getItem('productScrollPosition');
    if (savedScrollPosition) {
      // Restaurer la position après le chargement du composant
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      // Nettoyer sessionStorage après utilisation
      sessionStorage.removeItem('productScrollPosition');
    }
  }, [slug]); // Dépendance à slug pour s'exécuter à chaque changement de produit

  // Trouver l'index du produit actuel dans la liste des produits
  const currentIndex = products.findIndex((p) => p.slug === slug);

  // Déterminer les produits précédent et suivant
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  // Fonction pour naviguer vers le produit précédent
  const goToPrevProduct = () => {
    if (prevProduct) {
      // Sauvegarder la position de défilement actuelle avant la navigation
      sessionStorage.setItem(
        'productScrollPosition',
        window.scrollY.toString()
      );
      navigate(`/produits/${prevProduct.slug}`);
    }
  };

  // Fonction pour naviguer vers le produit suivant
  const goToNextProduct = () => {
    if (nextProduct) {
      // Sauvegarder la position de défilement actuelle avant la navigation
      sessionStorage.setItem(
        'productScrollPosition',
        window.scrollY.toString()
      );
      navigate(`/produits/${nextProduct.slug}`);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Logique d'ajout au panier
    console.log(`Ajout de ${quantity} ${product?.title} au panier`);
  };

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-20">
        <p className="text-center text-2xl text-gray-600">Produit non trouvé</p>
      </main>
    );
  }

  // Préparation des onglets de contenu
  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <ProductSection title="Pourquoi l'aimer">
          <div className="prose prose-green max-w-none">
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <section className="my-8">
              <h3 className="text-xl font-semibold mb-4">Les bénéfices clés</h3>
              <SpecList items={product.benefits} />
            </section>
          </div>
        </ProductSection>
      ),
    },
    {
      id: 'composition',
      label: 'Composition',
      content: (
        <ProductSection title="Composition">
          <div className="prose prose-green max-w-none">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ce produit est formulé à partir d'ingrédients soigneusement
              sélectionnés:
            </p>
            <SpecList items={product.composition} />
            
            {product.inci_list && (
              <section className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Liste INCI</h3>
                <figure className="p-4 bg-gray-50 rounded-md border border-gray-200">
                  <code className="text-sm text-gray-600 block whitespace-pre-wrap break-words leading-relaxed">{product.inci_list}</code>
                </figure>
                <figcaption className="mt-2 text-xs text-gray-500">
                  La liste INCI (International Nomenclature of Cosmetic Ingredients) est la nomenclature internationale des ingrédients cosmétiques.
                </figcaption>
              </section>
            )}
          </div>
        </ProductSection>
      ),
    },
    {
      id: 'usage',
      label: 'Utilisation',
      content: (
        <ProductSection title="Comment l'utiliser">
          <div className="prose prose-green max-w-none">
            <section className="mb-8">
              <Tips text={product.usageTips} className="leading-relaxed" />
            </section>
            <section>
              <h3 className="text-xl font-semibold mb-4">Conservation</h3>
              <Tips text={product.storageTips} className="leading-relaxed" />
            </section>
          </div>
        </ProductSection>
      ),
    },
  ];

  // Préparation de données pour les miniatures (à adapter selon le modèle de données)
  const thumbnails = [
    { url: product.imageUrl, alt: product.title },
    { url: product.imageUrl, alt: `${product.title} vue 2` },
    { url: product.imageUrl, alt: `${product.title} vue 3` },
  ];

  // Préparation du fil d'Ariane
  const breadcrumbItems = [
    { label: 'Boutique', url: '/boutique' },
    {
      label: product.category,
      url: `/boutique/${product.category.toLowerCase()}`,
    },
    { label: product.title, active: true },
  ];

  return (
    <main className="bg-gray-50 py-12 min-h-screen animate-fade-in">
      <article className="container mx-auto px-4 max-w-7xl">
        {/* Fil d'Ariane */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Navigation entre produits */}
        <ProductNavigation
          prevProduct={prevProduct}
          nextProduct={nextProduct}
          onPrevClick={goToPrevProduct}
          onNextClick={goToNextProduct}
        />

        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Galerie d'images */}
            <figure className="relative">
              <ProductGallery imageUrl={product.imageUrl} alt={product.title} />

              {/* Flèches de navigation sur l'image */}
              <ImageNavigation
                prevProduct={prevProduct}
                nextProduct={nextProduct}
                onPrevClick={goToPrevProduct}
                onNextClick={goToNextProduct}
              />

              <ThumbnailGallery
                images={thumbnails}
                onSelect={setSelectedImageIndex}
                selectedIndex={selectedImageIndex}
                className="mt-4 gap-3"
                imageClassName="hover:scale-105 transition-transform duration-200"
                selectedImageClassName="ring-2 ring-green-500 ring-offset-2"
              />
            </figure>

            {/* Informations produit */}
            <div className="flex flex-col">
              {/* En-tête avec nom, badge catégorie */}
              <header>
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mt-2">
                  {product.category}
                </span>
              </header>

              {/* Prix et description */}
              <section className="mt-8">
                <p className="text-3xl font-medium text-green-600 mb-5">
                  {product.price} €
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                <p className="text-sm text-gray-500 mb-8">
                  Contenance : {product.quantity_value} {product.quantity_unit}
                </p>
              </section>

              {/* Badges et caractéristiques */}
              <section className="flex flex-wrap gap-3 mb-8">
                <ProductBadges
                  badges={[
                    {
                      key: 'isFrenchMade',
                      label: 'Origine France',
                      active: product.isFrenchMade,
                    },
                    {
                      key: 'isVegan',
                      label: 'Végan',
                      active: product.isVegan,
                    },
                    {
                      key: 'isCueilletteSauvage',
                      label: 'Cueillette sauvage',
                      active: product.isCueilletteSauvage,
                    },
                  ]}
                />
              </section>

              {/* Informations de stock */}
              <section>
                <p className="flex items-center mb-6">
                  <FaInfoCircle className="text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    {product.stock > 0
                      ? `En stock: ${product.stock} unités`
                      : 'En rupture de stock'}
                  </span>
                </p>
              </section>

              {/* Section fixe en bas avec sélecteur de quantité et bouton d'achat */}
              <div className="mt-auto">
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Sélecteur de quantité */}
                    <div className="w-full md:w-1/3">
                      <QuantitySelector
                        quantity={quantity}
                        onChange={handleQuantityChange}
                        min={1}
                        max={10}
                      />
                    </div>

                    {/* Boutons d'action */}
                    <div className="w-full md:w-2/3 flex gap-4 items-center">
                      <div className="flex-grow max-w-[250px]">
                        <AddToCartButton
                          onClick={handleAddToCart}
                          text={`Acheter pour ${(product.price * quantity).toFixed(2)}€`}
                          className="py-4 text-base hover:shadow-md transition-shadow"
                        />
                      </div>
                      <button
                        className="flex items-center justify-center p-4 border border-gray-300 rounded-lg text-gray-500 hover:text-pink-500 hover:border-pink-300 transition-colors"
                        aria-label="Ajouter aux favoris"
                      >
                        <FaRegHeart size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets d'information avec style amélioré */}
          <div className="mt-12">
            <TabSystem
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={tabs}
              tabClassName="py-4 px-6 font-medium text-gray-600 border-b-2 border-transparent transition-colors hover:text-gray-900"
              activeTabClassName="text-green-600 border-b-4 border-green-600 font-semibold"
            />
          </div>
        </section>
      </article>
    </main>
  );
};

export default ProductDetails;
