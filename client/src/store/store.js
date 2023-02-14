import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice';
import { productSlice } from './dashboard';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    products: productSlice.reducer,
    auth: authSlice.reducer,
  },
});
