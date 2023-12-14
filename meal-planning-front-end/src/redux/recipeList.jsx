import { createSlice } from "@reduxjs/toolkit";

const recipeList = createSlice({
  name: "recipe list",
  initialState: {
    value: [],
  },
  reducers: {
    updateRecipeList: (state, action)=>{
        state.value= action.payload
    },
  },
});

export const { updateRecipeList } =
  recipeList.actions;

export default recipeList.reducer;
