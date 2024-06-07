/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // checking,not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state/* , action */) => {

    },
    logout: (state/* , action */) => {

    },
    checkingCredencials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredencials } = authSlice.actions;
