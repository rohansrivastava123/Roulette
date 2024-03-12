import { createSlice } from "@reduxjs/toolkit";
const BetstackArray = createSlice({
  name: "betstack",
  initialState: [],
  reducers: {
    PlaceBet: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { PlaceBet } = BetstackArray.actions;
export default BetstackArray.reducer;
