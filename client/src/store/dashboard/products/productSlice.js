import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoadingProducts: true,
    products: [],
  },

  reducers: {
    onLoadProduct: (state, { payload = [] }) => {
      state.isLoadingProducts = false;
      state.products = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = productSlice.actions;
