export const products = [
  {
    id: 1,
    slug: 'baume-apres-rasage',
    title: 'Baume Après-Rasage',
    description:
      'Baume nourrissant et apaisant pour peaux sèches, sujettes aux rougeurs et imperfections.',
    price: parseFloat(14.9).toFixed(2),
    volume: '50ml',
    category: 'Baumes',
    imageUrl: '/assets/images/pdct_1.jpg',
    stock: 20,
    rating: 4.7,
    composition: [
      'Huile de tournesol',
      'Huile de cameline',
      'Huile de sésame',
      'Cire d’abeille',
      'Huile essentielle de copahu',
      'Huile essentielle de katafray',
      'Huile essentielle de menthe-bergamote',
    ],
    usageTips:
      'Appliquer une noisette sur peau propre et sèche après le rasage. Masser jusqu’à absorption.',
    storageTips: "Conserver à l'abri de la chaleur et de la lumière.",
    benefits: [
      'Hydratation intense',
      'Apaisement des rougeurs',
      'Effet cicatrisant et purifiant',
    ],
  },
  {
    id: 2,
    slug: 'baume-tonifiant-regenerant',
    title: 'Baume Tonifiant & Régénérant',
    description:
      'Baume naturel pour redonner vitalité et éclat aux peaux sèches et matures.',
    price: parseFloat(16.5).toFixed(2),
    volume: '50ml',
    category: 'Baumes',
    imageUrl: '/assets/images/pdct_2.jpg',
    stock: 18,
    rating: 4.8,
    composition: [
      'Huile de tournesol',
      'Huile de cameline',
      'Huile de sésame',
      'Cire d’abeille',
      'Huile essentielle de ciste ladanifère',
      'Huile essentielle d’encens',
      'Huile essentielle de bois de Hô',
      'Huile essentielle de géranium rosat',
    ],
    usageTips:
      'Chauffer une petite quantité entre les mains et appliquer sur peau propre et sèche matin et soir.',
    storageTips: "Conserver à l'abri de la lumière et de l'humidité.",
    benefits: [
      'Hydratation et nutrition profonde',
      'Action anti-âge et régénérante',
      'Équilibre et éclat du teint',
    ],
  },
  {
    id: 3,
    slug: 'huile-nourrissante-apaisante',
    title: 'Huile Nourrissante & Apaisante',
    description:
      'Huile polyvalente pour le visage et le corps, enrichie en camomille et lavande.',
    price: parseFloat(19.0).toFixed(2),
    volume: '100ml',
    category: 'Huiles',
    imageUrl: '/assets/images/pdct_3.jpg',
    stock: 25,
    rating: 4.9,
    composition: [
      'Huile de tournesol',
      'Huile d’amande douce',
      'Huile de sésame',
      'Huile essentielle de camomille allemande',
      'Huile essentielle de lavande fine',
    ],
    usageTips:
      'Appliquer quelques gouttes sur peau propre et sèche en massant délicatement.',
    storageTips: 'Conserver dans un endroit frais et sec.',
    benefits: [
      'Hydratation intense',
      'Apaisement des irritations',
      'Effet relaxant et équilibrant',
    ],
  },
  {
    id: 4,
    slug: 'macerat-huileux-millepertuis',
    title: 'Macérat Huileux de Millepertuis',
    description:
      'Soin réparateur et apaisant pour le visage et le corps, idéal après une exposition au soleil.',
    price: parseFloat(18.5).toFixed(2),
    volume: '100ml',
    category: 'Huiles',
    imageUrl: '/assets/images/pdct_4.jpg',
    stock: 22,
    rating: 4.8,
    composition: [
      'Huile de tournesol',
      'Extrait de millepertuis',
      'Huile essentielle de lavande fine',
    ],
    usageTips:
      'Appliquer sur les zones sensibles ou irritées en massant délicatement.',
    storageTips:
      "Éviter l'exposition au soleil après application. Conserver à l'abri de la lumière.",
    benefits: [
      'Apaisement des rougeurs et irritations',
      'Effet cicatrisant et régénérant',
      'Relaxation et bien-être',
    ],
  },
  {
    id: 5,
    slug: 'poudre-odorante-bruler-ethiopia',
    title: 'Poudre Odorante à Brûler - ETHIOPIA',
    description:
      'Encens en poudre naturelle aux notes mystiques de myrrhe, oliban et cyprès.',
    price: parseFloat(12.9).toFixed(2),
    volume: '50g',
    category: 'Encens',
    imageUrl: '/assets/images/pdct_5.jpg',
    stock: 30,
    rating: 4.7,
    composition: ['Myrrhe', 'Oliban', 'Cyprès'],
    usageTips:
      'Déposer une pincée de poudre sur un charbon ardent et laisser se consumer.',
    storageTips:
      'Conserver dans un récipient hermétique à l’abri de l’humidité.',
    benefits: [
      'Apaisement et sérénité',
      'Élévation spirituelle',
      'Purification de l’espace',
    ],
  },
  {
    id: 6,
    slug: 'sel-gruissan-hibiscus',
    title: 'Sel de Gruissan à l’Hibiscus',
    description:
      'Sel marin artisanal aux calices d’hibiscus bio, parfait pour rehausser vos plats.',
    price: parseFloat(9.5).toFixed(2),
    volume: '150g',
    category: 'Sels aromatisés',
    imageUrl: '/assets/images/pdct_6.jpg',
    stock: 28,
    rating: 4.6,
    composition: ['Sel de Gruissan', 'Calices d’hibiscus bio'],
    usageTips:
      'Saupoudrer sur vos plats après cuisson pour conserver la saveur et la couleur.',
    storageTips: 'Conserver à l’abri de l’humidité et de la lumière.',
    benefits: [
      'Apporte une touche acidulée et florale',
      'Riche en antioxydants',
      'Sublime les plats visuellement et gustativement',
    ],
  },
];
