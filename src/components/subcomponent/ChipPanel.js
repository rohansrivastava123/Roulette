import React, { useState, useEffect } from "react";
import style from "./ChipPanel.module.css";
import rebetimg from "../../images/rebet.svg";
import doublebetimg from "../../images/2xbet.svg";
import undoimg from "../../images/undo.svg";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { CHIPS_ARR } from "./ChipPanel.constant";
import { setTot_bet } from "../../store/slices/betAmount";
import { setBal_bet } from "../../store/slices/totalBalance";
import { setchipprice_d, setchiptype_d } from "../../store/slices/DozenSelect";
import { setChipPrice, setChiptype } from "../../store/slices/chipPanelArray";
import Footer_mobile from "./Footer_mobile";
import { toggle } from "../../store/slices/doubleBetToggle";
import { pushInstance, popInstance } from "../../store/slices/UndoArr";

export default function ChipPanel() {
  const dispatch = useDispatch();
  const tot_bet = useSelector((state) => state.tot_bet);
  const bal_bet = useSelector((state) => state.bal_bet);
  const arr = useSelector((state) => state.ChipArr);
  const dozenarr = useSelector((state) => state.dozenArr);
  const doublebet = useSelector((state) => state.doublbet);
  const UndoArr = useSelector((state) => state.UndoArr);
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });
  const timer = useSelector((state) => {
    return state.time;
  });
  const barmsg = useSelector((state) => state.currMsg);
  const PrevBetArr = useSelector((state) => state.DupBetArr);
  useEffect(() => {
    // console.log(UndoArr);
  }, [arr, UndoArr]);
  const PrevDozenArr = useSelector((state) => state.DupDozenArr);

  //FUNCTIONS
  const handleClick = (num) => {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);

    if (timer > 0 && bal_bet >= tot_bet + obj.price) {
      dispatch(setChiptype({ val: num, chiptype: chipSelected }));
      dispatch(setChipPrice({ val: num, price: obj.price }));
      dispatch(setTot_bet(tot_bet + obj.price));
    }
    dispatch(pushInstance({ val: num, price: obj.price }));
    // console.log(UndoArr);
  };
  const handleDozenClick = (name) => {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);
    if (timer > 0 && bal_bet >= tot_bet + obj.price) {
      dispatch(setchipprice_d([name, obj.price]));
      dispatch(setchiptype_d([name, chipSelected]));
      dispatch(setTot_bet(tot_bet + obj.price));
    }
    dispatch(pushInstance({ val: name, price: obj.price }));
  };
  const HandledoubleBetClick = () => {
    let totbetcount = 0;
    arr.map((obj, index) => {
      if (timer > 0 && obj.price > 0 && bal_bet >= tot_bet + obj.price) {
        dispatch(setChiptype({ val: obj.val, chiptype: chipSelected }));
        dispatch(setChipPrice({ val: obj.val, price: obj.price }));
        totbetcount += obj.price;
      }
    });
    for (let obj in dozenarr) {
      if (
        timer > 0 &&
        dozenarr[obj].price > 0 &&
        bal_bet >= tot_bet + dozenarr[obj].price
      ) {
        dispatch(setchipprice_d([obj, dozenarr[obj].price]));
        dispatch(setchiptype_d([obj, chipSelected]));
        totbetcount += dozenarr[obj].price;
      }
    }
    // console.log(totbetcount);
    dispatch(setTot_bet(tot_bet + totbetcount));
  };
  const Rebet = () => {
    let totbetcount = 0;
    PrevBetArr.map((element, index) => {
      if (
        timer > 0 &&
        element.price > 0 &&
        bal_bet >= tot_bet + element.price
      ) {
        totbetcount += element.price;
        dispatch(setChiptype({ val: element.val, chiptype: chipSelected }));
        dispatch(setChipPrice({ val: element.val, price: element.price }));
      }
    });
    for (let doz in PrevDozenArr) {
      console.log(PrevDozenArr[doz]);
      let obj = PrevDozenArr[doz];
      if (timer > 0 && bal_bet >= tot_bet + obj.price && obj.price > 0) {
        dispatch(setchipprice_d([doz, obj.price]));
        dispatch(setchiptype_d([doz, chipSelected]));
        totbetcount += obj.price;
      }
    }
    //console.log(PrevBetArr);
    dispatch(setTot_bet(tot_bet + totbetcount));
  };
  const handleUndo = () => {
    let obj = UndoArr[0];
    if (isNaN(obj.val)) {
      // dozenarr[obj.val].price -= obj.price;
      // console.log("hehe " + dozenarr[obj.val].price + " - " + obj.price);
      dispatch(setchipprice_d([obj.val, -obj.price]));
      if (dozenarr[obj.val].price == obj.price) {
        dispatch(setchiptype_d([obj.val, null]));
      }
    } else {
      const element = arr.find((c) => c.val === obj.val);
      if (obj.price == element.price)
        dispatch(setChiptype({ val: obj.val, chiptype: null }));
      dispatch(setChipPrice({ val: obj.val, price: -obj.price }));
    }
    // console.log(dozenarr[obj.val].price);
    dispatch(popInstance());
    dispatch(setTot_bet(tot_bet - obj.price));
  };
  return (
    <>
      <ProgressBar />
      <div
        className={`${style.mainpanelgrid} ${
          barmsg === "BETS CLOSED" || barmsg === "SPINNING"
            ? style.slidedown
            : ""
        }`}
      >
        <div className={style.grid}>
          {arr.map((chip, index) => (
            <div
              onClick={() =>
                chipSelected !== null ? handleClick(chip.val) : ""
              }
              className={
                chip.val === 0
                  ? `${style.zerochip} ${style.chipvalues_rotated}`
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
              className={style.text_s}
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
              className={style.text_s}
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
              className={style.text_s}
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
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
                  <div
                    className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                  >
                    <span>{dozenarr["secondHalf"].price}</span>
                  </div>
                </>
              ) : (
                <span>19-36</span>
              )}
            </div>
          </div>
          <div className={style.rebet}>
            {doublebet ? (
              <div
                onClick={() => {
                  HandledoubleBetClick();
                }}
              >
                <img src={doublebetimg}></img>
              </div>
            ) : (
              <div
                onClick={
                  PrevBetArr.length === 0
                    ? () => {}
                    : () => {
                        dispatch(toggle());
                        Rebet();
                      }
                }
                className={PrevBetArr.length == 0 ? style.fadeimg : ""}
              >
                <img src={rebetimg}></img>
              </div>
            )}
          </div>
          <div
            className={`style.rebet ${
              UndoArr.length == 0 ? style.fadeimg : ""
            }`}
            onClick={() => (UndoArr.length > 0 ? handleUndo() : "")}
          >
            <img src={undoimg}></img>
          </div>
        </div>
      </div>
      <div className={style.footer_Mobile}>
        <Footer_mobile />
      </div>
      <Footer />
    </>
  );
}
