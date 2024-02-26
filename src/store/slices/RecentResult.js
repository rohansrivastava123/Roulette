import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const Recent_Reault = createSlice({
  name: "recentResult",
  initialState,
  reducers: {
    addResult(state, action) {
      state.unshift(action.payload);
    },
  },
});
export default Recent_Reault.reducer;
export const { addResult } = Recent_Reault.actions;
