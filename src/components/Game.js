import React from "react";
import styles from "./Game.module.css";
import exit from "../images/exit.svg";
import chatbtn from "../images/chatbutton.svg";
import history from "../images/playerhistory.svg";
import livesupport from "../images/Live-support.svg";
import settings from "../images/setting-button.svg";
import Panel from "./subcomponent/ChipPanel";
import { Link } from "react-router-dom";

export default function Game() {
  const currTime = new Date();
  return (
    <>
      <div className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.leftpart}>
            <Link to="/">
              <img alt="" src={exit}></img>
            </Link>
            <div className={styles.textnavinfo}>
              <span className={styles.navlefttext}>
                Treasure Hunt : $0.1 - $5,000
              </span>
              <span className={styles.timetext}>
                {currTime.getHours()}:{currTime.getMinutes()}
              </span>
            </div>
          </div>
          <div className={styles.rightpart}>
            <span className={styles.lobbybtn}>Lobby</span>
            <img alt="" src={chatbtn}></img>
            <img alt="" src={history}></img>
            <img alt="" src={livesupport}></img>
            <img alt="" src={settings}></img>
          </div>
        </div>
        <div>
          <div className={styles.maintextbox}>
            <input
              type="text"
              className={styles.textbox}
              placeholder="Type a message here..."
            ></input>
          </div>
        </div>

        <Panel />
      </div>
    </>
  );
}
