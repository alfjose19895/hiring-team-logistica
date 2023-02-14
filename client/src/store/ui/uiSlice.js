import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',

  initialState: {
    isModalOpen: false,
    isThereAnyMsg: false,
    isThereAnyGlobalMsg: false,
    alertUi: {},
    globalAlert: {},
  },

  reducers: {
    onOpenModal: state => {
      state.isModalOpen = true;
    },
    onCloseModal: state => {
      state.isModalOpen = false;
    },

    onShowAlert: (state, { payload }) => {
      state.isThereAnyMsg = true;
      state.alertUi = payload;
    },
    onClearAlert: state => {
      state.alertUi = {};
      state.isThereAnyMsg = false;
    },

    onShowGlobalAlert: (state, { payload }) => {
      state.isThereAnyGlobalMsg = true;
      state.globalAlert = payload;
    },
    onClearGlobalAlert: state => {
      state.globalAlert = {};
      state.isThereAnyGlobalMsg = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onOpenModal,
  onCloseModal,
  onShowAlert,
  onClearAlert,
  onShowGlobalAlert,
  onClearGlobalAlert,
} = uiSlice.actions;
