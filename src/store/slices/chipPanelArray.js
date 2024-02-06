import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { val: 0, chiptype: null, price: 0 },
  { val: 3, chiptype: null, price: 0 },
  { val: 6, chiptype: null, price: 0 },
  { val: 9, chiptype: null, price: 0 },
  { val: 12, chiptype: null, price: 0 },
  { val: 15, chiptype: null, price: 0 },
  { val: 18, chiptype: null, price: 0 },
  { val: 21, chiptype: null, price: 0 },
  { val: 24, chiptype: null, price: 0 },
  { val: 27, chiptype: null, price: 0 },
  { val: 30, chiptype: null, price: 0 },
  { val: 33, chiptype: null, price: 0 },
  { val: 36, chiptype: null, price: 0 },
  { val: 2, chiptype: null, price: 0 },
  { val: 5, chiptype: null, price: 0 },
  { val: 8, chiptype: null, price: 0 },
  { val: 11, chiptype: null, price: 0 },
  { val: 14, chiptype: null, price: 0 },
  { val: 17, chiptype: null, price: 0 },
  { val: 20, chiptype: null, price: 0 },
  { val: 23, chiptype: null, price: 0 },
  { val: 26, chiptype: null, price: 0 },
  { val: 29, chiptype: null, price: 0 },
  { val: 32, chiptype: null, price: 0 },
  { val: 35, chiptype: null, price: 0 },
  { val: 1, chiptype: null, price: 0 },
  { val: 4, chiptype: null, price: 0 },
  { val: 7, chiptype: null, price: 0 },
  { val: 10, chiptype: null, price: 0 },
  { val: 13, chiptype: null, price: 0 },
  { val: 16, chiptype: null, price: 0 },
  { val: 19, chiptype: null, price: 0 },
  { val: 22, chiptype: null, price: 0 },
  { val: 25, chiptype: null, price: 0 },
  { val: 28, chiptype: null, price: 0 },
  { val: 31, chiptype: null, price: 0 },
  { val: 34, chiptype: null, price: 0 },
];

const chipPanelArray = createSlice({
  name: "chipspanel",
  initialState,
  reducers: {
    setChiptype: (state, action) => {
      const { val, chiptype } = action.payload;
      const obj = state.find((c) => c.val === val);
      obj.chiptype = chiptype;
    },
    setChipPrice: (state, action) => {
      const { val, price } = action.payload;
      const obj = state.find((c) => c.val === val);
      obj.price += price;
    },
    resetPanel: (state) => {
      return initialState.slice();
    },
  },
});

export const { setChiptype, setChipPrice, resetPanel } = chipPanelArray.actions;
export default chipPanelArray.reducer;
