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
    console.log("#### In middleware effect", tot_bet);

    if (tot_bet === 0) {
      return;
    }

    const winnum = state.WinNum;
    const dozenarr = state.dozenArr;
    const bal_bet = state.bal_bet;
    const arr = state.ChipArr;
    const currTime = new Date();
    const timeobj = `${currTime.getHours()}:${currTime.getMinutes()}`;
    const winAmount =
      arr.find((chip) => chip.val === winnum && chip.price > 0)?.price ?? 0;
    dispatch(setBal_bet(tot_bet - winAmount));
    dispatch(setTot_bet(0));
    //history maintain
    dispatch(set({ amtbet: tot_bet, balbet: bal_bet, time: timeobj }));
    //check on dozen
    if (dozenarr["street1"].chiptype != null && winnum % 3 === 0)
      dispatch(setBal_bet(-4 * dozenarr["street1"].price));
    if (dozenarr["street2"].chiptype != null && (winnum - 2) % 3 === 0)
      dispatch(setBal_bet(-4 * dozenarr["street2"].price));
    if (dozenarr["street3"].chiptype != null && (winnum - 1) % 3 === 0)
      dispatch(setBal_bet(-4 * dozenarr["street3"].price));
    if (dozenarr["firstDozen"].chiptype != null && winnum >= 1 && winnum <= 12)
      dispatch(setBal_bet(-3 * dozenarr["firstDozen"].price));
    if (
      dozenarr["secondDozen"].chiptype != null &&
      winnum >= 13 &&
      winnum <= 24
    )
      dispatch(setBal_bet(-3 * dozenarr["secondDozen"].price));
    if (dozenarr["thirdDozen"].chiptype != null && (winnum - 2) % 3 === 0)
      dispatch(setBal_bet(-3 * dozenarr["thirdDozen"].price));
    if (dozenarr["firstHalf"].chiptype != null && winnum >= 25 && winnum <= 36)
      dispatch(setBal_bet(-2 * dozenarr["firstHalf"].price));
    if (dozenarr["Even"].chiptype != null && winnum % 2 == 0)
      dispatch(setBal_bet(-2 * dozenarr["Even"].price));
    if (dozenarr["Red"].chiptype != null && winnum % 2 != 0)
      dispatch(setBal_bet(-2 * dozenarr["Red"].price));
    if (dozenarr["Blue"].chiptype != null && winnum % 2 == 0)
      dispatch(setBal_bet(-2 * dozenarr["Blue"].price));
    if (dozenarr["Odd"].chiptype != null && winnum % 2 != 0)
      dispatch(setBal_bet(-2 * dozenarr["Odd"].price));
    if (dozenarr["secondHalf"].chiptype != null && winnum >= 19 && winnum <= 36)
      dispatch(setBal_bet(-2 * dozenarr["secondHalf"].price));
  },
});
