import { useContext, useState } from "react";
import { Part, Sampler, Transport } from "tone";
import { Midi } from "@tonejs/midi";
import { AppContext } from "../../App";
import { note_to_midi } from "../../ts/midiNote";
import { startTimer } from "../../ts/timer";
import "./FileDrop.css";

function FileDrop(props: { sampler: Sampler | undefined }) {
  const { appDispatch } = useContext(AppContext);
  const [text, setText] = useState("Drop a midi file here");
  const sampler = props.sampler!;

  const setupMidi = (file: File) => {
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
      appDispatch({ type: "setDuration", duration: Math.ceil(midi.duration) });
      appDispatch({ type: "setTime", time: 0 });
      appDispatch({ type: "playMidi" });
      startTimer(() => appDispatch({ type: "countTime" }));
      appDispatch({ type: "setDisabled", disabled: false });
    };
    reader.readAsArrayBuffer(file);
  };

  const dropFile = (e: any) => {
    const [file] = e.target.files;
    setText(file.name);
    setupMidi(file);
  };

  return (
    // https://codesandbox.io/s/tonejs-midi-vfwdz?file=/index.html
    <div
      id="fileDrop"
      onDragEnter={(e: any) => e.currentTarget.classList.add("hover")}
      onDragLeave={(e: any) => e.currentTarget.classList.remove("hover")}
      onDrop={(e: any) => e.currentTarget.classList.remove("hover")}
    >
      <span id="text">{text}</span>
      <input type="file" accept="audio/midi" onChange={dropFile} />
    </div>
  );
}

export default FileDrop;
