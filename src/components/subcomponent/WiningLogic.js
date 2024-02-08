import React, { useEffect } from "react";
import styles from "./WiningLogic.module.css";
import winbg from "../../images/winmessage.svg";
import { useSelector } from "react-redux";

export default function WiningLogic() {
  const winnum = useSelector((state) => state.WinNum);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.winimage}>
          <img src={winbg} />
        </div>
        <div className={styles.wintext}>
          <h1>{winnum}</h1>
        </div>
      </div>
    </>
  );
}
