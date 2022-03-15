import { useContext } from "react";
import { midi_to_note } from "../modules";
import { StoreContext } from "../store";

const useKeyboard = () => {
  const { state } = useContext(StoreContext);

  const _pressKey = (e: any) => {
    if (!state.sampler) return;
    const target = e.target;
    target.classList.add("the-keyboard__key--pressing");
    state.sampler.triggerAttack(midi_to_note(target.dataset.keyNum));
  };

  const _releaseKey = (e: any) => {
    if (!state.sampler) return;
    const target = e.target;
    target.classList.remove("the-keyboard__key--pressing");
    state.sampler.triggerRelease(midi_to_note(target.dataset.keyNum));
  };

  const pressKey = (e: any) => {
    _pressKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.addEventListener("pointerover", _pressKey);
    currentTarget.addEventListener("pointerout", _releaseKey);
  };

  const releaseKey = (e: any) => {
    _releaseKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.removeEventListener("pointerover", _pressKey);
    currentTarget.removeEventListener("pointerout", _releaseKey);
  };

  return {
    pressKey,
    releaseKey,
  };
};

export default useKeyboard;
