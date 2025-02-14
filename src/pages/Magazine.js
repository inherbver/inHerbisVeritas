import React from 'react';
import { Link } from 'react-router-dom';

const Magazine = () => {
  const articles = [
    {
      id: 1,
      title: 'Hydratation et soins naturels',
      category: 'Beauté',
      image: '/assets/images/mag_1.jpg',
      excerpt:
        'Découvrez comment hydrater votre peau naturellement avec des huiles végétales et des plantes aux vertus apaisantes.',
      buttonText: 'En savoir plus →',
    },
    {
      id: 2,
      title: 'Les bienfaits des tisanes sauvages',
      category: 'Bien-être',
      image: '/assets/images/mag_2.jpg',
      excerpt:
        'Certaines plantes sauvages ont des effets bénéfiques sur la digestion et le sommeil. Apprenez à les intégrer à votre routine.',
      buttonText: 'En savoir plus →',
    },
    {
      id: 3,
      title: 'Créer son rituel bien-être avec la nature',
      category: 'Rituel Naturel',
      image: '/assets/images/mag_3.jpg',
      excerpt:
        'Reconnectez-vous à la nature avec un rituel simple à base de plantes, d’encens et de méditation pour une relaxation profonde.',
      buttonText: 'En savoir plus →',
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold text-center mt-8 mb-8">Magazine</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                {article.category}
              </span>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.excerpt}</p>
              <Link
                to={`/article/${article.id}`}
                className="inline-flex items-center text-green-500 hover:text-green-700 transition-colors duration-200"
              >
                {article.buttonText}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Magazine;
