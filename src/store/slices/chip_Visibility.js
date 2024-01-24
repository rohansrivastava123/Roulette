import { createSlice } from "@reduxjs/toolkit";

//
const visibilitySlice = createSlice({
  name: "chipVisibility",
  initialState: true,
  reducers: {
    toggle(state, action) {
      return action.payload;
    },
  },
});
//

//more of slices like this
export default visibilitySlice.reducer;

export const { toggle } = visibilitySlice.actions;
