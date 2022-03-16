import { useContext } from "react";
import { StoreContext } from "../store";

const useSampler = () => {
  const { state } = useContext(StoreContext);
  return state.sampler;
};

export default useSampler;
