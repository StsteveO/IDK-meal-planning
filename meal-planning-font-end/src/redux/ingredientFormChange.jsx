import { createSlice } from "@reduxjs/toolkit";

const ingredientFormChange = createSlice({
  name: "ingredient form change",
  initialState: {
    value: "",
  },
  reducers: {
    formChange: (state, action)=> {
        state.value= action.payload
    },

    clearForm: (state)=>{
      state.value= ""
    },
  },
});

export const { formChange, clearForm } = ingredientFormChange.actions;

export default ingredientFormChange.reducer;
