import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { setBal_bet } from "./totalBalance";
import { setTot_bet } from "./betAmount";
import { set } from "./TodayHistory";
import { useSelector } from "react-redux";

const WinState = createSlice({
  name: "changeWinNum",
  initialState: null,
  reducers: {
    setWinNum(state, action) {
      return action.payload;
    },
  },
});

export default WinState.reducer;
export const { setWinNum } = WinState.actions;

export const winNumberMiddleware = createListenerMiddleware();

winNumberMiddleware.startListening({
  actionCreator: setWinNum,
  effect: (action, { dispatch, getState }) => {
    const state = getState();
    const tot_bet = state.tot_bet;

    if (tot_bet === 0) {
      return;
    }
    const winnum = state.WinNum;
    const bal_bet = state.bal_bet;
    const arr = state.BetStackArray;
    const currTime = new Date();
    const timeobj = `${currTime.getHours()}:${currTime.getMinutes()}`;
    //history maintain
    dispatch(set({ amtbet: tot_bet, balbet: bal_bet, time: timeobj }));
    const winAmount =
      arr.find((chip) => chip.val === winnum && chip.price > 0)?.price ?? 0;
    dispatch(setBal_bet(tot_bet - winAmount));
    dispatch(setTot_bet(0));
    //check on dozen
    arr.map((obj, index) => {
      if (obj.val == "street1" && winnum % 3 === 0)
        dispatch(setBal_bet(-4 * obj.price));
      if (obj.val == "street2" && (winnum - 2) % 3 === 0)
        dispatch(setBal_bet(-4 * obj.price));
      if (obj.val == "street3" && (winnum - 1) % 3 === 0)
        dispatch(setBal_bet(-4 * obj.price));
      if (obj.val == "1st 12" && winnum >= 1 && winnum <= 12)
        dispatch(setBal_bet(-3 * obj.price));
      if (obj.val == "2nd 12" && winnum >= 13 && winnum <= 24)
        dispatch(setBal_bet(-3 * obj.price));
      if (obj.val == "3rd 12" && winnum >= 25 && winnum <= 36)
        dispatch(setBal_bet(-3 * obj.price));
      if (obj.val == "1-18" && winnum >= 1 && winnum <= 18)
        dispatch(setBal_bet(-2 * obj.price));
      if (obj.val == "Even" && winnum % 2 == 0)
        dispatch(setBal_bet(-2 * obj.price));
      if (obj.val == "Red" && winnum % 2 != 0)
        dispatch(setBal_bet(-2 * obj.price));
      if (obj.val == "Blue" && winnum % 2 == 0)
        dispatch(setBal_bet(-2 * obj.price));
      if (obj.val == "Odd" && winnum % 2 != 0)
        dispatch(setBal_bet(-2 * obj.price));
      if (obj.val == "19-36" && winnum >= 19 && winnum <= 36)
        dispatch(setBal_bet(-2 * obj.price));
    });
  },
});
