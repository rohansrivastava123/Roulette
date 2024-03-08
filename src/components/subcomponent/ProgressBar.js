import { useEffect } from "react";
import style from "./Progressbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/slices/chip_Visibility";
import { toggle as toggledoublebet } from "../../store/slices/doubleBetToggle";
import { changetime } from "../../store/slices/Timer";
import { setMsg } from "../../store/slices/GameProgress";
import { resetPanel } from "../../store/slices/chipPanelArray";
import { setWinNum } from "../../store/slices/WinningNumber";
import { resetPanel_d } from "../../store/slices/DozenSelect";
import { addResult } from "../../store/slices/RecentResult";
import { copyBet } from "../../store/slices/DuplicatePrevBet";
import { copyDozenBet } from "../../store/slices/DuplicateDozenBet";
import { resetUndoArr } from "../../store/slices/UndoArr";
export default function ProgressBar() {
  const dispatch = useDispatch();
  const timer = useSelector((state) => {
    return state.time;
  });
  const randomNum = Math.floor(Math.random() * 37);
  const barMsg = useSelector((state) => state.currMsg);
  const tot_Bet = useSelector((state) => state.tot_bet);
  const arr = useSelector((state) => state.ChipArr);
  const dozenarr = useSelector((state) => state.dozenArr);
  const doublebet = useSelector((state) => state.doublbet);
  // const winnum = useSelector((state) => state.WinNum);

  useEffect(() => {
    if (timer === 0) {
      dispatch(toggle(false));
      dispatch(setMsg("BETS CLOSED"));
      setTimeout(() => {
        dispatch(setMsg("SPINNING"));
        dispatch(setWinNum(randomNum));
        if (doublebet) {
          dispatch(toggledoublebet());
        }
        dispatch(resetUndoArr());
        setTimeout(() => {
          //console.log(arr);
          if (tot_Bet > 0) {
            dispatch(copyBet(arr));
            dispatch(copyDozenBet(dozenarr));
          }
          dispatch(resetPanel());
          dispatch(addResult(randomNum));
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
    <div className={style.container}>
      <div
        className={`${style.timer_container} ${
          barMsg === "BETS CLOSED" || barMsg === "SPINNING"
            ? style.slidedown
            : ""
        }`}
      >
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
        ></div>
        <div className={style.msg}>
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
      </div>
    </div>
  );
}
