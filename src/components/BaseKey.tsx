import { Frequency } from "tone";

const note = (midiNote: number) => Frequency(midiNote, "midi").toNote();

function BaseKey(props: { midiNote: number; isBlackKey: boolean }) {
  const _note = note(props.midiNote);
  return (
    <div className="Keyboard__key-container">
      <div
        className={
          !props.isBlackKey ? "Keyboard__key--white" : "Keyboard__key--black"
        }
        data-key-num={props.midiNote}
      >
        <span className="Keyboard__label">
          {/C[1-8]/.test(_note) ? _note : ""}
        </span>
      </div>
    </div>
  );
}

export default BaseKey;
