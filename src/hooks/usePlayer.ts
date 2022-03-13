import { useState, useContext } from "react";
import { Part, Transport } from "tone";
import { Midi } from "@tonejs/midi";
import { note_to_midi } from "../modules";
import { StoreContext } from "../store";

const usePlayer = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [isMute, setMute] = useState(false);
  const sampler = state.sampler!;
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
          sampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
          const keyNumElem = document.querySelector(
            `[data-key-num="${note_to_midi(note.name)}"]`
          )!;
          keyNumElem.classList.add("Keyboard__key--pressing");
          setTimeout(
            () => keyNumElem.classList.remove("Keyboard__key--pressing"),
            note.duration * 900
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

  const PlayPause = () => {
    if (state.toneState !== "started") {
      dispatch({
        type: "PLAY_MIDI",
        payload: {
          playbackTimeID: playbackTime(),
        },
      });
    } else {
      dispatch({ type: "PAUSE_MIDI" });
    }
  };

  const stop = () => dispatch({ type: "STOP_MIDI" });

  const toggleVolume = () => {
    if (!sampler) return;
    sampler.volume.value = isMute ? 0 : sampler.volume.minValue;
    setMute(!isMute);
  };

  return {
    state: {
      ...state,
      isMute,
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
