import { useState, useEffect } from "react";
import style from "./Progressbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/slices/chip_Visibility";
import { changechip } from "../../store/slices/chip_Select";
import { changetime } from "../../store/slices/Timer";
import { setBal_bet } from "../../store/slices/totalBalance";
import { setMsg } from "../../store/slices/GameProgress";
import { setTot_bet } from "../../store/slices/betAmount";
import { resetPanel } from "../../store/slices/chipPanelArray";
import { setWinNum } from "../../store/slices/WinningNumber";
import { resetPanel_d } from "../../store/slices/DozenSelect";
export default function ProgressBar() {
  const dispatch = useDispatch();
  const timer = useSelector((state) => {
    return state.time;
  });
  const randomNum = Math.floor(Math.random() * 37);
  const barMsg = useSelector((state) => state.currMsg);
  const currAmtBet = useSelector((state) => state.tot_bet);
  const arr = useSelector((state) => state.ChipArr);
  const winnum = useSelector((state) => state.WinNum);
  useEffect(() => {
    if (timer === 0) {
      dispatch(changechip(null));
      dispatch(toggle(false));
      dispatch(setMsg("BETS CLOSED"));
      setTimeout(() => {
        dispatch(setMsg("SPINNING"));
        dispatch(setWinNum(randomNum));
        setTimeout(() => {
          dispatch(resetPanel());
          dispatch(resetPanel_d());
          dispatch(changetime(15));
          dispatch(setMsg("PLEASE PLACE YOUR BETS -"));
          dispatch(toggle(true));
        }, 5000);
      }, 3000);

      return;
    }

    const intervalId = setInterval(() => {
      dispatch(changetime(timer - 1));
      if (timer === 7) {
        dispatch(setMsg("LAST BETS - "));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const timerPercentage = (timer / 15) * 100;
  return (
    <div className={style.timer_container}>
      <div
        className={style.timer_bar}
        style={{
          transform: `scaleX(${timerPercentage / 100})`,
          transition: timerPercentage === 100 ? "none" : undefined,
          backgroundColor:
            timerPercentage < 30 && timerPercentage > 10
              ? "orange"
              : timerPercentage < 10
              ? "red"
              : "",
        }}
      />
      {timer === 0 ? (
        <p className={style.bartext}>{barMsg}</p>
      ) : timer > 6 ? (
        <p className={style.bartext}>
          {barMsg} {timer}
        </p>
      ) : (
        <p className={style.bartextblink}>
          {barMsg} {timer}
        </p>
      )}
    </div>
  );
}
