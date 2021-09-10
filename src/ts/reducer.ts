import { PlaybackState, Transport } from "tone";
import { stopTimer } from "./timer";

export type AppState = {
  time: number;
  duration: number;
  toneState: PlaybackState;
  disabled: boolean;
};

export type AppAction =
  | { type: "setTime"; time: number }
  | { type: "countTime" }
  | { type: "setDuration"; duration: number }
  | { type: "playMidi" }
  | { type: "pauseMidi" }
  | { type: "stopMidi" }
  | { type: "setDisabled"; disabled: boolean };

export const initialAppState: AppState = {
  time: 0,
  duration: 0,
  toneState: "stopped",
  disabled: true,
};

export const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "setTime":
      return {
        ...state,
        time: action.time,
      };
    case "countTime":
      if (state.duration > state.time) {
        return {
          ...state,
          time: state.time + 1,
        };
      } else {
        stopTimer();
        return {
          ...state,
          time: 0,
          toneState: Transport.stop().state,
        };
      }
    case "setDuration":
      return {
        ...state,
        duration: action.duration,
      };
    case "playMidi":
      return {
        ...state,
        toneState: Transport.start().state,
      };
    case "pauseMidi":
      stopTimer();
      return {
        ...state,
        toneState: Transport.pause().state,
      };
    case "stopMidi":
      stopTimer();
      return {
        ...state,
        time: 0,
        toneState: Transport.stop().state,
      };
    case "setDisabled":
      return {
        ...state,
        disabled: action.disabled,
      };
    default:
      return state;
  }
};
