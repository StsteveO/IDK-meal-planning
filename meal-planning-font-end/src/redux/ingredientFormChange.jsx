import { createSlice } from "@reduxjs/toolkit";

const ingredientFormChange = createSlice({
  name: "ingredient form change",
  initialState: {
    value: "",
  },
  reducers: {
    addIngredient: (state, action) => {
      let newIngregient = action.payload.toLowerCase();
      let list = [...state.value, newIngregient];
      let updatedList = list.sort();

      state.value = updatedList;
    },

    formChange: (state, action)=> {
        state.value= action.payload
    },
  },
});

export const { addIngredient, formChange } = ingredientFormChange.actions;

export default ingredientFormChange.reducer;
