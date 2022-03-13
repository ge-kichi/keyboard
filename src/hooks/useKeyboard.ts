import { useContext } from "react";
import { midi_to_note } from "../modules";
import { StoreContext } from "../store";

const useKeyboard = () => {
  const { state } = useContext(StoreContext);

  const _pressKey = (e: any) => {
    if (!state.sampler) return;
    const target = e.target;
    if (target.dataset.keyNum) {
      target.classList.add("Keyboard__key--pressing");
      state.sampler.triggerAttack(midi_to_note(target.dataset.keyNum));
    }
  };

  const _releaseKey = (e: any) => {
    if (!state.sampler) return;
    const target = e.target;
    target.classList.remove("Keyboard__key--pressing");
    state.sampler.triggerRelease(midi_to_note(target.dataset.keyNum));
  };

  const _overKey = (e: any) => {
    const elements = Array.from(document.querySelectorAll(":active"));
    if (elements.length !== 0) _pressKey(e);
  };

  const _outKey = (e: any) => _releaseKey(e);

  const _touchMoveKey = (e: any) => e.preventDefault();

  const pressKey = (e: any) => {
    _pressKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.addEventListener("pointerover", _overKey);
    currentTarget.addEventListener("pointerout", _outKey);
    currentTarget.addEventListener("touchmove", _touchMoveKey);
  };

  const releaseKey = (e: any) => {
    _releaseKey(e);
    const currentTarget = e.currentTarget;
    currentTarget.removeEventListener("pointerover", _overKey);
    currentTarget.removeEventListener("pointerout", _outKey);
    currentTarget.removeEventListener("touchmove", _touchMoveKey);
  };

  return {
    pressKey,
    releaseKey,
  };
};

export default useKeyboard;
