import React from 'react';
import { articles, featuredArticles } from '../data/articles';
import ArticlesGrid from '../components/ArticlesGrid';
import PageTitle from '../components/Ui/PageTitle';
import StandardPageLayout from '../components/StandardPageLayout';
import { FaLeaf, FaSearch, FaStarOfLife } from 'react-icons/fa';

const Magazine = () => {
  return (
    <StandardPageLayout>
      <div className="max-w-7xl mx-auto">
        {/* En-tête de page avec description */}
        <div className="text-center mb-12 px-4">
          <PageTitle subtitle="Explorez notre univers herbier">
            Le Magazine
          </PageTitle>
          <p className="max-w-2xl mx-auto text-gray-600 mt-6">
            Découvrez notre collection d'articles sur les plantes médicinales,
            les cosmétiques naturels, et les remèdes ancestraux. Notre mission :
            partager notre passion pour les bienfaits de la nature.
          </p>
        </div>

        {/* Section des caractéristiques du magazine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaLeaf size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Expertises botaniques</h3>
            <p className="text-gray-600">
              Des articles rédigés par des passionnés et des experts en
              herboristerie et botanique.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaSearch size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Sources vérifiées</h3>
            <p className="text-gray-600">
              Des informations rigoureusement sélectionnées et vérifiées pour
              vous fournir un contenu fiable.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaStarOfLife size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Conseils pratiques</h3>
            <p className="text-gray-600">
              Des tutoriels et conseils pour intégrer facilement les plantes
              médicinales dans votre quotidien.
            </p>
          </div>
        </div>
      </div>

      {/* Grille d'articles avec recherche et filtres */}
      <ArticlesGrid articles={articles} featuredArticles={featuredArticles} />

      {/* Newsletter */}
      <div className="bg-green-50 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">
              Abonnez-vous à notre newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Recevez chaque mois nos nouveaux articles, conseils et promotions
              exclusives directement dans votre boîte mail.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 rounded-full border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200 transition"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors transform active:scale-95"
              >
                S'abonner
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              En vous inscrivant, vous acceptez notre politique de
              confidentialité. Vous pourrez vous désinscrire à tout moment.
            </p>
          </div>
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default Magazine;
