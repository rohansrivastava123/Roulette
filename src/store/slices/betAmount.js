import { createSlice } from "@reduxjs/toolkit";

const BetAmount = createSlice({
  name: "currentBet",
  initialState: 0,
  reducers: {
    setTot_bet(state, action) {
      return action.payload;
    },
  },
});

export default BetAmount.reducer;
export const { setTot_bet } = BetAmount.actions;
