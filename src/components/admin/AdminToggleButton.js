import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HiOutlineCog } from 'react-icons/hi';
import { HiOutlineHome } from 'react-icons/hi';

/**
 * Composant de bouton flottant pour basculer entre l'interface admin et le site public
 * Ne s'affiche que pour les utilisateurs ayant des droits d'admin
 * Conserve la position/page dans chaque section lors des allers-retours
 */
const AdminToggleButton = () => {
  const { currentUser, userRole, isAdmin } = useAuth();
  const [isAdminView, setIsAdminView] = useState(false);
  const navigate = useNavigate();

  // Détermine si l'utilisateur est actuellement sur une page d'administration
  useEffect(() => {
    const path = window.location.pathname;
    setIsAdminView(path.startsWith('/admin'));
  }, [window.location.pathname]);

  // Si l'utilisateur n'est pas connecté ou n'est pas admin, ne pas afficher le bouton
  if (!currentUser || !isAdmin) {
    return null;
  }

  // Gestion du basculement entre l'interface admin et publique
  const handleToggle = () => {
    const currentPath = window.location.pathname;

    // Stocker le chemin actuel dans le localStorage pour pouvoir y revenir
    if (isAdminView) {
      // Si on est sur une page admin, stocker le chemin admin et aller vers la page publique équivalente
      localStorage.setItem('lastAdminPath', currentPath);
      const publicPath = localStorage.getItem('lastPublicPath') || '/';
      navigate(publicPath);
    } else {
      // Si on est sur une page publique, stocker le chemin public et aller vers la page admin équivalente
      localStorage.setItem('lastPublicPath', currentPath);
      const adminPath =
        localStorage.getItem('lastAdminPath') || '/admin/dashboard';
      navigate(adminPath);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label={
        isAdminView
          ? 'Aller au site public'
          : "Aller à l'interface d'administration"
      }
      title={
        isAdminView
          ? 'Aller au site public'
          : "Aller à l'interface d'administration"
      }
    >
      {isAdminView ? (
        <HiOutlineHome className="w-6 h-6" />
      ) : (
        <HiOutlineCog className="w-6 h-6" />
      )}
    </button>
  );
};

export default AdminToggleButton;
