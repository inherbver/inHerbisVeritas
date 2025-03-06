import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../../config/supabase';

const PromotionList = ({ search, onEdit }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      // Dans une app réelle, remplacer par un vrai appel à Supabase
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      // Données factices pour la démo
      setPromotions([
        {
          id: 1,
          code: 'ETE2023',
          discount_type: 'percentage',
          amount: 15,
          valid_from: '2023-06-01',
          valid_to: '2023-08-31',
          status: 'active',
          created_at: '2023-05-15',
        },
        {
          id: 2,
          code: 'BIENVENUE',
          discount_type: 'fixed',
          amount: 5,
          valid_from: '2023-01-01',
          valid_to: '2023-12-31',
          status: 'active',
          created_at: '2023-01-01',
        },
        {
          id: 3,
          code: 'NOEL2023',
          discount_type: 'percentage',
          amount: 20,
          valid_from: '2023-12-01',
          valid_to: '2023-12-25',
          status: 'inactive',
          created_at: '2023-11-15',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')
    ) {
      try {
        const { error } = await supabase
          .from('promotions')
          .delete()
          .eq('id', promotionId);

        if (error) throw error;

        // Mettre à jour la liste des promotions
        setPromotions(promotions.filter((promo) => promo.id !== promotionId));
      } catch (error) {
        console.error('Error deleting promotion:', error);
        alert('Erreur lors de la suppression de la promotion');
      }
    }
  };

  const filteredPromotions = promotions.filter((promo) =>
    promo.code.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (filteredPromotions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune promotion trouvée
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
              Code
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Montant
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Validité
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
          {filteredPromotions.map((promo) => (
            <tr key={promo.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {promo.code}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {promo.discount_type === 'percentage'
                    ? 'Pourcentage'
                    : 'Montant fixe'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {promo.discount_type === 'percentage'
                    ? `${promo.amount}%`
                    : `${promo.amount} €`}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(promo.valid_from).toLocaleDateString()} -{' '}
                  {new Date(promo.valid_to).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    promo.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {promo.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(promo)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDeletePromotion(promo.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PromotionList.propTypes = {
  search: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
};

PromotionList.defaultProps = {
  search: '',
};

export default PromotionList;
