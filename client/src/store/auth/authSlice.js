import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    status: 'checking', // 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: [],
  },

  reducers: {
    onChecking: state => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = [];
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = [];
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.errorMessage = payload;
      state.user = {};
    },

    onSetErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessage: state => {
      state.errorMessage = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onSetErrorMessage,
} = authSlice.actions;
