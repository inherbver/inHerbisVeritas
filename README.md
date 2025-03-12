# In Herbis Veritas - Plateforme Herboriste et Magazine

## Guide pour Utilisateurs Non-Techniques

### Présentation du Projet
In Herbis Veritas est une plateforme dédiée aux produits à base de plantes et d'herbes médicinales, comprenant à la fois une boutique en ligne et un magazine spécialisé. Ce projet vise à offrir une expérience utilisateur fluide et intuitive pour la découverte, l'achat de produits naturels et l'accès à des connaissances sur les plantes médicinales.

### Fonctionnalités Principales
- **Boutique en ligne** : Catalogue de produits naturels et herboristerie
- **Magazine** : Articles thématiques sur les plantes, recettes et bien-être
- **Administration** : Interface simplifiée pour gérer les produits et articles
- **Authentification** : Connexion sécurisée pour les administrateurs et utilisateurs
- **Basculement Admin/Public** : Fonctionnalité permettant aux administrateurs de naviguer facilement entre l'interface d'administration et le site public

### Accès à l'Administration
Pour accéder à l'interface d'administration :
1. Connectez-vous avec vos identifiants
2. Accédez au tableau de bord via le menu principal
3. Utilisez les outils de gestion d'articles et de produits
4. Basculez entre l'interface admin et le site public grâce au bouton flottant (réservé aux administrateurs)

### Gestion des Articles du Magazine
La nouvelle interface d'administration permet :
- Création d'articles avec éditeur simplifié
- Attribution de catégories et produits associés
- Mise en avant d'articles sur la page d'accueil
- Filtrage et recherche dans la liste des articles

## Guide pour Développeurs

### Stack Technique
- **Frontend** : React (v18+)
- **Styles** : Tailwind CSS
- **Routage** : React Router v6
- **Service d'Authentification** : Express.js + Supabase Auth (hébergé sur Render)
- **Base de données** : Supabase (PostgreSQL)
- **État** : React Context API et useState/useEffect

### Authentification et Gestion des Rôles

L'application implémente un système d'authentification robuste avec gestion des rôles :

- **Système à trois couches** : 
  1. Frontend React avec AuthContext
  2. Service d'authentification Express.js
  3. Supabase Auth comme backend

- **Principaux rôles** :
  - **User** : Accès au site public et à son profil personnel
  - **Admin** : Accès complet au tableau de bord d'administration et à toutes les fonctionnalités de gestion

- **Sécurité** :
  - Cookies HTTP-only pour les jetons d'authentification
  - Expiration automatique des sessions
  - Protection contre les attaques CSRF et XSS

### To Do (12/03/2025)

- [ ] **Migration complète vers Supabase** :
  - Basculer `useMockData = false` dans articleService
  - Vérifier les requêtes et la structure des tables
  - Tester toutes les opérations CRUD

- [ ] **Optimisation du code** :
  - Refactoriser les services pour une meilleure réutilisation
  - Améliorer la gestion d'erreurs
  - Optimiser les requêtes Supabase (pagination, filtres)

- [ ] **Gestion des images** :
  - Implémenter l'upload et le redimensionnement d'images
  - Configurer le stockage via Supabase Storage
  - Optimiser le chargement des images (lazy loading)

- [ ] **Tests cross-platform** :
  - Tester l'application sur différents navigateurs (Chrome, Firefox, Safari)
  - Vérifier la compatibilité mobile (iOS, Android)
  - Tester sur différentes tailles d'écran

- [ ] **Déploiement** :
  - Mettre à jour le service d'authentification sur Render
  - Configurer le déploiement automatique
  - Configurer le monitoring et les alertes

### Architecture du Projet
```
src/
├── components/          # Composants réutilisables
│   ├── admin/           # Interface d'administration
│   ├── auth/            # Composants d'authentification
│   ├── layout/          # Éléments de mise en page
│   └── magazine/        # Composants spécifiques au magazine
├── contexts/            # Contextes React (Auth, Panier, etc.)
├── data/                # Données mockées pour le développement
├── pages/               # Pages principales de l'application
├── services/            # Couche service pour l'accès aux données
│   └── api/             # Services API et configuration
├── styles/              # Styles globaux et utilitaires CSS
└── utils/               # Fonctions utilitaires

auth-service/            # Service d'authentification séparé
├── server.js            # Point d'entrée du serveur Express
├── controllers/         # Logique des endpoints d'authentification
├── middleware/          # Middleware d'authentification et sécurité
├── routes/              # Définition des routes d'API
└── config/              # Configuration (Supabase, cookies, etc.)
```

### Couche Service et Gestion des Données
Le projet utilise une architecture en couches avec une séparation claire entre :
- **Composants UI** : Responsables de l'affichage
- **Services** : Gestion de l'accès aux données et logique métier
- **Contextes** : Partage d'état global

#### Service d'Articles
Le service d'articles (`articleService.js`) fournit une interface unifiée pour gérer les articles du magazine :

```javascript
// Exemples d'utilisation
import articleService from '../services/api/articleService';

// Récupérer tous les articles
const { data, count, error } = await articleService.getArticles({ 
  category: 'Plantes médicinales',
  search: 'camomille',
  page: 1,
  limit: 10 
});

// Créer un article
const { data, error } = await articleService.createArticle({
  title: 'Nouveau titre',
  category: 'Bien-être',
  excerpt: 'Description courte...',
  content: 'Contenu complet...',
  featured: false
});
```

#### Mode Développement vs Production
Le service supporte deux modes de fonctionnement :
- **Mode développement** (`useMockData = true`) : Utilise des données mockées
- **Mode production** (`useMockData = false`) : Utilise Supabase comme backend

Cette approche permet de développer sans dépendre d'un backend et facilite la transition vers la production.

### Déploiement

L'application est déployée sur deux services distincts :

1. **Frontend React** : Déployé sur Vercel ou Netlify
2. **Service d'Authentification** : Déployé sur Render

Cette séparation offre plusieurs avantages :
- Meilleure scalabilité (chaque service peut évoluer indépendamment)
- Sécurité renforcée (séparation des préoccupations)
- Flexibilité pour les évolutions futures

### Configuration Environnement

#### Variables d'environnement Frontend (.env.local)
```
REACT_APP_AUTH_SERVICE_URL=https://inherbis-auth.onrender.com/api
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_clé_publique_supabase
```

#### Variables d'environnement Service Auth (.env)
```
PORT=5000
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_clé_service_supabase
NODE_ENV=production
CORS_ORIGIN=https://inherbisveritas.com
COOKIE_SECRET=votre_secret_cookie
```

## Contributions et Développement

### Bonnes Pratiques
- Suivre les conventions de nommage et l'organisation du projet
- Utiliser les composants et services existants
- Documenter les nouvelles fonctionnalités
- Tester les changements en développement avant de déployer

### Workflow Git
1. Créer une branche pour la fonctionnalité
2. Implémenter les changements
3. Tester localement
4. Créer une Pull Request
5. Revue de code
6. Merge et déploiement
