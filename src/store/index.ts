import { createContext, Dispatch } from "react";
import { PlaybackState, PolySynth, Transport } from "tone";

export type State = {
  time: number;
  duration: number;
  toneState: PlaybackState;
  isLoaded: boolean;
  synth: PolySynth | undefined;
  disabled: boolean;
  playbackTimeID: number;
};

export type Action =
  | {
      type: "LOADED_SYNTH";
      payload: { synth: PolySynth; isLoaded: boolean };
    }
  | {
      type: "LOADED_MIDI";
      payload: { duration: number; playbackTimeID: number };
    }
  | { type: "COUNT_TIME" }
  | { type: "PLAY_MIDI"; payload: { playbackTimeID: number } }
  | { type: "PAUSE_MIDI" }
  | { type: "STOP_MIDI" };

export const StoreContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);

export const initialState: State = {
  time: 0,
  duration: 0,
  toneState: "stopped",
  isLoaded: false,
  synth: undefined,
  disabled: true,
  playbackTimeID: 0,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOADED_SYNTH": {
      const payload = action.payload;
      return {
        ...state,
        isLoaded: payload.isLoaded,
        synth: payload.synth,
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
        playbackTimeID: payload.playbackTimeID,
      };
    }
    case "COUNT_TIME": {
      if (state.duration > state.time) {
        return {
          ...state,
          time: state.time + 1,
        };
      } else {
        window.clearInterval(state.playbackTimeID);
        return {
          ...state,
          time: 0,
          toneState: Transport.stop().state,
          playbackTimeID: 0,
        };
      }
    }
    case "PLAY_MIDI": {
      return {
        ...state,
        toneState: Transport.start().state,
        playbackTimeID: action.payload.playbackTimeID,
      };
    }
    case "PAUSE_MIDI": {
      window.clearInterval(state.playbackTimeID);
      return {
        ...state,
        toneState: Transport.pause().state,
        playbackTimeID: 0,
      };
    }
    case "STOP_MIDI": {
      window.clearInterval(state.playbackTimeID);
      return {
        ...state,
        time: 0,
        toneState: Transport.stop().state,
        playbackTimeID: 0,
      };
    }
  }
};
