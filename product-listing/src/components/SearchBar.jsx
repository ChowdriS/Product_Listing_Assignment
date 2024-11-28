import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';
import { setSearchQuery } from '../redux/slices/searchSlice';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch search query to Redux store
    dispatch(setSearchQuery(search));

    // Trigger product fetch
    const timeoutId = setTimeout(() => {
      dispatch(getProducts({
        search,
        limit: 10,
        skip: 0
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, dispatch]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;