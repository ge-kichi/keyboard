import { Frequency } from "tone";

export const midi_to_note = (keyNum: number) =>
  Frequency(keyNum, "midi").toNote();
export const note_to_midi = (note: string) => Frequency(note).toMidi();
