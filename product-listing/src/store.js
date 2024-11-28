// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import categoryReducer from './features/category/categorySlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
  },
});
