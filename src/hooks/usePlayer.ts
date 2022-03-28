import { useState } from "react";
import { Frequency, Part, Transport } from "tone";
import { Midi } from "@tonejs/midi";
import useInterval from "./useInterval";
import useStore from "./useStore";

const toMIDI = (note: string) => Frequency(note).toMidi();

const usePlayer = () => {
  const [duration, setDuration] = useState(0);
  const [playbackTimeID, setPlaybackTimeID] = useState(0);
  const [playerDisabled, setPlayerDisabled] = useState(true);
  const [time, setTime] = useState(0);

  const { state, dispatch } = useStore();
  const { synth, toneState } = state;

  const loadMidi = (midiFileBuffer: ArrayBuffer) => {
    const midi = new Midi(midiFileBuffer);
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
    setDuration(Math.ceil(midi.duration));
    setPlayerDisabled(false);
    setTime(0);
    dispatch({ type: "PLAY_MIDI" });
  };

  const playPause = () => {
    if (toneState !== "started") {
      dispatch({ type: "PLAY_MIDI" });
    } else {
      setPlaybackTimeID(0);
      dispatch({ type: "PAUSE_MIDI" });
    }
  };

  const stop = () => {
    setPlaybackTimeID(0);
    setTime(0);
    dispatch({ type: "STOP_MIDI" });
  };

  useInterval(() => {
    switch (toneState) {
      case "started": {
        if (duration > time) {
          setTime(time + 1);
        } else {
          clearInterval(playbackTimeID);
          setTime(0);
          setPlaybackTimeID(0);
          dispatch({ type: "STOP_MIDI" });
        }
        break;
      }
      case "stopped":
      case "paused": {
        clearInterval(playbackTimeID);
        break;
      }
    }
  });

  return {
    state: {
      duration,
      playerDisabled,
      time,
      toneState,
    },
    handlers: {
      loadMidi,
      playPause,
      stop,
    },
  };
};

export default usePlayer;
