import { Frequency } from "tone";
import "./Keyboard.css";

const note = (midiNote: number) => Frequency(midiNote, "midi").toNote();

function BaseKey(props: { midiNote: number; isBlackKey: boolean }) {
  const _note = note(props.midiNote);
  return (
    <div className="Keyboard-key">
      <div
        className={
          props.isBlackKey ? "Keyboard-key__black" : "Keyboard-key__white"
        }
        data-key-num={props.midiNote}
      >
        <span className="Keyboard-key__label">
          {/C[1-8]/.test(_note) ? _note : ""}
        </span>
      </div>
    </div>
  );
}

export default BaseKey;
