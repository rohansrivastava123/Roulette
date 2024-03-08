import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const UndoArr = createSlice({
  name: "undo the task in a round",
  initialState,
  reducers: {
    pushInstance: (state, action) => {
      state.unshift(action.payload);
    },
    popInstance: (state) => {
      state.shift();
    },
    resetUndoArr(state) {
      return initialState;
    },
  },
});
export default UndoArr.reducer;
export const { pushInstance, popInstance, resetUndoArr } = UndoArr.actions;
