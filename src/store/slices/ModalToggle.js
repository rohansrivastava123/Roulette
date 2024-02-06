import { createSlice } from "@reduxjs/toolkit";

const ModalToggle = createSlice({
  name: "modalToggle",
  initialState: false,
  reducers: {
    toggleModal(state, action) {
      return action.payload;
    },
  },
});

export default ModalToggle.reducer;
export const { toggleModal } = ModalToggle.actions;
