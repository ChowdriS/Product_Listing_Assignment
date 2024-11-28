import React from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';

const ProductPage = () => {
  return (
    <div className="container mx-auto product-page px-4 sm:px-8">
      <SearchBar />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="category-selector w-full md:w-1/4 p-4 bg-white rounded shadow-md">
          <CategorySelector />
        </div>
        <div className="product-list w-full md:w-3/4 p-4 bg-white rounded shadow-md">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
