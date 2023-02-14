import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    activeProduct: null,
    activeCategory: null,
    isLoadingProducts: true,
    isLoadingCategories: true,
    products: [],
    categories: [],
  },

  reducers: {
    onLoadProducts: (state, { payload = [] }) => {
      state.products = payload;
      state.isLoadingProducts = false;
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

    onLoadCategories: (state, { payload = [] }) => {
      state.categories = payload;
      state.isLoadingCategories = false;
    },
    onSetActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },

    onLogoutProducts: state => {
      state.activeProduct = null;
      state.activeCategory = null;
      state.isLoadingProducts = true;
      state.isLoadingCategories = true;
      state.products = [];
      state.categories = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddNewProduct,
  onDeleteProduct,
  onLoadProducts,
  onLogoutProducts,
  onSetActiveProduct,
  onUpdateProduct,
  
  onLoadCategories,
  onSetActiveCategory,
} = productSlice.actions;
