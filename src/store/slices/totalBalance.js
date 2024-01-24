import { createSlice } from "@reduxjs/toolkit";

const balanceAmount = createSlice({
  name: "remainingBalance",
  initialState: 5000,
  reducers: {
    setBal_bet(state, action) {
      return (state -= action.payload);
    },
  },
});

export default balanceAmount.reducer;
export const { setBal_bet } = balanceAmount.actions;
