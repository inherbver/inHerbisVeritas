# In Herbis Veritas - Site e-commerce

## Authentification

L'application utilise **Firebase Authentication** avec 2 fournisseurs :

- 🔵 Connexion Google
- 🔷 Connexion Facebook

### Configuration requise

1. Ajouter vos identifiants Firebase dans `config/firebaseConfig.js`
2. Activer les providers dans la [console Firebase](https://console.firebase.google.com)
3. Déployer les règles de sécurité Firestore si nécessaire

## Démarrage

```bash
npm install
npm start
```
