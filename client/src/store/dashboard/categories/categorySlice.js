import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    activeCategory: null,
    isLoadingCategories: true,
    categories: [],
  },

  reducers: {
    onLoadCategories: (state, { payload = [] }) => {
      state.categories = payload;
      state.isLoadingCategories = false;
    },
    onSetActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },

    onAddNewCategory: (state, { payload }) => {
      state.categories.unshift(payload);
    },
    onUpdateCategory: (state, { payload }) => {
      state.categories = state.categories.map(product =>
        product.id === payload.id ? payload : product
      );
    },
    onDeleteCategory: state => {
      console.log(state.activeCategory);
      if (state.activeCategory) {
        state.categories = state.categories.filter(
          event => event.id !== state.activeCategory.id
        );
        state.activeCategory = null;
      }
    },

    onLogoutCategories: state => {
      state.activeCategory = null;
      state.isLoadingCategories = true;
      state.categories = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoadCategories,
  onSetActiveCategory,
  onLogoutCategories,
  onAddNewCategory,
  onUpdateCategory,
  onDeleteCategory,
} = categorySlice.actions;
