import { useEffect } from "react";
import { Sampler } from "tone";
import { Action } from "../store";

const useSampler = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const sampler = new Sampler({
      attack: 0,
      urls: {
        A0: "A0v1.mp3",
        C1: "C1v1.mp3",
        "D#1": "Ds1v1.mp3",
        "F#1": "Fs1v1.mp3",
        A1: "A1v1.mp3",
        C2: "C2v1.mp3",
        "D#2": "Ds2v1.mp3",
        "F#2": "Fs2v1.mp3",
        A2: "A2v1.mp3",
        C3: "C3v1.mp3",
        "D#3": "Ds3v1.mp3",
        "F#3": "Fs3v1.mp3",
        A3: "A3v1.mp3",
        C4: "C4v1.mp3",
        "D#4": "Ds4v1.mp3",
        "F#4": "Fs4v1.mp3",
        A4: "A4v1.mp3",
        C5: "C5v1.mp3",
        "D#5": "Ds5v1.mp3",
        "F#5": "Fs5v1.mp3",
        A5: "A5v1.mp3",
        C6: "C6v1.mp3",
        "D#6": "Ds6v1.mp3",
        "F#6": "Fs6v1.mp3",
        A6: "A6v1.mp3",
        C7: "C7v1.mp3",
        "D#7": "Ds7v1.mp3",
        "F#7": "Fs7v1.mp3",
        A7: "A7v1.mp3",
        C8: "C8v1.mp3",
      },
      baseUrl: process.env.PUBLIC_URL + "/audio/",
      release: 1,
      curve: "exponential",
      onload: () =>
        dispatch({
          type: "LOADED_SAMPLER",
          payload: {
            isLoaded: true,
            sampler: sampler,
          },
        }),
    }).toDestination();
  }, [dispatch]);
};

export default useSampler;
