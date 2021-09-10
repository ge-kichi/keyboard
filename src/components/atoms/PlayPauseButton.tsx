import { PlaybackState } from "tone";
import { IconButton } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

function PlayPauseButton(props: {
  state: PlaybackState | undefined;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const selectButtonIcon = () => {
    return props.state === "started" ? <Pause /> : <PlayArrow />;
  };

  return (
    <IconButton disabled={props.disabled} onClick={props.onClick}>
      {selectButtonIcon()}
    </IconButton>
  );
}

export default PlayPauseButton;
