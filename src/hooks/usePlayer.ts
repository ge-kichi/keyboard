import { useContext } from "react";
import { Frequency, Part, Transport } from "tone";
import { Midi } from "@tonejs/midi";
import { StoreContext } from "../store";

const toMIDI = (note: string) => Frequency(note).toMidi();

const usePlayer = () => {
  const { state, dispatch } = useContext(StoreContext);
  const synth = state.synth;
  const playbackTime = () =>
    window.setInterval(() => dispatch({ type: "COUNT_TIME" }), 1000);

  const dropFile = (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const midi = new Midi(e.target.result);
      Transport.cancel();
      midi.tracks.forEach((track) => {
        new Part((time, note) => {
          synth?.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
          const keyNumElemDataset = (
            document.querySelector(
              `[data-key-num="${toMIDI(note.name)}"]`
            )! as HTMLElement
          ).dataset;
          keyNumElemDataset.active = "true";
          setTimeout(
            () => (keyNumElemDataset.active = "false"),
            note.duration * 1000
          );
        }, track.notes).start();
      });
      dispatch({
        type: "LOADED_MIDI",
        payload: {
          duration: Math.ceil(midi.duration),
          playbackTimeID: playbackTime(),
        },
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const PlayPause = () =>
    dispatch(
      state.toneState !== "started"
        ? {
            type: "PLAY_MIDI",
            payload: {
              playbackTimeID: playbackTime(),
            },
          }
        : { type: "PAUSE_MIDI" }
    );

  const stop = () => dispatch({ type: "STOP_MIDI" });

  return {
    state,
    handlers: {
      dropFile,
      PlayPause,
      stop,
    },
  };
};

export default usePlayer;
