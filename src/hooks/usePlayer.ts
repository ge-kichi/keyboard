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
          )!.classList;
          keyNumElem.add("Keyboard__key--pressing");
          setTimeout(
            () => keyNumElem.remove("Keyboard__key--pressing"),
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
    if (!sampler) return;
    const volume = sampler.volume;
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
