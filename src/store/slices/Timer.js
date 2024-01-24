import { createSlice } from "@reduxjs/toolkit";

const Timerstate = createSlice({
  name: "changetime",
  initialState: 15,
  reducers: {
    changetime(state, action) {
      return action.payload;
    },
  },
});

export default Timerstate.reducer;
export const { changetime } = Timerstate.actions;
