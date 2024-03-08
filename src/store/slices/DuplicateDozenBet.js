import { createSlice } from "@reduxjs/toolkit";
const prevDozenState = [];
const initialState = prevDozenState;
const duplicateDozenBet = createSlice({
  name: "RebetDuplicateBet",
  initialState,
  reducers: {
    copyDozenBet: (state, action) => {
      return action.payload;
    },
  },
});
export default duplicateDozenBet.reducer;
export const { copyDozenBet } = duplicateDozenBet.actions;
