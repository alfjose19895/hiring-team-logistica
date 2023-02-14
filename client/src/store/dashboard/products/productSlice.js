import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    activeProduct: null,
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

    onSetActiveProduct: (state, { payload }) => {
      state.activeProduct = payload;
    },

    onAddNewProduct: (state, { payload }) => {
      state.products.products.unshift(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoadProducts,
  onLoadCategories,
  onSetActiveProduct,
  onAddNewProduct,
} = productSlice.actions;
