// store/slices/providerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connection: null,
  account: null,
  balance: null,
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setConnection: (state, action) => {
      state.connection = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { setConnection, setAccount, setBalance } = providerSlice.actions;
export default providerSlice.reducer;
