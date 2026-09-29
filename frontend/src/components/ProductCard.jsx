import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash2, Tag, Box, Image as ImageIcon } from 'lucide-react';

const ProductCard = ({ product, onDelete }) => {
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const creatorId = typeof product.createdBy === 'object' ? product.createdBy?.id || product.createdBy?._id : product.createdBy;
  const isOwner = user && creatorId === user.id;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(product.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <ImageIcon className="w-12 h-12 mb-1" />
            <span className="text-xs">No image provided</span>
          </div>
        )}

        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-sky-700 dark:text-sky-400 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-gray-100 dark:border-gray-800">
          <Tag className="w-3 h-3" />
          {product.category}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1 mb-1" title={product.name}>
            {product.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3" title={product.description}>
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between my-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className={`flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
              product.stock > 0 
                ? 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
            }`}>
              <Box className="w-3 h-3 mr-1" />
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>
              By: {typeof product.createdBy === 'object' ? product.createdBy.name : 'User'}
            </span>

            {isOwner && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800 rounded transition-colors"
                  title="Edit product"
                >
                  <Edit className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 rounded transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Product</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">"{product.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
