import useStore from "./useStore";

const useToneState = () => {
  const { state } = useStore();
  return state.toneState;
};

export default useToneState;
