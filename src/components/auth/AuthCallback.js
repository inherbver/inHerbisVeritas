import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour traiter les paramètres d'URL après redirection de l'authentification
    const handleAuthCallback = async () => {
      try {
        // Récupérer les paramètres d'URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        
        // Si nous avons un token de réinitialisation de mot de passe, rediriger vers la page de réinitialisation
        if (queryParams.get('type') === 'recovery') {
          navigate('/reset-password');
          return;
        }
        
        // Si nous avons un paramètre d'accès, c'est une connexion
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken) {
          // Définir la session avec les tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            throw error;
          }
          
          // Rediriger vers le tableau de bord
          navigate('/');
        } else {
          // S'il n'y a pas de token, vérifier l'état de la session actuelle
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            navigate('/');
          } else {
            navigate('/signin');
          }
        }
      } catch (err) {
        console.error('Erreur lors du traitement de la redirection:', err);
        setError(err.message);
      } finally {
        setProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {processing ? 'Vérification de votre identité...' : error ? 'Une erreur est survenue' : 'Redirection en cours...'}
        </h2>
        
        {error && (
          <div className="mt-8">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <p className="text-red-600">{error}</p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/signin')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Retour à la page de connexion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
