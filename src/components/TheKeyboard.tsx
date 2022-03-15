import { range } from "ramda";
import { Frequency } from "tone";
import { useKeyboard as useKeyboardDI } from "../hooks";
import "./TheKeyboard.css";

const midiNotes = range(21, 109);
const toNote = (midiNote: number) => Frequency(midiNote, "midi").toNote();
const isBlackKey = (midiNote: number) => {
  switch ((midiNote - 20) % 12) {
    case 0:
    case 2:
    case 5:
    case 7:
    case 10:
      return true;
    default:
      return false;
  }
};

function TheKeyboard({ useKeyboard = useKeyboardDI }) {
  const { pressKey, releaseKey } = useKeyboard();
  return (
    <div
      className="the-keyboard"
      onPointerDown={pressKey}
      onPointerUp={releaseKey}
    >
      {midiNotes.map((midiNote: number, i: number) => {
        const _note = toNote(midiNote);
        return (
          <div className="the-keyboard__key-container">
            <div
              className={
                !isBlackKey(midiNote)
                  ? "the-keyboard__key--white"
                  : "the-keyboard__key--black"
              }
              data-key-num={midiNote}
            >
              <span className="the-keyboard__label">
                {/C[1-8]/.test(_note) ? _note : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TheKeyboard;
