import Key from "../atoms/Key";
import "./KeyboardRow.css";

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

function KeyboardRow(props: { midiNotes: number[]; startNum: number }) {
  return (
    <div className="keyboard-row">
      {props.midiNotes.map((midiNote: number, i: number) => {
        return (
          <Key
            key={i + props.startNum}
            midiNote={midiNote}
            isBlackKey={isBlackKey(midiNote)}
          />
        );
      })}
    </div>
  );
}

export default KeyboardRow;
