import React, { useEffect, useState } from "react";
import style from "./HistoryModal.module.css";
import { useSelector } from "react-redux";
export default function HistoryModal() {
  const [selectedOption, setOption] = useState(0);
  const historyarr = useSelector((state) => state.historyarr);
  return (
    <div className={style.maincontainer}>
      <div className={style.container}>
        <div className={style.titlebar}>History</div>
        <div className={style.optionBar}>
          <div
            className={`${style.options} ${
              selectedOption === 0 ? style.selected : ""
            }`}
            onClick={() => {
              setOption(0);
            }}
          >
            <p>Today</p>
          </div>
          <div
            className={`${style.options} ${
              selectedOption === 1 ? style.selected : ""
            }`}
            onClick={() => {
              setOption(1);
            }}
          >
            <p>Older</p>
          </div>
        </div>
        <div className={style.textArea}>
          {selectedOption === 0 ? (
            historyarr.length === 0 ? (
              <div
                style={{ height: "80%", display: "grid", placeItems: "center" }}
              >
                nothing to display
              </div>
            ) : (
              historyarr.map((obj, key) => {
                // console.log(obj);
                return (
                  <div className={style.textcontainer}>
                    <div>
                      Roulette Azure
                      <p>{obj.time}</p>
                    </div>
                    <div>
                      <h3>{obj.balbet}</h3>
                      <span>{obj.amtbet}</span>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <div
              style={{ height: "80%", display: "grid", placeItems: "center" }}
            >
              nothing to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
