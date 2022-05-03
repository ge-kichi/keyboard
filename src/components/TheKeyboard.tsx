import { useEffect } from "react";
import { range } from "ramda";
import { Frequency, now, PlaybackState } from "tone";
import { useKeyboard as useKeyboardDI } from "../hooks";
import "./TheKeyboard.css";
import BaseMediaQuery from "./BaseMediaQuery";

// https://www.nxworld.net/js-array-chunk.html
const arrayChunk = ([...array], size = 1) =>
  array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );

let dragging = false;
const pointerdownHandler = () => (dragging = true);
const pointerupHandler = () => (dragging = false);
const disableScroll = (e: any) => dragging && e.preventDefault();

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
  const { synth, toneState } = useKeyboard();

  const Key = (midiNote: number): JSX.Element => {
    const note = toNote(midiNote);
    return (
      <div className="the-keyboard__key-container" key={midiNote - 21}>
        <div
          className={
            "the-keyboard__key" +
            " " +
            (!isBlackKey(midiNote) ? "--white" : "--black")
          }
          data-key-num={midiNote}
        >
          <span className="the-keyboard__label">
            {/C[1-8]/.test(note) ? note : ""}
          </span>
        </div>
      </div>
    );
  };
  const Keys =
    (midiNotes: number[], isSeparate = true) =>
    (toneState: PlaybackState): JSX.Element => {
      if (isSeparate) {
        const midiNotesLen = midiNotes.length / 2;
        return arrayChunk(midiNotes, midiNotesLen)
          .reverse()
          .map((chunk: Array<number>, i: number) => {
            return (
              <div
                className={
                  "the-keyboard__row" +
                  " " +
                  (toneState === "started" ? "--notAllowed" : "")
                }
                key={i}
              >
                {chunk.map((midiNote: number) => Key(midiNote))}
              </div>
            );
          });
      } else {
        return (
          <div
            className={
              "the-keyboard__row" +
              " " +
              (toneState === "started" ? "--notAllowed" : "")
            }
          >
            {midiNotes.map((midiNote: number) => Key(midiNote))}
          </div>
        );
      }
    };

  const Keys12 = (toneState: PlaybackState) =>
    Keys(range(60, 72), false)(toneState);
  const Keys25 = (toneState: PlaybackState) =>
    Keys(range(53, 78), false)(toneState);
  const Keys32 = (toneState: PlaybackState) =>
    Keys(range(48, 80), false)(toneState);
  const Keys42 = (toneState: PlaybackState) =>
    Keys(range(43, 85), false)(toneState);
  const Keys88 = (toneState: PlaybackState) => Keys(range(21, 109))(toneState);

  const pressKey = (e: any) => {
    e.preventDefault();
    const dataset = e.target.dataset;
    if (!dataset.keyNum) return;
    dataset.active = true;
    synth?.triggerAttack(toNote(dataset.keyNum), now());
  };
  const releaseKey = (e: any) => {
    e.preventDefault();
    const dataset = e.target.dataset;
    if (!dataset.keyNum) return;
    dataset.active = false;
    synth?.triggerRelease(toNote(dataset.keyNum));
  };
  const pressKeyDragging = (e: any) => dragging && pressKey(e);
  const releaseKeyDragging = (e: any) => dragging && releaseKey(e);

  useEffect(() => {
    document.addEventListener("mousedown", pointerdownHandler);
    document.addEventListener("mouseup", pointerupHandler);
    document.addEventListener("mousemove", disableScroll, { passive: false });
    return () => {
      document.removeEventListener("mousedown", pointerdownHandler);
      document.removeEventListener("mouseup", pointerupHandler);
      document.removeEventListener("mousemove", disableScroll);
    };
  }, []);

  return (
    <div
      className="the-keyboard el-stack"
      onMouseDown={pressKey}
      onMouseOver={pressKeyDragging}
      onMouseUp={releaseKey}
      onMouseOut={releaseKeyDragging}
      onTouchStart={pressKey}
      onTouchEnd={releaseKey}
    >
      <BaseMediaQuery
        mqComponents={{
          "not all and (min-width: 640px)": Keys12(toneState),
          "(min-width: 640px)": Keys25(toneState),
          "(min-width: 768px)": Keys32(toneState),
          "(min-width: 1024px)": Keys42(toneState),
          "(min-width: 1280px)": Keys88(toneState),
        }}
      />
    </div>
  );
}

export default TheKeyboard;
