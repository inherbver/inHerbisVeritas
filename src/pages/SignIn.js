import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, rediriger vers la boutique
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Utiliser la fonction signIn du contexte au lieu d'un fetch direct
        const result = await signIn(email, password);

        console.log('Résultat de la connexion:', result);

        if (!result.success) {
          throw new Error(result.error.message || "Erreur d'authentification");
        }

        // Pas besoin d'explicitement mettre à jour currentUser ou de naviguer
        // Le contexte met déjà à jour currentUser, et le useEffect s'en chargera
      } else {
        // Inscription via serveur Express
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors de l'inscription");
        } else {
          // Message de confirmation d'inscription
          alert(
            'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.'
          );
          setIsLogin(true); // Basculer vers le formulaire de connexion
        }
      }
    } catch (err) {
      console.error("Erreur d'authentification:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError(
        'Veuillez entrer votre adresse email pour réinitialiser votre mot de passe'
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:5000/api/auth/reset-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Erreur lors de la réinitialisation du mot de passe'
        );
      }
      alert('Un lien de réinitialisation a été envoyé à votre adresse email');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const translateError = (message) => {
    const errors = {
      'Invalid login credentials': 'Identifiants invalides',
      'User not found': 'Utilisateur non trouvé',
      'Email not confirmed':
        'Email non confirmé, veuillez vérifier votre boîte de réception',
      'Password should be at least 6 characters':
        'Le mot de passe doit contenir au moins 6 caractères',
    };
    return errors[message] || "Erreur lors de l'authentification";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Connexion à votre compte' : 'Création de compte'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse e-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-green-600 hover:text-green-500"
              >
                {isLogin
                  ? 'Pas de compte ? Créer un compte'
                  : 'Déjà un compte ? Se connecter'}
              </button>

              {isLogin && (
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading
                  ? 'Chargement...'
                  : isLogin
                    ? 'Connexion'
                    : 'Créer un compte'}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600">
                {translateError(error)}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
