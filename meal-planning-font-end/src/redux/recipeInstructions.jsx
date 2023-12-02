import { createSlice } from "@reduxjs/toolkit";

const recipeInstructions = createSlice({
  name: "recipe instructions",
  initialState: {
    value: "",
  },
  reducers: {
    updateRecipeInstructions: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateRecipeInstructions } = recipeInstructions.actions;

export default recipeInstructions.reducer;
