import React from 'react';
import ArticleCard from '../components/ArticleCard';

const Magazine = () => {
  const articles = [
    {
      id: '1',
      imageUrl: '/assets/images/mag_1.jpeg',
      title: 'Article 1: Eco-Friendly Beauty Tips',
      category: 'Beauty',
      excerpt: 'Discover the best eco-friendly beauty tips for a sustainable lifestyle.',
      articleUrl: '/articles/eco-friendly-beauty-tips'
    },
    {
      id: '2',
      imageUrl: '/assets/images/mag_2.jpeg',
      title: 'Article 2: Natural Skin Care Routine',
      category: 'Skin Care',
      excerpt: 'Learn how to create a natural skin care routine using organic products.',
      articleUrl: '/articles/natural-skin-care-routine'
    },
    {
      id: '3',
      imageUrl: '/assets/images/mag_3.jpeg',
      title: 'Article 3: Sustainable Makeup Brands',
      category: 'Makeup',
      excerpt: 'Explore the top sustainable makeup brands that are good for you and the planet.',
      articleUrl: '/articles/sustainable-makeup-brands'
    },
    {
      id: '4',
      imageUrl: '/assets/images/mag_4.jpeg',
      title: 'Article 4: Organic Hair Care Products',
      category: 'Hair Care',
      excerpt: 'Find the best organic hair care products for healthy and shiny hair.',
      articleUrl: '/articles/organic-hair-care-products'
    },
    {
      id: '5',
      imageUrl: '/assets/images/mag_5.jpeg',
      title: 'Article 5: DIY Natural Beauty Recipes',
      category: 'DIY',
      excerpt: 'Create your own natural beauty recipes at home with simple ingredients.',
      articleUrl: '/articles/diy-natural-beauty-recipes'
    },
    {
      id: '6',
      imageUrl: '/assets/images/mag_6.jpeg',
      title: 'Article 6: The Benefits of Natural Cosmetics',
      category: 'Cosmetics',
      excerpt: 'Learn about the benefits of using natural cosmetics for your skin and health.',
      articleUrl: '/articles/benefits-of-natural-cosmetics'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Magazine Éco-Beauté
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            {...article}
          />
        ))}
      </div>
    </div>
  );
};

export default Magazine;
