import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../../config/supabase';

const ProductList = ({ search, onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Dans une app réelle, remplacer par un vrai appel à Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Données factices pour la démo
      setProducts([
        {
          id: 1,
          name: 'Huile Essentielle de Lavande',
          price: 15.99,
          stock: 18,
          category: 'Huiles essentielles',
        },
        {
          id: 2,
          name: 'Tisane Détox Bio',
          price: 8.99,
          stock: 7,
          category: 'Tisanes',
        },
        {
          id: 3,
          name: "Savon Naturel à l'Argan",
          price: 6.99,
          stock: 3,
          category: 'Soins',
        },
        {
          id: 4,
          name: 'Sérum Visage Anti-âge',
          price: 22.5,
          stock: 9,
          category: 'Soins visage',
        },
        {
          id: 5,
          name: 'Baume Réparateur Lèvres',
          price: 5.5,
          stock: 15,
          category: 'Soins',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      if (onDelete) {
        onDelete(id);
      } else {
        try {
          const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

          if (error) throw error;
          setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Erreur lors de la suppression du produit');
        }
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">Aucun produit trouvé</div>
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
              Nom
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Catégorie
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Prix
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {product.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.price} €</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`text-sm ${product.stock < 5 ? 'text-red-500 font-medium' : 'text-gray-500'}`}
                >
                  {product.stock}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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

ProductList.propTypes = {
  search: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

ProductList.defaultProps = {
  search: '',
};

export default ProductList;
