import { createSlice } from "@reduxjs/toolkit";

const favoriteRecipesList = createSlice({
  name: "favorite recipes list",
  initialState: {
    value: [],
  },
  reducers: {
    addNewRecipeToFavorites: (state, action) => {
      let list = [...state.value, action.payload];
      let updatedList = list.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      state.value = updatedList;
    },

    removeRecipeFromFavorites: (state, action) => {
      let updatedList = state.value.filter(
        (item) => item.id !== action.payload
      );
      state.value = updatedList;
    },
  },
});

export const { addNewRecipeToFavorites, removeRecipeFromFavorites } =
  favoriteRecipesList.actions;

export default favoriteRecipesList.reducer;
