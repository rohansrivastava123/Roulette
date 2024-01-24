import { createSlice } from "@reduxjs/toolkit";

const GameProgress = createSlice({
  name: "message",
  initialState: "PLEASE PLACE YOUR BETS -",
  reducers: {
    setMsg(state, action) {
      return action.payload;
    },
  },
});

export default GameProgress.reducer;
export const { setMsg } = GameProgress.actions;
