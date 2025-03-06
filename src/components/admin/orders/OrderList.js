import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { supabase } from '../../../config/supabase';

const OrderList = ({ search, onViewDetails, statusFilter }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase.from('orders').select('*');

      // Appliquer un filtre de statut si spécifié
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query.order('created_at', {
        ascending: false,
      });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Données factices pour la démo
      setOrders([
        {
          id: 'ORD-001',
          customer_name: 'Marie Dupont',
          email: 'marie.dupont@example.com',
          total: 68.5,
          status: 'pending',
          created_at: '2023-07-20T14:30:45',
          items: 3,
        },
        {
          id: 'ORD-002',
          customer_name: 'Jean Martin',
          email: 'jean.martin@example.com',
          total: 125.75,
          status: 'shipped',
          created_at: '2023-07-19T10:15:22',
          items: 5,
        },
        {
          id: 'ORD-003',
          customer_name: 'Sophie Bernard',
          email: 'sophie.bernard@example.com',
          total: 42.0,
          status: 'delivered',
          created_at: '2023-07-18T16:45:30',
          items: 2,
        },
        {
          id: 'ORD-004',
          customer_name: 'Thomas Petit',
          email: 'thomas.petit@example.com',
          total: 89.9,
          status: 'cancelled',
          created_at: '2023-07-17T09:20:15',
          items: 4,
        },
        {
          id: 'ORD-005',
          customer_name: 'Camille Leblanc',
          email: 'camille@example.com',
          total: 35.25,
          status: 'pending',
          created_at: '2023-07-16T19:10:05',
          items: 1,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Mettre à jour la liste des commandes localement
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Erreur lors de la mise à jour du statut de la commande');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune commande trouvée
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Commande
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Client
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Articles
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Statut
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.customer_name}
                </div>
                <div className="text-sm text-gray-500">{order.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.total.toFixed(2)} €
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.items}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Voir les détails"
                  >
                    <FiEye />
                  </button>

                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'processing')}
                      className="text-blue-600 hover:text-blue-900"
                      title="Marquer comme en traitement"
                    >
                      <FiCheckCircle />
                    </button>
                  )}

                  {(order.status === 'pending' ||
                    order.status === 'processing') && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                      className="text-red-600 hover:text-red-900"
                      title="Annuler la commande"
                    >
                      <FiXCircle />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderList.propTypes = {
  search: PropTypes.string,
  onViewDetails: PropTypes.func.isRequired,
  statusFilter: PropTypes.string,
};

OrderList.defaultProps = {
  search: '',
  statusFilter: 'all',
};

export default OrderList;
