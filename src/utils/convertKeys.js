/**
 * Utilitaires de conversion entre formats camelCase et snake_case
 * Utilisés pour faciliter la communication entre le frontend (camelCase)
 * et la base de données Supabase (snake_case)
 */

/**
 * Convertit une chaîne de camelCase vers snake_case
 * Exemple: "imageUrl" -> "image_url"
 */
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convertit une chaîne de snake_case vers camelCase
 * Exemple: "image_url" -> "imageUrl"
 */
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convertit récursivement les clés d'un objet ou d'un tableau d'objets de camelCase vers snake_case
 * @param {Object|Array} obj - L'objet ou tableau à convertir
 * @returns {Object|Array} - Nouvel objet avec les clés en snake_case
 */
export function toSnakeCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = camelToSnake(key);
      newObj[newKey] = toSnakeCase(value);
    }
    return newObj;
  }
  return obj; // Retourne tel quel pour les valeurs primitives (string, number, bool, null...)
}

/**
 * Convertit récursivement les clés d'un objet ou d'un tableau d'objets de snake_case vers camelCase
 * @param {Object|Array} obj - L'objet ou tableau à convertir
 * @returns {Object|Array} - Nouvel objet avec les clés en camelCase
 */
export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = snakeToCamel(key);
      newObj[newKey] = toCamelCase(value);
    }
    return newObj;
  }
  return obj; // Retourne tel quel pour les valeurs primitives (string, number, bool, null...)
}
