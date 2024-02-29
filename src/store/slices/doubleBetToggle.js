import { createSlice } from "@reduxjs/toolkit";
const doublebetToogle = createSlice({
  name: "doubleBetToggle",
  initialState: false,
  reducers: {
    toggle(state, actions) {
      return !state;
    },
  },
});
export const { toggle } = doublebetToogle.actions;
export default doublebetToogle.reducer;
