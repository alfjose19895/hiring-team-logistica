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
    onUpdateProduct: (state, { payload }) => {
      state.products.products = state.products.products.map(product =>
        product.id === payload.id ? payload : product
      );
    },
    onDeleteProduct: state => {
      if (state.activeProduct) {
        state.products.products = state.products.products.filter(
          event => event.id !== state.activeProduct.id
        );
        state.activeProduct = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoadProducts,
  onLoadCategories,
  onSetActiveProduct,
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
} = productSlice.actions;
