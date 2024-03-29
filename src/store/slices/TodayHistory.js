import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const Todayhistory = createSlice({
  name: "todayhistory",
  initialState,
  reducers: {
    set: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { set } = Todayhistory.actions;
export default Todayhistory.reducer;
