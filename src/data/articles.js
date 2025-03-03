// Importer les produits pour les liens croisés
import { products } from './products';

export const articles = [
  {
    id: 1,
    imageUrl: '/assets/images/mag_1.jpeg',
    category: 'Plantes médicinales',
    title: 'Les bienfaits de la camomille pour la santé et la beauté',
    excerpt:
      'Découvrez comment la camomille peut améliorer votre bien-être quotidien, calmer votre peau et apaiser votre esprit. Cette plante aux multiples vertus est utilisée depuis des millénaires en médecine traditionnelle.',
    date: '15 mars 2025',
    readTime: '7 min',
    relatedProductId: products[0].id,
    relatedProductImage: products[0].imageUrl,
    relatedProductName: products[0].title,
    relatedProductPrice: products[0].price,
    articleUrl: '/articles/camomille',
  },
  {
    id: 2,
    imageUrl: '/assets/images/mag_2.jpeg',
    category: 'Cuisine',
    title: 'Recettes aux herbes aromatiques pour sublimer vos plats',
    excerpt:
      'Cuisinez avec les herbes de votre jardin pour des plats savoureux et sains. Nous vous proposons une sélection de recettes simples qui mettent en valeur les herbes aromatiques fraîches ou séchées.',
    date: '28 février 2025',
    readTime: '10 min',
    relatedProductId: products[2].id,
    relatedProductImage: products[2].imageUrl,
    relatedProductName: products[2].title,
    relatedProductPrice: products[2].price,
    articleUrl: '/articles/herbes-aromatiques',
  },
  {
    id: 3,
    imageUrl: '/assets/images/mag_3.jpeg',
    category: 'Huiles essentielles',
    title: 'Guide complet des huiles essentielles et leurs bienfaits',
    excerpt:
      'Tout savoir sur les huiles essentielles et leurs utilisations thérapeutiques. Ce guide vous aide à comprendre les propriétés de chaque huile essentielle et à les utiliser en toute sécurité.',
    date: '10 février 2025',
    readTime: '15 min',
    relatedProductId: products[3].id,
    relatedProductImage: products[3].imageUrl,
    relatedProductName: products[3].title,
    relatedProductPrice: products[3].price,
    articleUrl: '/articles/huiles-essentielles',
  },
  {
    id: 4,
    imageUrl: '/assets/images/mag_4.jpeg',
    category: 'Cosmétiques naturels',
    title: 'Fabriquer ses cosmétiques maison : guide étape par étape',
    excerpt:
      'Créez vos propres produits de beauté naturels et écologiques. Découvrez les ingrédients de base et les techniques simples pour réaliser des cosmétiques efficaces et respectueux de votre peau.',
    date: '5 février 2025',
    readTime: '12 min',
    relatedProductId: products[1].id,
    relatedProductImage: products[1].imageUrl,
    relatedProductName: products[1].title,
    relatedProductPrice: products[1].price,
    articleUrl: '/articles/cosmetiques-naturels',
  },
  {
    id: 5,
    imageUrl: '/assets/images/mag_5.jpeg',
    category: 'Jardinage',
    title: 'Cultiver son jardin bio : les principes fondamentaux',
    excerpt:
      "Apprenez à cultiver un jardin bio et respectueux de l'environnement. Nos conseils pour préparer la terre, choisir les bonnes associations de plantes et entretenir votre jardin sans produits chimiques.",
    date: '25 janvier 2025',
    readTime: '8 min',
    articleUrl: '/articles/jardinage-bio',
  },
  {
    id: 6,
    imageUrl: '/assets/images/mag_6.jpeg',
    category: 'Remèdes naturels',
    title: 'Soigner les petits maux du quotidien avec les plantes',
    excerpt:
      'Découvrez les remèdes naturels pour soulager les maux du quotidien. De la digestion difficile aux troubles du sommeil, les plantes offrent des solutions douces et efficaces pour de nombreux problèmes de santé.',
    date: '18 janvier 2025',
    readTime: '9 min',
    articleUrl: '/articles/remedes-naturels',
  },
  {
    id: 7,
    imageUrl: '/assets/images/mag_7.jpeg',
    category: 'Bien-être',
    title: 'Rituels de beauté naturels inspirés des traditions du monde',
    excerpt:
      "Explorez les rituels de beauté ancestraux de différentes cultures et adaptez-les à votre routine quotidienne. Des secrets de beauté transmis de génération en génération qui n'ont rien perdu de leur efficacité.",
    date: '10 janvier 2025',
    readTime: '11 min',
    relatedProductId: products[5].id,
    relatedProductImage: products[5].imageUrl,
    relatedProductName: products[5].title,
    relatedProductPrice: products[5].price,
  },
  {
    id: 8,
    imageUrl: '/assets/images/mag_8.jpeg',
    category: 'Aromathérapie',
    title: "L'aromathérapie pour améliorer le sommeil et réduire le stress",
    excerpt:
      "Comment les huiles essentielles peuvent vous aider à mieux dormir et à gérer votre stress quotidien. Des mélanges simples et des techniques d'application pour un bien-être optimal.",
    date: '5 janvier 2025',
    readTime: '6 min',
  },
];

// Articles mis en avant (selection des 2 premiers)
export const featuredArticles = [articles[0], articles[2]];

// Créer des slugs pour les URL d'articles
articles.forEach((article) => {
  article.slug = article.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
});

// Assurons-nous que les articles ont tous un articleUrl
articles.forEach((article) => {
  if (!article.articleUrl) {
    article.articleUrl = `/magazine/${article.slug || article.id}`;
  }
});
