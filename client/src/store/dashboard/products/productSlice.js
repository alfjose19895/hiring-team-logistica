import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoadingProducts: true,
    products: [],
    categories: [],
  },

  reducers: {
    onLoadProducts: (state, { payload = [] }) => {
      state.isLoadingProducts = false;
      state.products = payload;
    },

    onLoadCategories: (state, { payload = [] }) => {
      state.categories = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoadProducts, onLoadCategories } = productSlice.actions;
