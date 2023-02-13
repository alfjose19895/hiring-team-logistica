import { configureStore } from '@reduxjs/toolkit';

import { productSlice } from './dashboard';

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
