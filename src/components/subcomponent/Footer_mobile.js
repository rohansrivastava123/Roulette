import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CHIPS_ARR } from "./ChipPanel.constant";
import style from "./Footer_mobile.module.css";
import { changechip } from "../../store/slices/chip_Select";
import { useEffect, useState } from "react";
export default function Footer_mobile() {
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });
  const dispatch = useDispatch();
  const [is_Chip_Minimize, minimize_Chips] = useState(true);
  const [selectedChipVal, setChipSelectedVal] = useState(0.5);
  const handleChipClick = () => {
    console.log("click");
    minimize_Chips(!is_Chip_Minimize);
  };
  return is_Chip_Minimize ? (
    <div className={style.container}>
      <div className={`${style.box} ${style.animatebox}`}>
        <div onClick={() => handleChipClick()} className={style.chipscontainer}>
          <div className={`${style.minimizechip} ${style.animatebox}`}>
            <div className={style.minchip}>
              <img src={chipSelected}></img>
            </div>
            {chipSelected === CHIPS_ARR[0].img ? (
              <div className={style.minchip1}>
                <img src={CHIPS_ARR[1].img}></img>
              </div>
            ) : (
              <div className={style.minchip1}>
                <img src={CHIPS_ARR[0].img}></img>
              </div>
            )}
          </div>
          <div className={style.chipvalues1}>
            <span> {selectedChipVal}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.box}>
        {CHIPS_ARR.map((chip, index) => {
          return (
            <div
              onClick={() => {
                dispatch(changechip(chip.img));
                setChipSelectedVal(chip.val);
                handleChipClick();
              }}
              className={style.chipscontainer}
            >
              <div
                key={index}
                className={chipSelected === chip.img ? style.chip : ""}
              >
                <img alt="" src={chip.img}></img>
              </div>
              <div className={style.chipvalues}>
                <span> {chip.val}</span>
              </div>
            </div>
          );
        })}
        {/* {chipSelected === CHIPS_ARR[0].img ? (
          <img src={CHIPS_ARR[1].img}></img>
        ) : (
          <img src={CHIPS_ARR[0].img}></img>
        )} */}
      </div>
    </div>
  );
}
