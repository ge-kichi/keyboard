import { createContext, Dispatch } from "react";
import { PlaybackState, PolySynth, Transport } from "tone";

const synth = new PolySynth().toDestination();
const params = synth.get();

export type State = {
  synth: PolySynth;
  synthParams: any;
  toneState: PlaybackState;
};

export type Action =
  | {
      type: "SET_SYNTH_PARAMS";
      payload: { synthParams: any };
    }
  | { type: "PLAY_MIDI" }
  | { type: "PAUSE_MIDI" }
  | { type: "STOP_MIDI" };

export const StoreContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);

export const initialState: State = {
  synth: synth,
  synthParams: params,
  toneState: "stopped",
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SYNTH_PARAMS": {
      return {
        ...state,
        synthParams: action.payload.synthParams,
      };
    }
    case "PLAY_MIDI": {
      return {
        ...state,
        toneState: Transport.start().state,
      };
    }
    case "PAUSE_MIDI": {
      return {
        ...state,
        toneState: Transport.pause().state,
      };
    }
    case "STOP_MIDI": {
      return {
        ...state,
        toneState: Transport.stop().state,
      };
    }
  }
};
