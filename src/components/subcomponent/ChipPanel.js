import React, { useState, useEffect } from "react";
import style from "./ChipPanel.module.css";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import useDozenSelectHook from "./UseDozenSelectHook";
import { useDispatch, useSelector } from "react-redux";
import { CHIPS_ARR } from "./ChipPanel.constant";
import { setTot_bet } from "../../store/slices/betAmount";
import { setBal_bet } from "../../store/slices/totalBalance";

import { setChipPrice, setChiptype } from "../../store/slices/chipPanelArray";

export default function ChipPanel() {
  const dispatch = useDispatch();
  const tot_bet = useSelector((state) => state.tot_bet);
  const bal_bet = useSelector((state) => state.bal_bet);
  const arr = useSelector((state) => state.ChipArr);
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });

  function handleChipSet(x, y, type) {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);
    if (type === "reg") {
      for (let i = x; i <= y; i++) {
        dispatch(setChiptype({ val: i, chiptype: chipSelected }));
        dispatch(setChipPrice({ val: i, price: obj.val }));
        dispatch(setTot_bet(tot_bet + obj.val * 12));
      }
    } else if (type === "oddeven") {
      for (let i = x; i <= y; i += 2) {
        dispatch(setChiptype({ val: i, chiptype: chipSelected }));
        dispatch(setChipPrice({ val: i, price: obj.val }));
        dispatch(setTot_bet(tot_bet + obj.val * 12));
      }
    } else if (type === "street") {
      for (let i = x; i <= y; i += 3) {
        dispatch(setChiptype({ val: i, chiptype: chipSelected }));
        dispatch(setChipPrice({ val: i, price: obj.val }));
        dispatch(setTot_bet(tot_bet + obj.val * 12));
      }
    }
  }
  const handleClick = (num) => {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);

    if (bal_bet >= tot_bet + obj.val) {
      dispatch(setTot_bet(tot_bet + obj.val));
      dispatch(setChiptype({ val: num, chiptype: chipSelected }));
      dispatch(setChipPrice({ val: num, price: obj.val }));
    } else {
    }
  };

  return (
    <>
      <ProgressBar />
      <div className={style.mainpanelgrid}>
        <div className={style.grid}>
          {arr.map((chip, index) => (
            <div
              onClick={() =>
                chipSelected !== null ? handleClick(chip.val) : ""
              }
              className={
                chip.val === 0
                  ? style.zerochip
                  : chip.val % 2 === 0
                  ? style.chips2
                  : style.chips1
              }
              key={index}
            >
              {chip.chiptype === null ? (
                <span>{chip.val}</span>
              ) : (
                <div className={style.chipscontainer}>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={chip.chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{chip.price}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className={style.street_select}>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(3, 36, "street") : ""
              }
              className={style.text}
            >
              <span> 2 : 1 </span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(2, 35, "street") : ""
              }
              className={style.text}
            >
              <span> 2 : 1 </span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(1, 34, "street") : ""
              }
              className={style.text}
            >
              <span> 2 : 1 </span>
            </div>
          </div>
          <div className={style.dozen_select}>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(1, 12, "reg") : ""
              }
              className={style.text}
            >
              <span>1st 12</span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(13, 24, "reg") : ""
              }
              className={style.text}
            >
              <span>2nd 12</span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(25, 36, "reg") : ""
              }
              className={style.text}
            >
              <span>3rd 12</span>
            </div>
          </div>
          <div className={style.diff_select}>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(1, 18, "reg") : ""
              }
              className={style.text}
            >
              <span>1 - 18</span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(2, 36, "oddeven") : ""
              }
              className={style.text}
            >
              <span>Even</span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(1, 36, "oddeven") : ""
              }
              style={{ backgroundColor: "rgb(179, 15, 15)" }}
              className={style.text}
            >
              <span></span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(2, 36, "oddeven") : ""
              }
              style={{ backgroundColor: "rgb(63, 63, 92)" }}
              className={style.text}
            >
              <span></span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(1, 36, "oddeven") : ""
              }
              className={style.text}
            >
              <span>Odd</span>
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleChipSet(19, 36) : ""
              }
              className={style.text}
            >
              <span>19 - 36</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
