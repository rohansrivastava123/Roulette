import { configureStore } from "@reduxjs/toolkit";
import visibilitySlice from "./slices/chip_Visibility";
import SelectedChip from "./slices/chip_Select";
import Timerstate from "./slices/Timer";
import chipsArray from "./slices/chipPanelArray";
import betAmount from "./slices/betAmount";
import balanceAmount from "./slices/totalBalance";
import GameProgress from "./slices/GameProgress";
import chipPanelArray from "./slices/chipPanelArray";
import winningNumber, { winNumberMiddleware } from "./slices/WinningNumber";
import ModalToggle from "./slices/ModalToggle";
import TodayHistory from "./slices/TodayHistory";
import DozenSelect from "./slices/DozenSelect";
import RecentResult from "./slices/RecentResult";
import DuplicatePrevBet from "./slices/DuplicatePrevBet";
import doubleBetToggle from "./slices/doubleBetToggle";
import DuplicateDozenBet from "./slices/DuplicateDozenBet";
import UndoArr from "./slices/UndoArr";

const store = configureStore({
  reducer: {
    visibility: visibilitySlice,
    chip_Select: SelectedChip,
    time: Timerstate,
    chips: chipsArray,
    tot_bet: betAmount,
    bal_bet: balanceAmount,
    currMsg: GameProgress,
    ChipArr: chipPanelArray,
    WinNum: winningNumber,
    isModal: ModalToggle,
    historyarr: TodayHistory,
    dozenArr: DozenSelect,
    recentResultArray: RecentResult,
    DupBetArr: DuplicatePrevBet,
    DupDozenArr: DuplicateDozenBet,
    UndoArr: UndoArr,
    doublbet: doubleBetToggle,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(winNumberMiddleware.middleware);
  },
});

export default store;
