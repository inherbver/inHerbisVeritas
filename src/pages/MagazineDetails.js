import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import articleService from '../services/api/articleService';
import StandardPageLayout from '../components/Ui/StandardPageLayout';
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaQuoteLeft,
  FaLeaf,
} from 'react-icons/fa';
import SocialMediaFooter from '../components/SocialMediaFooter';

const MagazineDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        setLoading(true);

        // Récupérer l'article soit par son ID soit par son slug
        let articleData;

        // D'abord vérifier si id est un UUID (pour Supabase)
        const isUUID =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            id
          );

        if (isUUID) {
          // Récupérer par ID
          const { data, error } = await articleService.getArticleById(id);
          if (error) throw error;
          articleData = data;
        } else {
          // Récupérer par slug
          const { data, error } = await articleService.getArticles({
            limit: 1,
            filters: { slug: id },
          });
          if (error) throw error;

          // Prendre le premier article qui correspond au slug
          articleData = data.length > 0 ? data[0] : null;
        }

        if (!articleData) {
          throw new Error("L'article demandé n'existe pas ou a été supprimé.");
        }

        setArticle(articleData);

        // Récupérer des articles similaires (même catégorie)
        if (articleData.category) {
          const { data: similarData, error: similarError } =
            await articleService.getArticles({
              category: articleData.category,
              limit: 3,
            });

          if (similarError) throw similarError;

          // Filtrer pour exclure l'article en cours
          const filtered = similarData.filter((a) => a.id !== articleData.id);
          setRelatedArticles(filtered);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'article:", err);
        setError(
          err.message ||
            "Une erreur est survenue lors du chargement de l'article"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetails();
    }
  }, [id]);

  // Si chargement en cours
  if (loading) {
    return (
      <StandardPageLayout>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'article...</p>
        </div>
      </StandardPageLayout>
    );
  }

  // Si erreur
  if (error) {
    return (
      <StandardPageLayout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            <p>
              <strong>Erreur :</strong> {error}
            </p>
          </div>
          <Link
            to="/magazine"
            className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Retour au magazine
          </Link>
        </div>
      </StandardPageLayout>
    );
  }

  // Si article non trouvé
  if (!article) {
    return (
      <StandardPageLayout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Article non trouvé</h2>
          <p className="text-gray-600 mb-8">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/magazine"
            className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Retour au magazine
          </Link>
        </div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout>
      {/* Hero Banner immersif */}
      <div className="relative w-full h-[50vh] md:h-[60vh] -mt-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-4">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              {article.excerpt}
            </p>

            <div className="flex items-center text-white/80 mt-6 text-sm">
              <div className="flex items-center mr-6">
                <FaCalendarAlt className="mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{article.readTime} de lecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Corps de l'article */}
          <article className="prose prose-lg max-w-none">
            {/* Introduction */}
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
              {article.excerpt}
            </p>

            {/* Contenu principal de l'article */}
            {article.content && (
              <div className="mt-8">
                {(() => {
                  try {
                    console.log('Type du contenu:', typeof article.content);

                    // 1. Préparer le contenu (si c'est une chaîne, la parser en JSON)
                    const contentObj =
                      typeof article.content === 'string'
                        ? JSON.parse(article.content)
                        : article.content;

                    console.log('Contenu parsé:', contentObj);

                    // 2. Pour le débogage, afficher la structure
                    if (!contentObj || typeof contentObj !== 'object') {
                      return (
                        <p className="text-red-500">
                          Contenu invalide: ce n'est pas un objet JSON
                        </p>
                      );
                    }

                    // 3. Vérifier que c'est bien au format Tiptap (type: 'doc')
                    if (!contentObj.type) {
                      return (
                        <p className="text-red-500">
                          Format Tiptap invalide: propriété 'type' manquante
                        </p>
                      );
                    }

                    // 4. Générer le HTML avec les extensions nécessaires (y compris Image)
                    const html = generateHTML(contentObj, [
                      StarterKit,
                      Image, // Ajout de l'extension Image pour gérer les nœuds d'image
                    ]);

                    console.log('HTML généré:', html.substring(0, 100) + '...');

                    // 5. Retourner le HTML
                    return <div dangerouslySetInnerHTML={{ __html: html }} />;
                  } catch (error) {
                    console.error(
                      'Erreur lors de la conversion du contenu:',
                      error
                    );
                    return (
                      <div className="text-red-500">
                        <p>
                          Erreur lors de la conversion du contenu:{' '}
                          {error.message}
                        </p>
                        <p className="mt-2">
                          Veuillez vérifier la structure du contenu dans la
                          console.
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
            )}
          </article>

          {/* Produit associé - Affiché uniquement si l'article a un produit associé défini par l'admin */}
          {article.relatedProductId && article.relatedProductImage && (
            <div className="mb-12 p-6 bg-green-50 rounded-xl shadow-sm">
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="text-green-600 mr-2" />
                Produit recommandé avec cet article
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 rounded-lg">
                <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                  <img
                    src={article.relatedProductImage}
                    alt={article.relatedProductName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">
                    {article.relatedProductName}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Ce produit est parfaitement complémentaire avec les
                    informations présentées dans cet article. Découvrez ses
                    bienfaits et comment il peut enrichir votre routine
                    bien-être.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {article.relatedProductPrice}€
                    </span>
                    <button
                      onClick={() => {
                        // Logique d'ajout au panier
                        console.log(
                          `Ajout du produit ${article.relatedProductId} au panier`
                        );
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors transform active:scale-95"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Partage social */}
          <div className="border-t border-gray-200 pt-8 mb-16">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Partager cet article
            </h3>
            <div className="flex gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Partager sur Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                aria-label="Partager sur Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(article.imageUrl)}&description=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Partager sur Pinterest"
              >
                <FaPinterestP />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors"
                aria-label="Partager sur LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Articles similaires */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8">
            Articles similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/magazine/${relatedArticle.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedArticle.imageUrl}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-green-600 font-medium mb-2">
                      {relatedArticle.category}
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default MagazineDetails;
