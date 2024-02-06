import { configureStore } from "@reduxjs/toolkit";
import visibilitySlice from "./slices/chip_Visibility";
import SelectedChip from "./slices/chip_Select";
import Timerstate from "./slices/Timer";
import chipsArray from "./slices/chipPanelArray";
import betAmount from "./slices/betAmount";
import balanceAmount from "./slices/totalBalance";
import GameProgress from "./slices/GameProgress";
import chipPanelArray from "./slices/chipPanelArray";
import winningNumber from "./slices/WinningNumber";
import ModalToggle from "./slices/ModalToggle";

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
  },
});

export default store;
