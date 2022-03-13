import {
  faPlay,
  faPause,
  faStop,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import BaseIconButton from "./BaseIconButton";
import BaseTime from "./BaseTime";
import { usePlayer } from "../hooks";

function TheMenu() {
  const { state, handlers } = usePlayer();

  return (
    <div className="the-menu">
      <div className="the-menu__filedrop form-group">
        <input
          className="form-input"
          type="file"
          accept="audio/midi"
          onChange={handlers.dropFile}
        />
      </div>
      <div className="the-menu__toolbar el-cluster el-cluster--justify:flex-start">
        <BaseIconButton
          onClick={handlers.PlayPause}
          iconProp={state.toneState !== "started" ? faPlay : faPause}
          disabled={state.disabled}
        />
        <BaseIconButton
          onClick={handlers.stop}
          iconProp={faStop}
          disabled={state.disabled}
        />
        <BaseIconButton
          onClick={handlers.toggleVolume}
          iconProp={!state.isMute ? faVolumeUp : faVolumeMute}
        />
        <BaseTime time={state.time} duration={state.duration} />
      </div>
    </div>
  );
}

export default TheMenu;
