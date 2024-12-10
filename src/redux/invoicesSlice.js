import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [{ id: 1, invoice_no: '', amount: '' }],
  allInvoices: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addField: (state) => {
      const newId = state.fields.length ? state.fields[state.fields.length - 1].id + 1 : 1;
      state.fields.push({ id: newId, invoice_no: '', amount: '' });
    },
    deleteField: (state, action) => {
      state.fields = state.fields.filter((field) => field.id !== action.payload);
    },
    updateField: (state, action) => {
      const { id, key, value } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field[key] = value;
      }
    },
    submitInvoices: (state) => {
      state.allInvoices.push(...state.fields.map((field) => ({
        invoiceNumber: field.invoice_no,
        invoiceAmount: field.amount,
      })));
      state.fields = [{ id: 1, invoice_no: '', amount: '' }];
    },
  },
});

export const { addField, deleteField, updateField, submitInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;