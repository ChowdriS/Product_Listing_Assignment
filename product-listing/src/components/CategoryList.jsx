// src/components/CategoryList.js
import React from 'react';
import { useDispatch} from 'react-redux';
import { setCategory } from './features/category/categorySlice';

const CategoryList = ({ categories, selectedCategory }) => {
  const dispatch = useDispatch();

  const handleCategorySelect = (category) => {
    dispatch(setCategory(category));
    window.history.pushState(null, '', `?category=${category}`);
  };

  return (
    <div className="mb-4">
      <h2 className="font-semibold text-xl">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
