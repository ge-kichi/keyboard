import { range } from "ramda";
import { Frequency } from "tone";
import { useSampler as useSamplerDI } from "../hooks";
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

function TheKeyboard({ useSampler = useSamplerDI }) {
  const sampler = useSampler();

  const _pressKey = (e: any) => {
    const target = e.target;
    target.classList.add("--pressing");
    sampler?.triggerAttack(toNote(target.dataset.keyNum));
  };

  const _releaseKey = (e: any) => {
    const target = e.target;
    target.classList.remove("--pressing");
    sampler?.triggerRelease(toNote(target.dataset.keyNum));
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

export default TheKeyboard;
