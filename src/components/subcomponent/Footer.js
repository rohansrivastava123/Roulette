import style from "./Footer.module.css";
import { CHIPS_ARR } from "./ChipPanel.constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changechip } from "../../store/slices/chip_Select";
import Recent_Result from "./Recent_Result";

export default function Footer() {
  const bal_bet = useSelector((state) => state.bal_bet);
  const tot_bet = useSelector((state) => state.tot_bet);
  const isChip_Visible = useSelector((state) => {
    return state.visibility;
  });
  const chipSelected = useSelector((state) => {
    return state.chip_Select;
  });
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.footer}>
        <div className={style.bet_info}>
          <div className={style.betinfotext}>
            <p>Balance</p>
            <p>${bal_bet}</p>
          </div>
          <div className={style.betinfotext}>
            <p>Total Bet</p>
            <p>${tot_bet}</p>
          </div>
        </div>
        <div
          className={`${style.chippanel} ${
            isChip_Visible ? "" : style.animate
          }`}
          // style={{ opacity: isChip_Visible ? "" : 0 }}
        >
          {CHIPS_ARR.map((chip, index) => {
            return (
              <div
                onClick={() => {
                  dispatch(changechip(chip.img));
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
                  <span> {chip.price}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.stats}></div>
        <Recent_Result />
      </div>
    </>
  );
}
