import { createSlice } from "@reduxjs/toolkit";

const favoriteRecipesList = createSlice({
  name: "favorite recipes list",
  initialState: {
    value: [],
  },
  reducers: {
    addRecipe: (state, action) => {
      let newIngredient = {
        ingredient: action.payload.toLowerCase(),
        ingredientId: crypto.randomUUID(),
      };
      let list = [...state.value, newIngredient];
      let updatedList = list.sort((a, b) => {
        return a.ingredient.localeCompare(b.ingredient);
      });

      state.value = updatedList;
    },

    removeRecipe: (state, action) => {
      let updatedList = state.value.filter(
        (item) => item.ingredientId !== action.payload
      );
      state.value = updatedList;
    },
  },
});

export const { addRecipe, removeRecipe } =
  favoriteRecipesList.actions;

export default favoriteRecipesList.reducer;
