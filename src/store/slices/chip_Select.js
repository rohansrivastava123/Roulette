import { createSlice } from "@reduxjs/toolkit";
import { CHIPS_ARR } from "../../components/subcomponent/ChipPanel.constant";

const SelectedChip = createSlice({
  name: "chipSelect",
  initialState: CHIPS_ARR[0].img,
  reducers: {
    changechip(state, action) {
      return action.payload;
    },
  },
});

export default SelectedChip.reducer;
export const { changechip } = SelectedChip.actions;
