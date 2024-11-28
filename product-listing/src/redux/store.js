import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});