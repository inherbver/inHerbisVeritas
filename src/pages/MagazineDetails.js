import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import StandardPageLayout from '../components/StandardPageLayout';
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaQuoteLeft,
} from 'react-icons/fa';
import SocialMediaFooter from '../components/SocialMediaFooter';

const MagazineDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // Trouver l'article correspondant à l'ID de l'URL
    const foundArticle = articles.find(
      (a) => a.id.toString() === id || a.slug === id
    );

    if (foundArticle) {
      setArticle(foundArticle);

      // Trouver des articles similaires (même catégorie ou articles récents)
      const similar = articles
        .filter(
          (a) =>
            a.category === foundArticle.category && a.id !== foundArticle.id
        )
        .slice(0, 3);

      // Si pas assez d'articles dans la même catégorie, ajouter des articles récents
      if (similar.length < 3) {
        const recent = articles
          .filter(
            (a) =>
              a.id !== foundArticle.id && !similar.some((s) => s.id === a.id)
          )
          .slice(0, 3 - similar.length);

        setRelatedArticles([...similar, ...recent]);
      } else {
        setRelatedArticles(similar);
      }
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <StandardPageLayout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-pulse text-2xl text-green-600">
            Chargement...
          </div>
        </div>
      </StandardPageLayout>
    );
  }

  if (!article) {
    return (
      <StandardPageLayout>
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl font-serif mb-4">Article introuvable</h1>
          <p className="mb-6 text-gray-600">
            L'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link
            to="/magazine"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors"
          >
            <FaArrowLeft />
            Retour aux articles
          </Link>
        </div>
      </StandardPageLayout>
    );
  }

  // Contenu factice pour l'exemple
  const articleContent = {
    intro:
      "Dans un monde où le stress et l'anxiété sont omniprésents, revenir aux remèdes naturels peut apporter un profond soulagement. Parmi ces trésors botaniques, la camomille occupe une place de choix, appréciée depuis des millénaires pour ses nombreuses vertus médicinales et esthétiques.",

    paragraphs: [
      {
        title: 'Histoire et tradition de la camomille',
        content:
          "La camomille, ou Matricaria chamomilla pour les botanistes, est une plante herbacée de la famille des Astéracées. Son nom vient du grec ancien « chamaimelon » signifiant « pomme de terre », en référence au parfum de ses fleurs qui rappelle celui de la pomme. Utilisée depuis l'Égypte ancienne, elle était considérée comme un remède sacré dédié au dieu Soleil pour ses propriétés curatives. Les Romains l'employaient pour aromatiser leurs boissons, tandis que les médecins médiévaux la prescrivaient contre les insomnies et les fièvres.",
      },
      {
        title: 'Propriétés apaisantes pour le corps',
        content:
          "La richesse de la camomille réside dans ses composés actifs, notamment les flavonoïdes et les huiles essentielles comme l'azulène, qui lui confèrent ses propriétés anti-inflammatoires, antiseptiques et antispasmodiques. En infusion, elle favorise la digestion, soulage les crampes d'estomac et diminue les inflammations intestinales. Appliquée en compresse, elle apaise les irritations cutanées, l'eczéma et même les brûlures légères.",
      },
      {
        title: "Un allié contre le stress et l'anxiété",
        content:
          "Dans notre quotidien effréné, la camomille offre un havre de tranquillité. Ses propriétés légèrement sédatives aident à combattre l'anxiété sans provoquer de somnolence excessive pendant la journée. Une tasse d'infusion de camomille avant le coucher favorise l'endormissement et améliore la qualité du sommeil. Des études scientifiques ont confirmé que la consommation régulière de camomille pouvait réduire significativement les symptômes d'anxiété généralisée.",
      },
      {
        title: 'Beauté et soins naturels',
        content:
          'En cosmétique, la camomille est un ingrédient précieux, particulièrement pour les peaux sensibles ou à tendance réactive. Son action anti-inflammatoire apaise les rougeurs, tandis que ses propriétés antioxydantes combattent le vieillissement cutané. Pour les cheveux blonds, un rinçage à la camomille intensifie naturellement les reflets dorés. Intégrée dans des masques maison, elle purifie et adoucit la peau en profondeur.',
      },
    ],

    quote:
      "La camomille nous rappelle que les solutions les plus simples sont souvent les plus efficaces : prendre le temps de s'arrêter, respirer, et savourer une tasse de cette infusion dorée peut transformer notre journée.",

    conclusion:
      "Qu'elle soit consommée en tisane apaisante, appliquée en soin cosmétique ou utilisée en aromathérapie, la camomille nous invite à redécouvrir la sagesse des remèdes ancestraux. Dans notre quête de bien-être, cette modeste fleur blanche aux pétales délicats nous enseigne que la douceur est parfois la plus grande des forces. Facile à cultiver et à intégrer dans notre quotidien, elle représente une passerelle accessible vers une approche plus naturelle de notre santé et de notre beauté.",
  };

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
          {/* Introduction */}
          <p className="text-lg md:text-xl font-serif text-gray-800 mb-8 leading-relaxed">
            {articleContent.intro}
          </p>

          {/* Paragraphes avec sous-titres */}
          {articleContent.paragraphs.map((paragraph, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
                {paragraph.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {paragraph.content}
              </p>

              {/* Image entre les paragraphes (tous les 2 paragraphes) */}
              {index % 2 === 1 && (
                <div className="my-10 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={`/assets/images/mag_${index + 2}.jpeg`}
                    alt={paragraph.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Citation mise en avant */}
          <div className="my-12 bg-green-50 border-l-4 border-green-500 p-6 md:p-8 rounded-r-lg shadow-sm">
            <div className="flex">
              <FaQuoteLeft className="text-green-400 text-3xl mr-4 mt-1" />
              <blockquote className="text-xl font-serif text-gray-700 italic">
                {articleContent.quote}
              </blockquote>
            </div>
          </div>

          {/* Conclusion */}
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            {articleContent.conclusion}
          </p>

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
