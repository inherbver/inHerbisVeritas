import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiPlus } from 'react-icons/fi';
import SearchInput from '../ui/SearchInput';
import ActionButton from '../ui/ActionButton';
import PromotionList from './PromotionList';
import PromotionForm from './PromotionForm';

const PromotionsManagement = () => {
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const handleOpenForm = (promotion = null) => {
    setSelectedPromotion(promotion);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPromotion(null);
  };

  const handleSavePromotion = () => {
    // Ici, la liste des promotions sera automatiquement mise à jour
    // car le composant PromotionList récupère les données à chaque fois
    handleCloseForm();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow p-4 sm:p-6 sm:rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Gestion des promotions
          </h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <SearchInput
              placeholder="Rechercher un code promo..."
              value={search}
              onChange={setSearch}
            />
            <ActionButton
              label="Nouvelle promotion"
              icon={<FiPlus />}
              onClick={() => handleOpenForm()}
              color="orange"
            />
          </div>
        </div>

        <PromotionList search={search} onEdit={handleOpenForm} />
      </div>

      <PromotionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSavePromotion}
        promotion={selectedPromotion}
      />
    </div>
  );
};

PromotionsManagement.propTypes = {};

export default PromotionsManagement;
