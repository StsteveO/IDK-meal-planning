import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter";
import ingredientList from './ingredientList';
import ingredientFormChange from './ingredientFormChange';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ingredientList: ingredientList,
    ingredientFormChange: ingredientFormChange,
  },
});

export default store;