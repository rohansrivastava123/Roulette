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
import Footer_mobile from "./Footer_mobile";
import { toggle as toggleDoubleBet } from "../../store/slices/doubleBetToggle";
import { PlaceBet, RemoveBet } from "../../store/slices/BetstackArray";
import directSet from "./directSetConstant";
import multiset from "./multiSetConstant";
export default function ChipPanel() {
  const dispatch = useDispatch();
  const tot_bet = useSelector((state) => state.tot_bet);
  const bal_bet = useSelector((state) => state.bal_bet);
  const betstackarr = useSelector((state) => state.BetStackArray);
  const doublebet = useSelector((state) => state.doublbet);
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });
  const timer = useSelector((state) => {
    return state.time;
  });
  const barmsg = useSelector((state) => state.currMsg);
  const PrevBetArr = useSelector((state) => state.DupBetArr);
  useEffect(() => {
    console.log("betstack");
    console.log(betstackarr);
    if (betstackarr.length != 0) dispatch(toggleDoubleBet(true));
    else dispatch(toggleDoubleBet(false));
  }, [betstackarr]);

  //FUNCTIONS
  const handleClick = (num) => {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);

    if (timer > 0 && bal_bet >= tot_bet + obj.price) {
      dispatch(setTot_bet(tot_bet + obj.price));
    }
    dispatch(PlaceBet([{ val: num, price: obj.price, chip: chipSelected }]));
  };
  const handleMultiSelectClick = (name) => {
    const obj = CHIPS_ARR.find((c) => c.img === chipSelected);
    if (timer > 0 && bal_bet >= tot_bet + obj.price) {
      dispatch(setTot_bet(tot_bet + obj.price));
    }
    dispatch(PlaceBet([{ val: name, price: obj.price, chip: chipSelected }]));
  };
  const HandledoubleBetClick = () => {
    let totbetcount = 0;
    let temparr = [];
    betstackarr.map((Pobj, index) => {
      Pobj.map((obj, index) => {
        if (timer > 0 && obj.price > 0 && bal_bet >= tot_bet + obj.price) {
          totbetcount += obj.price;
          temparr.push({ val: obj.val, price: obj.price, chip: chipSelected });
        }
      });
    });
    dispatch(PlaceBet(temparr));
    dispatch(setTot_bet(tot_bet + totbetcount));
  };
  const Rebet = () => {
    let totbetcount = 0;
    let temparr = [];
    console.log("prevbet");
    console.log(PrevBetArr);
    PrevBetArr?.map((obj, index) => {
      obj.map((element, index) => {
        totbetcount += element.price;
        temparr.push(element);
      });
    });
    dispatch(PlaceBet(temparr));
    dispatch(setTot_bet(tot_bet + totbetcount));
  };
  const handleUndo = () => {
    let totreducebet = 0;
    betstackarr[0].map((element, index) => {
      totreducebet += element.price;
    });
    dispatch(setTot_bet(tot_bet - totreducebet));
    dispatch(RemoveBet());
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
          {directSet.map((chip, index) => {
            let obj = null;
            let TotalPriceOfChip = 0;
            betstackarr.map((e, index) => {
              e.map((element, index) => {
                if (element.val === chip) {
                  obj = element;
                  TotalPriceOfChip += element.price;
                }
              });
            });
            return (
              <div
                onClick={() =>
                  chipSelected !== null && timer > 0 ? handleClick(chip) : ""
                }
                className={
                  chip === 0
                    ? `${style.zerochip} ${style.chipvalues_rotated}`
                    : chip % 2 === 0
                    ? style.chips2
                    : style.chips1
                }
                key={index}
              >
                {obj ? (
                  <div className={style.chipscontainer}>
                    <div>
                      <img
                        className={style.gridchip}
                        alt=""
                        src={obj.chip}
                      ></img>
                    </div>
                    <div className={style.chipvalues}>
                      <span>{TotalPriceOfChip}</span>
                    </div>
                  </div>
                ) : (
                  <span>{chip}</span>
                )}
              </div>
            );
          })}
          {/* multipleselect  */}

          <div className={style.street_select}>
            {multiset.map((element, index) => {
              let obj = null;
              let TotalPriceOfChip = 0;
              betstackarr.map((cp, index) => {
                cp.map((c, index) => {
                  if (c.val === element) {
                    obj = c;
                    TotalPriceOfChip += c.price;
                  }
                });
              });
              return element === "street1" ||
                element === "street2" ||
                element === "street3" ? (
                <div
                  onClick={() =>
                    chipSelected !== null ? handleMultiSelectClick(element) : ""
                  }
                  className={style.text_s}
                >
                  {obj ? (
                    <>
                      <div>
                        <img
                          className={style.gridchip}
                          alt=""
                          src={obj.chip}
                        ></img>
                      </div>
                      <div className={style.chipvalues}>
                        <span>{TotalPriceOfChip}</span>
                      </div>
                    </>
                  ) : (
                    <span>2:1</span>
                  )}
                </div>
              ) : (
                ""
              );
            })}
          </div>
          <div className={style.dozen_select}>
            {multiset.map((element, index) => {
              let obj = null;
              let TotalPriceOfChip = 0;
              betstackarr.map((cp, index) => {
                cp.map((c, index) => {
                  if (c.val === element) {
                    obj = c;
                    TotalPriceOfChip += c.price;
                  }
                });
              });
              return element === "1st 12" ||
                element === "2nd 12" ||
                element === "3rd 12" ? (
                <div
                  onClick={() =>
                    chipSelected !== null ? handleMultiSelectClick(element) : ""
                  }
                  className={style.text}
                >
                  {obj ? (
                    <>
                      <div>
                        <img
                          className={style.gridchip}
                          alt=""
                          src={obj.chip}
                        ></img>
                      </div>
                      <div
                        className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                      >
                        <span>{TotalPriceOfChip}</span>
                      </div>
                    </>
                  ) : (
                    <span>{element}</span>
                  )}
                </div>
              ) : (
                ""
              );
            })}
          </div>
          {/* Undo functionality */}
          <div
            className={`${style.rebet} ${
              betstackarr.length == 0 ? style.fadeimg : ""
            }`}
            onClick={() =>
              betstackarr.length > 0 && timer > 0 ? handleUndo() : ""
            }
          >
            <img src={undoimg}></img>
          </div>
          {/* Undo functionality ends */}
          <div className={style.diff_select}>
            {multiset.map((element, index) => {
              let obj = null;
              let TotalPriceOfChip = 0;
              betstackarr.map((cp, index) => {
                cp.map((c, index) => {
                  if (c.val === element) {
                    obj = c;
                    TotalPriceOfChip += c.price;
                  }
                });
              });
              return element !== "street1" &&
                element !== "street2" &&
                element !== "street3" &&
                element !== "1st 12" &&
                element != "2nd 12" &&
                element !== "3rd 12" ? (
                <div
                  style={
                    element === "Red"
                      ? { backgroundColor: "rgb(179, 15, 15)" }
                      : element === "Blue"
                      ? { backgroundColor: "rgb(63, 63, 92)" }
                      : {}
                  }
                  onClick={() =>
                    chipSelected !== null ? handleMultiSelectClick(element) : ""
                  }
                  className={style.text}
                >
                  {obj ? (
                    <>
                      <div>
                        <img
                          className={style.gridchip}
                          alt=""
                          src={obj.chip}
                        ></img>
                      </div>
                      <div
                        className={`${style.chipvalues} ${style.chipvalues_rotated}`}
                      >
                        <span>{TotalPriceOfChip}</span>
                      </div>
                    </>
                  ) : (
                    <span>{element}</span>
                  )}
                </div>
              ) : (
                ""
              );
            })}
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
                  PrevBetArr?.length !== 0 && timer > 0
                    ? () => {
                        dispatch(toggleDoubleBet(true));
                        Rebet();
                      }
                    : ""
                }
                className={
                  PrevBetArr.length == 0 || timer <= 0 ? style.fadeimg : ""
                }
              >
                <img src={rebetimg}></img>
              </div>
            )}
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
