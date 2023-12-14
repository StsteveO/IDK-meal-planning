import { createSlice } from "@reduxjs/toolkit";

const applicationColors = createSlice({
  name: "application colors",
  initialState: {
    value: {
      textColor: "#0f0f0f",
      backgroundColor: "#ffffff",
      primaryColor: "#0d5514",
      secondaryColor: "#b3bcb6",
      accentColor: "#1ec22f",
    },
  },
});

export default applicationColors.reducer;
