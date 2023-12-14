import { createSlice } from "@reduxjs/toolkit";

const recipeTitle = createSlice({
  name: "recipe title",
  initialState: {
    value: "",
  },
  reducers: {
    updateRecipeTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateRecipeTitle } = recipeTitle.actions;

export default recipeTitle.reducer;
