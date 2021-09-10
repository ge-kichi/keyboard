import { midi_to_note } from "../../ts/midiNote";
import "./Key.css";

const regExpC: RegExp = /C[1-8]/;

function Key(props: { midiNote: number; isBlackKey: boolean }) {
  const note: string = midi_to_note(props.midiNote).toString();

  return (
    <div className="keyboard-key">
      <div
        className={props.isBlackKey ? "black-key" : "white-key"}
        data-key-num={props.midiNote}
      >
        <span className="key-label">{regExpC.test(note) ? note : ""}</span>
      </div>
    </div>
  );
}

export default Key;
