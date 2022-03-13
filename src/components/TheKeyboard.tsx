import { range } from "ramda";
import BaseKey from "./BaseKey";
import { useStore } from "../hooks";
import { midi_to_note } from "../modules";

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

// const arrayChunk = ([...array], size = 1) =>
//   array.reduce(
//     (acc, value, index) =>
//       index % size ? acc : [...acc, array.slice(index, index + size)],
//     []
//   );

const midiNotes = range(21, 109);
// const midiNotesLen = midiNotes.length / 2;
// const [midiNotesUpper, midiNotesLower] = arrayChunk(
//   midiNotes,
//   midiNotes.length / 2
// );

function TheKeyboard() {
  const { state } = useStore();
  const _pressKey = (e: any) => {
    if (!state.sampler) return;
    const target = e.target;
    if (target.dataset.keyNum) {
      target.classList.add("pressing");
      state.sampler.triggerAttack(midi_to_note(target.dataset.keyNum));
    }
  };

  const _releaseKey = (e: any) => {
    if (!state.sampler) return;
    const target = e.target;
    target.classList.remove("pressing");
    state.sampler.triggerRelease(midi_to_note(target.dataset.keyNum));
  };

  const _overKey = (e: any) => {
    const elements = Array.from(document.querySelectorAll(":active"));
    if (elements.length !== 0) _pressKey(e);
  };

  const _outKey = (e: any) => {
    _releaseKey(e);
  };

  const _touchMOveKey = (e: any) => {
    e.preventDefault();
    console.log(e.target);
  };

  const pressKey = (e: any) => {
    _pressKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.addEventListener("pointerover", _overKey);
    currentTarget.addEventListener("pointerout", _outKey);
    currentTarget.addEventListener("touchmove", _touchMOveKey);
  };

  const releaseKey = (e: any) => {
    _releaseKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.removeEventListener("pointerover", _overKey);
    currentTarget.removeEventListener("pointerout", _outKey);
    currentTarget.removeEventListener("touchmove", _touchMOveKey);
  };

  return (
    <div
      className="the-keyboard"
      onPointerDown={pressKey}
      onPointerUp={releaseKey}
    >
      <div className="Keyboard app-util-width:100%">
        {midiNotes.map((midiNote: number, i: number) => {
          return (
            <BaseKey
              key={i}
              midiNote={midiNote}
              isBlackKey={isBlackKey(midiNote)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TheKeyboard;
