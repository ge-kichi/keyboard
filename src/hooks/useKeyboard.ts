import useStore from "./useStore";

const useKeyboard = () => {
  const { state } = useStore();
  const { synth, toneState } = state;
  return { synth, toneState };
};

export default useKeyboard;
