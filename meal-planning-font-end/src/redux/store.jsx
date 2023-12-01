import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter";
import ingredientList from './ingredientList';
import ingredientFormChange from './ingredientFormChange';
import recipeList from './recipeList';
import recipeInstructions from './recipeInstructions';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ingredientList: ingredientList,
    ingredientFormChange: ingredientFormChange,
    recipeList: recipeList,
    recipeInstructions: recipeInstructions,
  },
});

export default store;