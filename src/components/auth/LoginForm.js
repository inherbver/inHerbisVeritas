import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Composant de formulaire de connexion
 * Utilise le contexte d'authentification modifié pour appeler le backend Express
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (!result.success) {
        setError(result.error.message || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      // Redirection après connexion réussie
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Une erreur s'est produite lors de la connexion");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-gray-700">
              Mot de passe
            </label>
            <a
              href="/reset-password"
              className="text-sm text-green-600 hover:underline"
            >
              Mot de passe oublié?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Pas encore de compte?{' '}
          <a href="/signup" className="text-green-600 hover:underline">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
