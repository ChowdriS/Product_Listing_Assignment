import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetProducts } from '../redux/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { 
    items: products, 
    loading, 
    total 
  } = useSelector(state => state.products);
  const { selectedCategory } = useSelector(state => state.categories);
  const { searchQuery } = useSelector(state => state.search);

  useEffect(() => {
    // Reset products when category or search changes
    dispatch(resetProducts());
    dispatch(getProducts({
      category: selectedCategory,
      search: searchQuery,
      limit: 10,
      skip: 0
    }));
  }, [dispatch, selectedCategory, searchQuery]);

  const loadMoreProducts = () => {
    dispatch(getProducts({
      category: selectedCategory,
      search: searchQuery,
      limit: 10,
      skip: products.length
    }));
  };

  if (loading && products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
      <div className="product-list p-4">
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.uniqueKey} className="product-card border rounded-lg p-4 shadow-md bg-white">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600 text-sm">${product.price}</p>
            </div>
          ))}
        </div>
        <button 
          className="load-more-btn mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={loadMoreProducts}
        >
          Load More
        </button>
      </div>
  )
};

export default ProductList;