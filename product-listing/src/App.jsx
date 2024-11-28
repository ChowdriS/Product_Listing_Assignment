// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setCategory } from './features/category/categorySlice';
import { fetchProducts } from './features/product/productSlice';
import CategoryList from './components/CategoryList.jsx';
import ProductList from './components/ProductList.jsx';
import SearchBar from './components/SearchBar.jsx';

const App = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const [page, setPage] = useState(0);
  
  // Fetch search term from URL query params
  const searchQuery = new URLSearchParams(window.location.search).get('search') || '';

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, page, searchQuery }));
  }, [dispatch, selectedCategory, page, searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <CategoryList categories={categories} selectedCategory={selectedCategory} />
      <ProductList page={page} setPage={setPage} />
    </div>
  );
};

export default App;
