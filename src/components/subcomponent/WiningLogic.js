import React, { useEffect } from "react";
import styles from "./WiningLogic.module.css";
import winbg from "../../images/winmessage.svg";
import { useDispatch, useSelector } from "react-redux";
import { setWinNum } from "../../store/slices/WinningNumber";
import { setBal_bet } from "../../store/slices/totalBalance";
import { setTot_bet } from "../../store/slices/betAmount";
import { resetPanel } from "../../store/slices/chipPanelArray";
import { set } from "../../store/slices/TodayHistory";

export default function WiningLogic() {
  const dispatch = useDispatch();
  const winnum = useSelector((state) => state.WinNum);
  const tot_bet = useSelector((state) => state.tot_bet);
  const arr = useSelector((state) => state.ChipArr);
  const bal_bet = useSelector((state) => state.bal_bet);
  const dozenarr = useSelector((state) => state.dozenArr);
  const currTime = new Date();
  const timeobj = `${currTime.getHours()}:${currTime.getMinutes()}`;

  useEffect(() => {
    if (tot_bet === 0) return;
    dispatch(setTot_bet(0));
    dispatch(resetPanel());
    const winAmount =
      arr.find((chip) => chip.val === winnum && chip.price > 0)?.price ?? 0;
    dispatch(setBal_bet(tot_bet - winAmount));
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
  }, []);

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
