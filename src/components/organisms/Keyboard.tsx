import { range } from "ramda";
import MediaQuery from "react-responsive";
import { Sampler } from "tone";
import { midi_to_note } from "../../ts/midiNote";
import KeyboardRow from "../molecules/KeyboardRow";

// https://www.nxworld.net/js-array-chunk.html
const arrayChunk = ([...array], size = 1) =>
  array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );

const midiNotes = range(21, 109);
const midiNotesLen = midiNotes.length / 2;
const [midiNotesUpper, midiNotesLower] = arrayChunk(
  midiNotes,
  midiNotes.length / 2
);

function Keyboard(props: { sampler: Sampler | undefined }) {
  const _pressKey = (e: any) => {
    if (!props.sampler) return;
    const target = e.target;
    if (target.dataset.keyNum) {
      target.classList.add("pressing");
      props.sampler.triggerAttack(midi_to_note(target.dataset.keyNum));
    }
  };

  const _releaseKey = (e: any) => {
    if (!props.sampler) return;
    const target = e.target;
    target.classList.remove("pressing");
    props.sampler.triggerRelease(midi_to_note(target.dataset.keyNum));
  };

  const _overKey = (e: any) => {
    const elements = Array.from(document.querySelectorAll(":active"));
    if (elements.length !== 0) _pressKey(e);
  };

  const _outKey = (e: any) => {
    _releaseKey(e);
  };

  const pressKey = (e: any) => {
    _pressKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.addEventListener("pointerover", _overKey);
    currentTarget.addEventListener("pointerout", _outKey);
  };

  const releaseKey = (e: any) => {
    _releaseKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.removeEventListener("pointerover", _overKey);
    currentTarget.removeEventListener("pointerout", _outKey);
  };

  return (
    <div
      id="keyboard-container"
      onPointerDown={pressKey}
      onPointerUp={releaseKey}
    >
      <MediaQuery query="(min-width: 1025px)">
        <KeyboardRow midiNotes={midiNotes} startNum={0} />
      </MediaQuery>
      <MediaQuery query="(max-width: 1024px)">
        <KeyboardRow midiNotes={midiNotesUpper} startNum={0} />
        <KeyboardRow midiNotes={midiNotesLower} startNum={midiNotesLen} />
      </MediaQuery>
    </div>
  );
}

export default Keyboard;
