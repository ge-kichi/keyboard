import { useContext, useState } from "react";
import { Sampler } from "tone";
import { AppContext } from "../../App";
import GitHubLink from "../atoms/GitHubLink";
import Time from "../atoms/Time";
import PlayPauseButton from "../atoms/PlayPauseButton";
import StopButton from "../atoms/StopButton";
import VolumeButton from "../atoms/VolumeButton";
import { startTimer } from "../../ts/timer";
import "./Toolbar.css";

function Toolbar(props: { sampler: Sampler | undefined }) {
  const { appState, appDispatch } = useContext(AppContext);
  const [isMute, setMute] = useState(false);

  const PlayPauseMidi = () => {
    if (appState.toneState !== "started") {
      appDispatch({ type: "playMidi" });
      startTimer(() => appDispatch({ type: "countTime" }));
    } else {
      appDispatch({ type: "pauseMidi" });
    }
  };

  const stopMidi = () => {
    appDispatch({ type: "stopMidi" });
  };

  const toggleVolume = () => {
    if (!props.sampler) return;
    const volume = props.sampler.volume;
    volume.value = isMute ? 0 : volume.minValue;
    setMute(!isMute);
  };

  return (
    <div id="toolbar">
      <PlayPauseButton
        state={appState.toneState}
        disabled={appState.disabled}
        onClick={PlayPauseMidi}
      />
      <StopButton disabled={appState.disabled} onClick={stopMidi} />
      <VolumeButton mute={isMute} onClick={toggleVolume} />
      <Time time={appState.time} duration={appState.duration} />
      <GitHubLink />
    </div>
  );
}

export default Toolbar;
