import { createSlice } from "@reduxjs/toolkit";

const Todayhistory = createSlice({
  name: "changetime",
  initialState: null,
  reducers: {
    changetime(state, action) {
      return action.payload;
    },
  },
});

export default Timerstate.reducer;
export const { changetime } = Timerstate.actions;
