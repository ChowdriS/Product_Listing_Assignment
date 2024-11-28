import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getCategories, 
  setSelectedCategory 
} from '../redux/slices/categorySlice';
import { getProducts } from '../redux/slices/productSlice';

const CategorySelector = () => {
  const dispatch = useDispatch();
  const { 
    items: categories, 
    selectedCategory 
  } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(getProducts({ 
      category, 
      limit: 10, 
      skip: 0 
    }));
  };

  // Safely extract category name or use default
  const getCategoryName = (category) => {
    if (typeof category === 'string') return category;
    if (typeof category === 'object') {
      return category.name || category.slug || 'Unknown Category';
    }
    return 'Unknown Category';
  };

  return (
      <div className="category-selector p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm w-full ${
              selectedCategory === '' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleCategorySelect('')}
          >
            All Categories
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg text-sm w-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
};

export default CategorySelector;