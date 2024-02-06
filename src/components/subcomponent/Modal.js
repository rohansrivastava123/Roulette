import React, { useState, useEffect } from "react";
import style from "./Modal.module.css";
import Draggable from "react-draggable";
import arr from "./modalTextFile";

export default function Modal() {
  const [selectedDivModal, setselectedDivModal] = useState(0);
  const [divname, setdivname] = useState(arr[0].name);
  const [text, setText] = useState(arr[0].text);
  return (
    <Draggable>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.titlebar}>Game Help</div>
          <div className={style.sections}>
            <div className={style.containerdiv}>
              {arr.map((box, index) => {
                return (
                  <div
                    onClick={() => {
                      setselectedDivModal(index);
                      setText(box.text);
                      setdivname(box.name);
                    }}
                    className={`${style.textdiv} ${
                      selectedDivModal === index ? style.selected : ""
                    }`}
                  >
                    {box.name}
                  </div>
                );
              })}
            </div>
            <div className={style.textArea}>
              <div className={style.text}>
                <p className={style.texttitle}>{divname}</p>
                <hr />
                <p className={style.para}>{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
