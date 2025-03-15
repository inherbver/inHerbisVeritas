import React, { useState, useEffect } from 'react';
import articleService from '../services/api/articleService';
import ArticlesGrid from '../components/magazine/ArticlesGrid';
import PageTitle from '../components/Ui/PageTitle';
import StandardPageLayout from '../components/Ui/StandardPageLayout';
import PageHeader from '../components/Ui/PageHeader';
import { FaLeaf, FaSearch, FaStarOfLife } from 'react-icons/fa';

const Magazine = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);

        // Récupérer tous les articles
        const { data: articlesData, error: articlesError } =
          await articleService.getArticles({
            limit: 50, // Augmenter la limite pour afficher plus d'articles
          });

        if (articlesError) throw articlesError;

        // Récupérer les articles mis en avant
        const { data: featuredData, error: featuredError } =
          await articleService.getFeaturedArticles(6);

        if (featuredError) throw featuredError;

        setArticles(articlesData);
        setFeaturedArticles(featuredData);
      } catch (err) {
        console.error('Erreur lors du chargement des articles:', err);
        setError(
          err.message ||
            'Une erreur est survenue lors du chargement des articles'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <StandardPageLayout>
      <div className="max-w-7xl mx-auto">
        {/* En-tête de page avec PageHeader */}
        <PageHeader
          image={<FaLeaf size={60} />}
          title="Le Magazine In Herbis Veritas"
          description="Articles inspirants, conseils pratiques et expertises botaniques pour intégrer les bienfaits des plantes à votre quotidien."
          backgroundColor="bg-green-50"
          actionButton={
            <a 
              href="#articles" 
              className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Découvrir nos articles
            </a>
          }
        />

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

      {/* Affichage des états de chargement, erreur ou grille d'articles */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des articles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
            <p>
              <strong>Erreur:</strong> {error}
            </p>
            <p className="mt-2">
              Veuillez réessayer ultérieurement ou contacter notre support.
            </p>
          </div>
        </div>
      ) : (
        /* Grille d'articles avec recherche et filtres */
        <ArticlesGrid articles={articles} featuredArticles={featuredArticles} />
      )}

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
