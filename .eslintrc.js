module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // ✅ Ajout pour éviter les erreurs sur `module` et `process`
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },

  env: {
    browser: true,
    es2021: true,
    node: true,  // ← Ajoute ceci pour éviter l'erreur sur `process`
  },
};
