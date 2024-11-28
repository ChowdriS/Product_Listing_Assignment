import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../../utils/api';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    selectedCategory: '',
    loading: false,
    error: null
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;