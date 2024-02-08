import React, { useState, useEffect } from "react";
import style from "./ChipPanel.module.css";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { CHIPS_ARR } from "./ChipPanel.constant";
import { setTot_bet } from "../../store/slices/betAmount";
import { setBal_bet } from "../../store/slices/totalBalance";
import { setchipprice_d, setchiptype_d } from "../../store/slices/DozenSelect";
import { setChipPrice, setChiptype } from "../../store/slices/chipPanelArray";

export default function ChipPanel() {
  const dispatch = useDispatch();
  const tot_bet = useSelector((state) => state.tot_bet);
  const bal_bet = useSelector((state) => state.bal_bet);
  const arr = useSelector((state) => state.ChipArr);
  const dozenarr = useSelector((state) => state.dozenArr);
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });
  const handleClick = (num) => {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);

    if (bal_bet >= tot_bet + obj.val) {
      dispatch(setTot_bet(tot_bet + obj.val));
      dispatch(setChiptype({ val: num, chiptype: chipSelected }));
      dispatch(setChipPrice({ val: num, price: obj.val }));
    } else {
    }
  };
  const handleDozenClick = (name) => {
    console.log(name);
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);
    if (bal_bet >= tot_bet + obj.val) {
      dispatch(setchipprice_d([name, obj.val]));
      dispatch(setchiptype_d([name, chipSelected]));
      dispatch(setTot_bet(tot_bet + obj.val));
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
                chipSelected !== null ? handleDozenClick("street1") : ""
              }
              className={style.text}
            >
              {dozenarr["street1"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["street1"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["street1"].price}</span>
                  </div>
                </>
              ) : (
                <span>2:1</span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("street2") : ""
              }
              className={style.text}
            >
              {dozenarr["street2"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["street2"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["street2"].price}</span>
                  </div>
                </>
              ) : (
                <span>2:1</span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("street3") : ""
              }
              className={style.text}
            >
              {dozenarr["street3"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["street3"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["street3"].price}</span>
                  </div>
                </>
              ) : (
                <span>2:1</span>
              )}
            </div>
          </div>
          <div className={style.dozen_select}>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("firstDozen") : ""
              }
              className={style.text}
            >
              {dozenarr["firstDozen"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["firstDozen"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["firstDozen"].price}</span>
                  </div>
                </>
              ) : (
                <span>1st 12</span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("secondDozen") : ""
              }
              className={style.text}
            >
              {dozenarr["secondDozen"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["secondDozen"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["secondDozen"].price}</span>
                  </div>
                </>
              ) : (
                <span>2nd 12</span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("thirdDozen") : ""
              }
              className={style.text}
            >
              {dozenarr["thirdDozen"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["thirdDozen"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["thirdDozen"].price}</span>
                  </div>
                </>
              ) : (
                <span>3rd 12</span>
              )}
            </div>
          </div>
          <div className={style.diff_select}>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("firstHalf") : ""
              }
              className={style.text}
            >
              {dozenarr["firstHalf"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["firstHalf"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["firstHalf"].price}</span>
                  </div>
                </>
              ) : (
                <span>1-18</span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("Even") : ""
              }
              className={style.text}
            >
              {dozenarr["Even"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["Even"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["Even"].price}</span>
                  </div>
                </>
              ) : (
                <span>Even</span>
              )}
            </div>
            <div
              style={{ backgroundColor: "rgb(179, 15, 15)" }}
              onClick={() =>
                chipSelected !== null ? handleDozenClick("Red") : ""
              }
              className={style.text}
            >
              {dozenarr["Red"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["Red"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["Red"].price}</span>
                  </div>
                </>
              ) : (
                <span></span>
              )}
            </div>
            <div
              style={{ backgroundColor: "rgb(63, 63, 92)" }}
              onClick={() =>
                chipSelected !== null ? handleDozenClick("Blue") : ""
              }
              className={style.text}
            >
              {dozenarr["Blue"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["Blue"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["Blue"].price}</span>
                  </div>
                </>
              ) : (
                <span></span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("Odd") : ""
              }
              className={style.text}
            >
              {dozenarr["Odd"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["Odd"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["Odd"].price}</span>
                  </div>
                </>
              ) : (
                <span>Odd</span>
              )}
            </div>
            <div
              onClick={() =>
                chipSelected !== null ? handleDozenClick("secondHalf") : ""
              }
              className={style.text}
            >
              {dozenarr["secondHalf"].chiptype !== null ? (
                <>
                  <div>
                    <img
                      className={style.gridchip}
                      alt=""
                      src={dozenarr["secondHalf"].chiptype}
                    ></img>
                  </div>
                  <div className={style.chipvalues}>
                    <span>{dozenarr["secondHalf"].price}</span>
                  </div>
                </>
              ) : (
                <span>19-36</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
