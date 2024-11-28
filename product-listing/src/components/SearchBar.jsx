// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  // Update URL search query on change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    window.history.pushState(null, '', `?search=${value}`);
  };

  // Effect to handle initial query param
  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search).get('search') || '';
    setSearchTerm(searchParam);
  }, []);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products"
        className="p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
