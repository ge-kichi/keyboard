import { useState, useContext } from "react";
import { Frequency, Part, Transport } from "tone";
import { Midi } from "@tonejs/midi";
import { StoreContext } from "../store";

const toMIDI = (note: string) => Frequency(note).toMidi();

const usePlayer = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [isMute, setMute] = useState(false);
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
          const keyNumElem = document.querySelector(
            `[data-key-num="${toMIDI(note.name)}"]`
          )!.classList;
          keyNumElem.add("--pressing");
          setTimeout(
            () => keyNumElem.remove("--pressing"),
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

  const toggleVolume = () => {
    if (!synth) return;
    const volume = synth.volume;
    volume.value = !isMute ? volume.minValue : 0;
    setMute(!isMute);
  };

  return {
    state: {
      isMute,
      ...state,
    },
    handlers: {
      dropFile,
      PlayPause,
      stop,
      toggleVolume,
    },
  };
};

export default usePlayer;
