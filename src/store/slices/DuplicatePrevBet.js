import { createSlice } from "@reduxjs/toolkit";
const prevState = [];
const initialState = prevState;
const duplicatePrevBet = createSlice({
  name: "RebetDuplicateBet",
  initialState,
  reducers: {
    copyBet: (state, action) => {
      return action.payload;
    },
  },
});
export default duplicatePrevBet.reducer;
export const { copyBet } = duplicatePrevBet.actions;
