import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (state, action) => {
      state.fields.push(action.payload);
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    deleteField: (state, action) => {
      state.fields = state.fields.filter((field) => field.id !== action.payload);
    },
    updateFieldLabel: (state, action) => {
      const { id, label } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) field.label = label;
    },
    updateField: (state, action) => {
      const { id, newLabel, newType } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        if (newLabel !== undefined) field.label = newLabel;
        if (newType !== undefined) field.type = newType;
      }
    },
    updateOption: (state, action) => {
      const { id, optionIndex, newOption } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field && field.options[optionIndex] !== undefined) {
        field.options[optionIndex] = newOption;
      }
    },
    addOption: (state, action) => {
      const field = state.fields.find((field) => field.id === action.payload);
      if (field) {
        field.options.push(`Option ${field.options.length + 1}`);
      }
    },
    removeOption: (state, action) => {
      const { id, optionIndex } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.options.splice(optionIndex, 1);
      }
    },
  },
});

export const { 
  addField, 
  setFields, 
  deleteField, 
  updateField, 
  updateFieldLabel, 
  updateOption, 
  addOption, 
  removeOption 
} = formSlice.actions;

export default formSlice.reducer;
