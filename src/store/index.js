import { configureStore } from "@reduxjs/toolkit";
import visibilitySlice from "./slices/chip_Visibility";
import SelectedChip from "./slices/chip_Select";
import Timerstate from "./slices/Timer";
import betAmount from "./slices/betAmount";
import balanceAmount from "./slices/totalBalance";
import GameProgress from "./slices/GameProgress";
import winningNumber, { winNumberMiddleware } from "./slices/WinningNumber";
import ModalToggle from "./slices/ModalToggle";
import TodayHistory from "./slices/TodayHistory";
import RecentResult from "./slices/RecentResult";
import DuplicatePrevBet from "./slices/DuplicatePrevBet";
import doubleBetToggle from "./slices/doubleBetToggle";
import UndoArr from "./slices/UndoArr";
import BetstackArray from "./slices/BetstackArray";

const store = configureStore({
  reducer: {
    visibility: visibilitySlice,
    chip_Select: SelectedChip,
    time: Timerstate,
    tot_bet: betAmount,
    bal_bet: balanceAmount,
    currMsg: GameProgress,
    WinNum: winningNumber,
    isModal: ModalToggle,
    historyarr: TodayHistory,
    recentResultArray: RecentResult,
    DupBetArr: DuplicatePrevBet,
    UndoArr: UndoArr,
    doublbet: doubleBetToggle,
    BetStackArray: BetstackArray,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(winNumberMiddleware.middleware);
  },
});

export default store;
