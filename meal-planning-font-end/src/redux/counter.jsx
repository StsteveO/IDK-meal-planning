import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },

    minus: (state) => {
      state.value -= 1;
    },

    addBy: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { add, minus, addBy }= counterSlice.actions;

export default counterSlice.reducer;