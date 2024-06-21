// store/slices/medicalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contract: null,
  records: [],
  events: [],
  transaction: {
    isPending: false,
    isError: false,
  },
};

const medicalSlice = createSlice({
  name: 'medical',
  initialState,
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setTransactionPending: (state, action) => {
      state.transaction.isPending = action.payload;
    },
    setTransactionError: (state, action) => {
      state.transaction.isError = action.payload;
    },
  },
});

export const { setContract, setRecords, setEvents, setTransactionPending, setTransactionError } = medicalSlice.actions;
export default medicalSlice.reducer;
