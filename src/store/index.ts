import { createContext, Dispatch } from "react";
import { PlaybackState, PolySynth, Transport } from "tone";

const synth = new PolySynth().toDestination();
const params = synth.get();

export type State = {
  time: number;
  duration: number;
  toneState: PlaybackState;
  synth: PolySynth;
  synthParams: any;
  playerDisabled: boolean;
  playbackTimeID: number;
};

export type Action =
  | {
      type: "SET_SYNTH_PARAMS";
      payload: { synthParams: any };
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
  synth: synth,
  synthParams: params,
  playerDisabled: true,
  playbackTimeID: 0,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SYNTH_PARAMS": {
      return {
        ...state,
        synthParams: action.payload.synthParams,
      };
    }
    case "LOADED_MIDI": {
      const payload = action.payload;
      return {
        ...state,
        duration: payload.duration,
        time: 0,
        playerDisabled: false,
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
