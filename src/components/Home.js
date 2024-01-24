import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export default function Home() {
  return (
    <div className={styles.main}>
      <img src={logo}></img>
      <h1>
        <Link to="/game">
          <button>
            <p className={styles.front}>START</p>
          </button>
        </Link>
      </h1>
    </div>
  );
}
