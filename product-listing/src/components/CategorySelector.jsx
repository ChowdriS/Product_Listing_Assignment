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
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded ${
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
            key={`category-${index}`}
            className={`px-4 py-2 rounded ${
              selectedCategory === getCategoryName(category)
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleCategorySelect(getCategoryName(category))}
          >
            {getCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;