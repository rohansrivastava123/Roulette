import { useEffect } from "react";
import style from "./Progressbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/slices/chip_Visibility";
import { toggle as toggledoublebet } from "../../store/slices/doubleBetToggle";
import { changetime } from "../../store/slices/Timer";
import { setMsg } from "../../store/slices/GameProgress";
import { setWinNum } from "../../store/slices/WinningNumber";
import { addResult } from "../../store/slices/RecentResult";
import { copyBet } from "../../store/slices/DuplicatePrevBet";
import { ResetStack } from "../../store/slices/BetstackArray";
export default function ProgressBar() {
  const dispatch = useDispatch();
  const timer = useSelector((state) => {
    return state.time;
  });
  const randomNum = Math.floor(Math.random() * 37);
  const barMsg = useSelector((state) => state.currMsg);
  const tot_Bet = useSelector((state) => state.tot_bet);
  const betstackarr = useSelector((state) => state.BetStackArray);
  const dozenarr = useSelector((state) => state.dozenArr);
  const doublebet = useSelector((state) => state.doublbet);

  useEffect(() => {
  if (timer === 0) return;

  const intervalId = setInterval(() => {
    dispatch(changetime(prev => {
      const newTime = prev - 1;

      if (newTime === 0) {
        dispatch(toggle(false));
        dispatch(setMsg("BETS CLOSED"));

        // Schedule each step individually to flatten the logic
        setTimeout(() => {
          dispatch(setMsg("SPINNING"));
        }, 1000); // After 1s

        setTimeout(() => {
          if (tot_Bet > 0) {
            dispatch(copyBet(betstackarr));
          }
          dispatch(addResult(randomNum));
          dispatch(setMsg(`Result - ${randomNum}`));
          dispatch(setWinNum(randomNum));
          dispatch(ResetStack());
        }, 3000); // After 3s (1s + 2s)

        setTimeout(() => {
          dispatch(changetime(15));
          dispatch(setMsg("PLEASE PLACE YOUR BETS -"));
          dispatch(toggle(true));
        }, 5000); // After 5s (1s + 2s + 2s)
      }

      if (newTime === 7) {
        dispatch(setMsg("LAST BETS - "));
      }

      return newTime;
    }));
  }, 1000);

  return () => clearInterval(intervalId);
}, [dispatch, randomNum, tot_Bet, betstackarr]);

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
        <div
          style={
            timer < 7 && timer !== 0
              ? { animation: `${style.blink} 1s linear infinite` }
              : {}
          }
          className={style.msg}
        >
          {timer === 0 ? (
            barMsg
          ) : timer > 6 ? (
            <>
              {barMsg} {timer}
            </>
          ) : (
            <>
              {barMsg} {timer}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
