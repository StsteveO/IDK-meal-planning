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
  },
});

export const { addIngredient, formChange } = ingredientFormChange.actions;

export default ingredientFormChange.reducer;
