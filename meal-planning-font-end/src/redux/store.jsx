import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter";
import ingredientList from './ingredientList';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ingredientList: ingredientList,
  },
});

export default store;