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
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="my-8">
              <h3 className="text-xl font-semibold mb-4">Les bénéfices clés</h3>
              <SpecList items={product.benefits} />
            </div>
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
            <p className="text-gray-600 mb-6">
              Ce produit est formulé à partir d'ingrédients soigneusement
              sélectionnés:
            </p>
            <SpecList items={product.composition} />
          </div>
        </ProductSection>
      ),
    },
    {
      id: 'usage',
      label: 'Utilisation',
      content: (
        <ProductSection title="Conseils d'utilisation">
          <div className="prose prose-green max-w-none">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Comment l'utiliser</h3>
              <Tips text={product.usageTips} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Conservation</h3>
              <Tips text={product.storageTips} />
            </div>
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
          {/* En-tête du produit */}
          <ProductHeader title={product.title} category={product.category} />

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
              />
            </figure>

            {/* Informations du produit avec hauteur fixe et bouton positionné en bas */}
            <div className="flex flex-col h-full">
              {/* Zone scrollable pour les informations variables */}
              <div
                className="flex-1 overflow-y-auto mb-6 pr-2 space-y-8"
                style={{ maxHeight: '350px' }}
              >
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
                <ProductBadges
                  isCueilletteSauvage={product.isCueilletteSauvage}
                  isVegan={product.isVegan}
                  isFrenchMade={product.isFrenchMade}
                />
              </div>

              {/* Section fixe en bas avec sélecteur de quantité et bouton d'achat */}
              <div className="mt-auto">
                <div className="border-t border-gray-100 pt-4">
                  {/* Sélecteur de quantité */}
                  <QuantitySelector
                    quantity={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={10}
                  />

                  {/* Boutons d'action */}
                  <div className="grid grid-cols-6 gap-4 mt-6">
                    <div className="col-span-5">
                      <AddToCartButton
                        onClick={handleAddToCart}
                        text={`Acheter pour ${(product.price * quantity).toFixed(2)}€`}
                        className="py-4 text-base hover:shadow-md"
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

          {/* Onglets d'information */}
          <TabSystem
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={tabs}
          />
        </section>
      </article>
    </main>
  );
};

export default ProductDetails;
