import { createSlice } from "@reduxjs/toolkit";

const ingredientList = createSlice({
  name: "ingredient list",
  initialState: {
    value: [],
  },
  reducers: {
    addIngredient: (state, action) => {
      let newIngredient = {
        ingredient: action.payload.toLowerCase(),
        ingredientId: crypto.randomUUID(),
      };
      let list = [...state.value, newIngredient];
      let updatedList = list.sort((a, b)=>{
        return a.ingredient.localeCompare(b.ingredient);
      });

      state.value = updatedList;
    },

    removeIngredient: (state, action)=>{
      let updatedList= state.value.filter((item)=> item.ingredientId !== action.payload);
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

export const { addIngredient, removeIngredient, remove, addBy } = ingredientList.actions;

export default ingredientList.reducer;
