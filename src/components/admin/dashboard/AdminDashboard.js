import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FiEdit,
  FiShoppingBag,
  FiUsers,
  FiMessageSquare,
} from 'react-icons/fi';
import AlertItem from '../ui/AlertItem';

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Dans une app réelle, appel à Supabase pour récupérer les alertes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Données fictives pour la démo
      setAlerts([
        {
          id: 1,
          type: 'warning',
          title: 'Attention',
          message:
            'Produit en rupture de stock : Huile essentielle de Lavande Bio',
          link: '/admin/products',
        },
        {
          id: 2,
          type: 'info',
          title: 'Information',
          message: '5 nouvelles commandes à traiter',
          link: '/admin/orders',
        },
        {
          id: 4,
          type: 'error',
          title: 'Erreur',
          message: 'Échec de la mise à jour du prix du produit #125',
          link: '/admin/products',
        },
      ]);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du tableau de bord:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Liste des produits les plus vendus (fictive)
  const topProducts = [
    { id: 1, name: 'Huile essentielle de Lavande', sales: 124, stock: 45 },
    { id: 2, name: 'Tisane Détox Bio', sales: 98, stock: 32 },
    {
      id: 3,
      name: "Diffuseur d'arômes ultrasonique",
      sales: 85,
      stock: 17,
    },
    { id: 4, name: 'Pack Huiles Essentielles Bien-être', sales: 76, stock: 28 },
    { id: 5, name: 'Savon Bio au Calendula', sales: 65, stock: 53 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Chargement...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Administration du site
        </h1>
        <p className="text-gray-600">
          Bienvenue dans votre interface d'administration
        </p>
      </div>

      {/* Raccourcis d'accès rapide */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Accès rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FiShoppingBag className="text-green-600 mr-3" size={24} />
            <div>
              <h3 className="font-medium">Gestion des produits</h3>
              <p className="text-sm text-gray-600">
                Ajouter ou modifier les produits
              </p>
            </div>
          </a>

          <a
            href="/admin/orders"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FiEdit className="text-blue-600 mr-3" size={24} />
            <div>
              <h3 className="font-medium">Commandes</h3>
              <p className="text-sm text-gray-600">
                Gérer les commandes en cours
              </p>
            </div>
          </a>

          <a
            href="/admin/customers"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FiUsers className="text-purple-600 mr-3" size={24} />
            <div>
              <h3 className="font-medium">Utilisateurs</h3>
              <p className="text-sm text-gray-600">
                Gérer les comptes utilisateurs
              </p>
            </div>
          </a>

          <a
            href="/admin/reviews"
            className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <FiMessageSquare className="text-yellow-600 mr-3" size={24} />
            <div>
              <h3 className="font-medium">Avis clients</h3>
              <p className="text-sm text-gray-600">Modérer les avis</p>
            </div>
          </a>
        </div>
      </div>

      {/* Alertes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Alertes récentes
        </h2>
        <div className="space-y-3">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <AlertItem
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                link={alert.link}
              />
            ))
          ) : (
            <p className="text-gray-500">
              Vous n&apos;avez aucune notification non lue.
            </p>
          )}
        </div>
      </div>

      {/* Produits à surveiller */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Stock à surveiller
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Produit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        product.stock < 20
                          ? 'text-red-600 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      {product.stock} unités
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href={`/admin/products?id=${product.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Modifier
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  stats: PropTypes.object,
  alerts: PropTypes.array,
  loading: PropTypes.bool,
};

export default AdminDashboard;
