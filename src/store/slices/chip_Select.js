import { createSlice } from "@reduxjs/toolkit";

const SelectedChip = createSlice({
  name: "chipSelect",
  initialState: null,
  reducers: {
    changechip(state, action) {
      return action.payload;
    },
  },
});

export default SelectedChip.reducer;
export const { changechip } = SelectedChip.actions;
