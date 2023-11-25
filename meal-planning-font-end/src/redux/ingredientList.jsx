import { createSlice } from "@reduxjs/toolkit";

const ingredientList = createSlice({
  name: "ingredient list",
  initialState: {
    value: [],
  },
  reducers: {
    addIngredient: (state, action) => {
      let newIngregient = action.payload.toLowerCase();
      let list = [...state.value, newIngregient];
      let updatedList = list.sort();

      state.value = updatedList;
    },

    remove: (state) => {
      state.value -= 1;
    },

    addBy: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { addIngredient, remove, addBy } = ingredientList.actions;

export default ingredientList.reducer;
