# inHerbisVeritas

inHerbisVeritas est une application e-commerce spécialisée dans les produits naturels et bio, combinant une boutique en ligne et un magazine éditorial pour promouvoir un mode de vie naturel et durable.

## Technologies

- **Frontend** : React, Tailwind CSS
- **Backend** : Supabase (BaaS - Backend as a Service)
- **Authentification** : Supabase Auth (JWT)
- **Base de données** : PostgreSQL (via Supabase)
- **Stockage** : Supabase Storage
- **Déploiement** : Vercel

## Configuration du Projet

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez les variables suivantes :

```
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_clé_anonyme_supabase
```

### Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm start

# Build pour la production
npm run build
```

## Fonctionnalités Utilisateur

### Authentification et Profil Utilisateur

- **Inscription et Connexion** : Création de compte, connexion via email/mot de passe ou fournisseurs OAuth
- **Gestion de profil** : Modification des informations personnelles, changement de mot de passe
- **Suivi des commandes** : Historique et statut des commandes en temps réel
- **Préférences personnalisées** : Enregistrement des préférences (type de peau, allergies, parfums préférés)
- **Conversion compte invité** : Processus fluide de conversion d'un compte invité vers un compte permanent

### Expérience d'Achat Personnalisée

- **Recommandations personnalisées** : Suggestions de produits basées sur les préférences utilisateur, l'historique d'achat et les problématiques spécifiques (allergies, type de peau)
- **Notifications de disponibilité** : Alertes pour les produits saisonniers ou en édition limitée
- **Programme de fidélité** : Accumulation de points, récompenses et avantages exclusifs
- **Avis et commentaires** : Système de notation et commentaires sur les produits

### Engagement Communautaire et Éducation

- **Webinaires** : Sessions en ligne avec des experts en plantes médicinales et cosmétiques naturels
- **Ateliers** : Accès gratuit à des ateliers en ligne ou en personne pour les clients fidèles, avec possibilité d'offrir à un proche
- **Discussions magazine** : Participation aux conversations sous les articles du magazine
- **Contenus éducatifs** : Articles détaillés sur les bienfaits et usages des produits naturels

## Schéma de la Base de Données

### Tables Principales

| Nom de la Table | Description |
|----------------|------------|
| users | Informations des utilisateurs |
| products | Catalogue des produits |
| orders | Commandes des clients |
| order_items | Produits dans les commandes |
| articles | Articles du magazine |
| reviews | Avis sur les produits |

### Tables de Fonctionnalités Utilisateur

| Nom de la Table | Description |
|----------------|------------|
| users_preferences | Préférences utilisateur (type de peau, allergies, parfums préférés) |
| users_stories | Agrégation des données pour le système de recommandation |
| product_notifications | Alertes de disponibilité pour les produits |
| webinars | Informations sur les webinaires |
| webinar_participants | Inscriptions aux webinaires, incluant la fonctionnalité de cadeau |
| article_comments | Commentaires sur les articles du magazine |
| loyalty_points | Points de fidélité des utilisateurs |

## Exemple d'Utilisations des Services API

```javascript
// Récupération des recommandations personnalisées
const { data: recommendations } = await recommendationService.getPersonalizedRecommendations(userId);

// Inscription à un webinaire
const { data: registration } = await webinarService.registerForWebinar(webinarId, userId);

// Inscription à un webinaire en cadeau pour un autre utilisateur
const { data: giftRegistration } = await webinarService.registerForWebinar(webinarId, userId, friendUserId);

// Mise à jour des préférences utilisateur
const { data: updatedPreferences } = await userPreferencesService.updateUserPreferences(userId, {
  skinType: 'sensible',
  concerns: ['rougeurs', 'sécheresse'],
  preferredScents: ['lavande', 'rose']
});

// Abonnement aux notifications de disponibilité
const { data: notification } = await notificationService.subscribeToProductAvailability(userId, productId);
```

## Intégrations et APIs Externes

- **Stripe** : Traitement des paiements
- **SendGrid** : Envoi d'emails transactionnels et marketing
- **Algolia** : Moteur de recherche avancé
- **Google Analytics** : Suivi des métriques du site

## Optimisation SEO et Conversion

L'application implémente plusieurs stratégies pour optimiser le référencement et le taux de conversion :

- Structure de page claire avec balisage HTML sémantique
- URLs optimisées et slugs pour les produits et articles
- Rich snippets pour les produits et avis
- Chargement optimisé des images et lazy loading
- Design responsive et accessible
- Formulaires et parcours d'achat simplifiés

## Sécurité

- **Row Level Security (RLS)** : Contrôle d'accès au niveau des lignes dans Supabase
- **JWT** : Jetons d'authentification sécurisés pour les sessions utilisateur
- **Validation des données** : Validation côté client et serveur
- **HTTPS** : Toutes les communications sont chiffrées

## Contribution

Les contributions sont les bienvenues ! Veuillez consulter nos guides de contribution et de style de code dans le dossier `docs/`.

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
