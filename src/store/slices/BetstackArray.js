import { createSlice } from "@reduxjs/toolkit";
const BetstackArray = createSlice({
  name: "betstack",
  initialState: [],
  reducers: {
    PlaceBet: (state, action) => {
      const { val, price, chip } = action.payload;
      // const obj = state.find((c) => c.val === val);
      // if (obj) {
      //   obj.chip = chip;
      //   obj.price += price;
      // } else {
      //   state.unshift(action.payload);
      // }
      state.unshift(action.payload);
    },
    RemoveBet: (state) => {
      state.shift();
    },
    ResetStack: () => {
      return [];
    },
  },
});

export const { PlaceBet, RemoveBet, ResetStack } = BetstackArray.actions;
export default BetstackArray.reducer;
