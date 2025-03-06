import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiCreditCard,
} from 'react-icons/fi';
import StatCard from '../ui/StatCard';
import AlertItem from '../ui/AlertItem';

// Composant de graphique simplifié pour la démo
const SimpleChart = ({ data, label, color }) => {
  // Simulation d'un graphique simple en utilisant des barres
  const maxValue = Math.max(...data);

  return (
    <div className="pt-6">
      <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
      <div className="flex items-end space-x-2 h-40">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-opacity-80 rounded-t-md"
            style={{
              height: `${(value / maxValue) * 100}%`,
              backgroundColor: color,
            }}
            title={`Jour ${index + 1}: ${value}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">1</span>
        <span className="text-xs text-gray-500">
          {Math.floor(data.length / 2)}
        </span>
        <span className="text-xs text-gray-500">{data.length}</span>
      </div>
    </div>
  );
};

SimpleChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    sales: { value: 0, change: 0 },
    orders: { value: 0, change: 0 },
    customers: { value: 0, change: 0 },
    revenue: { value: 0, change: 0 },
  });

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données simulées pour les graphiques
  const salesData = [15, 22, 18, 24, 35, 30, 28, 32, 36, 30, 28, 35, 42, 38];
  const revenueData = [
    280, 350, 300, 450, 600, 580, 550, 620, 700, 680, 650, 750, 820, 780,
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Dans une app réelle, appel à Supabase pour récupérer les statistiques et alertes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Données fictives pour la démo
      setStats({
        sales: { value: 2547, change: 12.5 },
        orders: { value: 178, change: 8.2 },
        customers: { value: 1253, change: 4.3 },
        revenue: { value: 12350, change: 15.8 },
      });

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
          id: 3,
          type: 'info',
          title: 'Succès',
          message: 'Les objectifs de vente mensuels ont été atteints',
          link: '/admin/dashboard',
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
      name: 'Diffuseur d&apos;arômes ultrasonique',
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
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Vue d&apos;ensemble de votre boutique</p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventes totales"
          value={stats.sales.value}
          trend={stats.sales.change}
          icon={<FiShoppingBag size={24} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Commandes"
          value={stats.orders.value}
          trend={stats.orders.change}
          icon={<FiCreditCard size={24} />}
          color="bg-orange-500"
        />
        <StatCard
          title="Clients"
          value={stats.customers.value}
          trend={stats.customers.change}
          icon={<FiUsers size={24} />}
          color="bg-green-500"
        />
        <StatCard
          title="Revenu (€)"
          value={stats.revenue.value.toLocaleString('fr-FR')}
          trend={stats.revenue.change}
          icon={<FiTrendingUp size={24} />}
          color="bg-purple-500"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Ventes (14 derniers jours)
          </h2>
          <SimpleChart
            data={salesData}
            label="Nombre de ventes par jour"
            color="#FE5000"
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Revenus (14 derniers jours)
          </h2>
          <SimpleChart
            data={revenueData}
            label="Revenus en euros (€) par jour"
            color="#3B82F6"
          />
        </div>
      </div>

      {/* Produits les plus vendus et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produits les plus vendus */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Top 5 produits
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topProducts.map((product, index) => (
              <div key={product.id} className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 w-8 text-gray-500 font-semibold">
                  #{index + 1}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <div className="flex mt-1">
                    <span className="text-xs text-gray-500 mr-4">
                      {product.sales} ventes
                    </span>
                    <span
                      className={`text-xs ${product.stock < 20 ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes récentes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Alertes récentes
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <AlertItem
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                link={alert.link}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section activité récente (peut être développée davantage) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Activité récente
        </h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <FiCreditCard className="text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Nouvelle commande #ORD-005
              </p>
              <p className="text-xs text-gray-500">
                Il y a 10 minutes - Camille Leblanc - 35.25 €
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUsers className="text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Nouveau client enregistré
              </p>
              <p className="text-xs text-gray-500">
                Il y a 45 minutes - Thomas Roche
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <FiTrendingUp className="text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Augmentation des ventes détectée
              </p>
              <p className="text-xs text-gray-500">
                Il y a 2 heures - +15% par rapport à hier
              </p>
            </div>
          </div>
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
