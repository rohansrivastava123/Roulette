import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { setWinNum } from "./WinningNumber";

const balanceAmount = createSlice({
  name: "remainingBalance",
  initialState: 5000,
  reducers: {
    setBal_bet(state, action) {
      return (state -= action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(setWinNum, (state, action) => {
  //     return state -=
  //   });
  // },
});

export default balanceAmount.reducer;
export const { setBal_bet } = balanceAmount.actions;
