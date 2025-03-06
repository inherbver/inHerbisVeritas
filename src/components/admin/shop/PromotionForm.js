import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import ActionButton from '../ui/ActionButton';
import { supabase } from '../../../config/supabase';

const PromotionForm = ({ promotion, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    code: '',
    discount_type: 'percentage',
    amount: '',
    valid_from: '',
    valid_to: '',
    status: 'active',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (promotion) {
      // Formater les dates pour l'input de type date
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setForm({
        code: promotion.code || '',
        discount_type: promotion.discount_type || 'percentage',
        amount: promotion.amount || '',
        valid_from: formatDate(promotion.valid_from) || '',
        valid_to: formatDate(promotion.valid_to) || '',
        status: promotion.status || 'active',
        description: promotion.description || '',
      });
    } else {
      // Réinitialiser le formulaire pour une nouvelle promotion
      const today = new Date().toISOString().split('T')[0];
      setForm({
        code: '',
        discount_type: 'percentage',
        amount: '',
        valid_from: today,
        valid_to: today,
        status: 'active',
        description: '',
      });
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const promotionData = {
        code: form.code,
        discount_type: form.discount_type,
        amount: parseFloat(form.amount),
        valid_from: form.valid_from,
        valid_to: form.valid_to,
        status: form.status,
        description: form.description,
      };

      if (promotion) {
        // Mettre à jour une promotion existante
        const { error } = await supabase
          .from('promotions')
          .update(promotionData)
          .eq('id', promotion.id);

        if (error) throw error;
      } else {
        // Créer une nouvelle promotion
        const { error } = await supabase
          .from('promotions')
          .insert([promotionData]);

        if (error) throw error;
      }

      if (onSave) onSave();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={promotion ? 'Modifier la promotion' : 'Ajouter une promotion'}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code promotion
            </label>
            <input
              type="text"
              name="code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={form.code}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de réduction
              </label>
              <select
                name="discount_type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={form.discount_type}
                onChange={handleChange}
                required
              >
                <option value="percentage">Pourcentage (%)</option>
                <option value="fixed">Montant fixe (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant {form.discount_type === 'percentage' ? '(%)' : '(€)'}
              </label>
              <input
                type="number"
                name="amount"
                step={form.discount_type === 'percentage' ? '1' : '0.01'}
                min="0"
                max={form.discount_type === 'percentage' ? '100' : '1000'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                name="valid_from"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={form.valid_from}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                name="valid_to"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={form.valid_to}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              name="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <ActionButton onClick={onClose} label="Annuler" color="gray" />
          <ActionButton
            type="submit"
            label={
              loading
                ? 'Enregistrement...'
                : promotion
                  ? 'Mettre à jour'
                  : 'Ajouter'
            }
            color="orange"
            disabled={loading}
          />
        </div>
      </form>
    </Modal>
  );
};

PromotionForm.propTypes = {
  promotion: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    code: PropTypes.string,
    discount_type: PropTypes.oneOf(['percentage', 'fixed']),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valid_from: PropTypes.string,
    valid_to: PropTypes.string,
    status: PropTypes.oneOf(['active', 'inactive']),
    description: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};

PromotionForm.defaultProps = {
  promotion: null,
  onSave: null,
};

export default PromotionForm;
