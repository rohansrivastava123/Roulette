import React, { useState } from "react";
import style from "./HistoryModal.module.css";
export default function HistoryModal() {
  const [selectedOption, setOption] = useState(0);
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
        <div className={style.textArea}></div>
      </div>
    </div>
  );
}
