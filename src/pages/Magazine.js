import React from 'react';

const Magazine = () => {
  const articles = [
    {
      title: '🌼 Le Calendula : La Fleur aux Pouvoirs Apaisants',
      description:
        'Découvrez les multiples vertus du calendula, cette fleur solaire reconnue pour ses propriétés protectrices, apaisantes et réparatrices. Un allié incontournable pour votre peau et votre bien-être.',
      imageUrl: '/assets/images/mag_1.jpeg',
      category: 'Beauté éco-responsable',
    },
    {
      title: '🧼 Tutoriel DIY : Fabriquez Vos Propres Savons Artisanaux',
      description:
        'Envie de créer des savons uniques aux senteurs personnalisées ? Suivez notre guide pas à pas pour confectionner des savons artisanaux chez vous, alliant plaisir créatif et soins naturels pour votre peau.',
      imageUrl: '/assets/images/mag_2.jpeg',
      category: 'Soin du visage',
    },
    {
      title: "🌿 L'Immortelle : La Plante aux Vertus Régénérantes",
      description:
        "Découvrez l'immortelle, cette fleur aux propriétés anti-inflammatoires et cicatrisantes exceptionnelles. Un trésor de la nature pour favoriser la régénération de votre peau et atténuer les imperfections.",
      imageUrl: '/assets/images/mag_3.jpeg',
      category: 'Maquillage durable',
    },
    {
      title: '🍏 Programme Détox : Retrouver Vitalité et Équilibre',
      description:
        'Après les excès, offrez à votre corps une pause bien méritée. Découvrez notre programme détox complet pour purifier votre organisme, booster votre énergie et retrouver un bien-être optimal.',
      imageUrl: '/assets/images/mag_4.jpeg',
      category: 'Cheveux bio',
    },
    {
      title: "🍹 L'Extracteur de Jus : Votre Allié Santé en Hiver",
      description:
        'Combattez la fatigue hivernale en faisant le plein de vitamines ! Apprenez à utiliser un extracteur de jus pour préparer des boissons nutritives et délicieuses, idéales pour renforcer vos défenses naturelles.',
      imageUrl: '/assets/images/mag_5.jpeg',
      category: 'DIY Beauté',
    },
    {
      title:
        '🌳 Les Propriétés du Frêne (Fraxinus Angustifolia) : Un Remède Naturel Méconnu',
      description:
        'Le frêne, arbre majestueux, possède des vertus thérapeutiques insoupçonnées. Découvrez comment ses feuilles et son écorce peuvent contribuer à soulager divers maux et améliorer votre santé au quotidien.',
      imageUrl: '/assets/images/mag_6.jpeg',
      category: 'Cosmétiques naturels',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8 mt-16 md:mt-16 lg:mt-20">
          Magazine : Nature & Bien-Être
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <div className="text-green-500 uppercase text-sm font-bold mb-1">
                  {article.category}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                >
                  Lire la suite →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Magazine;
