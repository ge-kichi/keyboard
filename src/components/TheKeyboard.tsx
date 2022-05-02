import { useEffect, useState } from "react";
import { range } from "ramda";
import { Frequency, now } from "tone";
import {
  useSynth as useSynthDI,
  useToneState as useToneStateDI,
} from "../hooks";
import "./TheKeyboard.css";
import BaseMediaQuery from "./BaseMediaQuery";

// https://www.nxworld.net/js-array-chunk.html
const arrayChunk = ([...array], size = 1) =>
  array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );

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

function TheKeyboard({ useSynth = useSynthDI, useToneState = useToneStateDI }) {
  const synth = useSynth();
  const toneState = useToneState();
  const [dragging, setDragging] = useState(false);

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

  useEffect(() => {
    const pointerdownHandler = () => setDragging(true);
    const pointerupHandler = () => setDragging(false);
    const disableScroll = (e: any) => dragging && e.preventDefault();
    document.addEventListener("mousedown", pointerdownHandler);
    document.addEventListener("mouseup", pointerupHandler);
    document.addEventListener("mousemove", disableScroll, { passive: false });
    return () => {
      document.removeEventListener("mousedown", pointerdownHandler);
      document.removeEventListener("mouseup", pointerupHandler);
      document.removeEventListener("mousemove", disableScroll);
    };
  }, [dragging]);

  const Key = (midiNote: number) => {
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

  const Keys = (midiNotes: number[], isSeparate = true) => {
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

  const Keys12 = Keys(range(60, 72), false);
  const Keys40 = Keys(range(45, 85));
  const Keys64 = Keys(range(33, 97));
  const Keys88 = Keys(range(21, 109));

  return (
    <div
      className="the-keyboard el-stack"
      onMouseDown={pressKey}
      onMouseOver={(e: any) => dragging && pressKey(e)}
      onMouseUp={releaseKey}
      onMouseOut={(e: any) => dragging && releaseKey(e)}
      onTouchStart={pressKey}
      onTouchEnd={releaseKey}
    >
      <BaseMediaQuery
        mqComponents={{
          "not all and (min-width: 600px)": Keys12,
          "(min-width: 600px)": Keys40,
          "(min-width: 960px)": Keys64,
          "(min-width: 1280px)": Keys88,
        }}
      />
    </div>
  );
}

export default TheKeyboard;
