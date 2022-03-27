import { curry, Lens, lensPath, set, view } from "ramda";
import useStore from "./useStore";

type SynthParamsKey_Oscillator = "type" | "partialCount" | "phase";
type SynthParamsKey_Envelope =
  | "attack"
  | "attackCurve"
  | "decay"
  | "decayCurve"
  | "release"
  | "releaseCurve"
  | "sustain";
type SynthParamsKey =
  | "detune"
  | "portamento"
  | "volume"
  | SynthParamsKey_Oscillator
  | SynthParamsKey_Envelope;

const matchSynthParamsKey = (key: SynthParamsKey, callback: any) => {
  switch (key) {
    case "detune":
    case "portamento":
    case "volume": {
      return callback(lensPath([key]));
    }
    case "type":
    case "partialCount":
    case "phase": {
      return callback(lensPath(["oscillator", key]));
    }
    case "attack":
    case "attackCurve":
    case "decay":
    case "decayCurve":
    case "release":
    case "releaseCurve":
    case "sustain": {
      return callback(lensPath(["envelope", key]));
    }
  }
};

const _view = curry((obj: any, lens: Lens<any, any>) => view(lens, obj));

const _set = curry((obj: any, lens: Lens<any, any>, value: any) =>
  set(lens, value, obj)
);

const useSynthParams = () => {
  const { state, dispatch } = useStore();
  const viewSynthParams = _view(state.synthParams);
  const setSynthParams = _set(state.synthParams);
  return {
    getParams: (key: SynthParamsKey) => {
      return matchSynthParamsKey(key, (lens: Lens<any, any>) =>
        viewSynthParams(lens)
      );
    },
    setParams: (key: SynthParamsKey, value: any) => {
      const newParams = matchSynthParamsKey(key, (lens: Lens<any, any>) => {
        const setter = setSynthParams(lens);
        state.synth!.set(setter(value ? value : "0"));
        return setter(value);
      });
      dispatch({
        type: "SET_SYNTH_PARAMS",
        payload: {
          synthParams: newParams,
        },
      });
    },
  };
};

export default useSynthParams;
