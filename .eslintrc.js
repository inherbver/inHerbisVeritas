module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // ✅ Ajout pour éviter les erreurs sur `module` et `process`
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // Permet les variables non utilisées en mode 'warn' (pour ne pas bloquer le build)
    '@typescript-eslint/no-unused-vars': 'warn',

    // Désactive la règle obligeant l'import de React dans chaque fichier .jsx/.tsx
    'react/react-in-jsx-scope': 'off',

    // Configuration Prettier
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        // Permet d'ignorer la longueur en français si besoin
        // printWidth: 100, // Ajuste la largeur si tu le souhaites
      },
    ],

    // Désactive la détection d'espaces "non réguliers" (accents, etc.)
    'no-irregular-whitespace': 'off',

    // Tolère des lignes plus longues dans les strings et commentaires
    // afin de ne pas générer d'erreurs si le texte français est un peu long
    'max-len': [
      'error',
      {
        code: 100, // Ajuste la largeur selon ta préférence
        ignoreStrings: true,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
  },
};

