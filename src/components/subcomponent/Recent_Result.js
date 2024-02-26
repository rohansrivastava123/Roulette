import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Recent_Result.module.css";
export default function Recent_Result() {
  const recentResultArray = useSelector((state) => state.recentResultArray);
  console.log(recentResultArray);
  return (
    <div className={style.container}>
      <div className={style.box}>
        {recentResultArray.map((element, index) => {
          return (
            <div
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
