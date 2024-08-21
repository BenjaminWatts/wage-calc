import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const app = createSlice({
  name: 'app',
  initialState: {
    termsAccepted: false,
  },
  reducers: {
    acceptTerms: (state) => {
      state.termsAccepted = true;
    },
  },
});

export const selectTermsAccepted = (state: RootState) =>
  state.app.termsAccepted;

export const a = app.actions;

export default app;
