import { createContext, Dispatch } from "react";
import { PlaybackState, Sampler, Transport } from "tone";
import { stopTimer } from "../modules";

export type State = {
  time: number;
  duration: number;
  toneState: PlaybackState;
  isLoaded: boolean;
  sampler: Sampler | undefined;
  disabled: boolean;
};

export type Action =
  | { type: "SET_TIME"; time: number }
  | { type: "COUNT_TIME" }
  | { type: "SET_DURATION"; duration: number }
  | { type: "PLAY_MIDI" }
  | { type: "PAUSE_MIDI" }
  | { type: "STOP_MIDI" }
  | { type: "LOADED_SAMPLER"; payload: { sampler: Sampler; isLoaded: boolean } }
  | { type: "LOADED_MIDI"; payload: { duration: number } }
  | { type: "SET_DISABLED"; disabled: boolean };

export const StoreContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);

export const initialState: State = {
  time: 0,
  duration: 0,
  toneState: "stopped",
  isLoaded: false,
  sampler: undefined,
  disabled: true,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_TIME":
      return {
        ...state,
        time: action.time,
      };
    case "COUNT_TIME":
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
    case "SET_DURATION":
      return {
        ...state,
        duration: action.duration,
      };
    case "PLAY_MIDI":
      return {
        ...state,
        toneState: Transport.start().state,
      };
    case "PAUSE_MIDI":
      stopTimer();
      return {
        ...state,
        toneState: Transport.pause().state,
      };
    case "STOP_MIDI":
      stopTimer();
      return {
        ...state,
        time: 0,
        toneState: Transport.stop().state,
      };
    case "LOADED_SAMPLER": {
      const payload = action.payload;
      return {
        ...state,
        isLoaded: payload.isLoaded,
        sampler: payload.sampler,
      };
    }
    case "LOADED_MIDI": {
      const payload = action.payload;
      return {
        ...state,
        duration: payload.duration,
        time: 0,
        disabled: false,
        toneState: Transport.start().state,
      };
    }
    case "SET_DISABLED":
      return {
        ...state,
        disabled: action.disabled,
      };
    default:
      return state;
  }
};
