// src/components/ProductList.js
import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = ({ page, setPage }) => {
  const products = useSelector((state) => state.products.items);
  const searchQuery = new URLSearchParams(window.location.search).get('search') || '';
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Pagination
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div>
      <h2 className="font-semibold text-xl">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
