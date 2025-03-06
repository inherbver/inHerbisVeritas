import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FiAlertCircle,
  FiTrendingUp,
  FiShoppingCart,
  FiUser,
  FiEye,
  FiPackage,
  FiStar,
} from 'react-icons/fi';
import { supabase } from '../../config/supabase';

const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white rounded-lg shadow p-5">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {trend && (
          <p
            className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend > 0 ? '+' : ''}
            {trend}% depuis le mois dernier
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  trend: PropTypes.number,
  color: PropTypes.string.isRequired,
};

StatCard.defaultProps = {
  trend: null,
};

const AlertItem = ({ title, message, type, link }) => (
  <Link to={link} className="block">
    <div
      className={`p-4 rounded-lg mb-3 border-l-4 ${
        type === 'error'
          ? 'border-red-500 bg-red-50'
          : type === 'warning'
            ? 'border-yellow-500 bg-yellow-50'
            : 'border-blue-500 bg-blue-50'
      }`}
    >
      <div className="flex items-start">
        <div
          className={`rounded-full p-1 mr-3 ${
            type === 'error'
              ? 'text-red-500'
              : type === 'warning'
                ? 'text-yellow-500'
                : 'text-blue-500'
          }`}
        >
          <FiAlertCircle size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  </Link>
);

AlertItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info']).isRequired,
  link: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('day');
  const [stats, setStats] = useState({
    revenue: { value: 0, trend: 0 },
    orders: { value: 0, trend: 0 },
    visitors: { value: 0, trend: 0 },
    conversion: { value: 0, trend: 0 },
  });
  const [alerts, setAlerts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // In a real app, these would be actual API calls to Supabase
    const fetchDashboardData = async () => {
      try {
        // Simulate API calls with timeRange
        // In a real implementation, you would query Supabase based on timeRange
        console.log(`Fetching dashboard data for ${timeRange}`);

        // Mock data
        const mockStats = {
          day: {
            revenue: { value: '320 €', trend: 5.2 },
            orders: { value: '12', trend: 3.1 },
            visitors: { value: '156', trend: 12.5 },
            conversion: { value: '7.8%', trend: 1.2 },
          },
          week: {
            revenue: { value: '1650 €', trend: 8.1 },
            orders: { value: '45', trend: 6.3 },
            visitors: { value: '980', trend: 9.2 },
            conversion: { value: '4.6%', trend: -1.5 },
          },
          month: {
            revenue: { value: '6200 €', trend: 12.3 },
            orders: { value: '187', trend: 10.7 },
            visitors: { value: '4350', trend: 15.8 },
            conversion: { value: '4.3%', trend: -0.8 },
          },
          year: {
            revenue: { value: '76500 €', trend: 24.5 },
            orders: { value: '2150', trend: 18.2 },
            visitors: { value: '54700', trend: 30.1 },
            conversion: { value: '3.9%', trend: -2.3 },
          },
        };

        setStats(mockStats[timeRange]);

        // Mock alerts
        setAlerts([
          {
            id: 1,
            title: 'Stock faible',
            message: '3 produits ont un stock inférieur à 5 unités',
            type: 'warning',
            link: '/admin/shop',
          },
          {
            id: 2,
            title: 'Nouvelles commandes',
            message: '4 nouvelles commandes à traiter',
            type: 'info',
            link: '/admin/orders',
          },
          {
            id: 3,
            title: 'Avis clients',
            message: '2 nouveaux avis clients en attente de modération',
            type: 'info',
            link: '/admin/shop',
          },
        ]);

        // Mock top products
        setTopProducts([
          { id: 1, name: 'Huile Essentielle de Lavande', sales: 24, stock: 18 },
          { id: 2, name: 'Tisane Détox Bio', sales: 18, stock: 7 },
          { id: 3, name: "Savon Naturel à l'Argan", sales: 15, stock: 3 },
          { id: 4, name: 'Sérum Visage Anti-âge', sales: 12, stock: 9 },
          { id: 5, name: 'Baume Réparateur Lèvres', sales: 10, stock: 15 },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {/* Time range selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-2">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded ${
                timeRange === range
                  ? 'bg-[#FE5000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Chiffre d'affaires"
          value={stats.revenue.value}
          icon={<FiTrendingUp size={24} className="text-white" />}
          trend={stats.revenue.trend}
          color="bg-blue-500"
        />
        <StatCard
          title="Commandes"
          value={stats.orders.value}
          icon={<FiShoppingCart size={24} className="text-white" />}
          trend={stats.orders.trend}
          color="bg-green-500"
        />
        <StatCard
          title="Visiteurs"
          value={stats.visitors.value}
          icon={<FiEye size={24} className="text-white" />}
          trend={stats.visitors.trend}
          color="bg-purple-500"
        />
        <StatCard
          title="Taux de conversion"
          value={stats.conversion.value}
          icon={<FiUser size={24} className="text-white" />}
          trend={stats.conversion.trend}
          color="bg-orange-500"
        />
      </div>

      {/* Alerts and top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="font-semibold text-lg mb-4">Alertes</h3>
          <div className="space-y-2">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  title={alert.title}
                  message={alert.message}
                  type={alert.type}
                  link={alert.link}
                />
              ))
            ) : (
              <p className="text-gray-500">Aucune alerte actuellement</p>
            )}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="font-semibold text-lg mb-4">
            Produits les plus vendus
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ventes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiShoppingCart className="mr-2 text-green-500" />
                        <span className="text-sm text-gray-900">
                          {product.sales}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div
                        className={`text-sm ${product.stock < 5 ? 'text-red-500 font-medium' : 'text-gray-500'}`}
                      >
                        {product.stock} en stock
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Even though the component doesn't currently accept props, we're adding PropTypes
// for future-proofing and consistency with other components
Dashboard.propTypes = {};

export default Dashboard;
