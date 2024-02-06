import { createSlice } from "@reduxjs/toolkit";

const WinState = createSlice({
  name: "changeWinNum",
  initialState: null,
  reducers: {
    setWinNum(state, action) {
      return action.payload;
    },
  },
});

export default WinState.reducer;
export const { setWinNum } = WinState.actions;
