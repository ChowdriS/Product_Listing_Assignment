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
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div 
            key={product.uniqueKey} // Use the unique key generated in the slice
            className="border rounded p-4 shadow-md"
          >
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
      {products.length < total && (
        <button
          onClick={loadMoreProducts}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductList;