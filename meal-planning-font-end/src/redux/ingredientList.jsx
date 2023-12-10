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

      let repeatIngredient= state.value.find((item)=>{
        return item.ingredient === newIngredient.ingredient;
      });

      if (repeatIngredient === undefined) {
        let list = [...state.value, newIngredient];
        let updatedList = list.sort((a, b) => {
          return a.ingredient.localeCompare(b.ingredient);
        });

        state.value = updatedList;
        localStorage.setItem("ingredient list", JSON.stringify(state.value));
      }
    },

    removeIngredient: (state, action)=>{
      let updatedList= state.value.filter((item)=> item.ingredientId !== action.payload);
      state.value = updatedList;
      localStorage.setItem("ingredient list", JSON.stringify(state.value));
    },
  },
});

export const { addIngredient, removeIngredient, remove, addBy } = ingredientList.actions;

export default ingredientList.reducer;
