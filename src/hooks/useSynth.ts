import { useContext } from "react";
import { StoreContext } from "../store";

const useSynth = () => {
  const { state } = useContext(StoreContext);
  return state.synth;
};

export default useSynth;
