import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../ui/SearchInput';
import ActionButton from '../ui/ActionButton';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import { FiRefreshCw } from 'react-icons/fi';

const OrdersManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Mettre à jour la liste des commandes en déclenchant une nouvelle récupération
    setRefreshTrigger((prev) => prev + 1);

    // Mettre à jour l'ordre sélectionné si c'est celui qui est affiché
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow p-4 sm:p-6 sm:rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Gestion des commandes
          </h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <SearchInput
              placeholder="Rechercher une commande..."
              value={search}
              onChange={setSearch}
            />
            <ActionButton
              label="Actualiser"
              icon={<FiRefreshCw />}
              onClick={() => setRefreshTrigger((prev) => prev + 1)}
              color="blue"
            />
          </div>
        </div>

        {/* Filtres de statut */}
        <div className="flex flex-wrap gap-2 mb-4">
          <StatusFilterButton
            label="Toutes"
            status="all"
            currentFilter={statusFilter}
            onClick={setStatusFilter}
          />
          <StatusFilterButton
            label="En attente"
            status="pending"
            currentFilter={statusFilter}
            onClick={setStatusFilter}
          />
          <StatusFilterButton
            label="En traitement"
            status="processing"
            currentFilter={statusFilter}
            onClick={setStatusFilter}
          />
          <StatusFilterButton
            label="Expédiées"
            status="shipped"
            currentFilter={statusFilter}
            onClick={setStatusFilter}
          />
          <StatusFilterButton
            label="Livrées"
            status="delivered"
            currentFilter={statusFilter}
            onClick={setStatusFilter}
          />
          <StatusFilterButton
            label="Annulées"
            status="cancelled"
            currentFilter={statusFilter}
            onClick={setStatusFilter}
          />
        </div>

        <OrderList
          search={search}
          statusFilter={statusFilter}
          onViewDetails={handleViewOrderDetails}
          key={refreshTrigger} // Forcer la réinitialisation du composant lorsque refreshTrigger change
        />
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

// Composant bouton de filtre de statut
const StatusFilterButton = ({ label, status, currentFilter, onClick }) => {
  const isActive = currentFilter === status;

  return (
    <button
      className={`px-3 py-1 text-sm font-medium rounded-md ${
        isActive
          ? 'bg-orange-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      onClick={() => onClick(status)}
    >
      {label}
    </button>
  );
};

StatusFilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

OrdersManagement.propTypes = {};

export default OrdersManagement;
