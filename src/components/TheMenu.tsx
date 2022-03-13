import { useState } from "react";
import { Part, Transport } from "tone";
import { Midi } from "@tonejs/midi";
import {
  faPlay,
  faPause,
  faStop,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import BaseIconButton from "./BaseIconButton";
import BaseTime from "./BaseTime";
import { note_to_midi, startTimer } from "../modules";
import { useStore } from "../hooks";

function TheMenu() {
  const { state, dispatch } = useStore();
  const [isMute, setMute] = useState(false);
  const sampler = state.sampler!;

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
          keyNumElem.classList.add("pressing");
          setTimeout(
            () => keyNumElem.classList.remove("pressing"),
            note.duration * 900
          );
        }, track.notes).start();
      });
      dispatch({
        type: "LOADED_MIDI",
        payload: { duration: Math.ceil(midi.duration) },
      });
      startTimer(() => dispatch({ type: "COUNT_TIME" }));
    };
    reader.readAsArrayBuffer(file);
  };

  const PlayPauseMidi = () => {
    if (state.toneState !== "started") {
      dispatch({ type: "PLAY_MIDI" });
      startTimer(() => dispatch({ type: "COUNT_TIME" }));
    } else {
      dispatch({ type: "PAUSE_MIDI" });
    }
  };

  const stopMidi = () => dispatch({ type: "STOP_MIDI" });

  const toggleVolume = () => {
    if (!sampler) return;
    const volume = sampler.volume;
    volume.value = isMute ? 0 : volume.minValue;
    setMute(!isMute);
  };

  return (
    <div className="the-menu">
      <div className="the-menu__filedrop form-group">
        <input
          className="form-input"
          type="file"
          accept="audio/midi"
          onChange={dropFile}
        />
      </div>
      <div className="the-menu__toolbar el-cluster el-cluster--justify:flex-start">
        <BaseIconButton
          onClick={PlayPauseMidi}
          iconProp={state.toneState !== "started" ? faPlay : faPause}
          disabled={state.disabled}
        />
        <BaseIconButton
          onClick={stopMidi}
          iconProp={faStop}
          disabled={state.disabled}
        />
        <BaseIconButton
          onClick={toggleVolume}
          iconProp={!isMute ? faVolumeUp : faVolumeMute}
        />
        <BaseTime time={state.time} duration={state.duration} />
      </div>
    </div>
  );
}

export default TheMenu;
