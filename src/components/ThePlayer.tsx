import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import BaseIconButton from "./BaseIconButton";
import BaseTime from "./BaseTime";
import { usePlayer } from "../hooks";

function ThePlayer() {
  const { state, handlers } = usePlayer();

  const dropFile = (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (e: any) => handlers.loadMidi(e.target.result);
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div className="form-group">
        <input
          type="file"
          id="dropFile"
          className="form-input"
          accept="audio/midi"
          onChange={dropFile}
        />
      </div>
      <div className="el-cluster el-cluster--justify:flex-start">
        <BaseIconButton
          onClick={handlers.playPause}
          iconProp={state.toneState !== "started" ? faPlay : faPause}
          disabled={state.playerDisabled}
        />
        <BaseIconButton
          onClick={handlers.stop}
          iconProp={faStop}
          disabled={state.playerDisabled}
        />
        <BaseTime time={state.time} duration={state.duration} />
      </div>
    </div>
  );
}

export default ThePlayer;
