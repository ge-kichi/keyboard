import { range } from "ramda";
import { Frequency } from "tone";
import { useSynth as useSynthDI } from "../hooks";
import "./TheKeyboard.css";

// https://www.nxworld.net/js-array-chunk.html
const arrayChunk = ([...array], size = 1) =>
  array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );

const midiNotes = range(21, 109);
const midiNotesLen = midiNotes.length / 2;
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

function TheKeyboard({ useSynth = useSynthDI }) {
  const synth = useSynth();

  const _pressKey = (e: any) => {
    const target = e.target;
    target.classList.add("--pressing");
    synth?.triggerAttack(toNote(target.dataset.keyNum));
  };

  const _releaseKey = (e: any) => {
    const target = e.target;
    target.classList.remove("--pressing");
    synth?.triggerRelease(toNote(target.dataset.keyNum));
  };

  const pressKey = (e: any) => {
    _pressKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.addEventListener("pointerover", _pressKey);
    currentTarget.addEventListener("pointerout", _releaseKey);
  };
  const releaseKey = (e: any) => {
    _releaseKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.removeEventListener("pointerover", _pressKey);
    currentTarget.removeEventListener("pointerout", _releaseKey);
  };

  return (
    <div
      className="the-keyboard el-stack"
      onPointerDown={pressKey}
      onPointerUp={releaseKey}
    >
      {arrayChunk(midiNotes, midiNotesLen).map(
        (chunk: Array<number>, i: number) => {
          return (
            <div className="the-keyboard__row" key={i}>
              {chunk.map((midiNote: number) => {
                const _note = toNote(midiNote);
                return (
                  <div
                    className="the-keyboard__key-container"
                    key={midiNote - 21}
                  >
                    <div
                      className={
                        "the-keyboard__key" +
                        " " +
                        (!isBlackKey(midiNote) ? "--white" : "--black")
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
      )}
    </div>
  );
}

export default TheKeyboard;
