import { IconButton } from "@material-ui/core";
import { Stop } from "@material-ui/icons";

function StopButton(props: {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <IconButton disabled={props.disabled} onClick={props.onClick}>
      <Stop />
    </IconButton>
  );
}

export default StopButton;
