import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../utils/api';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchProducts(params);
      return {
        ...response,
        // Add a unique identifier to each product
        products: response.products.map(product => ({
          ...product,
          uniqueKey: `${product.id}-${Math.random().toString(36).substr(2, 9)}`
        }))
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
    currentPage: 0
  },
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.total = 0;
      state.currentPage = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        // Reset products if it's the first fetch or a new search/category
        if (action.meta.arg.skip === 0) {
          state.items = [];
        }
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Use a Set to prevent duplicates if needed
        const newItems = action.payload.products;
        
        state.items = action.meta.arg.skip === 0 
          ? newItems 
          : [...state.items, ...newItems];
        
        state.total = action.payload.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;