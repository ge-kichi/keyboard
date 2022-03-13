import { Frequency } from "tone";

let intervalID = 0;
export const startTimer = (func: () => void) =>
  (intervalID = window.setInterval(func, 1000));
export const stopTimer = () => window.clearInterval(intervalID);

export const midi_to_note = (keyNum: number) =>
  Frequency(keyNum, "midi").toNote();
export const note_to_midi = (note: string) => Frequency(note).toMidi();
