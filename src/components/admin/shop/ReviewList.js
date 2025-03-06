import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiStar, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../../config/supabase';

const ReviewList = ({ search }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Dans une app réelle, remplacer par un vrai appel à Supabase
      const { data, error } = await supabase
        .from('reviews')
        .select('*, products(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Données factices pour la démo
      setReviews([
        {
          id: 1,
          product_id: 1,
          products: { name: 'Huile Essentielle de Lavande' },
          user_name: 'Marie D.',
          rating: 5,
          comment:
            "Excellent produit, je recommande vivement ! L'odeur est parfaite et les effets sont remarquables.",
          created_at: '2023-10-15',
        },
        {
          id: 2,
          product_id: 2,
          products: { name: 'Tisane Détox Bio' },
          user_name: 'Pierre L.',
          rating: 4,
          comment:
            "Très bon goût, effet détox ressenti après quelques jours d'utilisation.",
          created_at: '2023-10-12',
        },
        {
          id: 3,
          product_id: 3,
          products: { name: "Savon Naturel à l'Argan" },
          user_name: 'Isabelle M.',
          rating: 5,
          comment:
            'Ce savon est une merveille pour ma peau sensible ! Texture agréable et odeur délicate.',
          created_at: '2023-10-10',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      try {
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('id', reviewId);

        if (error) throw error;

        // Mettre à jour la liste des avis
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } catch (error) {
        console.error('Error deleting review:', error);
        alert("Erreur lors de la suppression de l'avis");
      }
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.products.name.toLowerCase().includes(search.toLowerCase()) ||
      review.user_name.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (filteredReviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">Aucun avis trouvé</div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white shadow overflow-hidden rounded-md p-4"
        >
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">
                {review.user_name}
              </div>
              <div className="text-xs text-gray-500">
                Produit: {review.products.name}
              </div>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-xs text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="ml-4 text-red-600 hover:text-red-900"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>

          {/* Ajouter une option pour répondre à l'avis */}
          <div className="mt-3 flex justify-end">
            <button className="text-sm text-[#FE5000] hover:text-orange-700">
              Répondre à cet avis
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  search: PropTypes.string,
};

ReviewList.defaultProps = {
  search: '',
};

export default ReviewList;
