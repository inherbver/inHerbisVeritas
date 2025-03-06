import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import ActionButton from '../ui/ActionButton';
import { FiPackage, FiTruck, FiCheck, FiX } from 'react-icons/fi';
import { supabase } from '../../../config/supabase';

const OrderDetails = ({ order, isOpen, onClose, onStatusChange }) => {
  const [loading, setLoading] = useState(false);

  // Données de simulation pour les produits de la commande
  const orderItems = order
    ? [
        {
          id: 1,
          product_name: 'Huile essentielle de Lavande',
          price: 15.5,
          quantity: 2,
          total: 31.0,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 2,
          product_name: 'Tisane Détox Bio',
          price: 12.9,
          quantity: 1,
          total: 12.9,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 3,
          product_name: "Diffuseur d'arômes ultrasonique",
          price: 24.6,
          quantity: 1,
          total: 24.6,
          image: 'https://via.placeholder.com/50',
        },
      ]
    : [];

  if (!order) return null;

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

  const handleUpdateStatus = async (newStatus) => {
    if (
      !window.confirm(
        `Êtes-vous sûr de vouloir changer le statut de la commande à "${getStatusLabel(newStatus)}" ?`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id);

      if (error) throw error;

      if (onStatusChange) {
        onStatusChange(order.id, newStatus);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Erreur lors de la mise à jour du statut de la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Détails de la commande ${order.id}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Informations générales */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Statut</h3>
              <span
                className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Date de commande
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total</h3>
              <p className="mt-1 text-sm text-gray-900 font-semibold">
                {order.total.toFixed(2)} €
              </p>
            </div>
          </div>
        </div>

        {/* Informations client */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Informations client
          </h3>
          <div className="bg-white border border-gray-200 rounded-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Nom</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {order.customer_name}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="mt-1 text-sm text-gray-900">{order.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Téléphone</h4>
                <p className="mt-1 text-sm text-gray-900">+33 6 12 34 56 78</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Adresse de livraison
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  123 Rue des Herbes
                  <br />
                  75001 Paris
                  <br />
                  France
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Articles de la commande */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Articles commandés
          </h3>
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
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
                    Prix unitaire
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantité
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md"
                            src={item.image}
                            alt={item.product_name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.product_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.price.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.total.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                  >
                    Sous-total:
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {orderItems
                      .reduce((acc, item) => acc + item.total, 0)
                      .toFixed(2)}{' '}
                    €
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                  >
                    Frais de livraison:
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    5.00 €
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-sm font-bold text-gray-900 text-right"
                  >
                    Total:
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {order.total.toFixed(2)} €
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-4 flex flex-wrap justify-end space-x-3">
          {order.status === 'pending' && (
            <ActionButton
              label="En traitement"
              icon={<FiPackage />}
              onClick={() => handleUpdateStatus('processing')}
              color="blue"
              disabled={loading}
            />
          )}

          {order.status === 'processing' && (
            <ActionButton
              label="Expédier"
              icon={<FiTruck />}
              onClick={() => handleUpdateStatus('shipped')}
              color="purple"
              disabled={loading}
            />
          )}

          {order.status === 'shipped' && (
            <ActionButton
              label="Livré"
              icon={<FiCheck />}
              onClick={() => handleUpdateStatus('delivered')}
              color="green"
              disabled={loading}
            />
          )}

          {['pending', 'processing'].includes(order.status) && (
            <ActionButton
              label="Annuler"
              icon={<FiX />}
              onClick={() => handleUpdateStatus('cancelled')}
              color="red"
              disabled={loading}
            />
          )}

          <ActionButton
            label="Fermer"
            onClick={onClose}
            color="gray"
            disabled={loading}
          />
        </div>
      </div>
    </Modal>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    customer_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func,
};

OrderDetails.defaultProps = {
  onStatusChange: null,
};

export default OrderDetails;
