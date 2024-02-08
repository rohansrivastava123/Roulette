import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  street1: {
    price: 0,
    chiptype: null,
  },
  street2: {
    price: 0,
    chiptype: null,
  },
  street3: {
    price: 0,
    chiptype: null,
  },
  firstHalf: {
    price: 0,
    chiptype: null,
  },
  secondHalf: {
    price: 0,
    chiptype: null,
  },
  firstDozen: {
    price: 0,
    chiptype: null,
  },
  secondDozen: {
    price: 0,
    chiptype: null,
  },
  thirdDozen: {
    price: 0,
    chiptype: null,
  },
  Even: {
    price: 0,
    chiptype: null,
  },
  Odd: {
    price: 0,
    chiptype: null,
  },
  Red: {
    price: 0,
    chiptype: null,
  },
  Blue: {
    price: 0,
    chiptype: null,
  },
};
const DozenSelect = createSlice({
  name: "SelectDozen",
  initialState,
  reducers: {
    setchipprice_d(state, action) {
      const [name, price] = action.payload;
      console.log(action.payload);
      state[name].price += price;
    },
    setchiptype_d(state, action) {
      const [name, type] = action.payload;
      state[name].chiptype = type;
    },
    resetPanel_d(state) {
      return initialState;
    },
  },
});
//

//more of slices like this
export default DozenSelect.reducer;

export const { setchipprice_d, setchiptype_d, resetPanel_d } =
  DozenSelect.actions;
