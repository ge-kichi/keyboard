import useStore from "./useStore";

const useSynth = () => {
  const { state } = useStore();
  return state.synth;
};

export default useSynth;
