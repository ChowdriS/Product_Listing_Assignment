import React from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';

const ProductPage = () => {
  return (
    <div className="container mx-auto">
      <SearchBar />
      <div className="flex">
        <div className="w-1/4 p-4">
          <CategorySelector />
        </div>
        <div className="w-3/4 p-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;