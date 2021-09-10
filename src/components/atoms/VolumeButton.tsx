import { IconButton } from "@material-ui/core";
import { VolumeOff, VolumeUp } from "@material-ui/icons";

function VolumeButton(props: {
  mute: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const selectVolumeIcon = () => {
    return props.mute ? <VolumeOff /> : <VolumeUp />;
  };

  return <IconButton onClick={props.onClick}>{selectVolumeIcon()}</IconButton>;
}

export default VolumeButton;
