import { useEffect, useState } from "react";
import { range } from "ramda";
import { Frequency, now } from "tone";
import {
  useSynth as useSynthDI,
  useToneState as useToneStateDI,
} from "../hooks";
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
    document.addEventListener("pointerdown", pointerdownHandler);
    document.addEventListener("pointerup", pointerupHandler);
    document.addEventListener("pointermove", disableScroll, { passive: false });
    return () => {
      document.removeEventListener("pointerdown", pointerdownHandler);
      document.removeEventListener("pointerup", pointerupHandler);
      document.removeEventListener("pointermove", disableScroll);
    };
  }, []);

  return (
    <div
      className="the-keyboard el-stack"
      onPointerDown={pressKey}
      onPointerOver={(e: any) => dragging && pressKey(e)}
      onPointerUp={releaseKey}
      onPointerOut={(e: any) => dragging && releaseKey(e)}
    >
      {arrayChunk(midiNotes, midiNotesLen)
        .reverse()
        .map((chunk: Array<number>, i: number) => {
          return (
            <div
              className={
                "the-keyboard__row" +
                " " +
                (toneState === "started" ? "app-util-pointerEvent:none" : "")
              }
              key={i}
            >
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
        })}
    </div>
  );
}

export default TheKeyboard;
