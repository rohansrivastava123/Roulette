import { useSelector, useDispatch } from "react-redux";
import { CHIPS_ARR } from "./ChipPanel.constant";
import { setChiptype, setChipPrice } from "../../store/slices/chipPanelArray";
export default function useDozenSelectHook(x, y) {
  const chipSelected = useSelector((state) => state.chip_Select);
  const dispatch = useDispatch();
}
