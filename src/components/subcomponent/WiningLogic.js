import React, { useEffect } from "react";
import styles from "./WiningLogic.module.css";
import winbg from "../../images/winmessage.svg";
import { useDispatch, useSelector } from "react-redux";
import { setWinNum } from "../../store/slices/WinningNumber";
import { setBal_bet } from "../../store/slices/totalBalance";
import { setTot_bet } from "../../store/slices/betAmount";
import { resetPanel } from "../../store/slices/chipPanelArray";

export default function WiningLogic() {
  const dispatch = useDispatch();
  const winnum = useSelector((state) => state.WinNum);
  const currAmtBet = useSelector((state) => state.tot_bet);
  const arr = useSelector((state) => state.ChipArr);
  if (winnum) {
    //console.log(currAmtBet);
    dispatch(setBal_bet(currAmtBet));
    arr.map((chip, index) => {
      if (chip.val === winnum && chip.price > 0) {
        dispatch(resetPanel());
        dispatch(setBal_bet(-2 * chip.price));
      }
      dispatch(setTot_bet(0));
    });
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.winimage}>
          <img src={winbg} />
        </div>
        <div className={styles.wintext}>
          <h1>{winnum}</h1>
        </div>
      </div>
    </>
  );
}
