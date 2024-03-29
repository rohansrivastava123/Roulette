import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHIPS_ARR } from "./ChipPanel.constant";
import { setTot_bet } from "../../store/slices/betAmount";
import { PlaceBet } from "../../store/slices/BetstackArray";
import style from "./Recent_Result.module.css";
export default function Recent_Result() {
  const recentResultArray = useSelector((state) => state.recentResultArray);
  const dispatch = useDispatch();
  const tot_bet = useSelector((state) => state.tot_bet);
  const bal_bet = useSelector((state) => state.bal_bet);
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });
  const timer = useSelector((state) => {
    return state.time;
  });
  const handleClick = (num) => {
    const chipobj = CHIPS_ARR.find((c) => c.img === chipSelected);
    if (timer > 0 && bal_bet >= tot_bet + chipobj.price) {
      dispatch(setTot_bet(tot_bet + chipobj.price));
      dispatch(
        PlaceBet([{ val: num, price: chipobj.price, chip: chipSelected }])
      );
    }
  };
  return (
    <div className={style.container}>
      <div className={style.box}>
        {recentResultArray.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleClick(element);
              }}
              className={`${style.text} ${element % 2 === 0 ? style.red : ""} `}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
}
