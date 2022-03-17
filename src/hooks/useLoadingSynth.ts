import { useEffect } from "react";
import { PolySynth } from "tone";
import { Action } from "../store";

const useLoadingSynth = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const synth = new PolySynth().toDestination();
    synth.set({
      oscillator: {
        type: "sawtooth32",
      },
      envelope: {
        attack: 0,
        decay: 1,
        sustain: 0,
        release: 0.4,
      },
    });
    dispatch({
      type: "LOADED_SYNTH",
      payload: {
        isLoaded: true,
        synth: synth,
      },
    });
  }, [dispatch]);
};

export default useLoadingSynth;
